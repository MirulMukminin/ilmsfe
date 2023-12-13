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
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';
import * as XLSX from 'xlsx';

export class CustomHeaderItem extends TableHeaderItem {
  compare(one: TableItem, two: TableItem) {
    const stringOne = (one.data.FormRefNo || one.data).toLowerCase();
    const stringTwo = (two.data.FormRefNo || two.data).toLowerCase();

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
  selector: 'app-inventory-transaction',
  templateUrl: './inventory-transaction.component.html',
  styleUrls: ['./inventory-transaction.component.scss'],
  providers: [TitleCasePipe],
})
export class InventoryTransactionComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  previousURL = '';

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  FormRefNo = '';
  FormType = '';
  RegistrationNo = '';
  moveDate = '';
  agent = '';
  Location = '';
  TotalValue = '';
  Status = '';

  InventoryTransactionList = [];
  InventoryTransactionListPrint = [];
  dataset = [];

  sortingOn = false;
  searchModel = '';
  key: string;

  requestDate = '';

  constructor(
    protected appService: AppService,
    private requestFormService: RequestFormService,
    private router: Router,
    private titlecasePipe: TitleCasePipe
  ) {}

  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('customHeaderTemplate', { static: false })
  protected customHeaderTemplate: TemplateRef<any>;

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
      .GetGoodInListByCustomer(this.appService.myApp)(getCodeView)
      .then((result) => {
        const resultArray = this.appService.jsonToArray(result);
        //console.log(resultArray);
        resultArray.forEach((value) => {
          if (
            value.status == 'SUBMITTED' ||
            value.status == 'PENDING_ADJUSTMENT_APPROVAL' ||
            value.status == 'ADJUSTMENT_APPROVED'
          ) {
            // console.log(value);

            this.InventoryTransactionList.push(value);
          }
        });

        //default sorting result by date starting from latest
        this.InventoryTransactionList.sort((a, b) => {
          return (
            this.getTimeTest(b.request_date) - this.getTimeTest(a.request_date)
          );
        });

        this.InventoryTransactionList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.InventoryTransactionListPrint = this.dataset;

        this.startPagination();
        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new TableHeaderItem({ data: 'Request No.' }),
          new TableHeaderItem({ data: 'Form Type' }),
          new CustomHeaderItem({ data: 'Form No.' }),
          new TableHeaderItem({ data: 'Move Date.' }),
          new TableHeaderItem({ data: 'Agent' }),
          new TableHeaderItem({ data: 'Location' }),
          //new TableHeaderItem({ data: 'Total Value (RM)' }),
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
        this.dataset[i].FormRefNo,
        this.dataset[i].FormType,
        this.dataset[i].RegistrationNo,
        this.dataset[i].moveDate,
        this.dataset[i].agent,
        this.dataset[i].Location,
        //this.dataset[i].TotalValue,
        this.dataset[i].Status,
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
              data: { FormRefNo: dataElement, link: dataElement },
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

    let indexCounter = 0;

    this.InventoryTransactionList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.FormRefNo +
        this.FormType +
        this.RegistrationNo +
        this.moveDate +
        this.agent +
        this.Location +
        //this.TotalValue +
        this.Status;
      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
          this.pushDataSet(indexCounter);
          indexCounter++;
          this.InventoryTransactionListPrint = this.dataset;
        }
      } else {
        this.pushDataSet(index);
        this.InventoryTransactionListPrint = this.dataset;
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
      FormRefNo: this.FormRefNo,
      FormType: this.FormType,
      RegistrationNo: this.RegistrationNo,
      moveDate: this.moveDate,
      agent: this.agent,
      Location: this.Location,
      //TotalValue: this.TotalValue,
      Status: this.Status,
      requestDate: this.requestDate,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.reference_no) {
      this.FormRefNo = value.reference_no;
    } else {
      this.FormRefNo = 'N/A';
    }
    if (value.form_type) {
      this.FormType = value.form_type;
    } else {
      this.FormType = 'N/A';
    }
    if (value.registration_no) {
      this.RegistrationNo = value.registration_no;
    } else {
      this.RegistrationNo = 'N/A';
    }
    if (value.move_date) {
      this.moveDate = formatDate(value.move_date, 'dd/MM/yyyy', 'en_US');
    } else {
      this.moveDate = 'N/A';
    }
    if (value.agent_name) {
      this.agent = value.agent_name;
    } else {
      this.agent = 'N/A';
    }
    if (value.location) {
      this.Location = value.location.description;
    } else {
      this.Location = 'N/A';
    }
    // if (value.total_value) {
    //   this.TotalValue = value.total_value;
    // } else {
    //   this.TotalValue = "N/A";
    // }
    if (value.status) {
      this.Status = value.status.replace(/_/g, ' ');
      this.Status = this.titlecasePipe.transform(this.Status);
    } else {
      this.Status = 'N/A';
    }

    if (value.request_date) {
      this.requestDate = value.request_date;
    } else {
      this.requestDate = 'N/A';
    }
  }

  getTimeTest(date?: Date) {
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
      1: 'FormRefNo',
      2: 'FormType',
      3: 'RegistrationNo',
      4: 'moveDate',
      5: 'agent',
      6: 'Location',
      7: 'Status',
      8: 'requestDate',
    };

    if (orientation == 'ASC') {
      if (index === 4) {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        // console.log(this.key);
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 4) {
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
    //if input yes then download filtered
    //else input no then all
    let fileName = 'Inventory Transaction List.xlsx';
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    // console.log(this.modelPrint);
    // console.log(this.modelPrint._data[0]);
    // console.log(this.modelPrint._data[0][1].data);

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {
      raw: true,
    });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }
}
