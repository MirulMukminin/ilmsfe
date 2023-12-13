import { formatDate, TitleCasePipe } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import {
  ModalService,
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular';
import { ModuleCode } from 'enums/enums';
import { ButtonType } from 'node_modules/carbon-components-angular/button/button.types';
import { restServices } from 'services';
import { AppService } from '../app.service';
import { AuthService } from '../auth/auth.service';
import { ListNotificationComponent } from './list-notification/list-notification.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [TitleCasePipe],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';
  @Input() model = new TableModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;
  @Input() serviceRequestList = new TableModel();
  @Input() agentNotificationList = [];

  totalSecond: number = 54000; //midnight to 3pm
  secondsLeft: number = 1;
  showTime: string = '';
  hours = 0;
  minutes = 0;
  getDatetime: any;
  isLoading = false;
  overlay = false;
  customerCode: string = '';
  userId: string = '';

  notificationAndAttentionListByAgent = [];
  notificationAndAttentionList5ByAgent = [];
  latestServiceRequestListByAgent = [];

  dataset = [];
  searchValue = '';
  RequestNo;
  ServiceType = '';
  ReqType = '';
  ReqDate = '';
  BookingDate = '';
  Status = '';
  url = '';

  sortingOn = false;
  searchModel = '';
  key: string;

  asc = [];
  desc = [];
  index = '';

  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  dateFilter;
  serviceType;
  serviceTypeSelection = [];
  today;
  company;
  roles = [];
  roleSub;
  allowedModules = [];
  userInfoPromise: Promise<any>;

  dateFilterTo;
  dateFilterFrom;
  invalidToDate: boolean = false;
  invalidFromDate: boolean = false;
  invalidToDateText = '';
  invalidFromDateText = '';

  constructor(
    protected modalService: ModalService,
    private router: Router,
    private appService: AppService,
    private auth: AuthService,
    private titlecasePipe: TitleCasePipe
  ) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    });
  }

  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;
  @ViewChild('customStatus', { static: false })
  protected customStatus: TemplateRef<any>;
  ngOnInit(): void {
    this.isLoading = true;
    this.overlay = true;
    this.userInfo();
    this.getCurrentDate();
    this.convertTime();
    this.dateFilterDefault();
    this.userRoles();
    // this.populateFilterServiceTypeDropdown();

    // this.model.pageLength = 10;
    // this.model.totalDataLength = this.requestList.length;
    // this.selectPage(1);

    this.serviceRequestList.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Request No.' }),
      new TableHeaderItem({ data: 'Service Type' }),
      new TableHeaderItem({ data: 'Req. Type' }),
      new TableHeaderItem({ data: 'Req. Date' }),
      new TableHeaderItem({ data: 'Booking Date' }),
      new TableHeaderItem({ data: 'Status' }),
    ];

    //generate header item for table
    this.model.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Request No.' }),
      new TableHeaderItem({ data: 'Service Type' }),
      new TableHeaderItem({ data: 'Req. Type' }),
      new TableHeaderItem({ data: 'Req. Date' }),
      new TableHeaderItem({ data: 'Booking Date' }),
      new TableHeaderItem({ data: 'Status' }),
    ];
  }

  userRoles() {
    this.roleSub = this.auth.getCurrentRole();
    this.roleSub.subscribe((val: Array<String>) => {
      this.roles = val;
      Promise.all([this.userInfoPromise]).then((result) => {
        if (this.roles.length > 0 && this.userId !== '') {
          this.populateFilterServiceTypeDropdown();
          this.getRestServiceAPI();
        }
      });
    });
  }

  redirectToEAduan() {
    console.log(window.location.href)
    window.open("http://www.pbksb-eaduan.com.my/");
  }

  populateFilterServiceTypeDropdown() {
    let serviceType = ModuleCode;
    let arrServiceType = [];
    for (var key in serviceType) {
      if (
        key === 'SCHEDULED_WASTE_MANAGEMENT' &&
        this.roles.includes('swmCustomer')
      ) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (key === 'WASTE_DISPOSAL' && this.roles.includes('wdCustomer')) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (
        key === 'CENTRALIZED_FOOD_SERVICES' &&
        this.roles.includes('cfsCustomer')
      ) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (
        key === 'INTEGRATED_CHEMICAL_WAREHOUSE' &&
        this.roles.includes('icwCustomer')
      ) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (
        key === 'COMMON_WAREHOUSE_COMMON_YARD' &&
        this.roles.includes('cwcyCustomer')
      ) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (
        key === 'INTEGRATED_CHEMICAL_YARD' &&
        this.roles.includes('icysCustomer')
      ) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (
        key === 'MACHINERY_HANDLING_EQUIPMENT' &&
        this.roles.includes('mheCustomer')
      ) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (
        key === 'PETROLEUM_SUPPLY_BASE' &&
        this.roles.includes('psbCustomer')
      ) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (key === 'MARINE' && this.roles.includes('marineCustomer')) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (key === 'PROPERTY_RENTAL' && this.roles.includes('propCustomer')) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      if (key === 'CREW_TRANSFER' && this.roles.includes('crewCustomer')) {
        arrServiceType.push({
          content: serviceType[key].toString().replace(/_/g, ' '),
        });
      }

      this.allowedModules = arrServiceType.map(({ content }) =>
        content.toString().replace(/ /g, '_')
      );
      // arrServiceType.push({
      //   content: serviceType[key].toString().replace(/_/g, ' '),
      // });
    }
    this.serviceTypeSelection = arrServiceType;
  }

  userInfo() {
    this.userInfoPromise = this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.customerCode = initialData.CustomerCode;
        this.company = initialData.Company;
        this.userId = initialData.Username;
        this.dataset = [];
        // this.getRestServiceAPI();
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

  filterValidation() {
    this.invalidFromDate = false;
    this.invalidToDate = false;
    let filterValidate = true;
    if (!this.dateFilterFrom) {
      filterValidate = false;
      this.invalidFromDate = true;
      this.invalidFromDateText = 'Required';
    }

    if (!this.dateFilterTo) {
      filterValidate = false;
      this.invalidToDate = true;
      this.invalidToDateText = 'Required';
    }

    // if (!this.serviceType || this.serviceType.length == 0) {
    //   filterValidate = false;
    // }

    if (filterValidate) {
      this.dateFilterFrom = new Date(this.dateFilterFrom);
      this.dateFilterTo = new Date(this.dateFilterTo);
      this.dateFilterTo.setHours(23, 59, 59);
      if (this.dateFilterTo.getTime() < this.dateFilterFrom.getTime()) {
        filterValidate = false;
        this.invalidToDate = true;
        this.invalidToDateText =
          'This date cannot be earlier than the Service Date From.';
      }
    }
    return filterValidate;
  }

  getRestServiceAPI(el?: HTMLElement) {
    // this.buildfromPartsList = this.buildfromParts;
    if (this.filterValidation()) {
      this.isLoading = true;
      this.overlay = true;
      this.dataset = [];
      // let dateParam = this.dateFilter.map((date) => {
      //   return date.getTime();
      // });
      let dateParam = [
        this.dateFilterFrom.getTime(),
        this.dateFilterTo.getTime(),
      ];
      dateParam.sort(function (a, b) {
        return a - b;
      });
      let module = '';
      if (!this.serviceType || this.serviceType.length > 0) {
        module = this.serviceType?.replaceAll(' ', '_');
      }
      let param = {
        customerCode: this.customerCode,
        customerName: this.company,
        userId: this.userId,
        dateFrom: dateParam[0],
        dateTo: dateParam[1],
        module:
          module === undefined || module.length < 1
            ? JSON.stringify(this.allowedModules)
            : JSON.stringify([module]),
      };
      // const params = { customerCode: this.customerCode, userId: this.userId };\
      this.dataset = [];
      restServices.pbksb_DashBoardService
        .getDashboardDetailsByAgentFilteredByDateAndModule(
          this.appService.myApp
        )(param)
        .then((result) => {
          el?.scrollIntoView();
          this.dataset = [];
          this.isLoading = false;
          this.overlay = false;
          this.notificationAndAttentionListByAgent = [];

          let requestList: any = result;
          let request = JSON.parse(requestList);
          this.notificationAndAttentionListByAgent =
            request.notificationAndAttentionListByAgent;
          this.setNotificationAndAttentionListByAgent();
          if (this.notificationAndAttentionListByAgent.length > 5) {
            this.notificationAndAttentionList5ByAgent =
              this.notificationAndAttentionListByAgent.slice(0, 5);
          } else {
            this.notificationAndAttentionList5ByAgent =
              this.notificationAndAttentionListByAgent;
          }

          this.latestServiceRequestListByAgent =
            request.latestServiceRequestListByAgent;

          this.setLatestServiceRequestList();

          this.latestServiceRequestListByAgent.forEach((value, index) => {
            this.apiRespValidation(value);
            this.pushDataSet(index);
          });
          this.startPagination();
        })
        .catch((err) => {
          this.isLoading = false;
          this.overlay = false;
        });
    }
  }

  //start pagination
  startPagination() {
    this.model.data = [[]];
    this.model.currentPage = 1;
    this.model.pageLength = 10;

    this.model.totalDataLength = this.dataset.length;
    this.selectPage(this.model.currentPage);
  }

  apiRespValidation(value: any) {
    if (value.RequestNo) {
      this.RequestNo = { requestNo: value.RequestNo, url: value.url };
    } else {
      this.RequestNo = 'N/A';
    }
    if (value.ServiceType) {
      this.ServiceType = value.ServiceType.toUpperCase();
    } else {
      this.ServiceType = 'N/A';
    }
    if (value.ReqType.trim()) {
      this.ReqType = value.ReqType.toUpperCase().replaceAll('_', ' ');
    } else {
      this.ReqType = 'N/A';
    }

    if (value.ReqDate) {
      let formatReqDate = new Date(value.ReqDate);
      if (formatReqDate instanceof Date && !isNaN(formatReqDate.getTime())) {
        this.ReqDate = formatDate(formatReqDate, 'dd/MM/yyyy', 'en_US');
      } else {
        this.ReqDate = value.ReqDate;
      }
    } else {
      this.ReqDate = 'N/A';
    }

    if (value.BookingDate) {
      let formatBookingDate = new Date(value.BookingDate);
      if (
        formatBookingDate instanceof Date &&
        !isNaN(formatBookingDate.getTime())
      ) {
        this.BookingDate = formatDate(formatBookingDate, 'dd/MM/yyyy', 'en_US');
      } else {
        this.BookingDate = value.BookingDate;
      }
      // this.BookingDate = value.BookingDate;
    } else {
      this.BookingDate = 'N/A';
    }
    if (value.Status) {
      this.Status = value.Status.toUpperCase().replaceAll('_', ' ');
      this.Status = this.titlecasePipe.transform(this.Status);
    } else {
      this.Status = 'N/A';
    }
    // if(value.url){
    //   this.url =value.url;
    // }else{
    //   this.url='N/A';
    // }
    // if (value.ReqDate) {
    //   this.PartsIssueDate = formatDate(value.issue_date, 'dd/MM/yyyy', 'en_US');
    // } else {
    //   this.PartsIssueDate = 'N/A';
    // }
  }

  //prepare data to be added to tableitem in pagination function to dataset
  pushDataSet(index: any) {
    this.dataset.push({
      number: index + 1,
      RequestNo: this.RequestNo,
      ServiceType: this.ServiceType,
      ReqType: this.ReqType,
      ReqDate: this.ReqDate,
      BookingDate: this.BookingDate,
      Status: this.Status,
      // url:this.url
    });
  }

  setNotificationAndAttentionListByAgent() {
    for (let i = 0; i < this.notificationAndAttentionListByAgent.length; i++) {
      let statusFormatted = this.notificationAndAttentionListByAgent[
        i
      ].Status?.toUpperCase().replaceAll('_', ' ');
      if (statusFormatted === 'CANCELLED' || statusFormatted === 'CANCELED') {
        this.notificationAndAttentionListByAgent[i].StatusMessage =
          'is cancelled by admin as requested.';
      } else if (statusFormatted === 'ON HOLD') {
        this.notificationAndAttentionListByAgent[i].StatusMessage =
          'is On-Hold, please make the required payment before it can be processed by KSB.';
      } else if (statusFormatted === 'PENDING ENDORSEMENT') {
        this.notificationAndAttentionListByAgent[i].StatusMessage =
          'is completed. Please endorse this Job Ticket.';
      } else if (statusFormatted === 'PENDING ENDORSEMENT CANCELLED') {
        this.notificationAndAttentionListByAgent[i].StatusMessage =
          'is cancelled. Please endorse the cancellation of this job ticket.';
      }

      if (this.notificationAndAttentionListByAgent[i].serviceType === 'PSB') {
        if (
          this.notificationAndAttentionListByAgent[i].ReqType === 'Goods Out'
        ) {
          this.notificationAndAttentionListByAgent[i].Path =
            '/wms/psb-goods-out-preview';
        } else if (
          this.notificationAndAttentionListByAgent[i].ReqType === 'Goods In'
        ) {
          this.notificationAndAttentionListByAgent[i].Path =
            '/wms/psb-goods-in-preview';
        }
      } else if (
        this.notificationAndAttentionListByAgent[i].serviceType === 'SWM'
      ) {
        if (this.notificationAndAttentionListByAgent[i].ReqType === 'Inbound') {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/sw-inbound-so-report-view';
        } else if (
          this.notificationAndAttentionListByAgent[i].ReqType === 'Outbound'
        ) {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/sw-outbound-so-report-view';
        }
      } else if (
        this.notificationAndAttentionListByAgent[i].serviceType === 'CFS'
      ) {
        if (this.notificationAndAttentionListByAgent[i].ReqType === 'STORAGE') {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/cfs-request-preview';
        } else {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/cfs-other-activities-request-preview';
        }
      } else if (
        this.notificationAndAttentionListByAgent[i].serviceType === 'MHE'
      ) {
        if (this.notificationAndAttentionListByAgent[i].JTReqNo.includes('/')) {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/mhe-job-ticket-preview';
        } else {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/mhe-request-preview-endorse';
        }
      } else if (
        this.notificationAndAttentionListByAgent[i].serviceType === 'WMS'
      ) {
        this.notificationAndAttentionListByAgent[i].Path =
          '/operation-system/waste-disposal-preview';
      } else if (
        this.notificationAndAttentionListByAgent[i].serviceType === 'MARINE'
      ) {
        this.notificationAndAttentionListByAgent[i].Path =
          '/operation-system/marine-berth-occupancy-docket-details';
      } else if (
        this.notificationAndAttentionListByAgent[i].serviceType === 'ICW'
      ) {
        if (this.notificationAndAttentionListByAgent[i].ReqType === 'Storage') {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/icw-request-storage-view';
        } else {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/icw-transfer-view';
        }
      } else if (
        this.notificationAndAttentionListByAgent[i].serviceType === 'CWCY'
      ) {
        if (this.notificationAndAttentionListByAgent[i].JTReqNo.includes('R')) {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/cwcy-goods-release-form-view';
        } else {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/cwcy-goods-receiving-form-view';
        }
      } else if (
        this.notificationAndAttentionListByAgent[i].serviceType ===
        'Crew Transfer'
      ) {
        if (
          this.notificationAndAttentionListByAgent[i].JTReqNo.ReqType ==
          'Sign Off'
        ) {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/ct-sign-off-view';
        } else {
          this.notificationAndAttentionListByAgent[i].Path =
            '/operation-system/ct-sign-on-view';
        }
      }
    }
  }

  setLatestServiceRequestList() {
    for (let i = 0; i < this.latestServiceRequestListByAgent.length; i++) {
      if (this.latestServiceRequestListByAgent[i].ServiceType === 'PSB') {
        if (this.latestServiceRequestListByAgent[i].ReqType === 'Goods Out') {
          this.latestServiceRequestListByAgent[i].url =
            '/wms/psb-goods-out-preview';
        } else if (
          this.latestServiceRequestListByAgent[i].ReqType === 'Goods In'
        ) {
          this.latestServiceRequestListByAgent[i].url =
            '/wms/psb-goods-in-preview';
        }
      } else if (
        this.latestServiceRequestListByAgent[i].ServiceType === 'SWM'
      ) {
        if (this.latestServiceRequestListByAgent[i].ReqType === 'Inbound') {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/sw-inbound-view';
        } else if (
          this.latestServiceRequestListByAgent[i].ReqType === 'Outbound'
        ) {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/sw-outbound-view';
        }
      } else if (
        this.latestServiceRequestListByAgent[i].ServiceType === 'CFS'
      ) {
        if (this.latestServiceRequestListByAgent[i].ReqType === 'STORAGE') {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/cfs-request-preview';
        } else {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/cfs-other-activities-request-preview';
        }
      } else if (
        this.latestServiceRequestListByAgent[i].ServiceType === 'MHE'
      ) {
        // this.latestServiceRequestListByAgent[i].url="/operation-system/mhe-request-preview-endorse";
        if (this.latestServiceRequestListByAgent[i].RequestNo.includes('/')) {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/mhe-job-ticket-preview';
        } else {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/mhe-request-preview-endorse';
        }
      } else if (
        this.latestServiceRequestListByAgent[i].ServiceType === 'WMS'
      ) {
        this.latestServiceRequestListByAgent[i].url =
          '/operation-system/waste-disposal-preview';
      } else if (
        this.latestServiceRequestListByAgent[i].ServiceType === 'MARINE'
      ) {
        if (this.latestServiceRequestListByAgent[i].Status === 'INITIATED') {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/marine-berth-request-form/';
        } else {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/marine-berth-request-list-preview';
        }
      } else if (
        this.latestServiceRequestListByAgent[i].ServiceType === 'ICW'
      ) {
        if (this.latestServiceRequestListByAgent[i].ReqType === 'Storage') {
          if (this.latestServiceRequestListByAgent[i].Status === 'Endorsed') {
            this.latestServiceRequestListByAgent[i].url =
              '/operation-system/icw-request-storage-endorsed-view/';
          } else {
            this.latestServiceRequestListByAgent[i].url =
              '/operation-system/icw-request-storage-view';
          }
        } else if (
          this.latestServiceRequestListByAgent[i].ReqType === 'Transfer'
        ) {
          if (this.latestServiceRequestListByAgent[i].Status === 'Endorsed') {
            this.latestServiceRequestListByAgent[i].url =
              '/operation-system/icw-transfer-endorsed-view';
          } else {
            this.latestServiceRequestListByAgent[i].url =
              '/operation-system/icw-transfer-view';
          }
        } else if (
          this.latestServiceRequestListByAgent[i].ReqType === 'Add. Service'
        ) {
          if (this.latestServiceRequestListByAgent[i].Status === 'Endorsed') {
            this.latestServiceRequestListByAgent[i].url =
              '/operation-system/icw-as-endorsed-view';
          } else {
            this.latestServiceRequestListByAgent[i].url =
              '/operation-system/icw-as-view';
          }
        }
      } else if (
        this.latestServiceRequestListByAgent[i].ServiceType === 'Crew Transfer'
      ) {
        if (this.latestServiceRequestListByAgent[i].ReqType === 'Sign On') {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/ct-sign-on-view/';
        } else if (
          this.latestServiceRequestListByAgent[i].ReqType === 'Sign Off'
        ) {
          this.latestServiceRequestListByAgent[i].url =
            '/operation-system/ct-sign-off-view/';
        }
      }
    }
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
      this.overlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.isLoading = false;
      this.overlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.isLoading = false;
      this.overlay = false;
    }
    if (event instanceof NavigationError) {
      this.isLoading = false;
      this.overlay = false;
    }
  }

  public openModal() {
    this.modalService.create({
      component: ListNotificationComponent,
      inputs: {
        agentNotificationList: this.notificationAndAttentionListByAgent,
      },
    });
  }

  /*search filter*/
  searchFilter(searchString: string) {
    this.searchValue = searchString;
    this.dataset = [];

    let indexCounter = 0;

    this.latestServiceRequestListByAgent.forEach((value, index) => {
      this.apiRespValidation(value);

      const allDataCol =
        this.RequestNo.requestNo +
        this.ServiceType +
        this.ReqType +
        this.ReqDate +
        this.BookingDate +
        this.Status;
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
        this.dataset[i].RequestNo,
        this.dataset[i].ServiceType,
        this.dataset[i].ReqType,
        this.dataset[i].ReqDate,
        this.dataset[i].BookingDate,
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
              data: { RequestNo: dataElement, link: dataElement },
              title: dataElement,
              template: this.customTableItemTemplate,
            })
          );
        }
        // else if(index == 5){
        //   row.push(
        //     new TableItem({
        //       data: { Status: dataElement },
        //       title: dataElement,
        //       template: this.customStatus,
        //     })
        //   );
        // }
        else {
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

  // selectPage(page: number) {
  // this.getPage(page).then((data: Array<Array<any>>) => {
  // 	// set the data and update page
  // 	this.APmodel.currentPage = page;
  // });

  // }
  convertTime() {
    var interval = setInterval(() => {
      var seconds = this.secondsLeft;
      let dayTime = 60 * 60 * 24;
      var day = Math.floor(seconds / dayTime);
      let remainingTime = seconds - dayTime * day;
      let hoursTime = 60 * 60;
      this.hours = Math.floor(remainingTime / hoursTime);
      remainingTime = remainingTime - hoursTime * this.hours;
      let minTime = 60;
      this.minutes = Math.floor(remainingTime / minTime);
      remainingTime = remainingTime - minTime * this.minutes;
      var second = Math.floor(remainingTime);
      this.secondsLeft--;

      this.showTime =
        this.hours + ' hrs ' + this.minutes + ' mins ' + second + ' secs';

      if (second == 0) {
        this.getCurrentDate();
      }
    }, 1000);
  }

  getCurrentDate() {
    this.getDatetime = new Date();

    var initialDate = new Date();
    var msSinceMidnight = this.getDatetime - initialDate.setHours(0, 0, 0, 0);
    var secondsSinceMidnight = Math.round(msSinceMidnight / 1000);

    this.secondsLeft = this.totalSecond - secondsSinceMidnight;
    if (Math.sign(this.secondsLeft) == -1) {
      this.secondsLeft = 0;
    }

    this.getDatetime = formatDate(
      this.getDatetime,
      'HH:mm EEEE, dd/MM/yyyy',
      'en_US'
    );
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
      1: 'RequestNo',
      2: 'ServiceType',
      3: 'ReqType',
      4: 'ReqDate',
      5: 'BookingDate',
      6: 'Status',
    };

    if (orientation == 'ASC') {
      if (index === 5) {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingDate);
      } else {
        this.key = sort[index];
        this.dataset.sort(this.sortAscendingNormal);
      }
    } else if (orientation == 'DESC') {
      if (index === 5) {
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

  clearSearch() {
    this.searchModel = '';
    this.sortingOn = false;
    this.asc[this.index] = false;
    this.desc[this.index] = false;
    document.getElementById('header' + this.index).classList.remove('toggle');
  }

  //-----------------------------Custom sorting end ----------------------------------//

  dateFilterDefault() {
    this.today = new Date();
    var date = new Date(new Date().setDate(new Date().getDate() - 30));
    this.dateFilterTo = this.today;
    this.dateFilterFrom = date;
  }

  ngOnDestroy(): void {
    // this.roleSub.unsubscribe();
  }
}
