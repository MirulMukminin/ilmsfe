import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from '../services/MHE/request-form.service';
@Component({
  selector: 'app-cfs-other-request-preview',
  templateUrl: './cfs-other-request-preview.component.html',
  styleUrls: ['./cfs-other-request-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class CfsOtherRequestPreviewComponent implements OnInit {
  formData;
  name;
  // initial Data
  companyName: string = '';
  requestBy: string = '';
  formNo: string = '';

  // data
  requestType: string = '';
  bookingDate: string = '';
  time: string = '';
  poNumber: string;
  location: string = '';
  vessel: string = '';
  status: string = '';

  status_dict = {
    INITIATE: 'Initiated',
    CANCELED: 'Cancelled',
    SUBMITTED: 'Submitted',
    IN_PROGRESS: 'In Progress',
  };

  // table data
  inboundWasteDetails = [];
  housekeepingDetails = [];
  loadingCablingDetails = [];
  plugOnOffDetails = [];
  repairDetails = [];
  storageDetail = [];
  handlingFeeDetails = [];

  // control
  isCancelDisplay: boolean = false;
  isEditDisplay: boolean = false;
  isEndorseDisplay: boolean = false;
  open: boolean = false;
  openEndorsed: boolean = false;

  previousURL;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
        this.name = initialData.Fullname;
        let orderNo = this.activatedRoute.snapshot.paramMap.get('formNo');

        this.getRestServiceAPI(initialData.Company, orderNo);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  private getRestServiceAPI(company, orderNo: string) {
    let params = { customer: company };

    let getParams = { ticketNo: orderNo };
    restServices.pbksb_RequestCFSService
      .getRequestByTicketNumber(this.appService.myApp)(getParams)
      .then((result) => {
        let arr: any = result;
        let request = this.appService.jsonToArray(arr);
        this.formData = request;
        this.populateData(this.formData);
      });
  }

  populateData(value) {
    this.companyName = value.customerName ? value.customerName.name : '-';
    this.requestBy = value.requestedBy
      ? value.requestedBy?.username?.name
      : '-';
    this.formNo = value.ticketNumber ? value.ticketNumber : '-';
    this.requestType = value.requestType
      ? value.requestType.replaceAll('_', ' ')
      : '-';
    this.bookingDate = value.date ? value.date : '-';
    this.poNumber = value?.poNumber ?? '-';
    this.location = value.location ? value.location.description : '-';
    this.vessel = value.vessel ? value.vessel.name : '-';
    this.status = value.status ? value.status.replaceAll('_', ' ') : '-';
    this.status = this.titlecasePipe.transform(this.status);

    if (value.plugOnLine.length > 0) {
      value.plugOnLine.forEach((item) => {
        this.plugOnOffDetails.push({
          containerNo: item.container ? item.container.containerNumber : '-',
          containerType: item.containerType
            ? item.containerType.replaceAll('_', '/')
            : '-',
          time: item.time ? item.time : '-',
          status: item.status
            ? this.titlecasePipe.transform(item.status.replace(/_/g, ' '))
            : '-',
          remarks: item.remarks ? item.remarks : '-',
          plugOn: item.plugOn ? 'YES' : 'N/A',
          plugOff: item.plugOff ? 'YES' : 'N/A',
        });
      });
    }

    if (value.loadingLine.length > 0) {
      value.loadingLine.forEach((item) => {
        this.loadingCablingDetails.push({
          containerNo: item.container ? item.container.containerNumber : '-',
          containerType: item.containerType
            ? item.containerType.replaceAll('_', '/')
            : '-',
          cablingOnVessel: item.cablingOnVessel ? 'YES' : 'N/A',
          fourCore: item.fourCoreDNV ? 'YES' : 'N/A',
          remarks: item.remarks ? item.remarks : '-',
          time: item.time ? item.time : '-',
          status: item.status
            ? this.titlecasePipe.transform(item.status.replace(/_/g, ' '))
            : '-',
        });
      });
    }

    if (value.housekeepingLine.length > 0) {
      value.housekeepingLine.forEach((item) => {
        this.housekeepingDetails.push({
          containerNo: item.container ? item.container.containerNumber : '-',
          containerType: item.containerType
            ? item.containerType.replaceAll('_', '/')
            : '-',
          housekeeping: item.housekeepingRequired ? 'YES' : 'N/A',
          cleaning: item.cleaningRequired ? 'YES' : 'N/A',
          stuffing: item.stuffingRequired ? 'YES' : 'N/A',
          remarks: item.remarks ? item.remarks : '-',
          time: item.time ? item.time : '-',
          status: item.status
            ? this.titlecasePipe.transform(item.status.replace(/_/g, ' '))
            : '-',
        });
      });
    }

    if (value.repairLine.length > 0) {
      value.repairLine.forEach((item) => {
        this.repairDetails.push({
          containerNo: item.container ? item.container.containerNumber : '-',
          containerType: item.containerType
            ? item.containerType.replaceAll('_', '/')
            : '-',
          repairRequired: item.repair ? 'YES' : 'NO',
          repair: item.repairRequest ? item.repairRequest : '-',
          outsideInsideBonded: item.outsideInsideBonded
            ? item.outsideInsideBonded.toUpperCase()
            : '-',
          containerReturn: item.containerReturn ? 'YES' : 'NO' ?? '-',
          remarks: item.remarks ? item.remarks : '-',
          time: item.time ? item.time : '-',
          status: item.status
            ? this.titlecasePipe.transform(item.status.replace(/_/g, ' '))
            : '-',
        });
      });
    }

    if (this.requestType === 'HANDLING FEE TRANSPORT') {
      value.requestLine.forEach((item) => {
        this.handlingFeeDetails.push({
          containerNo: item.container ? item.container.containerNumber : '-',
          remarks: item.remarks ? item.remarks : '-',
        });
      });
    }

    // if (value.requestLine) {
    //   if (this.requestType === 'PLUG ON OFF') {
    //     value.requestLine.forEach((item) => {
    //       this.plugOnOffDetails.push({
    //         containerNo: item.container ? item.container.containerNumber : '-',
    //         remarks: item.remarks ? item.remarks : '-',
    //         plugOn: item.plugOn ? item.container.containerType : 'N/A',
    //         plugOff: item.plugOff ? 'YES' : 'N/A',
    //       });
    //     });
    //   } else if (this.requestType === 'STORAGE') {
    //     value.requestLine.forEach((item) => {
    //       this.storageDetail.push({
    //         containerNo: item.container ? item.container.containerNumber : '-',
    //         remarks: item.remarks ? item.remarks : '-',
    //       });
    //     });
    //   } else if (this.requestType === 'LOADING CABLING') {
    //     value.requestLine.forEach((item) => {
    //       this.loadingCablingDetails.push({
    //         containerNo: item.container ? item.container.containerNumber : '-',
    //         containerType: item.container ? item.container.containerType : '-',
    //         cablingOnVessel: item.cablingOnVessel ? 'YES' : 'N/A',
    //         fourCore: item.fourCoreDNV ? 'YES' : 'N/A',
    //         remarks: item.remarks ? item.remarks : '-',
    //       });
    //     });
    //   } else if (this.requestType === 'HOUSEKEEPING CLEANING STUFFING') {
    //     value.requestLine.forEach((item) => {
    //       this.housekeepingDetails.push({
    //         containerNo: item.container ? item.container.containerNumber : '-',
    //         housekeeping: item.housekeepingRequired ? 'YES' : 'N/A',
    //         cleaning: item.cleaningRequired ? 'YES' : 'N/A',
    //         stuffing: item.stuffingRequired ? 'YES' : 'N/A',
    //         remarks: item.remarks ? item.remarks : '-',
    //       });
    //     });
    //   } else if (this.requestType === 'REPAIR') {
    //     value.requestLine.forEach((item) => {
    //       this.repairDetails.push({
    //         containerNo: item.container ? item.container.containerNumber : '-',
    //         repairRequired: item.repair ? 'YES' : 'NO',
    //         repair: item.repairRequest ? item.repairRequest : '-',
    //         outsideInsideBonded: item.outsideInsideBonded
    //           ? item.outsideInsideBonded
    //           : '-',
    //         remarks: item.remarks ? item.remarks : '-',
    //       });
    //     });
    //   } else if (this.requestType === 'HANDLING FEE TRANSPORT') {
    //     value.requestLine.forEach((item) => {
    //       this.handlingFeeDetails.push({
    //         containerNo: item.container ? item.container.containerNumber : '-',
    //         remarks: item.remarks ? item.remarks : '-',
    //       });
    //     });
    //   }
    // }

    // value.inboundWasteList.foreach((item) => {
    //   let detail = {
    //     wasteCode: item.wasteCode,
    //     qty: item.quantity,
    //     UOM: item.oum,
    //     time: item.time,
    //     location: item.location ? item.location.description : '-',
    //     status: item.status,
    //     selected: false,
    //   };
    //   this.inboundWasteDetails.push(detail);
    // });

    this.checkButtonDisplay();
  }

  checkButtonDisplay() {
    if (this.status === 'Submitted') {
      this.isCancelDisplay = true;
      this.isEditDisplay = true;
      this.isEndorseDisplay = false;
    } else if (this.status === 'Cancelled') {
      this.isCancelDisplay = false;
      this.isEditDisplay = false;
      this.isEndorseDisplay = false;
    } else if (this.status === 'Pending Endorsement') {
      this.isCancelDisplay = false;
      this.isEditDisplay = false;
      this.isEndorseDisplay = true;
    } else {
      this.isCancelDisplay = false;
      this.isEditDisplay = false;
    }

    if (this.requestType === 'HANDLING FEE TRANSPORT') {
      this.isCancelDisplay = false;
      this.isEditDisplay = false;
    }
  }

  onCancel() {
    this.open = false;
    let params = {
      form: {
        ticketNo: this.formNo,
        cancelledBy: this.name,
      },
    };

    restServices.pbksb_RequestCFSService
      .cancelCFSRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        if (returnObj.success) {
          let dateNow = new Date();
          this.router
            .navigate(['/operation-system/cfs-request-list'])
            .then(() => {
              this.appService.showToaster({
                type: 'error',
                title: 'Cancelled',
                subtitle: this.formNo + ' is Cancelled.',
                time: formatDate(dateNow, 'HH:mm', 'en-US'),
              });
            });
        }
      });
  }

  onEndorse() {
    this.openEndorsed = false;
    let params = {
      form: {
        ticketNo: this.formNo,
        endorsedBy: this.name,
      },
    };
    restServices.pbksb_RequestCFSService
      .endorseCFSRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        let currDate = new Date();
        if (returnObj.success) {
          this.router
            .navigate(['/operation-system/cfs-endorsed-list'])
            .then(() => {
              this.appService.showToaster({
                type: 'success',
                title: 'Form Endorsed',
                subtitle:
                  'Form No. ' +
                  returnObj.requestNo +
                  ' is successfully endorsed.',
                time: formatDate(currDate, 'HH:mm', 'en-US'),
              });
            });
        } else {
          this.appService.showToaster({
            type: 'error',
            title: 'Cannot Endorsed',
            subtitle: returnObj.errorMessage,
            // 'The request has failed to be submitted. Please try again',
            time: formatDate(currDate, 'HH:mm', 'en-US'),
          });
        }
      });
  }

  onPrint() {
    window.print();
  }

  redirectToPrevious() {
    history.back();
    // this.previousURL = this.requestFormService.getPreviousUrl();
    // this.router.navigate([this.previousURL]);
    // if (this.status === 'ENDORSED') {
    //   this.router.navigate(['/operation-system/cfs-endorsed-list']);
    // } else {
    //   this.router.navigate(['/operation-system/cfs-request-list']);
    // }
  }
}
