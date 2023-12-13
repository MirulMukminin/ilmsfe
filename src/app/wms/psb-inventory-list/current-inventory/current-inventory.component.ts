import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-current-inventory',
  templateUrl: './current-inventory.component.html',
  styleUrls: ['./current-inventory.component.scss'],
  providers: [TitleCasePipe],
})
export class CurrentInventoryComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  previousURL = '';

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  CurrentInventoryTransactionListPrint = [];

  //var declarations
  searchValue = '';
  CustomsCode = '';
  GoodsDescription = '';
  Category = '';
  TotalQty = '';
  ValueRM = '';
  TotalValueRM = '';

  CurrentInventoryList = [];
  dataset = [];

  sortingOn = false;
  searchModel = '';
  key: string;

  constructor(
    protected appService: AppService,
    private requestFormService: RequestFormService,
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
        // console.log(initialData);

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
    var getCodeView: any = { company: Company };

    restServices.pbksb_PSBService
      .GetCurrentInventoryListByCompany(this.appService.myApp)(getCodeView)
      .then((result) => {
        this.CurrentInventoryList = this.appService.jsonToArray(result);
        this.CurrentInventoryList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });
        this.CurrentInventoryTransactionListPrint = this.dataset;

        this.startPagination();
        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new TableHeaderItem({ data: 'Tariff Code' }),
          new TableHeaderItem({ data: 'Goods Description' }),
          new TableHeaderItem({ data: 'Category' }),
          new TableHeaderItem({ data: 'Total Qty.' }),
          new TableHeaderItem({
            data: 'Value (RM)',
            className: 'rightText',
          }),
          new TableHeaderItem({
            data: 'Total Value (RM)',
            className: 'rightText',
          }),
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
        this.dataset[i].CustomsCode,
        this.dataset[i].GoodsDescription,
        this.dataset[i].Category,
        this.dataset[i].TotalQty,
        this.dataset[i].ValueRM,
        this.dataset[i].TotalValueRM,
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
        if (index == 5 || index == 6) {
          row.push(
            new TableItem({
              data: dataElement,
              className: 'rightText',
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
  // ---- end functions used in pagination ---- //

  /*search filter*/
  searchFilter(searchString: string) {
    this.searchValue = searchString;
    this.dataset = [];

    let indexCounter = 0;
    this.CurrentInventoryList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.CustomsCode +
        this.GoodsDescription +
        this.Category +
        this.TotalQty +
        this.ValueRM +
        this.TotalValueRM;
      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
          this.pushDataSet(indexCounter);
          indexCounter++;
          this.CurrentInventoryTransactionListPrint = this.dataset;
        }
      } else {
        this.pushDataSet(index);
        this.CurrentInventoryTransactionListPrint = this.dataset;
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
      CustomsCode: this.CustomsCode,
      GoodsDescription: this.GoodsDescription,
      Category: this.Category,
      TotalQty: this.TotalQty,
      ValueRM: this.ValueRM,
      TotalValueRM: this.TotalValueRM,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.tariff_code) {
      this.CustomsCode = value.tariff_code;
    } else {
      this.CustomsCode = 'N/A';
    }
    if (value.good_description) {
      this.GoodsDescription = value.good_description;
    } else {
      this.GoodsDescription = 'N/A';
    }
    if (value.category) {
      this.Category = value.category;
    } else {
      this.Category = 'N/A';
    }
    if (value.total_quantity) {
      this.TotalQty = value.total_quantity;
    } else {
      this.TotalQty = 'N/A';
    }
    if (value.value) {
      this.ValueRM = this.addZeroes(value.value);
    } else {
      this.ValueRM = 'N/A';
    }
    if (value.total_value) {
      this.TotalValueRM = this.addZeroes(value.total_value);
    } else {
      this.TotalValueRM = 'N/A';
    }
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
      1: 'CustomsCode',
      2: 'GoodsDescription',
      3: 'Category',
      4: 'TotalQty',
      5: 'ValueRM',
      6: 'TotalValueRM',
    };

    if (orientation == 'ASC') {
      this.key = sort[index];
      // console.log(this.key);
      this.dataset.sort(this.sortAscendingNormal);
    } else if (orientation == 'DESC') {
      this.key = sort[index];
      // console.log(this.key);
      this.dataset.sort(this.sortAscendingNormal).reverse();
    }
  }

  sortAscendingNormal = (a, b) => {
    // console.log(this.key);

    if (a[this.key] === b[this.key]) {
      return 0;
    }
    // nulls sort after anything else
    else if (a[this.key] === 'N/A') {
      return -1;
    } else if (b[this.key] === 'N/A') {
      return 1;
    } else {
      if (typeof a[this.key] == 'string' && typeof b[this.key] == 'string') {
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

  //-----------------------------Custom sorting end ----------------------------------//

  onPrint() {
    window.print();
  }

  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();
    this.router.navigate([this.previousURL]);
  }
  downloadExcel() {
    let fileName = 'Current Inventory List.xlsx';
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

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  addZeroes(num) {
    const dec = num.toString().split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return this.numberWithCommas(Number(num).toFixed(len));
  }
}
