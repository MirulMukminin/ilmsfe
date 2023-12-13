import { formatDate } from '@angular/common';
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
import { CustomHeaderItem } from '../mhe-request-list/mhe-request-list.component';

@Component({
  selector: 'app-cwcy-cy-transactions',
  templateUrl: './cwcy-cy-transactions.component.html',
  styleUrls: ['./cwcy-cy-transactions.component.scss'],
})
export class CwcyCyTransactionsComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() BerthRequestListModel = new TableModel();

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  @Input() sortable = true;

  company: string;
  goodsStorageList = [];

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  lineAllotmentNo = '';
  releaseNo = '';
  description = '';
  outDate = '';
  outQty = '';
  uom = '';
  currentQty = '';
  initialQty = '';
  weightRelease = '';
  weightRemained = '';
  dataset = [];

  sortingOn = false;
  searchModel = '';
  key: string;

  // @ViewChild('customHeaderTemplate', { static: false })
  // protected customHeaderTemplate: TemplateRef<any>;
  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('customTableItemTemplate1', { static: false })
  protected customTableItemTemplate1: TemplateRef<any>;
  // @ViewChild('otherActivitiesTemplate', { static: false })
  // protected otherActivitiesTemplate: TemplateRef<any>;

  constructor(protected appService: AppService) {}

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.company = initialData.Company;
        this.dataset = [];
        this.getRestServicesAPI(initialData.Company);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  getRestServicesAPI(company: string) {
    let params = { customer: company };
    restServices.pbksb_CommonWarehouseCommonYardService
      .getCommonYardTransactionsByCustomer(this.appService.myApp)({
        customer: this.company,
      })
      .then((result) => {
        let resArr: any = result;
        this.goodsStorageList = JSON.parse(resArr);

        this.goodsStorageList.sort((a, b) => {
          return b['releaseDate'] < a['releaseDate'] ? -1 : 1;
        });

        console.log('data ==');
        console.log(this.goodsStorageList);

        this.goodsStorageList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();
      });

    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      new CustomHeaderItem({ data: 'Line Allotment No' }),
      new TableHeaderItem({ data: 'Release No' }),
      new TableHeaderItem({ data: 'Description' }),
      new TableHeaderItem({ data: 'Out Date' }),
      new TableHeaderItem({ data: 'Out Qty' }),
      new TableHeaderItem({ data: 'Initial Qty' }),
      new TableHeaderItem({ data: 'UOM' }),
      new TableHeaderItem({ data: 'Area Released (m²) ' }),
      new TableHeaderItem({ data: 'Area Remained (m²)' }),
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
        this.dataset[i].lineAllotmentNo,
        this.dataset[i].releaseNo,
        this.dataset[i].description,
        this.dataset[i].outDate,
        this.dataset[i].outQty,
        this.dataset[i].initialQty,
        this.dataset[i].uom,
        this.dataset[i].weightRelease,
        this.dataset[i].weightRemained,
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
        row.push(
          new TableItem({
            data: dataElement,
          })
        );
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

    this.goodsStorageList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.lineAllotmentNo +
        this.releaseNo +
        this.description +
        this.outDate +
        this.outQty +
        this.initialQty +
        this.uom +
        this.weightRelease +
        this.weightRemained;
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
      lineAllotmentNo: this.lineAllotmentNo,
      releaseNo: this.releaseNo,
      description: this.description,
      outDate: this.outDate,
      outQty: this.outQty,
      initialQty: this.initialQty,
      uom: this.uom,
      weightRelease: this.weightRelease,
      weightRemained: this.weightRemained,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    this.lineAllotmentNo = value.lineAllotmentNo ? value.lineAllotmentNo : '-';
    this.releaseNo = value.cwcyGoodsReleaseRequest
      ? value.cwcyGoodsReleaseRequest.requestNo
      : '-';
    this.description = value.description;
    this.outDate = value.releaseDate
      ? formatDate(value.releaseDate, 'dd/MM/yyyy', 'en-US')
      : '-';
    this.outQty = !isNaN(value.quantity) ? value.quantity : 0;
    this.initialQty = value.commonYardInventory
      ? value.commonYardInventory.initialQuantity
      : '-';
    this.uom = value.unitOfMeasurement ? value.unitOfMeasurement.name : '-';
    this.weightRelease = !isNaN(value.area) ? value.area : '-';
    this.weightRemained = !isNaN(value.actualArea) ? value.actualArea : '-';
    /////////////////
  }

  getTimeTest(date?: any) {
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
      1: 'lineAllotmentNo',
      2: 'releaseNo',
      3: 'description',
      4: 'outDate',
      5: 'outQty',
      6: 'initialQty',
      7: 'uom',
      8: 'weightRelease',
      9: 'weightRemained',
    };

    if (orientation == 'ASC') {
      if (index === 1 || index === 2) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingJobNo);
      } else if (index === 4) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 1 || index === 2) {
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

  sortAscendingJobNo = (a, b) => {
    return a[this.key].localeCompare(b[this.key], 'en', { numeric: true });
  };

  sortAscendingNormal = (a, b) => {
    if (a[this.key] === b[this.key]) {
      return 0;
    } else {
      if (typeof a[this.key] == 'string' && typeof b[this.key] == 'string') {
        return a[this.key].toLowerCase() < b[this.key].toLowerCase() ? -1 : 1;
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
}
