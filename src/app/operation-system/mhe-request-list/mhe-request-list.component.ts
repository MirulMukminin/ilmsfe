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
import { restQueries } from 'queries';
import { AppService } from '../../app.service';

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
    const stringOne = (one.data.requestNo || one.data).toLowerCase();
    const stringTwo = (two.data.requestNo || two.data).toLowerCase();

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
  selector: 'app-mhe-request-list',
  templateUrl: './mhe-request-list.component.html',
  styleUrls: ['./mhe-request-list.component.scss'],
  providers: [TitleCasePipe],
})
export class MheRequestListComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() MHErequestListModel = new TableModel();

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  @Input() sortable = true;

  MHErequestList = [];

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  requestservicetype = '';
  requestBy = '';
  datesubmit = '';
  booking_date_start = '';
  booking_date_end = '';
  booking_date = '';
  requeststatus = '';
  requestnumber = '';
  dataset = [];
  sortingOn = false;
  searchModel = '';
  key: string;

  asc = [];
  desc = [];
  index = '';

  userName: any = '';

  constructor(
    protected appService: AppService,
    private titlecasePipe: TitleCasePipe
  ) {}

  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('customStatus', { static: false })
  protected customStatus: TemplateRef<any>;
  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;

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
        this.getRestQueryAPI(initialData.CustomerCode);
        //console.log(initialData);
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

  getRestQueryAPI(customerCode: string) {
    //console.log("customercode: " + customerCode);

    var getCodeView: any = { code: customerCode, view: 'requestform-view' };

    //fire api and get response data
    restQueries.Requestform.MHE_ListRequestForm(this.appService.myApp)(
      getCodeView
    ).then((result) => {
      this.MHErequestList = result;
      //default sorting result by date starting from latest
      this.MHErequestList.sort((a, b) => {
        return this.getTimeTest(b.datesubmit) - this.getTimeTest(a.datesubmit);
      });

      this.MHErequestList.forEach((value, index) => {
        this.apiRespValidation(value);
        this.pushDataSet(index);
      });

      this.startPagination();
      //generate header item for table
      this.model.header = [
        new TableHeaderItem({ data: 'No.' }),
        new CustomHeaderItem({
          data: 'Request No.',
        }),
        new TableHeaderItem({ data: 'Request Type' }),
        new TableHeaderItem({ data: 'Request By'}),
        new TableHeaderItem({ data: 'Date Submitted' }),
        new TableHeaderItem({ data: 'Booking Date' }),
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
        this.dataset[i].requestnumber,
        this.dataset[i].requestservicetype,
        this.dataset[i].requestBy,
        this.dataset[i].datesubmit,
        this.dataset[i].booking_date,
        this.dataset[i].requeststatus,
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
              data: { requestNo: dataElement, link: dataElement },
              title: dataElement,
              template: this.customTableItemTemplate,
            })
          );
        } else if (index == 6) {
          row.push(
            new TableItem({
              data: { requeststatus: dataElement },
              title: dataElement,
              template: this.customStatus,
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

    //add these to fix bug when relate to custom sorting
    let indexCounter = 0;

    this.MHErequestList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.requestnumber +
        this.requestservicetype +
        this.requestBy +
        this.datesubmit +
        this.booking_date +
        this.requeststatus;
      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
          //add these to fix bug when relate to custom sorting
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
      requestnumber: this.requestnumber,
      requestservicetype: this.requestservicetype,
      requestBy: this.requestBy,
      datesubmit: this.datesubmit,
      booking_date: this.booking_date,
      requeststatus: this.requeststatus,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.requestnumber) {
      this.requestnumber = value.requestnumber;
    } else {
      this.requestnumber = 'N/A';
    }
    if (value.requestservicetype) {
      this.requestservicetype = value.requestservicetype;
    } else {
      this.requestservicetype = 'N/A';
    }

    if(value.request_by && value.request_by.fullname) {
      this.requestBy = value.request_by.fullname;
    } else {
      this.requestBy = value.createdBy;
    }
    if (value.datesubmit) {
      this.datesubmit = formatDate(value.datesubmit, 'dd/MM/yyyy', 'en_US');
    } else {
      this.datesubmit = 'N/A';
    }
    if (value.booking_date_start) {
      this.booking_date_start = formatDate(
        value.booking_date_start,
        'dd/MM/yyyy',
        'en_US'
      );

      if (value.booking_date_end > value.booking_date_start) {
        this.booking_date_end = formatDate(
          value.booking_date_end,
          'dd/MM/yyyy',
          'en_US'
        );
        this.booking_date =
          this.booking_date_start + ' - ' + this.booking_date_end;
      } else {
        this.booking_date_end = 'N/A';
        this.booking_date = this.booking_date_start;
      }
    } else {
      this.booking_date = 'N/A';
    }
    if (value.status) {
      this.requeststatus = this.titlecasePipe.transform(
        value.status.replace(/_/g, ' ')
      );
    } else {
      this.requeststatus = 'N/A';
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
    if (orientation == 'ASC') {
      if (index === 3 || index === 4) {
        let sort = {
          3: 'datesubmit',
          4: 'booking_date',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        let sort = {
          0: 'number',
          1: 'requestnumber',
          2: 'requestservicetype',
          5: 'requeststatus',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 3 || index === 4) {
        let sort = {
          3: 'datesubmit',
          4: 'booking_date',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else {
        let sort = {
          0: 'number',
          1: 'requestnumber',
          2: 'requestservicetype',
          5: 'requeststatus',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal).reverse();
      }
    }
  }

  sortAscendingNormal = (a, b) => {
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

  // sortAscendingDate = (a, b) => {
  //   //convert string to date to sort
  //   var dateA = a[this.key];
  //   var dateB = b[this.key];
  //   if (dateA == 'N/A' && dateB == 'N/A') {
  //     if (a[this.key] === b[this.key]) {
  //       return 0;
  //     } else {
  //       return a[this.key] < b[this.key] ? -1 : 1;
  //     }
  //   }

  //   var GeneralDateA = dateA.split(' - ');
  //   var GeneralDateB = dateB.split(' - ');

  //     var dateAParts = GeneralDateA[0].split('/');
  //     // month is 0-based, that's why we need dataParts[1] - 1
  //     var dateAConverted = new Date(
  //       +dateAParts[2],
  //       +dateAParts[1] - 1,
  //       +dateAParts[0]
  //     );

  //     var dateBParts = GeneralDateB[0].split('/');
  //     // month is 0-based, that's why we need dataParts[1] - 1
  //     var dateBConverted = new Date(
  //       +dateBParts[2],
  //       +dateBParts[1] - 1,
  //       +dateBParts[0]
  //     );

  //     if (dateAConverted === dateBConverted) {
  //       return 0;
  //     }
  //      else {
  //       return dateAConverted < dateBConverted ? -1 : 1;
  //     }
  // };
  sortAscendingDate = (a, b) => {
    //convert string to date to sort
    var dateA = a[this.key];
    var dateB = b[this.key];

    var GeneralDateA = dateA.split(' - ');
    var GeneralDateB = dateB.split(' - ');

    var dateAParts = GeneralDateA[0].split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateAConverted = new Date(
      +dateAParts[2],
      +dateAParts[1] - 1,
      +dateAParts[0]
    );

    var dateBParts = GeneralDateB[0].split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateBConverted = new Date(
      +dateBParts[2],
      +dateBParts[1] - 1,
      +dateBParts[0]
    );
    // if (dateA == 'N/A' || dateB == 'N/A') {
    //   return 0;
    // }

    if (dateAConverted === dateBConverted) {
      return 0;
    } else if (dateA == 'N/A') {
      return -1;
    } else if (dateB == 'N/A') {
      return 1;
    } else {
      return dateAConverted < dateBConverted ? -1 : 1;
    }
  };
  //-----------------------------Custom sorting end ----------------------------------//
  clearSearch() {
    this.searchModel = '';
    this.sortingOn = false;
    this.asc[this.index] = false;
    this.desc[this.index] = false;
    // document.getElementById('header' + this.index).classList.remove('toggle');
  }
}
