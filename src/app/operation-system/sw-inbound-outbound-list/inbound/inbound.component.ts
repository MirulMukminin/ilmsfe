import { formatDate, TitleCasePipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
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
    const stringOne = (one.data.orderNo || one.data).toLowerCase();
    const stringTwo = (two.data.orderNo || two.data).toLowerCase();

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
  selector: 'app-inbound',
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.scss'],
  providers: [TitleCasePipe],
})
export class InboundComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  inboundList: any = [
    {
      orderNo: 'SW000000010',
      service_type: 'Inbound',
      collection: 'No',
      booking_date: '9/10/2021',
      status: 'Initiated',
    },
    {
      orderNo: 'SW000000009',
      service_type: 'Inbound',
      collection: 'No',
      booking_date: '9/10/2021',
      status: 'In Progress',
    },
    {
      orderNo: 'SW000000008',
      service_type: 'Inbound',
      collection: 'No',
      booking_date: '9/10/2021',
      status: 'Submitted',
    },
    {
      orderNo: 'SW000000007',
      service_type: 'Inbound',
      collection: 'No',
      booking_date: '9/10/2021',
      status: 'Cancelled',
    },
  ];
  dataset = [];

  sortingOn = false;
  searchModel = '';
  key: string;

  //var declarations
  searchValue = '';
  orderNo = '';
  service_type = '';
  collection = '';
  booking_date = '';
  status = '';

  type_dict = {
    INBOUND: 'Inbound',
    OUTBOUND: 'Outbound',
  };

  status_dict = {
    INITIATE: 'INITIATED',
    CANCELED: 'CANCELLED',
    SUBMITTED: 'SUBMITTED',
    IN_PROGRESS: 'IN PROGRESS',
  };
  companyName: string = '';

  //modal
  open = false;

  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;
  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  constructor(
    protected appService: AppService,
    private router: Router,
    private titlecasePipe: TitleCasePipe
  ) {}

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
        this.getRestQueryAPI(initialData.Company);
        this.companyName = initialData.Company;
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

  getRestQueryAPI(Company: string) {
    const params = { customer: Company };
    restServices.pbksb_ScheduledWasteService
      .getInboundRequestsListByCustomer(this.appService.myApp)(params)
      .then((result) => {
        this.inboundList = this.appService.jsonToArray(result);
        this.inboundList.sort((a, b) => {
          return b.jobNo.localeCompare(a.jobNo, 'en', {
            numeric: true,
          });
        });
        this.inboundList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();

        this.model.header = [
          new TableHeaderItem({ data: 'No.', className: 'header1' }),
          new CustomHeaderItem({
            data: 'Services Order No.',
            className: 'header2',
          }),
          new TableHeaderItem({ data: 'Service Type', className: 'header3' }),
          new TableHeaderItem({ data: 'Collection', className: 'header4' }),
          new TableHeaderItem({ data: 'Booking Date', className: 'header5' }),
          new TableHeaderItem({ data: 'Status', className: 'header6' }),
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
        this.dataset[i].orderNo,
        this.dataset[i].service_type,
        this.dataset[i].collection,
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
              data: { orderNo: dataElement, link: dataElement },
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

    //add these to fix bug when relate to custom sorting
    let indexCounter = 0;

    this.inboundList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.orderNo +
        this.service_type +
        this.collection +
        this.booking_date +
        this.status;
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
      orderNo: this.orderNo,
      service_type: this.service_type,
      collection: this.collection,
      booking_date: this.booking_date,
      status: this.status,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    this.orderNo = value.jobNo ? value.jobNo : 'N/A';
    this.service_type = value.type ? this.type_dict[value.type] : 'N/A';
    this.collection = value.collection ? 'Yes' : 'No';
    this.booking_date = value.bookingDate
      ? formatDate(value.bookingDate, 'dd/MM/yyyy', 'en_US')
      : 'N/A';
    this.status = value.status ? this.status_dict[value.status] : 'N/A';
    this.status = this.titlecasePipe.transform(this.status);
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
      1: 'orderNo',
      2: 'service_type',
      3: 'collection',
      4: 'booking_date',
      5: 'status',
    };

    if (orientation == 'ASC') {
      if (index === 4) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 4) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
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
    //convert string to date to sort
    var dateA = a[this.key];
    var dateAParts = dateA.split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateAConverted = new Date(
      +dateAParts[2],
      +dateAParts[1] - 1,
      +dateAParts[0]
    );

    var dateB = b[this.key];
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
  //-----------------------------Custom sorting end ----------------------------------//

  clearSearch() {
    this.searchModel = '';
    this.sortingOn = false;
  }

  // --------------------------Validation for Approved TWG Code----------------------//
  onClickAddNew() {
    var params = { customer: this.companyName };
    restServices.pbksb_ScheduledWasteService
      .getWasteCodeList(this.appService.myApp)(params)
      .then((result) => {
        let arr = this.appService.jsonToArray(result);
        // console.log(arr);
        if (arr.length < 1) {
          this.open = true;
        } else {
          this.router.navigate(['/operation-system/sw-inbound-form']);
        }
      });
  }
}
