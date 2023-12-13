import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-work-with-permit',
  templateUrl: './work-with-permit.component.html',
  styleUrls: ['./work-with-permit.component.scss'],
})
export class WorkWithPermitComponent implements OnInit {
  currentStep = 1;
  confinedSpaceChkBox = false;
  hotWorkChkBox = false;
  divingChkBox = false;
  coldWorkChkBox = false;
  workPermitInvalid = false;

  RequestNo: string;
  updateStatus = false;
  formID: any;
  date = new Date();

  confinedSpaceId = '';
  hotWorkId = '';
  divingId = '';
  coldWorkId = '';
  onSubmit = false;

  @Output() stepChanged: EventEmitter<number> = new EventEmitter();

  constructor(
    private berthRequestFormService: BerthRequestFormService,
    protected appService: AppService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    console.log("userInfo==")
    console.log(this.onSubmit)
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
        // this.getRestQueryAPI(this.RequestNo);
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
    console.log("getRestQueryAPI==")
    console.log(this.onSubmit)
    // var getCodeView: any = { requestNo: 'BRF44C2537B' };
    var getCodeView: any = { requestNo: requestNo };
    //fire api and get response data
    restServices.pbksb_MarineService
      .GetWorkWithPermitFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        if (request['workPermits'].length > 0) {
          this.updateStatus = true;
          request['workPermits'].forEach((value, index) => {
            this.validateData(value);
          });
        }
        this.onSubmit = request['workPermits'].some(
          (data) => data.indicator == true
        );
      });

      console.log(this.onSubmit)
  }

  validateData(value: any) {
    if (value.item === 'CONFINED_SPACE') {
      this.confinedSpaceChkBox = value.indicator === true ? true : false;
      this.confinedSpaceId = value.id ? value.id : '';
    } else if (value.item === 'HOT_WORK') {
      this.hotWorkChkBox = value.indicator === true ? true : false;
      this.hotWorkId = value.id ? value.id : '';
    } else if (value.item === 'COLD_WORK') {
      this.coldWorkChkBox = value.indicator === true ? true : false;
      this.coldWorkId = value.id ? value.id : '';
    } else if (value.item === 'DIVING') {
      this.divingChkBox = value.indicator === true ? true : false;
      this.divingId = value.id ? value.id : '';
    }
  }

  changeStep(step: any) {
    this.currentStep = step;
    this.stepChanged.emit(this.currentStep);
  }
  onSave() {
    console.log(this.onSubmit)
    this.validateItem();
    console.log(this.onSubmit)
    if (!this.updateStatus) {
      let param = {
        form: {
          berth_form: this.berthRequestFormService.getFormID(),
          confined_space: {
            item: 'CONFINED_SPACE',
            indicator: this.confinedSpaceChkBox,
          },
          hot_work: {
            item: 'HOT_WORK',
            indicator: this.hotWorkChkBox,
          },
          diving: {
            item: 'DIVING',
            indicator: this.divingChkBox,
          },
          cold_work: {
            item: 'COLD_WORK',
            indicator: this.coldWorkChkBox,
          },
        },
      };
      // console.log(param);

      if (!this.workPermitInvalid) {
        restServices.pbksb_MarineService
          .PostWorkPermitForm(this.appService.myApp)(param)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);
              this.confinedSpaceId = request.tank_cleaning ?? '';
              this.hotWorkId = request.welding_cutting ?? '';
              this.divingId = request.diving ?? '';

              // console.log('work with permit save success');
              this.createNotification('success', 'submitted');
              this.updateStatus = true;
            } else {
              // console.log(request.status, 'work with permit save failed');
              this.createNotification('error', 'submit');
            }
          })
          .catch((err) => {
            // console.log('work with permit save failed', err);
            this.createNotification('error', 'submit');
          });
      }
    } else {
      let param2 = {
        form: {
          berth_form: this.berthRequestFormService.getFormID(),
          confined_space: {
            id: this.confinedSpaceId,
            indicator: this.confinedSpaceChkBox,
          },
          hot_work: {
            id: this.hotWorkId,
            indicator: this.hotWorkChkBox,
          },
          diving: {
            id: this.divingId,
            indicator: this.divingChkBox,
          },
          cold_work: {
            id: this.coldWorkId,
            indicator: this.coldWorkChkBox,
          },
        },
      };

      // console.log(param2);
      if (!this.workPermitInvalid) {
        restServices.pbksb_MarineService
          .UpdateBerthWorkPermit(this.appService.myApp)(param2)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);

              // console.log('work with permit update success');
              this.createNotification('success', 'update');
              this.updateStatus = true;
            } else {
              // console.log(request.status, 'work with permit update failed');
              this.createNotification('error', 'update');
            }

            if (!this.onSubmit) {
              this.onSubmit =
                this.confinedSpaceChkBox ||
                this.hotWorkChkBox ||
                this.coldWorkChkBox ||
                this.divingChkBox
                  ? true
                  : false;
            }
          })
          .catch((err) => {
            // console.log('work with permit update failed', err);
            this.createNotification('error', 'submit');
          });
      }
    }
    console.log(this.onSubmit)
  }
  onSelected() {
    if (
      this.confinedSpaceChkBox == true ||
      this.hotWorkChkBox == true ||
      this.divingChkBox == true ||
      this.coldWorkChkBox == true
    ) {
      this.workPermitInvalid = false;
    }
  }
  validateItem() {
    if (
      this.confinedSpaceChkBox == true ||
      this.hotWorkChkBox == true ||
      this.divingChkBox == true ||
      this.coldWorkChkBox == true
    ) {
      this.workPermitInvalid = false;
    } else if (this.onSubmit) {
      this.workPermitInvalid = false;
    } else {
      this.workPermitInvalid = true;
    }
  }

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `Work with Permit is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `Work with Permit failed to ${keywords}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      // subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
  }
}
