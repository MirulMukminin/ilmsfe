import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sw-inbound-view',
  templateUrl: './sw-inbound-view.component.html',
  styleUrls: ['./sw-inbound-view.component.scss'],
})
export class SwInboundViewComponent implements OnInit {
  inboundView;
  // initial Data
  companyName: string = '';
  requestBy: string = '';
  serviceOrderNo: string = '';

  // data
  reqOnBehalf: string = '';
  jobDesc: string = '';
  collection: string = '';
  poNo: string = '';
  bookingDate: string = '';
  remarks: string = '';
  oddSize: string = '';
  oddSizeRemarks: string = '';
  refNo: string = '';
  additionalServices: string = '';
  status: string = '';

  status_dict = {
    INITIATE: 'Initiated',
    CANCELED: 'Cancelled',
    SUBMITTED: 'Submitted',
    IN_PROGRESS: 'In Progress',
  };

  isLoading: boolean = false;
  overlay: boolean = false;

  // table data
  inboundWasteDetails = [];

  // control
  isCancelDisplay: boolean = false;
  open: boolean = false;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userInfo();
    window.scrollTo(0, 0);
    // if (this.serviceOrderNo == 'SW000000009') {
    //   this.status = 'In Progress';
    //   this.isCancelDisplay = false;
    //   let date = new Date(this.bookingDate);
    //   let date = formatDate(this.bookingDate, 'd-M-Y', 'en-US');
    //   let dateSplit = this.bookingDate.split('/');
    //   let date = new Date(+dateSplit[2], +dateSplit[1] - 1, +dateSplit[0]);
    //   console.log(dateSplit);
    //   console.log(date);
    // }
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        // this.name = initialData.Fullname;
        let orderNo = this.activatedRoute.snapshot.paramMap.get('orderNo');

        this.getRestServiceAPI(orderNo);
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

  private getRestServiceAPI(orderNo: string) {
    const param = { jobNo: orderNo };

    restServices.pbksb_ScheduledWasteService
      .getInboundRequestByRequestNumber(this.appService.myApp)(param)
      .then((result) => {
        this.inboundView = this.appService.jsonToArray(result);

        // this.checkOptional();
        this.populateData(this.inboundView);
      });
  }

  populateData(value) {
    this.companyName = value.customer ? value.customer.name : '-';
    this.requestBy = value.requestedBy ? value.requestedBy.fullname : '-';
    this.serviceOrderNo = value.jobNo ? value.jobNo : '-';
    this.bookingDate = value.bookingDate
      ? new Date(value.bookingDate).toString()
      : '-';
    this.reqOnBehalf = value.requestOnBehalf
      ? 'name' in value.requestOnBehalf
        ? value.requestOnBehalf.name
        : '-'
      : '-';
    this.jobDesc = value.jobDescription ? value.jobDescription : '-';
    this.collection = value.collection ? 'Yes' : 'No';
    this.oddSize = value.oddSize ? 'Yes' : 'No';
    this.oddSizeRemarks = value.oddSizeRemark ? value.oddSizeRemark : '-';
    this.poNo = value.poNumber ? value.poNumber : '-';
    this.remarks = value.remark ? value.remark : '-';
    this.refNo = value.referenceNo ? value.referenceNo : '-';
    this.additionalServices = value.additionalService ? 'Yes' : 'No';
    this.status = value.status ? this.status_dict[value.status] : '-';
    this.inboundWasteDetails = [];
    this.inboundWasteDetails = value.inboundWasteList.map((item) => ({
      wasteCode: item.wasteCode,
      qty: item.quantity,
      UOM: item.oum.replaceAll('_', ' '),
      time: item.time,
      location: item.location ? item.location.description : '-',
      status: item.status,
      selected: false,
    }));
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
    if (this.status === 'Initiated') {
      this.isCancelDisplay = true;
    } else if (this.status === 'Cancelled') {
      this.isCancelDisplay = false;
    }
  }

  checkSelected() {
    return this.inboundWasteDetails.some((item) => {
      return item.selected === true;
    });
  }

  cancelWasteDetails() {
    this.inboundWasteDetails.forEach((item) => {
      item.selected = false;
    });
  }

  onCancel() {
    this.isLoading = true;
    this.overlay = true;
    this.open = false;
    restServices.pbksb_ScheduledWasteService
      .cancelInboundRequest(this.appService.myApp)({
        jobNo: this.serviceOrderNo,
      })
      .then((result) => {
        this.isLoading = false;
        this.overlay = false;
        let returnObj = this.appService.jsonToArray(result);
        if (returnObj.success) {
          let dateNow = new Date();
          this.router
            .navigate(['/operation-system/sw-inbound-outbound-list'])
            .then(() => {
              this.appService.showToaster({
                type: 'error',
                title: 'Cancelled',
                subtitle: this.serviceOrderNo + ' is Cancelled.',
                time: formatDate(dateNow, 'HH:mm', 'en-US'),
              });
            });
        }
      });
  }

  deleteWasteDetails() {
    // restServices.pbksb_ScheduledWasteService.cancelWasteDetailJob(this.appService.myApp)({jobNo: this.serviceOrderNo, wasteCode: wasteCodeSeleced}).then((result) => {
    //   console.log(result);
    // })
    this.isLoading = true;
    this.overlay = true;

    let selected = this.inboundWasteDetails.filter((item) => {
      return item.selected === true;
    });
    console.log(selected);
    console.log(this.inboundWasteDetails);
    // const wasteCodeCancel = new Set(selected.map((item) => item.wasteCode));
    const wasteCodeCancelled = [];
    selected.forEach((item) => {
      let a = item.wasteCode;
      wasteCodeCancelled.push(item.wasteCode);
    });
    // console.log(wasteCodeCancelled);
    const params = {
      wasteDetailsForm: {
        jobNo: this.serviceOrderNo,
        wasteCodeList: wasteCodeCancelled,
      },
    };
    restServices.pbksb_ScheduledWasteService
      .cancelWasteDetailsJob(this.appService.myApp)(params)
      .then((result) => {
        this.isLoading = false;
        this.overlay = false;
        console.log(result);

        let returnObj = this.appService.jsonToArray(result);
        console.log(returnObj);
        if (returnObj.success) {
          let dateNow = new Date();

          this.appService.showToaster({
            type: 'error',
            title: 'Cancelled',
            subtitle: 'Waste Code is Cancelled Successfully.',
            time: formatDate(dateNow, 'HH:mm', 'en-US'),
          });
          this.ngOnInit();
        }
      });
  }

  onPrint() {
    window.print();
  }
}
