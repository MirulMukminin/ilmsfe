import { formatDate, TitleCasePipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ButtonType,
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

export class CustomHeaderItem extends TableHeaderItem {
  /**
   * Used for sorting rows of the table.
   *
   * Override to enable different sorting.
   *
   * < 0 if `one` should go before `two`
   * > 0 if `one` should go after `two`
   * 0 if it doesn't matter (they are the same)
   */
  compare(one: TableItem, two: TableItem) {
    const stringOne = (one.data.RequestNo || one.data).toLowerCase();
    const stringTwo = (two.data.RequestNo || two.data).toLowerCase();

    if (stringOne > stringTwo) {
      return 1;
    } else if (stringOne < stringTwo) {
      return -1;
    } else {
      return 0;
    }
  }
}

@Component({
  selector: 'app-marine-endorse-fuelwater-list',
  templateUrl: './marine-endorse-fuelwater-list.component.html',
  styleUrls: ['./marine-endorse-fuelwater-list.component.scss'],
  providers: [TitleCasePipe],
})
export class MarineEndorseFuelwaterListComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() EndorsedFuelWaterListModel = new TableModel();

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  @Input() sortable = true;

  EndorsedFuelWaterList = [];

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  requestNo = '';
  supplyTo = '';
  vesselName = '';
  jobTicketNo = '';
  location = '';
  dateSubmit = '';
  status = '';
  dataset = [];

  userName: any = '';

  sortingOn = false;
  searchModel = '';
  key: string;

  asc = [];
  desc = [];
  index = '';

  constructor(
    private appService: AppService,
    private titlecasePipe: TitleCasePipe
  ) {}

  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;
  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.dataset = [];
        this.getRestServicesAPI(initialData.Company);
        console.log(initialData);
      })
      .catch((err) => {
        console.error(err);

        let errorObject = {
          type: 'error',
          title: 'Server Error',
          subtitle: 'Server Error. Please try again',
        };
        this.appService.showToaster(errorObject);
        this.appService.terminateSession();
      });
  }

  getRestServicesAPI(company: string) {
    // this.BerthRequestList = this.BerthRequest;

    const params = { company: company };
    restServices.pbksb_MarineService
      .GetEndorsedFuelWaterStandaloneListRequestByCompany(
        this.appService.myApp
      )(params)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        this.EndorsedFuelWaterList = request.List;

        this.EndorsedFuelWaterList.sort((a, b) => {
          return (
            this.getTimeTest(new Date(b.booking_date)) -
            this.getTimeTest(new Date(a.booking_date))
          );
        });

        this.EndorsedFuelWaterList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();
      });

    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      new CustomHeaderItem({ data: 'Request No.' }),
      new TableHeaderItem({ data: 'Booking Time' }),
      new TableHeaderItem({ data: 'Vessel Name' }),
      new TableHeaderItem({ data: 'Job Ticket No.' }),
      new TableHeaderItem({ data: 'Location' }),
      new TableHeaderItem({ data: 'Endorsed Date' }),
      new TableHeaderItem({ data: 'Status' }),
    ];
  }

  // ---- start functions used in pagination ---- //
  selectPage(page) {
    this.getPage(page).then((data: Array<Array<any>>) => {
      // set the data and update page
      this.model.data = this.prepareData(data);
      this.model.currentPage = page;
    });
  }

  getPage(page: number) {
    const fullPage = [];
    for (
      let i = (page - 1) * this.model.pageLength;
      i < page * this.model.pageLength && i < this.model.totalDataLength;
      i++
    ) {
      fullPage.push([
        this.dataset[i].Number,
        this.dataset[i].RequestNo,
        this.dataset[i].SupplyTo,
        this.dataset[i].VesselName,
        this.dataset[i].JobTicketNo,
        this.dataset[i].Location,
        this.dataset[i].DateSubmit,
        this.dataset[i].Status,
      ]);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(fullPage), 150);
    });
  }

  protected prepareData(data: Array<Array<any>>) {
    // create new data from the service data
    let newData = [];
    data.forEach((dataRow) => {
      let row = [];
      dataRow.forEach((dataElement, index) => {
        if (index == 1) {
          row.push(
            new TableItem({
              data: { RequestNo: dataElement, link: dataElement },
              title: dataElement,
              template: this.customTableItemTemplate,
            })
          );
        } else {
          row.push(
            new TableItem({
              data: dataElement,
            })
          );
        }
      });
      newData.push(row);
    });
    return newData;
  }
  // ---- end functions used in pagination ---- //

  /*search filter*/
  searchFilter(searchString: string) {
    this.searchValue = searchString;
    this.dataset = [];

    let indexCounter = 0;

    this.EndorsedFuelWaterList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.requestNo +
        this.supplyTo +
        this.vesselName +
        this.jobTicketNo +
        this.location +
        this.dateSubmit +
        this.status;
      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
          this.pushDataSet(indexCounter);
          indexCounter++;
        }
      } else {
        this.pushDataSet(index);
      }
    });
    this.startPagination();
  }

  //start pagination
  startPagination() {
    this.model.data = [[]];
    this.model.currentPage = 1;
    this.model.pageLength = 10;

    this.model.totalDataLength = this.dataset.length;
    this.selectPage(this.model.currentPage);
  }

  //prepare data to be added to tableitem in pagination function to dataset
  pushDataSet(index: any) {
    this.dataset.push({
      Number: index + 1,
      RequestNo: this.requestNo,
      SupplyTo: this.supplyTo,
      VesselName: this.vesselName,
      JobTicketNo: this.jobTicketNo,
      Location: this.location,
      DateSubmit: this.dateSubmit,
      Status: this.status,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    this.requestNo = value.request_number ? value.request_number : 'N/A';
    this.supplyTo = value.supply
      ? this.convertToTitleCase(value.supply)
      : 'N/A';
    this.vesselName = value.vessel_name ? value.vessel_name : '';
    this.jobTicketNo = value.job_ticket ? value.job_ticket : 'N/A';
    this.location = value.location
      ? this.convertToTitleCase(value.location)
      : '';
    this.dateSubmit = value.endorsed_date
      ? formatDate(value.endorsed_date, 'dd/MM/yyyy', 'en_US')
      : '';
    // this.status = value.status ? this.convertToTitleCase(value.status) : 'N/A';
    this.status = value.status ? value.status.replace(/_/g, ' ') : 'N/A';
    this.status =
      this.status == 'SENT' || this.status == 'VERIFIED'
        ? 'ENDORSED'
        : this.status;
    this.status = this.titlecasePipe.transform(this.status);
  }

  getTimeTest(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
  }

  convertToTitleCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }

  //-----------------------------Custom sorting start ----------------------------------//
  doSort(index: number) {
    this.sortingOn = true;
    this.model.header.forEach((value, i) => {
      //reset sorted state for header that is not selected
      if (index != i) {
        value.sorted = false;
        //reset default orientation
        value.ascending = false;
        value.descending = true;
      }
    });

    //set selected header to sorted state
    this.model.header[index].sorted = true;
    //set sort icon to descending
    if (this.model.header[index].ascending == true) {
      this.model.header[index].ascending = false;
      this.model.header[index].descending = true;
      this.sortFunction(index, 'DESC');
    } else {
      //set sort icon to ascending
      this.model.header[index].ascending = true;
      this.model.header[index].descending = false;
      this.sortFunction(index, 'ASC');
    }
    if (index != 0) {
      this.dataset.forEach((value, index) => {
        value.number = index + 1;
      });
    }

    this.startPagination();
  }
  sortFunction(index: number, orientation: any) {
    let sort = {
      0: 'Number',
      1: 'RequestNo',
      2: 'SupplyTo',
      3: 'VesselName',
      4: 'JobTicketNo',
      5: 'Location',
      6: 'DateSubmit',
      7: 'Status',
    };

    if (orientation == 'ASC') {
      if (index === 6) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 6) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal).reverse();
      }
    }
  }

  sortAscendingNormal = (a, b) => {
    // console.log(this.key);

    if (a[this.key] === b[this.key]) {
      return 0;
    } else {
      if (typeof a[this.key] == 'string') {
        return a[this.key].toLocaleLowerCase() < b[this.key].toLocaleLowerCase()
          ? -1
          : 1;
      } else {
        return a[this.key] < b[this.key] ? -1 : 1;
      }
    }
  };

  sortAscendingDate = (a, b) => {
    // console.log(this.key);

    //convert string to date to sort
    if (a[this.key] !== 'N/A') {
      var dateA = a[this.key];
    } else {
      return;
    }

    var dateAParts = dateA.split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateAConverted = new Date(
      +dateAParts[2],
      +dateAParts[1] - 1,
      +dateAParts[0]
    );

    if (b[this.key] !== 'N/A') {
      var dateB = b[this.key];
    } else {
      return;
    }

    var dateBParts = dateB.split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateBConverted = new Date(
      +dateBParts[2],
      +dateBParts[1] - 1,
      +dateBParts[0]
    );

    if (dateAConverted === dateBConverted) {
      return 0;
    } else {
      return dateAConverted < dateBConverted ? -1 : 1;
    }
  };

  clearSearch() {
    this.searchModel = '';
    this.sortingOn = false;
    this.asc[this.index] = false;
    this.desc[this.index] = false;
    // document.getElementById('header' + this.index).classList.remove('toggle');
  }

  //-----------------------------Custom sorting end ----------------------------------//
}
