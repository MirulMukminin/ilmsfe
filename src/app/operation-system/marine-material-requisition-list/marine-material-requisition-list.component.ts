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
  selector: 'app-marine-material-requisition-list',
  templateUrl: './marine-material-requisition-list.component.html',
  styleUrls: ['./marine-material-requisition-list.component.scss'],
  providers: [TitleCasePipe],
})
export class MarineMaterialRequisitionListComponent implements OnInit {
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
  RequestNo = '';
  RequestRef = '';
  VesselName = '';
  Status = '';
  Location = '';

  DateSubmit = '';
  EstArrivalDate = '';
  ETA = '';
  EstDepartureDate = '';
  ETD = '';
  LastLocation = '';
  NextLocation = '';
  Agent = '';
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
      .GetBerthMaterialRequisitionByCompany(this.appService.myApp)(params)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        this.BerthRequestList = request.List;

        console.log(this.BerthRequestList);

        if (this.BerthRequestList.length > 0) {
          this.BerthRequestList.sort((a, b) => {
            return (
              // this.getTimeTest(b.date) - this.getTimeTest(a.date)
              b.material_requisition_no < a.material_requisition_no ? -1 : 1
            );
          });

          this.BerthRequestList.forEach((value, index) => {
            this.apiRespValidation(value);
            this.pushDataSet(index);
          });
        }

        this.startPagination();

        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new CustomHeaderItem({ data: 'Request No.' }),
          new TableHeaderItem({ data: 'Request Ref.' }),
          new TableHeaderItem({ data: 'Date Submit' }),
          new TableHeaderItem({ data: 'Vessel Name' }),
          new TableHeaderItem({ data: 'Location' }),
          // new TableHeaderItem({ data: 'Agent' }),
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
        this.dataset[i].RequestRef,
        this.dataset[i].DateSubmit,
        this.dataset[i].VesselName,
        this.dataset[i].Location,
        // this.dataset[i].Agent,
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
          if (dataRow[6].toLowerCase().includes('init')) {
            row.push(
              new TableItem({
                data: { RequestNo: dataElement, link: dataElement },
                title: dataElement,
                template: this.customTableItemTemplate1,
              })
            );
          } else {
            row.push(
              new TableItem({
                data: { RequestNo: dataElement, link: dataElement },
                title: dataElement,
                template: this.customTableItemTemplate2,
              })
            );
          }
        } else if (index == 6) {
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
        this.RequestRef +
        this.DateSubmit +
        this.VesselName +
        this.Location +
        // this.Agent +
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
      RequestRef: this.RequestRef,
      VesselName: this.VesselName,
      DateSubmit: this.DateSubmit,
      Location: this.Location,
      // Agent: this.Agent,
      Status: this.Status,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.material_requisition_no) {
      this.RequestNo = value.material_requisition_no;
    } else {
      this.RequestNo = 'N/A';
    }

    if (value.request_ref) {
      this.RequestRef = value.request_ref;
    } else {
      this.RequestRef = 'N/A';
    }

    if (value.vessel) {
      this.VesselName = value.vessel;
    } else {
      this.VesselName = 'N/A';
    }

    if (value.location) {
      this.Location = value.location;
    } else {
      this.Location = 'N/A';
    }

    if (value.date) {
      let newFullDate = value.date.replace('MYT', '');
      let date = newFullDate.slice(4, 10);
      let year = newFullDate.slice(21, 25);

      let newDate = date + ' ' + year;

      this.DateSubmit = formatDate(newDate, 'dd/MM/yyyy', 'en_US');
    } else {
      this.DateSubmit = 'N/A';
    }

    // if (value.agent?.name) {
    //   this.Agent = value.agent.name;
    // } else {
    //   this.Agent = 'N/A';
    // }
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
      2: 'RequestRef',
      3: 'DateSubmit',
      4: 'VesselName',
      5: 'Location',
      // 10: 'Agent',
      6: 'Status',
    };

    if (orientation == 'ASC') {
      if (index === 3) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 3) {
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
}
