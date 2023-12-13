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
  selector: 'app-cfs-container-list',
  templateUrl: './cfs-container-list.component.html',
  styleUrls: ['./cfs-container-list.component.scss'],
  providers: [TitleCasePipe],
})
export class CfsContainerListComponent implements OnInit {

  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() BerthRequestListModel = new TableModel();

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  @Input() sortable = true;

  cfsRequestList = [];

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  containerNo = '';
  containerType = '';  
  status = '';
  dataset = [];

  sortingOn = false;
  searchModel = '';
  key: string;

  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;
  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('customTableItemTemplate1', { static: false })
  protected customTableItemTemplate1: TemplateRef<any>;
  constructor( protected appService: AppService,
    private titlecasePipe: TitleCasePipe,) {

   }

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
        this.getRestServicesAPI(initialData.Company);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  getRestServicesAPI(company: string) {
    let params = { customer: company };
    restServices.pbksb_RequestCFSService
      .getContainersByCustomer(this.appService.myApp)(params)
      .then((result) => {
        let resArr: any = result;
        this.cfsRequestList = JSON.parse(resArr);

        // this.cfsRequestList.sort((a, b) => {
        //   return b.ticketNumber.localeCompare(a.ticketNumber, 'en', {
        //     numeric: true,
        //   });
        // });

        // this.cfsRequestList = this.cfsRequestList.filter((item) => {
        //   return item.requestType === 'STORAGE';
        // });

        this.cfsRequestList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();
      });

    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'Container No.' }),     
      new TableHeaderItem({ data: 'Container Type' }),      
      new TableHeaderItem({ data: 'Status' }),
    ];
  }

  apiRespValidation(value: any) {
    this.containerNo = value.containerNumber ? value.containerNumber : 'N/A';
    this.containerType = value.containerType
      ? value.containerType.replaceAll('_', '/ ')
      : 'N/A';
    this.containerType=this.titlecasePipe.transform(this.containerType);
    this.status = value.status ? value.status.replace(/_/g, ' ') : 'N/A';
    this.status = this.titlecasePipe.transform(this.status);
  }

  pushDataSet(index: any) {
    this.dataset.push({
      // comnumber: index + 1,
      containerNo: this.containerNo,
      containerType: this.containerType,      
      status: this.status ,
    });
  }

  //start pagination
  startPagination() {
    this.model.data = [[]];
    this.model.currentPage = 1;
    this.model.pageLength = 10;

    this.model.totalDataLength = this.dataset.length;
    this.selectPage(this.model.currentPage);
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
        this.dataset[i].containerNo,        
        this.dataset[i].containerType,        
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

        row.push(
          new TableItem({
            data: dataElement,
          })
        );

        // if (index == 1) {
        //   row.push(
        //     new TableItem({
        //       data: { requestNo: dataElement, link: dataElement },
        //       title: dataElement,
        //       template: dataElement.includes('ST')
        //         ? this.customTableItemTemplate1
        //         : this.customTableItemTemplate,
        //     })
        //   );
        // } else if (index == 4) {
        //   if (dataElement == 'Pending Endorsement') {
        //     row.push(
        //       new TableItem({
        //         data: dataElement,
        //         template: this.customTableItemTemplate1,
        //       })
        //     );
        //   } else {
        //     row.push(
        //       new TableItem({
        //         data: dataElement,
        //       })
        //     );
        //   }
        // } else {
        //   row.push(
        //     new TableItem({
        //       data: dataElement,
        //     })
        //   );
        // }
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

    this.cfsRequestList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
      this.containerNo + this.containerType +  this.status;
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
   
      0: 'containerNo',
      1: 'containerType',      
      2: 'status',
    };

    if (orientation == 'ASC') {
      
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      
    } else if (orientation == 'DESC') {
      
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal).reverse();
      
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

}
