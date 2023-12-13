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
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
  providers: [TitleCasePipe],
})
export class SellerComponent implements OnInit {
  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;

  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;
  @Input() sortable = true;

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  sellerRequestList = [];
  searchValue = '';
  requestNo = '';
  buyer = '';
  invoiceNumber = '';
  saleDate = '';
  category = '';
  submitDate = '';
  status = '';
  dataset = [];
  companyName = '';

  sortingOn = false;
  searchModel = '';
  key: string;

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';

  constructor(
    private appService: AppService,
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

        //console.log(initialData);
        this.companyName = initialData.Company;
        this.dataset = [];
        this.getRestServiceAPI();
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

  getRestServiceAPI() {
    const params = { company: this.companyName };
    restServices.pbksb_PSBService
      .GetTransferOwnershipRequestList(this.appService.myApp)(params)
      .then((result) => {
        const resArr: any = result;
        const requestList = JSON.parse(resArr);
        this.sellerRequestList = requestList;

        this.sellerRequestList.sort((a, b) => {
          return this.getTimeTest(b.createTs) - this.getTimeTest(a.createTs);
        });

        this.sellerRequestList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();

        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new CustomHeaderItem({ data: 'Request No' }),
          new TableHeaderItem({ data: 'Buyer' }),
          new TableHeaderItem({ data: 'Invoice Number' }),
          new TableHeaderItem({ data: 'Sale Date' }),
          new TableHeaderItem({ data: 'Category' }),
          new TableHeaderItem({ data: 'Submit Date' }),
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
        this.dataset[i].requestNo,
        this.dataset[i].buyer,
        this.dataset[i].invoiceNumber,
        this.dataset[i].saleDate,
        this.dataset[i].category,
        this.dataset[i].submitDate,
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
              data: { requestNo: dataElement, link: dataElement },
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
  // // ---- end functions used in pagination ---- //

  // /*search filter*/
  searchFilter(searchString: string) {
    this.searchValue = searchString;
    this.dataset = [];
    let indexCounter = 0;

    this.sellerRequestList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.requestNo +
        this.buyer +
        this.invoiceNumber +
        this.saleDate +
        this.category +
        this.submitDate +
        this.status;
      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
          // this.pushDataSet(index);
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
      requestNo: this.requestNo,
      buyer: this.buyer,
      invoiceNumber: this.invoiceNumber,
      saleDate: this.saleDate,
      category: this.category,
      submitDate: this.submitDate,
      status: this.status,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.request_no) {
      this.requestNo = value.request_no;
    } else {
      this.requestNo = 'N/A';
    }

    if (value.buyer.code) {
      this.buyer = value.buyer.code;
    } else {
      this.buyer = 'N/A';
    }

    if (value.invoice_no) {
      this.invoiceNumber = value.invoice_no;
    } else {
      this.invoiceNumber = 'N/A';
    }

    if (value.selling_date) {
      this.saleDate = formatDate(value.selling_date, 'dd/MM/yyyy', 'en_US');
    } else {
      this.saleDate = 'N/A';
    }

    if (value.category) {
      this.category = value.category;
    } else {
      this.category = 'N/A';
    }
    if (value.status) {
      this.status = value.status.replace(/_/g, ' ');
      this.status = this.titlecasePipe.transform(this.status);
    } else {
      this.status = 'N/A';
    }

    if (value.createTs) {
      this.submitDate = formatDate(value.createTs, 'dd/MM/yyyy', 'en_US');
    } else {
      this.submitDate = 'N/A';
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
      1: 'requestNo',
      2: 'buyer',
      3: 'invoiceNumber',
      4: 'saleDate',
      5: 'category',
      6: 'submitDate',
      7: 'status',
    };

    if (orientation == 'ASC') {
      if (index === 4 || index === 6) {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 4 || index === 6) {
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
}
