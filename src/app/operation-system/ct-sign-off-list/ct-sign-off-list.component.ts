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
import { CustomHeaderItem } from '../cfs-endorsed-list/cfs-endorsed-list.component';
import { RequestFormService } from '../services/MHE/request-form.service';

@Component({
  selector: 'app-ct-sign-off-list',
  templateUrl: './ct-sign-off-list.component.html',
  styleUrls: ['./ct-sign-off-list.component.scss'],
  providers: [TitleCasePipe],
})
export class CtSignOffListComponent implements OnInit {
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
  requestList = [];

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  requestNo = '';
  agent = '';
  location = '';
  date_service = '';
  status = '';
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

  constructor(
    protected appService: AppService,
    private requestFormService: RequestFormService,
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
    restServices.pbksb_CrewTransferService
      .getAllCrewTransferSignOffRequest(this.appService.myApp)({
        customer: this.company,
      })
      .then((result) => {
        let resArr: any = result;
        this.requestList = JSON.parse(resArr);

        console.log(this.requestList);
        this.requestList = this.requestList.filter(
          (item) => item.requestStatus != 'ENDORSED'
        );

        this.requestList.sort((a, b) => {
          return b.requestNumber.localeCompare(a.requestNumber, 'en', {
            numeric: true,
          });
        });

        this.requestList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });

        this.startPagination();
      });

    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      new CustomHeaderItem({ data: 'Request No.' }),
      new TableHeaderItem({ data: 'Agent' }),
      new TableHeaderItem({ data: 'Destination Port' }),
      new TableHeaderItem({ data: 'Date' }),
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
        this.dataset[i].requestNo,
        this.dataset[i].agent,
        this.dataset[i].location,
        this.dataset[i].date_service,
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
        } else if (index == 5) {
          if (dataElement == 'PENDING ENDORSEMENT') {
            row.push(
              new TableItem({
                data: dataElement,
                template: this.customTableItemTemplate1,
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

    this.requestList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.requestNo +
        this.agent +
        this.location +
        this.date_service +
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
      requestNo: this.requestNo,
      agent: this.agent,
      location: this.location,
      date_service: this.date_service,
      status: this.status,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    this.requestNo = value.requestNumber ? value.requestNumber : 'N/A';
    this.agent = value.agent ? value.agent : 'N/A';
    this.location = value.portOfOrigin ? value.portOfOrigin : 'N/A';
    this.date_service = value.requestDate
      ? formatDate(value.requestDate, 'dd/MM/yyyy', 'en_US')
      : 'N/A';
    this.status = value.requestStatus
      ? value.requestStatus.replaceAll('_', ' ')
      : 'N/A';
    this.status = this.titlecasePipe.transform(this.status);
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
      1: 'requestNo',
      2: 'agent',
      3: 'location',
      4: 'date_service',
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
}
