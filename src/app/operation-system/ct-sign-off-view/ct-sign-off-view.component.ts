import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from '../services/MHE/request-form.service';

@Component({
  selector: 'app-ct-sign-off-view',
  templateUrl: './ct-sign-off-view.component.html',
  styleUrls: ['./ct-sign-off-view.component.scss'],
  providers: [TitleCasePipe],
})
export class CtSignOffViewComponent implements OnInit {
  name = '';

  formData = [];
  companyName: string = '';
  requestBy: string = '';
  requestNo: string = '';
  agent: string = '';
  dateTime: string = '';
  vessel: string = '';
  portOfOrigin: string = '';
  requestType: string = '';
  poNumber: string;
  status: string = '';
  itemList = [];

  // controls
  isCancelDisplay: boolean = false;
  isEditDisplay: boolean = false;
  isEndorseDisplay: boolean = false;

  //modal
  open: boolean = false;
  openEndorsed: boolean = false;
  endorsedBy;
  endorsedDate;
  cancelledBy;
  cancelledDate;

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

    let getParams = { requestNumber: orderNo };
    restServices.pbksb_CrewTransferService
      .getCrewTransferRequestByRequestNumber(this.appService.myApp)(getParams)
      .then((result) => {
        let arr: any = result;
        let request = this.appService.jsonToArray(arr);
        this.formData = request;
        this.populateData(this.formData);
        console.log('formData ==');
        console.log(this.formData);
      });
  }

  populateData(value) {
    this.companyName = value.company ? value.company : '-';
    this.requestNo = value.requestNumber ? value.requestNumber : '-';
    this.agent = value.agent ? value.agent : '-';
    this.dateTime = value.requestDate ? value.requestDate : '-';
    this.portOfOrigin = value.portOfOrigin;
    this.vessel = value.vessel ? value.vessel : '-';
    this.poNumber = value.poNumber ? value.poNumber : '-';
    this.requestType = value.requestType
      ? value.requestType.replaceAll('_', ' ')
      : '-';
    this.status = value.requestStatus
      ? value.requestStatus.replaceAll('_', ' ')
      : '-';
    this.status = this.titlecasePipe.transform(this.status);
    this.endorsedBy = value?.endorsedBy;
    this.endorsedDate = value?.endorsedDate;
    this.cancelledBy = value?.cancelledBy;
    this.cancelledDate = value?.cancelledDate;

    if (value.crewTransferItem.length > 0) {
      value.crewTransferItem.forEach((item) => {
        this.itemList.push({
          crewCompany: item.crewCompany,
          crewIcPassport: item.crewIcPassport,
          crewMobileNumber: item.crewMobileNumber,
          crewName: item.crewName ? item.crewName : '-',
          crewNationality: item.crewNationality,
          crewPassportExpiry: item.crewPassportExpiry,
          origin: item.origin,
        });
      });
    }

    this.checkButtonDisplay();
  }

  checkButtonDisplay() {
    if (this.status === 'Submitted') {
      this.isCancelDisplay = true;
      this.isEditDisplay = true;
      this.isEndorseDisplay = false;
    } else if (this.status === 'Ccancelled') {
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
  }

  redirectToPrevious() {
    // this.previousURL = this.requestFormService.getPreviousUrl();
    // this.router.navigate([this.previousURL]);
    history.back();
  }

  onPrint() {
    window.print();
  }

  onCancel() {
    this.open = false;
    let params = {
      requestNumber: this.requestNo,
    };

    restServices.pbksb_CrewTransferService
      .cancelCrewTransferSignOffRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        let currDate = new Date();
        if (returnObj.success) {
          let dateNow = new Date();
          this.router
            .navigate(['/operation-system/ct-sign-off-list'])
            .then(() => {
              this.appService.showToaster({
                type: 'error',
                title: 'Cancelled',
                subtitle: this.requestNo + ' is Cancelled.',
                time: formatDate(dateNow, 'HH:mm', 'en-US'),
              });
            });
        } else {
          let errorMsg = returnObj.errorMessage.split(':');
          this.appService.showToaster({
            type: 'error',
            title: 'Cannot Cancel',
            subtitle: errorMsg.length > 1 ? errorMsg[1] : errorMsg[0],
            // 'The request has failed to be submitted. Please try again',
            time: formatDate(currDate, 'HH:mm', 'en-US'),
          });
        }
      });
  }

  onEndorse() {
    this.openEndorsed = false;
    let params = {
      requestNumber: this.requestNo,
    };

    restServices.pbksb_CrewTransferService
      .endorseCrewTransferSignOffRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        let currDate = new Date();
        if (returnObj.success) {
          this.router
            .navigate(['/operation-system/ct-endorsed-sign-off-list'])
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
          let errorMsg = returnObj.errorMessage.split(':');
          this.appService.showToaster({
            type: 'error',
            title: 'Cannot Endorse',
            subtitle: errorMsg.length > 1 ? errorMsg[1] : errorMsg[0],
            // 'The request has failed to be submitted. Please try again',
            time: formatDate(currDate, 'HH:mm', 'en-US'),
          });
        }
      });
  }
}
