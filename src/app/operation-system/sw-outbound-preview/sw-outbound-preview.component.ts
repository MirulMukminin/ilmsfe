import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from '../services/MHE/request-form.service';

@Component({
  selector: 'app-sw-outbound-preview',
  templateUrl: './sw-outbound-preview.component.html',
  styleUrls: ['./sw-outbound-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class SwOutboundPreviewComponent implements OnInit {
  // // initial Data
  serviceOrderNo: string = '';

  // data
  reqOnBehalf: string;
  jobDesc: string;
  poNo: string;
  bookingDate: string;
  remarks: string;
  status: string;
  submitData: any;
  companyName: string;
  requestBy: string;
  refNo: string;
  time = '';
  rawBookingDate = '';
  outboundWasteDetails = [];
  openModal = false;
  isLoading = false;
  overlay = false;
  previousURL = '';

  constructor(
    private appService: AppService,
    private router: Router,
    private requestFormService: RequestFormService,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.userInfo();
    this.loadData();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
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
  loadData() {
    this.submitData = this.appService.passOutBoundObj;

    if (this.submitData) {
      this.rawBookingDate = this.submitData.form.bookingDate;
      const formattedBookingDate = formatDate(
        this.submitData.form.bookingDate,
        'd/M/yyyy',
        'en_us'
      );

      this.companyName = this.submitData.form.companyName;
      this.requestBy = this.submitData.form.requestBy;
      this.reqOnBehalf = this.submitData.form.requestOnBehalf;
      this.jobDesc = this.submitData.form.jobDescription;
      this.poNo = this.submitData.form.poNumber;
      this.bookingDate = formattedBookingDate;
      this.remarks = this.submitData.form.remarks;
      this.refNo = this.submitData.form.referenceNo;

      this.submitData.form.outboundWasteDetailsList.forEach((value, index) => {
        const dateTime = value.expiryDateOriginal.toString().split(' ');

        if (dateTime[1]) {
          this.time = dateTime[1].substring(0, 8);
        } else {
          this.time = '00:00:00.000';
        }
        const sDate = formatDate(value.expiryDateOriginal, 'M/d/yyyy', 'en_us');
        var properFormatExpiryDate = new Date(sDate + ' ' + this.time)
          .getTime()
          .toString();
        this.outboundWasteDetails.push({
          palletId: value.palletId,
          wasteCode: value.wasteCode,
          oum: value.oum,
          quantity: value.quantity,
          palletWeight: value.weight,
          location: value.location,
          niceFormatExpiryDate: value.expireDate,
          expiryDate: properFormatExpiryDate,
        });
      });
    }
  }
  onclickOpenModal() {
    this.openModal = true;
  }
  onSubmit() {
    this.isLoading = true;
    this.overlay = true;
    const dateTime = this.rawBookingDate.toString().split(' ');
    this.time = dateTime[4].substring(0, 8);
    const sDate = formatDate(this.rawBookingDate, 'M/d/yyyy', 'en_us');
    var latestBookingDate = new Date(sDate + ' ' + this.time)
      .getTime()
      .toString();
    const data = {
      form: {
        companyName: this.companyName,
        requestBy: this.requestBy,
        requestOnBehalf: this.reqOnBehalf,
        bookingDate: latestBookingDate,
        jobDescription: this.jobDesc,
        remark: this.remarks,
        poNumber: this.poNo,
        referenceNo: this.refNo,
        outboundWasteDetailsList: this.outboundWasteDetails,
      },
    };
    restServices.pbksb_ScheduledWasteService
      .createOutboundScheduledWasteForm(this.appService.myApp)(data)
      .then((result) => {
        this.isLoading = false;
        this.overlay = false;
        let resArr: any = result;
        var apiResponse = JSON.parse(resArr);
        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
        if (apiResponse.success == true) {
          let notiObject = {
            type: 'success',
            title: 'Submitted',
            subtitle: apiResponse.requestNo + ' is successfully submited',
            time: currentTime,
          };
          this.appService.showToaster(notiObject);
          this.router.navigate([
            '/operation-system/sw-inbound-outbound-list/outbound',
          ]);
        } else {
          let errorObject = {
            type: 'error',
            title: 'Cannot Submit',
            subtitle:
              'The request has failed to be submitted. Please try again',
            time: currentTime,
          };
          this.appService.showToaster(errorObject);
          this.router.navigate([
            '/operation-system/sw-inbound-outbound-list/outbound',
          ]);
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.overlay = false;
        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
        let errorObject = {
          type: 'error',
          title: 'Cannot Submit',
          subtitle: 'The request has failed to be submitted. Please try again',
          time: currentTime,
        };
        this.appService.showToaster(errorObject);
        this.router.navigate([
          '/operation-system/sw-inbound-outbound-list/outbound',
        ]);
      });
  }
  onPrint() {
    window.print();
  }

  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();

    this.router.navigate([this.previousURL]);
  }
}
