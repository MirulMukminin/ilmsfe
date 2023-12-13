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
  PaginationModel,
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
  selector: 'app-psb-transfer-location-list',
  templateUrl: './psb-transfer-location-list.component.html',
  styleUrls: ['./psb-transfer-location-list.component.scss'],
})
export class PsbTransferLocationListComponent implements OnInit {
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

  active: boolean = false;
  searchValue = '';
  dataset = [];
  transferLocationList = [];
  requestnumber = '';
  category = '';
  remarks = '';
  transferdate = '';
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;
  companyName = '';

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

  private getRestServiceAPI(company: string) {
    const param = { company: company };

    restServices.pbksb_PSBService
      .GetTransferLocationList(this.appService.myApp)(param)
      .then((result) => {
        this.transferLocationList = this.appService.jsonToArray(result);
        // console.log(this.transferLocationList[0].transfer_location);
        //default sorting result by date starting from latest
        this.transferLocationList.sort((a, b) => {
          return this.getTime(b.request_date) - this.getTime(a.request_date);
        });

        this.transferLocationList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();
        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          // new TableHeaderItem({ data: "Request No." }),
          new CustomHeaderItem({ data: 'Request No.' }),
          new TableHeaderItem({ data: 'Transfer Date' }),
          new TableHeaderItem({ data: 'Category' }),
          new TableHeaderItem({ data: 'Remarks' }),
        ];
      });
  }

  apiRespValidation(value: any) {
    if (value.request_no) {
      this.requestnumber = value.request_no;
    } else {
      this.requestnumber = 'N/A';
    }
    if (value.transfer_date) {
      this.transferdate = formatDate(
        value.transfer_date,
        'dd/MM/yyyy',
        'en_US'
      );
    } else {
      this.transferdate = 'N/A';
    }
    if (value.category) {
      this.category = value.category;
    } else {
      this.category = 'N/A';
    }

    if (value.remarks) {
      this.remarks = value.remarks;
    } else {
      this.remarks = 'N/A';
    }
  }

  pushDataSet(index: any) {
    this.dataset.push({
      number: index + 1,
      requestnumber: this.requestnumber,
      transferdate: this.transferdate,
      category: this.category,
      remarks: this.remarks,
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
        this.dataset[i].requestnumber,
        this.dataset[i].transferdate,
        this.dataset[i].category,
        this.dataset[i].remarks,
      ]);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(fullPage), 150);
    });
  }

  searchFilter(searchString: string) {
    this.searchValue = searchString;
    this.dataset = [];
    let indexCounter = 0;

    this.transferLocationList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.requestnumber + this.transferdate + this.category + this.remarks;

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

  getTime(date?: Date) {
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
      1: 'requestnumber',
      2: 'transferdate',
      3: 'category',
      4: 'remarks',
    };

    if (orientation == 'ASC') {
      if (index === 2) {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 2) {
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
