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
    const stringOne = (one.data.bod_number || one.data).toLowerCase();
    const stringTwo = (two.data.bod_number || two.data).toLowerCase();

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
  selector: 'app-marine-endorse-bod-list',
  templateUrl: './marine-endorse-bod-list.component.html',
  styleUrls: ['./marine-endorse-bod-list.component.scss'],
  providers: [TitleCasePipe],
})
export class MarineEndorseBodListComponent implements OnInit {
  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';

  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() MarineEndorsedBodModel = new TableModel();

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  vessel = '';
  bod_number = '';
  EstArrivalDate = '';
  ETA = '';
  EstDepartureDate = '';
  ETD = '';
  LogNo = '';
  status = '';
  endorsed_by = '';
  endorsed_date = '';
  companyName = '';

  MarineEndorsedBodList = [];
  dataset = [];
  endorsedBodList = [];

  // Date-picker variable
  range: any;
  rangeDates: any;
  fromDate: any;
  toDate: any;
  datePicker: boolean = false;

  /*name of the excel-file which will be downloaded. */
  fileName = 'MarineEndorsedBODList.xlsx';

  sortingOn = false;
  searchModel = '';
  key: string;
  disabledReset: boolean = true;

  // MarineEndorsedBod = [
  //   {
  //   },
  // ];

  constructor(
    protected appService: AppService,
    private titlecasePipe: TitleCasePipe
  ) {}

  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
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

        this.disabledReset = true;
        this.dataset = [];
        this.getRestQueryAPI(initialData.CustomerCode, initialData.Company);
        this.endorsedBodList = this.dataset;
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

  getRestQueryAPI(customerCode: string, companyName: string) {
    // this.MarineEndorsedBodList = this.MarineEndorsedBod;

    var getCodeView: any = { company: companyName };
    //fire api and get response data
    restServices.pbksb_MarineService
      .GetEndorsedBODListByCompany(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        this.MarineEndorsedBodList = JSON.parse(requestList);

        //default sorting result by date starting from latest
        this.MarineEndorsedBodList.sort((a, b) => {
          return (
            this.getTimeTest(b.est_arrival) - this.getTimeTest(a.est_arrival)
          );
        });
        // this.MarineEndorsedBodList.sort((a, b) => {
        //   return (
        //     this.getTimeTest(b.EstDepartureDate) -
        //     this.getTimeTest(a.EstDepartureDate)
        //   );
        // });

        this.MarineEndorsedBodList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });
        this.startPagination();
        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new TableHeaderItem({ data: 'Vessel' }),
          new CustomHeaderItem({ data: 'BOD No.' }),
          new TableHeaderItem({ data: 'Act. Arrival Date & Time' }),
          // new TableHeaderItem({ data: 'ATA' }),
          new TableHeaderItem({ data: 'Act. Departure Date & Time' }),
          // new TableHeaderItem({ data: 'ATD' }),
          new TableHeaderItem({ data: 'Log No.' }),
          new TableHeaderItem({ data: 'Status' }),
          new TableHeaderItem({ data: 'Endorsed By' }),
          new TableHeaderItem({ data: 'Date Endorsed & Time' }),
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
        this.dataset[i].vessel,
        this.dataset[i].bod_number,
        this.dataset[i].EstArrivalDate,
        // this.dataset[i].ETA,
        this.dataset[i].EstDepartureDate,
        // this.dataset[i].ETD,
        this.dataset[i].LogNo,
        this.dataset[i].status,
        this.dataset[i].endorsed_by,
        this.dataset[i].endorsed_date,
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
        if (index == 2) {
          row.push(
            new TableItem({
              data: { bod_number: dataElement, link: dataElement },
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

    this.MarineEndorsedBodList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.vessel +
        this.bod_number +
        this.EstArrivalDate +
        // this.ETA +
        this.EstDepartureDate +
        // this.ETD +
        this.LogNo +
        this.status +
        this.endorsed_by +
        this.endorsed_date;

      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
          this.pushDataSet(indexCounter);
          this.endorsedBodList = this.dataset;
          indexCounter++;
        }
      } else {
        this.pushDataSet(index);
        this.endorsedBodList = this.dataset;
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
      vessel: this.vessel,
      bod_number: this.bod_number,
      EstArrivalDate: this.EstArrivalDate,
      // ETA: this.ETA,
      EstDepartureDate: this.EstDepartureDate,
      // ETD: this.ETD,
      LogNo: this.LogNo,
      status: this.status,
      endorsed_by: this.endorsed_by,
      endorsed_date: this.endorsed_date,
    });

    this.endorsedBodList = this.dataset;
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.vessel) {
      this.vessel = this.convertToTitleCase(value.vessel.name);
    } else {
      this.vessel = 'N/A';
    }
    if (value.bod_number) {
      this.bod_number = value.bod_number;
    } else {
      this.bod_number = 'N/A';
    }

    if (value.act_arrival) {
      this.EstArrivalDate = formatDate(
        value.act_arrival,
        'dd/MM/yyyy HH:mm:ss',
        'en_US'
      );
      // this.ETA = formatDate(value.est_arrival, 'HH:mm', 'en_US');
    } else {
      this.EstArrivalDate = 'N/A';
      // this.ETA = 'N/A';
    }

    if (value.act_departure) {
      this.EstDepartureDate = formatDate(
        value.act_departure,
        'dd/MM/yyyy HH:mm:ss',
        'en_US'
      );
      // this.ETD = formatDate(value.est_departure, 'HH:mm', 'en_US');
    } else {
      this.EstDepartureDate = 'N/A';
      // this.ETD = 'N/A';
    }
    if (value.status) {
      // this.status = this.convertToTitleCase(value.status);
      this.status = value.status.replace(/_/g, ' ');
      this.status =
        this.status == 'SENT' || this.status == 'VERIFIED'
          ? 'ENDORSED'
          : this.status;
      this.status = this.titlecasePipe.transform(this.status);
    } else {
      this.status = 'N/A';
    }
    if (value.log_number) {
      this.LogNo = value.log_number;
    } else {
      this.LogNo = 'N/A';
    }
    if (value.endorsed_by) {
      this.endorsed_by = this.convertToTitleCase(value.endorsed_by);
    } else {
      this.endorsed_by = 'N/A';
    }
    if (value.endorsed_date) {
      this.endorsed_date = value.endorsed_date;
    } else {
      this.endorsed_date = 'N/A';
    }
    if (value.endorsed_date) {
      this.endorsed_date = formatDate(
        value.endorsed_date,
        'dd/MM/yyyy HH:mm:ss',
        'en_US'
      );
    } else {
      this.endorsed_date = 'N/A';
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
      this.MarineEndorsedBodList.forEach((value, index) => {
        this.apiRespValidation(value);

        // console.log(this.endorsed_date);

        if (this.endorsed_date !== 'N/A') {
          const allDataCol = new Date(this.strToDate(this.endorsed_date));
          // console.log(allDataCol);

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
        } else {
          return;
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

    this.MarineEndorsedBodList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol = this.endorsed_date;
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

  exportexcel() {
    // /* table id is passed over here */
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, this.fileName);

    let fileName = 'Marine Endorsed Request List.xlsx';
    /* pass here the table id */
    let element = document.getElementById('excel-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {
      raw: true,
    });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  strToDate(dtStr: any) {
    // console.log(dtStr);

    if (!dtStr) return null;
    let dateParts = dtStr.split('/');
    let timeParts = dateParts[2].split(' ')[1].split(':');
    dateParts[2] = dateParts[2].split(' ')[0];
    // month is 0-based, that's why we need dataParts[1] - 1
    return new Date(
      +dateParts[2],
      dateParts[1] - 1,
      +dateParts[0],
      timeParts[0],
      timeParts[1],
      timeParts[2]
    );
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
      1: 'vessel',
      2: 'bod_number',
      3: 'EstArrivalDate',
      // 4: 'ETA',
      4: 'EstDepartureDate',
      // 6: 'ETD',
      5: 'LogNo',
      6: 'status',
      7: 'endorsed_by',
      8: 'endorsed_date',
    };

    if (orientation == 'ASC') {
      if (index === 3 || index === 4) {
        this.key = sort[index];
        // this.dataset.sort(this.sortAscendingDate);
        this.dataset.sort(this.sortAscendingDate1);
      } else if (index === 10) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate1);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 3 || index === 4) {
        this.key = sort[index];
        // this.dataset.sort(this.sortAscendingDate).reverse();
        this.dataset.sort(this.sortAscendingDate1).reverse();
      } else if (index === 10) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate1).reverse();
      } else {
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

  sortAscendingDate = (a, b) => {
    // console.log(this.key);

    //convert string to date to sort
    if (a[this.key] != 'N/A') {
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

    if (b[this.key] != 'N/A') {
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

  sortAscendingDate1 = (a, b) => {
    // console.log(this.key);
    let dateA, dateB;
    //convert string to date to sort
    if (a[this.key] != 'N/A') {
      dateA = a[this.key];
    } else {
      dateA = '01/01/2000 00:00:00';
    }
    // console.log('dateA', dateA);

    // var dateAParts = dateA.split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    // var dateAConverted = new Date(
    //   +dateAParts[2],
    //   +dateAParts[1] - 1,
    //   +dateAParts[0]
    // );

    var dateAParts = dateA.split(' ');
    var date_A = dateAParts[0].split('/');
    var timeA = dateAParts[1].split(':');
    var ddA = date_A[0];
    var mmA = date_A[1] - 1;
    var yyA = date_A[2];
    var hhA = timeA[0];
    var minA = timeA[1];
    var ssA = timeA[2];
    // console.log(typeof yyA);

    var dateAConverted = new Date(yyA, mmA - 1, ddA, hhA, minA, ssA);

    // console.log('dateAConverted', dateAConverted);

    if (b[this.key] != 'N/A') {
      dateB = b[this.key];
    } else {
      dateB = '01/01/2000 00:00:00';
    }
    // console.log('dateB', dateB);
    // var dateBParts = dateB.split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    // var dateBConverted = new Date(
    //   +dateBParts[2],
    //   +dateBParts[1] - 1,
    //   +dateBParts[0]
    // );

    var dateBParts = dateB.split(' ');
    var date_B = dateBParts[0].split('/');
    var timeB = dateBParts[1].split(':');
    var ddB = date_B[0];
    var mmB = date_B[1] - 1;
    var yyB = date_B[2];
    var hhB = timeB[0];
    var minB = timeB[1];
    var ssB = timeB[2];
    // console.log(typeof yyB);

    var dateBConverted = new Date(yyB, mmB - 1, ddB, hhB, minB, ssB);

    // console.log(dateBConverted);

    if (dateAConverted === dateBConverted) {
      return 0;
    } else {
      return dateAConverted < dateBConverted ? -1 : 1;
    }
  };
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
