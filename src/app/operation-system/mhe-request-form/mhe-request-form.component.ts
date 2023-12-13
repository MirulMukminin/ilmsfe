import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from '../services/MHE/request-form.service';

@Component({
  selector: 'app-mhe-request-form',
  templateUrl: './mhe-request-form.component.html',
  styleUrls: ['./mhe-request-form.component.scss'],
})
export class MheRequestFormComponent implements OnInit {
  modalStatus = '';
  requestType: string = 'Normal';
  requestByName: string = '';
  companyName: string = '';

  creditStatus = false;
  blockedStatus = false;
  open = false;
  requestNormal = false;
  count = 0;
  continueConsole = false;
  cancelConsole = false;
  checked = false;
  checkedConsole = false;

  constructor(
    private requestFormService: RequestFormService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.userInfo();

    if (
      this.requestFormService.getPreviousUrl() ===
      '/operation-system/mhe-request-preview'
    ) {
      this.requestType = this.requestFormService.getRequestType();
    }
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.companyName = initialData.Company;
        this.requestByName = userInfo.username.login;

        this.userStatus(userInfo);
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

  onClickCancel(event: any) {
    if (event) {
      this.open = false;
      this.checked = false;
      this.requestType = 'Normal';
    }
  }

  onClickCancelConsole() {
    if (this.count == 1) {
      this.checked = true;
    }
  }

  onChange(event: any) {
    // console.log(event.value)

    this.requestType = event.value;

    if (this.requestType == 'Console') {
      this.count++;
      if (this.count == 1) {
        this.open = true;
      }
    }

    if (this.count > 1) {
      if (this.requestType == 'Normal') {
        this.checked = true;
        this.checkedConsole = false;
      } else if (this.requestType == 'Console') {
        this.checkedConsole = true;
        this.checked = false;
      }
    }

    if (this.requestType == 'Normal') {
      this.checked = true;
      this.checkedConsole = false;
    }
  }

  userStatus(userDetails: any) {
    console.log(userDetails);
    console.log(userDetails.customer.account_status);
    console.log(userDetails.customer.credit_status);


    // if blocked and on hold, show blocked modal
    // if blocked and new request, show credit modal
    // if released and on hold, show blocked modal
    // if released and allow, no modal
    if (userDetails.customer.account_status == 'BLOCKED' && userDetails.customer.new_request == 'ON_HOLD') {
      this.modalStatus = 'blocked';
    } else if (userDetails.customer.account_status == 'BLOCKED' && userDetails.customer.new_request == 'NEW_REQUEST') {
      console.log('creditStat', userDetails.customer.new_request);
      this.modalStatus = 'credit';
    }else if (userDetails.customer.account_status == 'BLOCKED') {
      this.modalStatus = 'credit';
    } else if (userDetails.customer.new_request == 'ON_HOLD') {
      this.modalStatus = 'blocked';
    }
  }
}
