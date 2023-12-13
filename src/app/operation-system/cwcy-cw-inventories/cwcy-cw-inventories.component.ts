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
  selector: 'app-cwcy-cw-inventories',
  templateUrl: './cwcy-cw-inventories.component.html',
  styleUrls: ['./cwcy-cw-inventories.component.scss'],
})
export class CwcyCwInventoriesComponent implements OnInit {
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
    SUBMITTED: 'Submitted',
    CANCELED: 'Canceled',
    IN_PROGRESS: 'In Progress',
    PENDING_ENDORSEMENT: 'Pending Endorsement',
    ENDORSED: 'Endorsed',
    CHECKED: 'Checked',
  };

  active: boolean = false;
  searchValue = '';
  dataset = [];
  inventoriesList = [];

  c;
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  searchModel = '';
  sortingOn = false;
  key: string;
  companyName = '';

  description = '';
  qtyRemained = '';
  uom = '';
  qtyInitial = '';
  lineAllotmentNo = '';
  weightRemained = '';
  weightInitial = '';
  inDate = '';

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
        this.companyName = initialData.Company;
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
      .getCommonWarehouseInventories(this.appService.myApp)({
        customer: this.companyName,
      })
      .then((result) => {
        let resArr: any = result;
        this.inventoriesList = JSON.parse(resArr);

        // this.inventoriesList.sort((a, b) => {
        //   return b.requestNo.localeCompare(a.requestNo, 'en', {
        //     numeric: true,
        //   });
        // });

        this.inventoriesList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();
      });

    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      new CustomHeaderItem({ data: 'Description' }),
      new TableHeaderItem({ data: 'Quantity Remained' }),
      new TableHeaderItem({ data: 'UOM' }),
      new TableHeaderItem({ data: 'Initial Quantity' }),
      new TableHeaderItem({ data: 'Line Allotment No' }),
      new TableHeaderItem({ data: 'Weight(KG) Remained' }),
      new TableHeaderItem({ data: 'Initial Weight (KG)' }),
      new TableHeaderItem({ data: 'Incoming Date' }),
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
        this.dataset[i].description,
        this.dataset[i].qtyRemained,
        this.dataset[i].uom,
        this.dataset[i].qtyInitial,
        this.dataset[i].lineAllotmentNo,
        this.dataset[i].weightRemained,
        this.dataset[i].weightInitial,
        this.dataset[i].inDate,
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
        row.push(new TableItem({ data: dataElement }));
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

    this.inventoriesList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.description +
        this.qtyRemained +
        this.uom +
        this.qtyInitial +
        this.lineAllotmentNo +
        this.weightRemained +
        this.weightInitial +
        this.inDate;
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
      description: this.description,
      qtyRemained: this.qtyRemained,
      uom: this.uom,
      qtyInitial: this.qtyInitial,
      lineAllotmentNo: this.lineAllotmentNo,
      weightRemained: this.weightRemained,
      weightInitial: this.weightInitial,
      inDate: this.inDate,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.description) {
      this.description = value.description;
    } else {
      this.description = 'N/A';
    }

    if (!isNaN(value.quantity)) {
      this.qtyRemained = value.quantity;
    } else {
      this.qtyRemained = '';
    }

    if (value.uom) {
      this.uom = value.uom.name;
    } else {
      this.uom = '';
    }

    if (!isNaN(value.initialQuantity)) {
      this.qtyInitial = value.initialQuantity;
    } else {
      this.qtyInitial = '';
    }

    if (value.lineAllotmentNo) {
      this.lineAllotmentNo = value.lineAllotmentNo;
    } else {
      this.lineAllotmentNo = '';
    }

    if (!isNaN(value.weight)) {
      this.weightRemained = value.weight;
    } else {
      this.weightRemained = null;
    }

    if (!isNaN(value.actualWeight)) {
      this.weightInitial = value.actualWeight;
    } else {
      this.weightInitial = null;
    }

    if (value.incomingDate) {
      this.inDate = formatDate(value.incomingDate, 'dd/MM/yyyy', 'en_us');
    } else {
      this.inDate = null;
    }
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
      1: 'description',
      2: 'qtyRemained',
      3: 'uom',
      4: 'qtyInitial',
      5: 'lineAllotmentNo',
      6: 'weightRemained',
      7: 'weightInitial',
      8: 'inDate',
    };
    if (orientation === 'ASC') {
      if (index === 8) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else if (index === 5) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingJobNo);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation === 'DESC') {
      if (index === 8) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else if (index === 5) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingJobNo).reverse();
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

  sortAscendingJobNo = (a, b) => {
    return a[this.key].localeCompare(b[this.key], 'en', { numeric: true });
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
