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
  selector: 'app-goods-out',
  templateUrl: './goods-out.component.html',
  styleUrls: ['./goods-out.component.scss'],
  providers: [TitleCasePipe],
})
export class GoodsOutComponent implements OnInit {
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

  goodsOutList = [];
  dataset = [];
  sortingOn = false;
  searchModel = '';
  key: string;

  //var declarations
  searchValue = '';
  formType = '';
  regNo = '';
  formRefNo = '';
  moveDate = '';
  transactionType = '';
  destination = '';
  status = '';

  //dummy data
  // goodsOut = [
  //   {
  //     formType: 'T15030001221',
  //     regNo: '',
  //     moveDate: '16/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Warehouse #1',
  //     invoiceNo: '123548777',
  //     goodsDescrip: 'Crossover, Sub W/UPR Plug PR …',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Approved"

  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: '',
  //     moveDate: '16/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Warehouse #2',
  //     invoiceNo: '123548772',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: '',
  //     moveDate: '16/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Warehouse #3',
  //     invoiceNo: '123548777',
  //     goodsDesc: 'Crossover, Sub W/UPR Plug PR …',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548774',
  //     goodsDesc: 'Crossover, Sub W/UPR Plug PR …',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "In Progress"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "In Progress"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Approved"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Approved"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   },
  //   {
  //     formType: 'T15030001221',
  //     regNo: 'X15012548882',
  //     moveDate: '14/02/2012',
  //     consignor: 'Advance Tech Sdn Bhd',
  //     storage: 'Location X',
  //     invoiceNo: '123548732',
  //     goodsDesc: 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus.',
  //     quantity: "10",
  //     rmValue: "30,000.00",
  //     uom: "UOM",
  //     totalValue: "14,050.00",
  //     status: "Initiated"
  //   }
  // ]

  @ViewChild('customTableItemTemplate1', { static: false })
  protected customTableItemTemplate1: TemplateRef<any>;
  @ViewChild('customTableItemTemplate2', { static: false })
  protected customTableItemTemplate2: TemplateRef<any>;
  @ViewChild('customTableItemTemplate3', { static: false })
  protected customTableItemTemplate3: TemplateRef<any>;
  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;

  constructor(
    protected appService: AppService,
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
    var apiParam: any = { company: Company };

    //fire api and get response data
    restServices.pbksb_PSBService
      .GetGoodOutListByCustomer(this.appService.myApp)(apiParam)
      .then((result) => {
        //this.goodsOutList = this.goodsOut;
        let resArr: any = result;
        this.goodsOutList = JSON.parse(resArr);
        //default sorting result by date starting from latest
        this.goodsOutList.sort((a, b) => {
          return (
            this.getTimeTest(b.request_date) - this.getTimeTest(a.request_date)
          );
        });

        this.goodsOutList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });
        this.startPagination();
      });
    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      //new TableHeaderItem({ data: 'Form Ref. No.' }),
      new CustomHeaderItem({
        data: 'Request No.',
      }),
      new TableHeaderItem({ data: 'Form Type' }),
      new TableHeaderItem({ data: 'Form No.' }),
      new TableHeaderItem({ data: 'Move Date' }),
      new TableHeaderItem({ data: 'Transaction Type' }),
      new TableHeaderItem({ data: 'Destination' }),
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
        this.dataset[i].number,
        this.dataset[i].formRefNo,
        this.dataset[i].formType,
        this.dataset[i].regNo,
        this.dataset[i].moveDate,
        this.dataset[i].transactionType,
        this.dataset[i].destination,
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
          if (dataRow[7] == 'Initiated') {
            row.push(
              new TableItem({
                data: { requestNo: dataElement, link: dataElement },
                title: dataElement,
                template: this.customTableItemTemplate1,
              })
            );
          } else {
            row.push(
              new TableItem({
                data: { requestNo: dataElement, link: dataElement },
                title: dataElement,
                template: this.customTableItemTemplate2,
              })
            );
          }
        } else if (index == 7) {
          if (dataElement == 'Pending Approval') {
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
    //add these to fix bug when relate to custom sorting
    let indexCounter = 0;

    this.goodsOutList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.formRefNo +
        this.formType +
        this.regNo +
        this.moveDate +
        this.transactionType +
        this.destination +
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
      formRefNo: this.formRefNo,
      formType: this.formType,
      regNo: this.regNo,
      moveDate: this.moveDate,
      transactionType: this.transactionType,
      destination: this.destination,
      status: this.status,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.reference_no) {
      this.formRefNo = value.reference_no;
    } else {
      this.formRefNo = 'N/A';
    }
    if (value.form_type) {
      this.formType = value.form_type;
    } else {
      this.formType = 'N/A';
    }
    if (value.registration_no) {
      this.regNo = value.registration_no;
    } else {
      this.regNo = 'N/A';
    }
    if (value.move_date) {
      this.moveDate = formatDate(value.move_date, 'dd/MM/yyyy', 'en_US');
    } else {
      this.moveDate = 'N/A';
    }
    if (value.transaction_type) {
      this.transactionType = value.transaction_type;
    } else {
      this.transactionType = 'N/A';
    }
    if (value.destinantion) {
      this.destination = value.destinantion;
    } else {
      this.destination = 'N/A';
    }
    if (value.status) {
      this.status = value.status.replace(/_/g, ' ');
      this.status = this.titlecasePipe.transform(this.status);
    } else {
      this.status = 'N/A';
    }
  }

  getTimeTest(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
  }
  //-----------------------------Custom sorting start ----------------------------------//
  /* doSort(index: number) {
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
    if (this.model.header[index].ascending == true) {
      //set sort icon to descending
      this.model.header[index].ascending = false;
      this.model.header[index].descending = true;
      this.sortFunction(index, 'DESC');
    } else {
      //set sort icon to ascending
      this.model.header[index].ascending = true;
      this.model.header[index].descending = false;
      this.sortFunction(index, 'ASC');
    }
    //reset the value for number column only for besides number column
    if (index != 0) {
      this.dataset.forEach((value, index) => {
        value.number = index + 1;
      });
    }

    this.startPagination();
  }
  sortFunction(index: number, orientation: any) {
    if (orientation == 'ASC') {
      switch (index) {
        case 0:
          this.dataset.sort(this.sortAscendingIndex0);
          break;
        case 1:
          this.dataset.sort(this.sortAscendingIndex1);
          break;
        case 2:
          this.dataset.sort(this.sortAscendingIndex2);
          break;
        case 3:
          this.dataset.sort(this.sortAscendingIndex3);
          break;
        case 4:
          this.dataset.sort(this.sortAscendingIndex4);
          break;
        case 5:
          this.dataset.sort(this.sortAscendingIndex5);
          break;
        case 6:
          this.dataset.sort(this.sortAscendingIndex6);
          break;
        case 7:
          this.dataset.sort(this.sortAscendingIndex7);
          break;
        default:
      }
    } else if (orientation == 'DESC') {
      switch (index) {
        case 0:
          this.dataset.sort(this.sortAscendingIndex0).reverse();
          break;
        case 1:
          this.dataset.sort(this.sortAscendingIndex1).reverse();
          break;
        case 2:
          this.dataset.sort(this.sortAscendingIndex2).reverse();
          break;
        case 3:
          this.dataset.sort(this.sortAscendingIndex3).reverse();
          break;
        case 4:
          this.dataset.sort(this.sortAscendingIndex4).reverse();
          break;
        case 5:
          this.dataset.sort(this.sortAscendingIndex5).reverse();
          break;
        case 6:
          this.dataset.sort(this.sortAscendingIndex6).reverse();
          break;
        case 7:
          this.dataset.sort(this.sortAscendingIndex7).reverse();
          break;
        default:
      }
    }
  }

  sortAscendingIndex0(a, b) {
    if (a['number'] === b['number']) {
      return 0;
    } else {
      return a['number'] < b['number'] ? -1 : 1;
    }
  }
  sortAscendingIndex1(a, b) {
    if (a['formRefNo'] === b['formRefNo']) {
      return 0;
    } else {
      return a['formRefNo'] < b['formRefNo'] ? -1 : 1;
    }
  }
  sortAscendingIndex2(a, b) {
    if (a['formType'] === b['formType']) {
      return 0;
    } else {
      return a['formType'] < b['formType'] ? -1 : 1;
    }
  }
  sortAscendingIndex3(a, b) {
    if (a['regNo'] === b['regNo']) {
      return 0;
    } else {
      return a['regNo'] < b['regNo'] ? -1 : 1;
    }
  }
  sortAscendingIndex4(a, b) {
    var dateA = a['moveDate'];
    var dateAParts = dateA.split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateAConverted = new Date(
      +dateAParts[2],
      +dateAParts[1] - 1,
      +dateAParts[0]
    );

    var dateB = b['moveDate'];
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
  }
  sortAscendingIndex5(a, b) {
    if (a['transactionType'] === b['transactionType']) {
      return 0;
    } else {
      return a['transactionType'] < b['transactionType'] ? -1 : 1;
    }
  }
  sortAscendingIndex6(a, b) {
    if (a['destination'] === b['destination']) {
      return 0;
    } else {
      return a['destination'] < b['destination'] ? -1 : 1;
    }
  }
  sortAscendingIndex7(a, b) {
    if (a['status'] === b['status']) {
      return 0;
    } else {
      return a['status'] < b['status'] ? -1 : 1;
    }
  }
  */
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
      if (index === 4) {
        let sort = {
          4: 'moveDate',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        let sort = {
          0: 'number',
          1: 'formRefNo',
          2: 'formType',
          3: 'regNo',
          5: 'transactionType',
          6: 'destination',
          7: 'status',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 4) {
        let sort = {
          4: 'moveDate',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else {
        let sort = {
          0: 'number',
          1: 'formRefNo',
          2: 'formType',
          3: 'regNo',
          5: 'transactionType',
          6: 'destination',
          7: 'status',
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
  }
}
