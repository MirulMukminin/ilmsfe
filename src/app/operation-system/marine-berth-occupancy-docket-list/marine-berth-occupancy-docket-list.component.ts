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
    const stringOne = (one.data.bod_number || one.data).toLowerCase();
    const stringTwo = (two.data.bod_number || two.data).toLowerCase();

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
  selector: 'app-marine-berth-occupancy-docket-list',
  templateUrl: './marine-berth-occupancy-docket-list.component.html',
  styleUrls: ['./marine-berth-occupancy-docket-list.component.scss'],
  providers: [TitleCasePipe],
})
export class MarineBerthOccupancyDocketListComponent implements OnInit {
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  @Input() BerthOccupancyDocketListModel = new TableModel();

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  @Input() sortable = true;

  BerthOccupancyDocketList = [];

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  //var declarations
  searchValue = '';
  company = '';
  vessel = '';
  bod_number = '';
  EstArrivalDate = '';
  ETA = '';
  EstDepartureDate = '';
  ETD = '';
  log_number = '';
  status = '';
  EndorsedBy = '';
  DateTime = '';
  dataset = [];
  companyName = '';

  sortingOn = false;
  searchModel = '';
  key: string;

  //sample hardcode data
  BerthOccupancyDocket = [];

  userName: any = '';

  constructor(
    protected appService: AppService,
    private titlecasePipe: TitleCasePipe
  ) {}

  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('customTableItemTemplate2', { static: false })
  protected customTableItemTemplate2: TemplateRef<any>;
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

        this.dataset = [];
        this.getRestQueryAPI(initialData.CustomerCode, initialData.Company);
        // console.log(initialData);
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

  getRestQueryAPI(customerCode: string, companyName: string) {
    // this.BerthOccupancyDocketList = this.BerthOccupancyDocket;
    // console.log(companyName);

    var getCodeView: any = { company: companyName };
    //fire api and get response data
    restServices.pbksb_MarineService
      .GetBODListByCompany(this.appService.myApp)(getCodeView)
      .then((result) => {
        let requestList: any = result;
        let letBodList: any = JSON.parse(requestList);

        this.BerthOccupancyDocketList = letBodList.bodListByCompany.filter(
          (value) => value.bod_number
        );

        //default sorting result by date starting from latest
        this.BerthOccupancyDocketList.sort((a, b) => {
          return (
            this.getTimeTest(b.est_arrival) - this.getTimeTest(a.est_arrival)
          );
        });

        this.BerthOccupancyDocketList.forEach((value, index) => {
          this.apiRespValidation(value);
          this.pushDataSet(index);
        });
        this.startPagination();
        //generate header item for table
        this.model.header = [
          new TableHeaderItem({ data: 'No.' }),
          new TableHeaderItem({ data: 'Company' }),
          new TableHeaderItem({ data: 'Vessel' }),
          new CustomHeaderItem({ data: 'BOD No.' }),
          new TableHeaderItem({ data: 'Est. Arrival Date' }),
          new TableHeaderItem({ data: 'ETA' }),
          new TableHeaderItem({ data: 'Est. Departure Date' }),
          new TableHeaderItem({ data: 'ETD' }),
          new TableHeaderItem({ data: 'Log No.' }),
          new TableHeaderItem({ data: 'Status' }),
          // new TableHeaderItem({ data: ' Endorsed by' }),
          // new TableHeaderItem({ data: 'Date & Time' }),
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
        this.dataset[i].company,
        this.dataset[i].vessel,
        this.dataset[i].bod_number,
        this.dataset[i].EstArrivalDate,
        this.dataset[i].ETA,
        this.dataset[i].EstDepartureDate,
        this.dataset[i].ETD,
        this.dataset[i].log_number,
        this.dataset[i].status,
        // this.dataset[i].EndorsedBy,
        // this.dataset[i].DateTime,
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
        if (index == 3) {
          row.push(
            new TableItem({
              data: { bod_number: dataElement, link: dataElement },
              title: dataElement,
              template: this.customTableItemTemplate,
            })
          );
        } else if (index == 9) {
          if (dataElement.toLowerCase().includes('pending')) {
            row.push(
              new TableItem({
                data: { status: dataElement },
                template: this.customTableItemTemplate2,
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
    let indexCounter = 0;

    this.BerthOccupancyDocketList.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.company +
        this.vessel +
        this.bod_number +
        this.EstArrivalDate +
        this.ETA +
        this.EstDepartureDate +
        this.ETD +
        this.log_number +
        this.status;

      if (this.searchValue) {
        if (allDataCol.toLowerCase().includes(this.searchValue.toLowerCase())) {
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
      company: this.company,
      vessel: this.vessel,
      bod_number: this.bod_number,
      EstArrivalDate: this.EstArrivalDate,
      ETA: this.ETA,
      EstDepartureDate: this.EstDepartureDate,
      ETD: this.ETD,
      log_number: this.log_number,
      status: this.status,
      // EndorsedBy: this.EndorsedBy,
      // DateTime: this.DateTime,
    });
  }

  //validate if there is data in each data column
  apiRespValidation(value: any) {
    if (value.company) {
      this.company = this.convertToTitleCase(value.company.name);
    } else {
      this.company = 'N/A';
    }
    if (value.vessel) {
      this.vessel = this.convertToTitleCase(value.vessel.name);
    } else {
      this.vessel = 'N/A';
    }
    if (value.bod_number) {
      this.bod_number = value.bod_number;
    } else {
      this.bod_number = '';
    }
    if (value.est_arrival) {
      this.EstArrivalDate = formatDate(
        value.est_arrival,
        'dd/MM/yyyy',
        'en_US'
      );
      this.ETA = formatDate(value.est_arrival, 'HH:mm', 'en_US');
    } else {
      this.EstArrivalDate = 'N/A';
      this.ETA = 'N/A';
    }

    if (value.est_departure) {
      this.EstDepartureDate = formatDate(
        value.est_departure,
        'dd/MM/yyyy',
        'en_US'
      );
      this.ETD = formatDate(value.est_departure, 'HH:mm', 'en_US');
    } else {
      this.EstDepartureDate = 'N/A';
      this.ETD = 'N/A';
    }
    if (value.log_number) {
      this.log_number = value.log_number;
    } else {
      this.log_number = '';
    }
    if (value.status) {
      // this.status = this.convertToTitleCase(value.status);
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
      1: 'company',
      2: 'vessel',
      3: 'bod_number',
      4: 'EstArrivalDate',
      5: 'ETA',
      6: 'EstDepartureDate',
      7: 'ETD',
      8: 'log_number',
      9: 'status',
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

  convertToTitleCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }
}
