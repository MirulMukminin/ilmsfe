import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sw-inbound-so-report-view',
  templateUrl: './sw-inbound-so-report-view.component.html',
  styleUrls: ['./sw-inbound-so-report-view.component.scss'],
  providers: [TitleCasePipe],
})
export class SwInboundSoReportViewComponent implements OnInit {
  companyName: string = '';
  name: string = '';
  requestBy: string = '';
  formNo: string = '';
  dateReceived: string = '';
  expiryDate: string = '';
  soNo: string = '';
  status: string = '';

  // table data
  inboundWasteDetail = [];

  // showNotification
  showNoti: boolean = false;
  endorseNotification = {
    type: 'info',
    title: 'Please Endorse Additional Service Report',
    message:
      'You are required to endorsed the Additional Services Report first to enable this Endorse button. ',
    showClose: false,
    lowContrast: true,
  };

  // endorsed disable
  isDisable: boolean = true;
  isDisplay: boolean = true;

  // additional service report
  hasAddSer: boolean;
  isAddSerEndorsed: boolean;

  //endorsed Modal
  openEndorsed: boolean = false;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.formNo = this.activatedRoute.snapshot.paramMap.get('formNo');

    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.name = initialData.Fullname;
        // let orderNo = this.activatedRoute.snapshot.paramMap.get('formNo');

        this.getRestServiceAPI(this.formNo);
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

  private getRestServiceAPI(formNo: string) {
    const param = { formNo: formNo };

    restServices.pbksb_ScheduledWasteService
      .getInboundSOReportView(this.appService.myApp)(param)
      .then((result) => {
        let inboundSOResult = this.appService.jsonToArray(result);

        // this.checkOptional();
        this.populateData(inboundSOResult);
      });
  }

  populateData(value) {
    this.companyName = value.customer ? value.customer.name : '-';
    this.requestBy = value.scheduledWaste
      ? value.scheduledWaste.requestedBy.fullname
      : '-';
    this.formNo = value.formNo;
    this.dateReceived = value.dateReceived;
    this.expiryDate = value.expiryDate;
    this.soNo = value.scheduledWaste ? value.scheduledWaste.jobNo : '-';
    this.status = value.status.replace(/_/g, ' ');
    this.status = this.titlecasePipe.transform(this.status);

    if (value.inventoryItems) {
      value.inventoryItems.forEach((item) => {
        this.inboundWasteDetail.push({
          wasteCode: item.itemCode ? item.itemCode : '-',
          qty: item.quantity ? item.quantity : '-',
          UOM: item.uom ? item.uom.replaceAll('_', ' ') : '-',
          palletID: item.palletId ? item.palletId : '-',
          palletWeight: item.palletWeight ? item.palletWeight : '-',
          soNo: item.batchId ? item.batchId : '-',
          dateReceived: item.transactionDate
            ? formatDate(item.transactionDate, 'dd/MM/YYYY', 'en-US')
            : '-',
          expiryDate: item.expiryDate
            ? formatDate(item.expiryDate, 'dd/MM/YYYY', 'en-US')
            : '-',
          locationID: item.location ? item.location : '-',
        });
      });
    }

    this.hasAddSer = value.additionalServiceRequired;
    this.isAddSerEndorsed = value.additionalServices;
    this.populateEndorsedButton();
  }

  populateEndorsedButton() {
    if (this.status == 'Pending Endorsement') {
      if (this.hasAddSer) {
        if (this.isAddSerEndorsed) {
          this.isDisable = false;
          this.showNoti = false;
        } else {
          this.isDisable = true;
          this.showNoti = true;
        }
      } else {
        this.isDisable = false;
        this.showNoti = false;
      }
    } else if (this.status == 'Endorsed') {
      this.isDisable = true;
      this.isDisplay = false;
      this.showNoti = false;
    } else {
      this.isDisable = true;
      this.isDisplay = true;
      this.showNoti = false;
    }
  }

  onEndorsed() {
    let params = { form: { formNo: this.formNo, endorsedBy: this.requestBy } };
    restServices.pbksb_ScheduledWasteService
      .endorseInboundSoReport(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        let currDate = new Date();
        if (returnObj.success) {
          this.router
            .navigate(['/operation-system/sw-inbound-so-report-list'])
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
}
