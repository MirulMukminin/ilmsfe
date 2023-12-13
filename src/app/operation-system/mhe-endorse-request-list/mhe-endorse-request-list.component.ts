import { DatePipe, formatDate, TitleCasePipe } from '@angular/common';
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
import * as XLSX from 'xlsx';

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
    const stringOne = (one.data.datesubmit || one.data).toLowerCase();
    const stringTwo = (two.data.datesubmit || two.data).toLowerCase();

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
  selector: 'app-mhe-endorse-request-list',
  templateUrl: './mhe-endorse-request-list.component.html',
  styleUrls: ['./mhe-endorse-request-list.component.scss'],
  providers: [TitleCasePipe],
})
export class MheEndorseRequestListComponent implements OnInit {
  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';

  // Date-picker variable
  range: any;
  rangeDates: any;
  fromDate: any;
  toDate: any;
  datePicker: boolean = false;

  /*name of the excel-file which will be downloaded. */
  fileName = 'MHEEndorsedRequestList.xlsx';

  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() MheEndorsedRequestModel = new TableModel();

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  requestnumber = '';
  booking_type = '';
  datesubmit = '';
  booking_date_start = '';
  booking_date_end = '';
  booking_date = '';
  status = '';

  MheEndorsedRequestList = [];
  dataset = [];
  endorsedRequestList = [];

  sortingOn = false;
  searchModel = '';
  key: string;
  disabledReset: boolean = true;

  constructor(
    protected appService: AppService,
    public datepipe: DatePipe,
    private titlecasePipe: TitleCasePipe
  ) {}

  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;

  ngOnInit(): void {
    this.userInfo();
    // this.getRestQueryAPI('');
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.disabledReset = true;
        this.dataset = [];
        this.getRestQueryAPI(initialData.CustomerCode);
        this.endorsedRequestList = this.dataset;
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
    // this.MheEndorsedRequestList = this.MheEndorsedRequest;

    //fire api and get response data
    restServices.pbksb_CustomerService
      .GetMHEEndorsedRequestList(this.appService.myApp)()
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        this.MheEndorsedRequestList = JSON.parse(requestList);

        // default sorting result by date starting from latest
        this.MheEndorsedRequestList.sort((a, b) => {
          return (
            this.getTimeTest(b.datesubmit) - this.getTimeTest(a.datesubmit)
          );
        });

        this.MheEndorsedRequestList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });
        this.startPagination();
        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new CustomHeaderItem({ data: 'Request No.' }),
          new TableHeaderItem({ data: 'Request Type' }),
          new TableHeaderItem({ data: 'Date Submit' }),
          new TableHeaderItem({ data: 'Booking Date' }),
          new TableHeaderItem({ data: 'Status' }),
        ];
      })
      .catch((err) => {
        console.log(err);
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
        this.dataset[i].booking_type,
        this.dataset[i].datesubmit,
        this.dataset[i].booking_date,
        this.dataset[i].status,
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
              data: { requestnumber: dataElement, link: dataElement },
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

  searchFilter(searchString: string) {
    this.searchValue = searchString;
    this.dataset = [];
    let indexCounter = 0;

    this.MheEndorsedRequestList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.requestnumber +
        this.booking_type +
        this.datesubmit +
        this.booking_date +
        this.status;
      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
          this.pushDataSet(indexCounter);
          this.endorsedRequestList = this.dataset;
          indexCounter++;
        }
      } else {
        this.pushDataSet(index);
        this.endorsedRequestList = this.dataset;
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
      booking_type: this.booking_type,
      datesubmit: this.datesubmit,
      booking_date: this.booking_date,
      status: this.status,
    });

    this.dataset.push();
    this.endorsedRequestList = this.dataset;
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.requestnumber) {
      this.requestnumber = value.requestnumber;
    } else {
      this.requestnumber = 'N/A';
    }
    if (value.booking_type) {
      this.booking_type = value.booking_type;
    } else {
      this.booking_type = 'N/A';
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
      this.booking_date = this.booking_date_start;
      // if (value.booking_date_end) {
      //   this.booking_date_end = formatDate(
      //     value.booking_date_end,
      //     'dd/MM/yyyy',
      //     'en_US'
      //   );
      //   this.booking_date =
      //     this.booking_date_start + ' - ' + this.booking_date_end;
      // } else {
      //   this.booking_date_end = 'N/A';

      //   this.booking_date = this.booking_date_start;
      // }
    } else {
      this.booking_date = 'N/A';
    }
    if (value.status) {
      this.status = this.titlecasePipe.transform(value.status);
    } else {
      this.status = 'N/A';
    }
  }

  getTimeTest(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
  }

  displayRange(range: any) {
    if (range !== undefined) {
      this.dataset = [];
      let i = 0;
      this.MheEndorsedRequestList.forEach((value, index) => {
        this.apiRespValidation(value);

        if (this.datesubmit !== 'N/A') {
          // Convert date submit to dd/mm/yyyy
          var dateParts = this.datesubmit.toString().split('/');
          var dateObject = new Date(
            +dateParts[2],
            +dateParts[1] - 1,
            +dateParts[0]
          );
        } else {
          return;
        }

        const allDataCol = new Date(dateObject);

        if (range[0] && range[1]) {
          // this.datePicker = true;
          if (
            allDataCol >= new Date(range[0]) &&
            allDataCol <= new Date(range[1])
          ) {
            // this.datePicker = true;
            this.pushDataSet(i);
            i++;
          } else {
            // this.datePicker = true;
          }
        } else {
          // this.datePicker = true;
          this.pushDataSet(index);
        }
      });
      this.startPagination();
    }
  }

  valueChange(range: any) {
    this.fromDate = range[0];
    this.toDate = range[1];

    if (this.fromDate || this.toDate) {
      this.disabledReset = false;
    } else {
      // console.log(this.disabledReset);
      if (!this.disabledReset) {
        this.disabledReset = false;
      } else {
        this.disabledReset = true;
      }
    }
  }

  resetDate(range: any) {
    this.fromDate = '';
    this.toDate = '';

    this.dataset = [];
    this.datePicker = false;

    this.MheEndorsedRequestList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol = this.datesubmit;
      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
          this.pushDataSet(index);
        }
      } else {
        this.pushDataSet(index);
      }
    });
    this.startPagination();
  }

  checkDate() {}

  exportexcel() {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  //-----------------------------Custom sorting start ----------------------------------//
  doSort(index: number) {
    this.disabledReset = false;
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
      1: 'requestnumber',
      2: 'booking_type',
      3: 'datesubmit',
      4: 'booking_date',
      5: 'status',
    };

    if (orientation == 'ASC') {
      if (index === 3 || index === 4) {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 3 || index === 4) {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else {
        this.key = sort[index];
        // console.log(this.key);
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

  sortAscendingDate = (a, b) => {
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
    } else if (dateA == 'N/A') {
      return -1;
    } else if (dateB == 'N/A') {
      return 1;
    } else {
      return dateAConverted < dateBConverted ? -1 : 1;
    }
  };
  //-----------------------------Custom sorting end ----------------------------------//
}
