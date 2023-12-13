import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sw-outbound-view',
  templateUrl: './sw-outbound-view.component.html',
  styleUrls: ['./sw-outbound-view.component.scss'],
})
export class SwOutboundViewComponent implements OnInit {
  // initial Data
  companyName: string;
  requestBy: string;
  serviceOrderNo: string;

  // data
  reqOnBehalf: string;
  jobDesc: string;
  poNo: string;
  bookingDate: string;
  bookingDateOriginal: string;
  remarks: string;
  status: string;
  isCancelDisabled = false;

  isLoading = false;
  overlay = false;
  invalidCancelDate = false;
  outboundWasteDetails = [];

  // control
  isCancelDisplay: boolean = true;
  open: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private router: Router
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

        this.getRestServiceAPI(initialData);
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

  getRestServiceAPI(initData: any) {
    this.serviceOrderNo = this.activatedRoute.snapshot.paramMap.get('orderNo');
    // this.serviceOrderNo = 'SW12';

    var apiParam: any = { jobNo: this.serviceOrderNo };

    restServices.pbksb_ScheduledWasteService
      .getOutboundRequestByRequestNumber(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const resultsAPI = JSON.parse(resArr);

        this.companyName = resultsAPI.customer.name
          ? resultsAPI.customer.name
          : '-';
        this.requestBy = resultsAPI.requestedBy.fullname
          ? resultsAPI.requestedBy.fullname
          : '-';
        this.serviceOrderNo = resultsAPI.jobNo ? resultsAPI.jobNo : '-';
        if (resultsAPI.requestOnBehalf) {
          this.reqOnBehalf = resultsAPI.requestOnBehalf.name
            ? resultsAPI.requestOnBehalf.name
            : '-';
        } else {
          this.reqOnBehalf = '-';
        }
        this.jobDesc = resultsAPI.jobDescription
          ? resultsAPI.jobDescription
          : '-';
        this.poNo = resultsAPI.poNumber ? resultsAPI.poNumber : '-';
        this.bookingDateOriginal = resultsAPI.bookingDate;
        this.bookingDate = resultsAPI.bookingDate
          ? formatDate(resultsAPI.bookingDate, 'dd/MM/yyyy', 'en_US')
          : '-';
        this.remarks = resultsAPI.remark ? resultsAPI.remark : '-';
        this.status = resultsAPI.status ? resultsAPI.status : '-';
        if (this.status == 'CANCELED') {
          this.isCancelDisabled = true;
        } else {
          this.isCancelDisabled = false;
        }

        resultsAPI.outboundWasteList.forEach((value, i) => {
          let latestExpiryDate = formatDate(
            value.expiryDate,
            'dd/MM/yyyy',
            'en_US'
          );
          this.outboundWasteDetails.push({
            palletID: value.palletId,
            wasteCode: value.wasteCode,
            UOM: value.oum,
            qty: value.quantity,
            palletWeight: value.palletWeight,
            location: value.location?.description,
            expiryDate: latestExpiryDate,
          });
        });
      });
  }

  onCancel() {
    this.open = false;

    this.isLoading = true;
    this.overlay = true;

    const apiParam = {
      jobNo: this.serviceOrderNo,
    };

    // Get current date
    let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

    if (currentDate > this.bookingDateOriginal) {
      this.invalidCancelDate = true;
      this.isLoading = false;
      this.overlay = false;
    }

    if (!this.invalidCancelDate) {
      restServices.pbksb_ScheduledWasteService
        .cancelOutboundRequest(this.appService.myApp)(apiParam)
        .then((result) => {
          const resArr: any = result;
          const cancelOutboundRequestResult = JSON.parse(resArr);
          let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');

          this.isLoading = false;
          this.overlay = false;
          if (cancelOutboundRequestResult.success == true) {
            let notiObject = {
              type: 'error',
              title: 'Cancelled',
              subtitle: this.serviceOrderNo + ' is Cancelled',
              time: currentTime,
            };
            this.appService.showToaster(notiObject);
            this.router.navigate([
              '/operation-system/sw-inbound-outbound-list/outbound',
            ]);
          } else {
            let errorObject = {
              type: 'error',
              title: 'Cancel Error',
              subtitle:
                'The request has failed to be cancelled. Please try again',
              time: currentTime,
            };
            this.appService.showToaster(errorObject);
            this.router.navigate([
              '/operation-system/sw-inbound-outbound-list/outbound',
            ]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  onPrint() {
    window.print();
  }
}
