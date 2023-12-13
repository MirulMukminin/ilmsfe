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
    const stringOne = (one.data.requestNo || one.data).toLowerCase();
    const stringTwo = (two.data.requestNo || two.data).toLowerCase();
    // console.log(one);

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
  selector: 'app-waste-disposal-endorse-list',
  templateUrl: './waste-disposal-endorse-list.component.html',
  styleUrls: ['./waste-disposal-endorse-list.component.scss'],
  providers: [TitleCasePipe],
})
export class WasteDisposalEndorseListComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;
  @Input() transferLocationListModel = new TableModel();
  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  @Input() sortable = true;
  // @Input() model = new PaginationModel();
  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('endorsedDateTemplate', { static: false })
  protected endorsedDateTemplate: TemplateRef<any>;

  active: boolean = false;
  searchValue = '';
  dataset = [];
  wasteDisposalEndorsedList = [];
  requestNumber = '';
  category = '';
  remarks = '';
  // theDate = '';
  // theTime = '';
  endorsedDatetime = '';
  reqType = '';
  location = '';
  status = '';
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;
  companyName = '';

  dictionaryStatus = {
    SUBMITTED: 'Submitted',
    CANCELED: 'Cancelled',
    IN_PROGRESS: 'In Progress',
    PENDING_ENDORSEMENT: 'Pending Endorsement',
    ENDORSED: 'Endorsed',
    CHECKED: 'Checked',
  };

  sortingOn = false;
  searchModel = '';
  key: string;

  constructor(private appService: AppService) {}

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
        this.getRestServiceAPI(initialData.Company);
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

  private getRestServiceAPI(customer: string) {
    const param = { customer };

    restServices.pbksb_WasteDisposalService
      .getEndorsedRequestByCustomer(this.appService.myApp)(param)
      .then((result) => {
        // console.log(result);
        this.wasteDisposalEndorsedList = this.appService.jsonToArray(result);
        // console.log(this.wasteDisposalEndorsedList);
        // console.log(this.transferLocationList[0].transfer_location);
        //default sorting result by jobNo starting from latest
        this.wasteDisposalEndorsedList.sort((a, b) => {
          return b.jobNo.localeCompare(a.jobNo, 'en', { numeric: true });
        });

        this.wasteDisposalEndorsedList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();
        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new CustomHeaderItem({ data: 'Request No.' }),
          new TableHeaderItem({ data: 'Request Type' }),
          new TableHeaderItem({ data: 'Location' }),
          new TableHeaderItem({ data: 'Endorsed Date & Time' }),
          // new TableHeaderItem({ data: 'Time' }),
          new TableHeaderItem({ data: 'Status' }),
        ];
      });
  }

  apiRespValidation(value: any) {
    // console.log(value);
    if (value.jobNo) {
      this.requestNumber = value.jobNo;
    } else {
      this.requestNumber = 'N/A';
    }

    // if (value.remarks) {

    //   this.remarks = value.remarks;
    if (value.type) {
      this.reqType = value.type;
    } else {
      this.reqType = 'N/A';
    }

    if (value.location) {
      this.location = value.location.description;
    } else {
      this.location = 'N/A';
    }

    // if (value.startDate) {
    // this.theDate = formatDate(value.startDate, 'dd/MM/yyyy', 'en_US');
    // } else {
    //   this.theDate = 'N/A';
    // }

    // if (value.startDate) {
    //   this.theTime = formatDate(value.startDate, 'hh:mm', 'en_US');
    // } else {
    //   this.theTime = 'N/A';
    // }

    if (value.endorsedDate) {
      this.endorsedDatetime = value.endorsedDate;
      // this.endorsedDatetime = formatDate(
      //   value.endorsedDate,
      //   'dd/MM/yyyy hh:mm',
      //   'en_US'
      // );
    } else {
      this.endorsedDatetime = 'N/A';
    }

    if (value.status) {
      this.status = this.dictionaryStatus[value.status];
    } else if (!value.status) {
      this.status = value.status;
    } else {
      this.status = 'N/A';
    }
  }

  pushDataSet(index: any) {
    this.dataset.push({
      number: index + 1,
      requestNumber: this.requestNumber,
      type: this.reqType,
      location: this.location,
      // date: this.theDate,
      // time: this.theTime,
      endorsedDatetime: this.endorsedDatetime,
      status: this.status,
    });
  }

  protected prepareData(data: Array<Array<any>>) {
    // console.log(data);
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
        } else if (index == 4) {
          row.push(
            new TableItem({
              data: { endorsedDatetime: dataElement },
              title: formatDate(dataElement, 'dd/MM/yyyy HH:mm:ss', 'en_US'),
              template: this.endorsedDateTemplate,
            })
          );
        } else {
          row.push(new TableItem({ data: dataElement }));
        }
      });

      newData.push(row);
    });

    return newData;
  }

  startPagination() {
    this.model.data = [[]];
    this.model.currentPage = 1;
    this.model.pageLength = 10;
    this.model.totalDataLength = this.dataset.length;
    this.selectPage(this.model.currentPage);
  }

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
        this.dataset[i].requestNumber,
        this.dataset[i].type,
        this.dataset[i].location,
        // this.dataset[i].date,
        // this.dataset[i].time,
        this.dataset[i].endorsedDatetime,
        this.dataset[i].status,
      ]);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(fullPage), 150);
    });
  }

  searchFilter(searchString: string) {
    this.searchValue = searchString;
    this.dataset = [];

    this.wasteDisposalEndorsedList.forEach((value, index) => {
      this.apiRespValidation(value);

      // if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
      const allDataCol =
        this.requestNumber +
        this.reqType +
        this.location +
        // this.theDate +
        // this.theTime +
        this.endorsedDatetime +
        this.status;

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

  getTime(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
  }

  // --------------------custom sorting----------------
  doSort(index: number) {
    this.sortingOn = true;
    this.model.header.forEach((value, i) => {
      if (index != i) {
        value.sorted = false;
        value.ascending = false;
        value.descending = true;
      }
    });
    this.model.header[index].sorted = true;
    if (this.model.header[index].ascending == true) {
      this.model.header[index].ascending = false;
      this.model.header[index].descending = true;
      this.sortFunction(index, 'DESC');
    } else {
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
    // console.log(this.dataset);
    if (orientation === 'ASC') {
      if (index === 1) {
        let sort = {
          1: 'requestNumber',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingJobNo);
      } else if (index === 4) {
        let sort = {
          4: 'endorsedDatetime',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        let sort = {
          0: 'number',
          1: 'requestNumber',
          2: 'type',
          3: 'location',
          5: 'status',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation === 'DESC') {
      if (index === 1) {
        let sort = {
          1: 'requestNumber',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingJobNo).reverse();
      } else if (index === 4) {
        let sort = {
          4: 'endorsedDatetime',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else {
        let sort = {
          0: 'number',
          1: 'requestNumber',
          2: 'type',
          3: 'location',
          5: 'status',
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
      return a[this.key] < b[this.key] ? -1 : 1;
    }
  };

  sortAscendingJobNo = (a, b) => {
    return a[this.key].localeCompare(b[this.key], 'en', { numeric: true });
  };

  // sortAscendingDate = (a, b) => {
  //   //convert string to date to sort
  //   var dateA = a[this.key];
  //   var dateAParts = dateA.split('/');
  //   // month is 0-based, that's why we need dataParts[1] - 1
  //   var dateAConverted = new Date(
  //     +dateAParts[2],
  //     +dateAParts[1] - 1,
  //     +dateAParts[0]
  //   );

  //   var dateB = b[this.key];
  //   var dateBParts = dateB.split('/');
  //   // month is 0-based, that's why we need dataParts[1] - 1
  //   var dateBConverted = new Date(
  //     +dateBParts[2],
  //     +dateBParts[1] - 1,
  //     +dateBParts[0]
  //   );

  //   if (dateAConverted === dateBConverted) {
  //     return 0;
  //   } else {
  //     return dateAConverted < dateBConverted ? -1 : 1;
  //   }
  // };

  sortAscendingDate = (a, b) => {
    // console.log(a);
    return this.getTime(a[this.key]) - this.getTime(b[this.key]);
  };

  clearSearch() {
    this.searchModel = '';
    this.sortingOn = false;
  }
}
