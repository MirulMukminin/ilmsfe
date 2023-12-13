import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-work-with-permit-preview',
  templateUrl: './work-with-permit-preview.component.html',
  styleUrls: ['./work-with-permit-preview.component.scss'],
})
export class WorkWithPermitPreviewComponent implements OnInit {
  workWithPermitList = [];
  RequestNo: any;
  constructor(
    private berthRequestFormService: BerthRequestFormService,
    protected appService: AppService,
    private _Activatedroute: ActivatedRoute
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
        if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
          this.RequestNo =
            this._Activatedroute.snapshot.paramMap.get('requestNum');
          this.getRestQueryAPI(this.RequestNo);
        } else if (this.berthRequestFormService.getrequestNo()) {
          this.RequestNo = this.berthRequestFormService.getrequestNo();
          this.getRestQueryAPI(this.RequestNo);
        }
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

  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'BRF34883583' };
    var getCodeView: any = { requestNo: requestNo };
    //fire api and get response data

    restServices.pbksb_MarineService
      .GetWorkWithPermitFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        request['workPermits'].forEach((value, index) => {
          this.validateData(value);
        });
      })
      .then(() => {
        this.workWithPermitList = this.workWithPermitList.sort(
          (a, b) => a.sort_ind - b.sort_ind
        );
      });

    // console.log('workWithPermitList', this.workWithPermitList);
  }

  validateData(value: any) {
    if (value.indicator === true) {
      this.workWithPermitList.push({
        item: value.item ? value.item.replace(/_/g, ' ') : 'N/A',
        sort_ind: value.sort_ind ? value.sort_ind : '',
      });
    }
  }
}
