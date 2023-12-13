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
import { Agent } from 'entities/pbksb_Agent';
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
  selector: 'app-icw-as-endorsed-list',
  templateUrl: './icw-as-endorsed-list.component.html',
  styleUrls: ['./icw-as-endorsed-list.component.scss'],
  providers: [TitleCasePipe],
})
export class IcwAsEndorsedListComponent implements OnInit {
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
  @ViewChild('customTableItemTemplate1', { static: false })
  protected customTableItemTemplate1: TemplateRef<any>;

  dictionaryStatus = {
    INITIATED: 'INITIATED',
    CANCELLED: 'CANCELLED',
    IN_PROGRESS: 'IN PROGRESS',
    PENDING_ENDORSEMENT: 'PENDING ENDORSEMENT',
    ENDORSED: 'ENDORSED',
    CHECKED: 'CHECKED',
  };

  active: boolean = false;
  searchValue = '';
  dataset = [];
  goodsRecievingRequestList = [];
  requestNumber = '';
  agent: Agent;
  category = '';
  remarks = '';
  theDate = '';
  theTime = '';
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;
  companyName = '';
  requestType = '';
  status = '';

  searchModel = '';
  sortingOn = false;
  key: string;

  constructor(
    private appService: AppService,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.userInfo();
    console.log('this.dataset in ngOnit');
    console.log(this.dataset);
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
        this.appService.terminateSession();
      });
  }

  private getRestServiceAPI(customer: string) {
    const param = { customer };

    restServices.pbksb_ICWAddSRestService
      .getEndorsedASRequestsByCustomer(this.appService.myApp)(param)
      .then((result) => {
        this.goodsRecievingRequestList = this.appService.jsonToArray(result);
        // default sorting on JobNo from latest
        this.goodsRecievingRequestList.sort((a, b) => {
          return b.docketNo - a.docketNo;
        });

        this.goodsRecievingRequestList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });
        console.log('this.dataset == ');
        console.log(this.dataset);

        this.startPagination();
      });
    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      new CustomHeaderItem({ data: 'Request No.' }),
      new TableHeaderItem({ data: 'Customer' }),
      new TableHeaderItem({ data: 'PACs Representative' }),
      new TableHeaderItem({ data: 'Date' }),
      new TableHeaderItem({ data: 'Time' }),
      new TableHeaderItem({ data: 'Status' }),
    ];
  }

  apiRespValidation(value: any) {
    if (value.docketNo) {
      this.requestNumber = value.docketNo;
    } else {
      this.requestNumber = 'N/A';
    }

    console.log('value.customer==');
    console.log(value.customer);

    if (value.customer) {
      this.companyName = value.customer.name;
    } else {
      this.companyName = null;
    }

    if (value.agent) {
      this.agent = value.agent;
    } else {
      this.agent = null;
    }

    let parsedDate = Date.parse(value.requestDate);
    if (isNaN(value.requestDate) && !isNaN(parsedDate)) {
      this.theDate = formatDate(value.requestDate, 'dd/MM/yyyy', 'en_US');
    } else {
      this.theDate = 'N/A';
    }

    if (isNaN(value.requestDate) && !isNaN(parsedDate)) {
      this.theTime = formatDate(value.requestDate, 'hh:mm', 'en_US');
    } else {
      this.theTime = 'N/A';
    }

    if (value.status) {
      this.status = this.dictionaryStatus[value.status];
    } else if (!value.status) {
      this.status = value.status;
    } else {
      this.status = 'N/A';
    }
    this.status = this.titlecasePipe.transform(this.status);
  }

  pushDataSet(index: any) {
    console.log('this.agent from push data set');
    console.log(this.agent);
    this.dataset.push({
      number: index + 1,
      requestNumber: this.requestNumber,
      customer: this.companyName,
      agent: this.agent?.name,
      date: this.theDate,
      time: this.theTime,
      status: this.status,
    });
  }

  protected prepareData(data: Array<Array<any>>) {
    // create new data from the service data
    let newData = [];
    console.log('data = from prepare');
    console.log(data);
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
          if (dataElement == 'Pending Endorsement') {
            row.push(
              new TableItem({
                data: dataElement,
                template: this.customTableItemTemplate1,
              })
            );
          } else {
            row.push(new TableItem({ data: dataElement }));
          }
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

      console.log('data from selectPage ==');
      console.log(data);
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
        this.dataset[i].customer,
        this.dataset[i].agent,
        this.dataset[i].date,
        this.dataset[i].time,
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

    this.goodsRecievingRequestList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.requestNumber +
        this.companyName +
        this.agent.name +
        this.theDate +
        this.theTime +
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

  //-------custom sorting------------
  doSort(index: number) {
    this.sortingOn = true;
    console.log(this.model.header);
    console.log(index);
    //reset sorted state for header that is not selected
    this.model.header.forEach((value, i) => {
      if (index != i) {
        value.sorted = false;
        //reset default orientation
        value.ascending = false;
        value.descending = true;
      }
    });

    // set selected header to sorted
    this.model.header[index].sorted = true;
    if (this.model.header[index].ascending == true) {
      // set sort icon to desc
      this.model.header[index].ascending = false;
      this.model.header[index].descending = true;
      // sort function
      this.sortFunction(index, 'DESC');
    } else {
      // set sort icon to asc
      this.model.header[index].ascending = true;
      this.model.header[index].descending = false;
      // sort function
      this.sortFunction(index, 'ASC');
    }
    console.log(this.dataset);
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
      1: 'requestNumber',
      2: 'type',
      3: 'agents',
      4: 'date',
      5: 'time',
      6: 'status',
    };
    if (orientation === 'ASC') {
      if (index === 1) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingJobNo);
      } else if (index === 4) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation === 'DESC') {
      if (index === 1) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingJobNo).reverse();
      } else if (index === 4) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal).reverse();
      }
    }
  }

  sortAscendingNormal = (a, b) => {
    console.log(a);
    console.log(b);
    if (a[this.key] === b[this.key]) {
      return 0;
    } else {
      return a[this.key] < b[this.key] ? -1 : 1;
    }
  };

  sortAscendingJobNo = (a, b) => {
    return a[this.key]
      .toString()
      .localeCompare(b[this.key].toString(), 'en', { numeric: true });
  };

  sortAscendingDate = (a, b) => {
    var dateA = a[this.key];
    var dateAParts = dateA.split('/');
    var dateAConverted = new Date(
      +dateAParts[2],
      +dateAParts[1] - 1,
      +dateAParts[0]
    );

    var dateB = b[this.key];
    var dateBParts = dateB.split('/');
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
    this.dataset = [];
  }
}
