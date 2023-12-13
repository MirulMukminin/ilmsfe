import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from '../services/MHE/request-form.service';
import { SwmInboundForm } from '../services/SWM/swm-inbound-form.service';

@Component({
  selector: 'app-sw-inbound-preview',
  templateUrl: './sw-inbound-preview.component.html',
  styleUrls: ['./sw-inbound-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class SwInboundPreviewComponent implements OnInit {
  previousURL: string = '';
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

  // table data
  inboundWasteDetails = [];

  // control
  isCancelDisplay: boolean = true;

  // modal
  open: boolean = false;

  isLoading: boolean = false;
  overlay: boolean = false;

  constructor(
    private appService: AppService,
    private requestFormService: RequestFormService,
    private inboundService: SwmInboundForm,
    private router: Router,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.loadData();
    window.scrollTo(0, 0);
  }

  loadData() {
    let result = this.inboundService.getValueForm();
    this.companyName = result.form.companyName;
    this.requestBy = result.form.requestBy;
    this.bookingDate = new Date(+result.form.bookingDate).toString();
    this.reqOnBehalf = result.form.requestOnBehalf || '-';
    this.jobDesc = result.form.jobDescription;
    this.collection = result.form.collection ? 'Yes' : 'No';
    this.oddSize = result.form.oddSize ? 'Yes' : 'No';
    this.oddSizeRemarks = result.form.oddSizeRemark;
    this.poNo = result.form.poNumber;
    this.remarks = result.form.remarks;
    this.refNo = result.form.referenceNo;
    this.additionalServices = result.form.additionalService ? 'Yes' : 'No';
    this.inboundWasteDetails = result.form.inboundWasteDetailsList;
  }

  btnSubmit() {
    this.open = true;
  }

  onConfirm() {
    this.isLoading = true;
    this.overlay = true;
    let submitData = JSON.parse(
      JSON.stringify(this.inboundService.getValueForm())
    );
    submitData.form.inboundWasteDetailsList.forEach((item) => {
      item.uom = item.uom.replaceAll(' ', '_');
    });
    restServices.pbksb_ScheduledWasteService
      .createInboundScheduledWasteForm(this.appService.myApp)(submitData)
      .then((result) => {
        this.isLoading = false;
        this.overlay = false;
        let returnObj = this.appService.jsonToArray(result);
        let currDate = new Date();
        if (returnObj.success) {
          this.router
            .navigate(['/operation-system/sw-inbound-outbound-list'])
            .then(() => {
              this.appService.showToaster({
                type: 'success',
                title: 'Request Submitted',
                subtitle:
                  'Service Order No. ' +
                  returnObj.requestNo +
                  ' is successfully submitted.',
                time: formatDate(currDate, 'HH:mm', 'en-US'),
              });
            });
        } else {
          this.appService.showToaster({
            type: 'error',
            title: 'Cannot Submit',
            subtitle: returnObj.errorMessage,
            // 'The request has failed to be submitted. Please try again',
            time: formatDate(currDate, 'HH:mm', 'en-US'),
          });
        }
      });
  }

  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();
    this.router.navigate([this.previousURL]);
  }
}
