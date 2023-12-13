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
    const stringOne = (one.data.docketNo || one.data).toLowerCase();
    const stringTwo = (two.data.docketNo || two.data).toLowerCase();

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
  selector: 'app-icw-inventory-items',
  templateUrl: './icw-inventory-items.component.html',
  styleUrls: ['./icw-inventory-items.component.scss']
})
export class IcwInventoryItemsComponent implements OnInit {
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
  goodsRecievingRequestList = [];
  
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

  docketNo = '';
  itemType = '';
  itemDescription = '';
  qty = '';
  uom = '';
  batchId = '';
  expiryDate = '';
  isLocked = '';
  

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.userInfo();
    console.log("this.dataset in ngOnit")
    console.log(this.dataset)
    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      new CustomHeaderItem({ data: 'Doket No.' }),
      new TableHeaderItem({ data: 'Customer' }),
      new TableHeaderItem({ data: 'Item Type' }),
      new TableHeaderItem({ data: 'Item Description' }),
      new TableHeaderItem({ data: 'Qty' }),
      new TableHeaderItem({ data: 'UOM' }),
      new TableHeaderItem({ data: 'Batch Id' }),
      new TableHeaderItem({ data: 'Expiry Date' }),
      new TableHeaderItem({ data: 'Locked' }),
    ];
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.getRestServiceAPI(initialData.Company);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }


  private getRestServiceAPI(customer: string) {
    const param = { customer };

    restServices.pbksb_ICWTransferRestService
      .getCustomerInventoryItems(this.appService.myApp)(param)
      .then((result) => {
        this.goodsRecievingRequestList = this.appService.jsonToArray(result);
        // default sorting on JobNo from latest
        /*
        this.goodsRecievingRequestList.sort((a, b) => {
          return b.requestNo  == a.requestNo;
        });
        */
        console.log("this.goodsRecievingRequestList == ")
        console.log(this.goodsRecievingRequestList)
        this.companyName = customer;

        this.goodsRecievingRequestList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });
        console.log("this.dataset == ")
        console.log(this.dataset)

        this.startPagination();

        
      });
  }

  

  apiRespValidation(value: any) {
    if (value.docketNo) {
      this.docketNo = value.docketNo;
    } else {
      this.docketNo = 'N/A';
    }

   
   
    if (value.itemType) {
      this.itemType = value.itemType;
    } else {
      this.itemType = null;
    }

    if (value.itemDescription) {
      this.itemDescription = value.itemDescription;
    } else {
      this.itemDescription = null;
    }

    if (value.qty) {
      this.qty = value.qty;
    } else {
      this.qty = null;
    }

    if (value.uom) {
      this.uom = value.uom.name;
    } else {
      this.uom = null;
    }

    if (value.batchId) {
      this.batchId = value.batchId;
    } else {
      this.batchId = null;
    }

    

    if (value.expiryDate) {
      this.expiryDate = value.expiryDate;
    } else {
      this.expiryDate = null;
    }

    //if (value.isLocked) {
      this.isLocked = value.isLocked;
   // } else {
   //   this.isLocked = null;
    //}
    /*
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
    *

    if (value.status) {
      this.status = this.dictionaryStatus[value.status];
    } else if (!value.status) {
      this.status = value.status;
    } else {
      this.status = 'N/A';
    }
    */
  }

  pushDataSet(index: any) {
   
    this.dataset.push({
      number: index + 1,
      docketNo: this.docketNo,
      customer: this.companyName,
      itemType: this.itemType,
      itemDescription: this.itemDescription,
      qty: this.qty,
      uom: this.uom,
      batchId: this.batchId,
      expiryDate: this.expiryDate,
      isLocked: this.isLocked
    });
  }

  protected prepareData(data: Array<Array<any>>) {
    // create new data from the service data
    let newData = [];
    console.log("data = from prepare")
    console.log(data)
    data.forEach((dataRow) => {
      let row = [];
      dataRow.forEach((dataElement, index) => {
        row.push(new TableItem({ data: dataElement }));
        /*
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
        */
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

      console.log("data from selectPage ==")
      console.log(data)
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
        this.dataset[i].docketNo,
        this.dataset[i].customer,
        this.dataset[i].itemType,
        this.dataset[i].itemDescription,
        this.dataset[i].qty,
        this.dataset[i].uom,
        this.dataset[i].batchId,
        this.dataset[i].expiryDate,
        this.dataset[i].isLocked
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
        this.docketNo +
        this.companyName +
        this.itemType +
        this.itemDescription +
        this.qty+
        this.uom+
        this.batchId+
        this.expiryDate+
        this.isLocked;

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
    if (orientation === 'ASC') {
      if (index === 1) {
        let sort = {
          1: 'requestNumber',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingJobNo);
      } else if (index === 3) {
        let sort = {
          3: 'date',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        let sort = {
          0: 'number',
          2: 'type',
          4: 'time',
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
      } else if (index === 3) {
        let sort = {
          3: 'date',
        };
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate).reverse();
      } else {
        let sort = {
          0: 'number',
          1: 'requestNumber',
          2: 'agent',
          4: 'time',
          5: 'status',
        };
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
    return a[this.key].localeCompare(b[this.key], 'en', { numeric: true });
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
