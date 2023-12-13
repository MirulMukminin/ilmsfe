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
  selector: 'app-marine-service-request-list',
  templateUrl: './marine-service-request-list.component.html',
  styleUrls: ['./marine-service-request-list.component.scss'],
  providers: [TitleCasePipe],
})
export class MarineServiceRequestListComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() BerthRequestListModel = new TableModel();

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  @Input() sortable = true;

  BerthRequestList = [];

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  id = '';
  RequestNo = '';
  VesselName = '';
  DateSubmit = '';
  EstArrivalDate = '';
  ETA = '';
  EstDepartureDate = '';
  ETD = '';
  LastLocation = '';
  NextLocation = '';
  Agent = '';
  Status = '';
  dataset = [];

  userName: any = '';

  sortingOn = false;
  searchModel = '';
  key: string;

  asc = [];
  desc = [];
  index = '';

  constructor(
    protected appService: AppService,
    private titlecasePipe: TitleCasePipe
  ) {}

  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;

  @ViewChild('customTableItemTemplate1', { static: false })
  protected customTableItemTemplate1: TemplateRef<any>;
  @ViewChild('customTableItemTemplate2', { static: false })
  protected customTableItemTemplate2: TemplateRef<any>;
  @ViewChild('customTableItemTemplate3', { static: false })
  protected customTableItemTemplate3: TemplateRef<any>;

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
        // console.log(initialData);
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
      .GetServiceRequestByCompany(this.appService.myApp)(params)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        this.BerthRequestList = request;
        console.log(this.BerthRequestList);

        this.BerthRequestList.sort((a, b) => {
          return (
            // this.getTimeTest(b.request_date) - this.getTimeTest(a.request_date)
            b.request_date < a.request_date ? -1 : 1
          );
        });

        this.BerthRequestList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();

        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new CustomHeaderItem({ data: 'Request No.' }),
          // new TableHeaderItem({ data: 'Vessel Name' }),
          new TableHeaderItem({ data: 'Date Submit' }),
          new TableHeaderItem({ data: 'Est. Arrival Date' }),
          new TableHeaderItem({ data: 'ETA' }),
          new TableHeaderItem({ data: 'Est. Departure Date' }),
          new TableHeaderItem({ data: 'ETD' }),
          // new TableHeaderItem({ data: 'Last Location' }),
          // new TableHeaderItem({ data: 'Next Location' }),
          new TableHeaderItem({ data: 'Agent' }),
          new TableHeaderItem({ data: 'Status' }),
        ];
      });
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
        this.dataset[i].number,
        this.dataset[i].RequestNo,
        // this.dataset[i].VesselName,
        this.dataset[i].DateSubmit,
        this.dataset[i].EstArrivalDate,
        this.dataset[i].ETA,
        this.dataset[i].EstDepartureDate,
        this.dataset[i].ETD,
        // this.dataset[i].LastLocation,
        // this.dataset[i].NextLocation,
        this.dataset[i].Agent,
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
          if (dataRow[8].toLowerCase().includes('init')) {
            row.push(
              new TableItem({
                data: {
                  RequestNo: this.hasWhiteSpace(dataElement),
                  link: this.hasWhiteSpace2(dataElement),
                },
                title: dataElement,
                template: this.customTableItemTemplate1,
              })
            );
          } else {
            row.push(
              new TableItem({
                data: {
                  RequestNo: this.hasWhiteSpace(dataElement),
                  link: this.hasWhiteSpace2(dataElement),
                },
                title: dataElement,
                template: this.customTableItemTemplate2,
              })
            );
          }
        } else if (index == 8) {
          if (dataElement.toLowerCase().includes('pending')) {
            row.push(
              new TableItem({
                data: dataElement,
                template: this.customTableItemTemplate3,
              })
            );
          } else {
            row.push(
              new TableItem({
                data: dataElement,
              })
            );
          }
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

    this.BerthRequestList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.RequestNo +
        // this.VesselName +
        this.DateSubmit +
        this.EstArrivalDate +
        this.ETA +
        this.EstDepartureDate +
        this.ETD +
        // this.LastLocation +
        // this.NextLocation +
        this.Agent +
        this.Status;
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
      number: index + 1,
      RequestNo: this.RequestNo,
      // VesselName: this.VesselName,
      DateSubmit: this.DateSubmit,
      EstArrivalDate: this.EstArrivalDate,
      ETA: this.ETA,
      EstDepartureDate: this.EstDepartureDate,
      ETD: this.ETD,
      // LastLocation: this.LastLocation,
      // NextLocation: this.NextLocation,
      Agent: this.Agent,
      Status: this.Status,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.request_number) {
      this.RequestNo = value.request_number + ' ' + value.id;
    } else {
      this.RequestNo = 'N/A';
    }
    // if (value.vessel?.name) {
    //   this.VesselName = value.vessel.name;
    // } else {
    //   this.VesselName = 'N/A';
    // }
    if (value.request_date) {
      this.DateSubmit = formatDate(value.request_date, 'dd/MM/yyyy', 'en_US');
    } else {
      this.DateSubmit = 'N/A';
    }
    if (value.arrival_datetime) {
      this.EstArrivalDate = formatDate(
        value.arrival_datetime,
        'dd/MM/yyyy',
        'en_US'
      );
    } else {
      this.EstArrivalDate = 'N/A';
    }
    if (value.arrival_datetime) {
      this.ETA = formatDate(value.arrival_datetime, 'HH:mm', 'en_US');
    } else {
      this.ETA = 'N/A';
    }
    if (value.departure_datetime) {
      this.EstDepartureDate = formatDate(
        value.departure_datetime,
        'dd/MM/yyyy',
        'en_US'
      );
    } else {
      this.EstDepartureDate = 'N/A';
    }
    if (value.departure_datetime) {
      this.ETD = formatDate(value.departure_datetime, 'HH:mm', 'en_US');
    } else {
      this.ETD = 'N/A';
    }
    // if (value.last_location) {
    //   this.LastLocation = value.last_location;
    // } else {
    //   this.LastLocation = 'N/A';
    // }
    // if (value.next_location) {
    //   this.NextLocation = value.next_location;
    // } else {
    //   this.NextLocation = 'N/A';
    // }
    if (value.agent?.name) {
      this.Agent = value.agent.name;
    } else {
      this.Agent = 'N/A';
    }
    if (value.status) {
      // this.Status = this.convertToTitleCase(value.status);
      // this.Status =
      //   typeof value.status === 'string'
      //     ? value.status.replaceAll('_', ' ')
      //     : value.status;
      this.Status = value.status ? value.status.replace(/_/g, ' ') : 'N/A';
      this.Status =
        this.Status == 'SENT' || this.Status == 'VERIFIED'
          ? 'ENDORSED'
          : this.Status;
      this.Status = this.titlecasePipe.transform(this.Status);
    } else {
      this.Status = 'N/A';
    }
  }

  getTimeTest(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
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
      0: 'number',
      1: 'RequestNo',
      // 2: 'VesselName',
      2: 'DateSubmit',
      3: 'EstArrivalDate',
      4: 'ETA',
      5: 'EstDepartureDate',
      6: 'ETD',
      // 8: 'LastLocation',
      // 9: 'NextLocation',
      7: 'Agent',
      8: 'Status',
    };

    if (orientation == 'ASC') {
      if (index === 2) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 2) {
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

  convertToTitleCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }

  hasWhiteSpace(s) {
    let newtext = s.split(/(?<=^\S+)\s/);
    return newtext[0];
  }
  hasWhiteSpace2(s) {
    let newtext = s.split(/(?<=^\S+)\s/);
    return newtext[1];
  }
}
