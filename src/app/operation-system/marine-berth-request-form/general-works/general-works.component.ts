import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { GeneralWorks } from '../../interfaces/MHE/mhe_interface';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-general-works',
  templateUrl: './general-works.component.html',
  styleUrls: ['./general-works.component.scss'],
})
export class GeneralWorksComponent implements OnInit {
  @Output() stepChanged: EventEmitter<number> = new EventEmitter();

  listOfGeneralWorks = [] as GeneralWorks[];
  currentStep = 1;

  // for invalid UI
  invalidRemarks: any = [];
  generalWorksInvalid = false;

  // DropDown Item
  items = [
    'Discharge',
    'Loading',
    'Inspection',
    'Maintenance',
    'Standby',
    'Touch & Go',
    'Mooring',
    'Unmooring',
    'Fire Fighter',
    'Pneumatic Rubber Fender',
    'Gangway 6 Meter',
    'Gangway 10 Meter',
    'Gangway 15 Meter',
    'Crew Change',
  ];

  RequestNo: string;
  updateStatus = false;
  formID: any;
  date = new Date();
  onSubmit = false;

  constructor(
    private berthRequestFormService: BerthRequestFormService,
    protected appService: AppService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.populateTable();
    this.userInfo();
  }

  populateTable() {
    this.items.forEach((value) => {
      this.listOfGeneralWorks.push({
        id: Math.floor(Math.random() * 100),
        Item: value,
        Selected: false,
      });

      // this.listOfGeneralWorks[value] = {
      //   id: Math.floor(Math.random() * 100),
      //   Item: value,
      //   Selected: false,
      // };
    });

    // console.log(this.listOfGeneralWorks);
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
          // this.updateStatus = false;
        }

        // this.updateStatus = true;
        // this.RequestNo = 'BRF8279B5D4';
        // this.getRestQueryAPI(this.RequestNo);
        // console.log(initialData);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'BRF551C91FE' };
    var getCodeView: any = { requestNo: requestNo };

    restServices.pbksb_MarineService
      .GetGeneralWorksFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        if (request['generalWorks'].length > 0) {
          this.updateStatus = true;
          request['generalWorks'].forEach((value, index) => {
            this.validateData(value);
          });
        }
        this.onSubmit = this.listOfGeneralWorks.some(
          (data) => data.Selected == true
        );
      });

    // console.log(this.listOfGeneralWorks);

    // get form id if form id from services is null
    this.formID = this.berthRequestFormService.getFormID();
    if (!this.formID || this.formID == '') {
      restServices.pbksb_MarineService
        .GetBerthRequestDetailsByRequestNo(this.appService.myApp)({
          requestNo: this.RequestNo,
        })
        .then((result) => {
          const resArr: any = result;
          const array = JSON.parse(resArr);

          this.formID = array.berthForm.id;
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }

  validateData(value: any) {
    let type = {
      0: 'discharge',
      1: 'loading',
      2: 'inspection',
      3: 'maintenance',
      4: 'standby',
      5: 'touch_and_go',
      6: 'mooring',
      7: 'unmooring',
      8: 'firefighter',
      9: 'pneumatic_rubber_fender',
      10: 'gangway_6m',
      11: 'gangway_10m',
      12: 'gangway_15m',
      13: 'crew_change',
    };

    if (value.item) {
      let index = this.getKeyByValue(type, value.item.toLowerCase());
      this.listOfGeneralWorks[index].Selected = value.indicator;
      this.listOfGeneralWorks[index].Remarks = value.remarks;

      if (value.id) {
        this.listOfGeneralWorks[index].id = value.id;
        this.updateStatus = true;
      } else {
        this.listOfGeneralWorks[index].id = '';
      }
    }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  changeStep(step: any) {
    this.currentStep = step;
    this.stepChanged.emit(this.currentStep);
  }

  onSave() {
    this.validateTable();
    // console.log(this.listOfGeneralWorks);

    let underdeckItems = [
      'discharge',
      'loading',
      'inspection',
      'maintenance',
      'standby',
      'touchngo',
      'mooring',
      'unmooring',
      'firefighter',
      'pneumatic_rubber_fender',
      'gangway_6m',
      'gangway_10m',
      'gangway_15m',
      'crew_change',
    ];

    let param = {
      form: {
        berth_form: this.formID ?? this.berthRequestFormService.getFormID(),
      },
    };

    underdeckItems.forEach((value, index) => {
      param.form[value] = {};
      param.form[value]['remarks'] = this.listOfGeneralWorks[index].Remarks;
      param.form[value]['indicator'] = this.listOfGeneralWorks[index].Selected;
    });

    // console.log(this.listOfGeneralWorks);
    // console.log(param);

    let invalidRemarks = this.invalidRemarks.includes(true);
    if (!this.updateStatus) {
      // if user not updating
      if (!this.generalWorksInvalid) {
        restServices.pbksb_MarineService
          .PostGeneralWorksForm(this.appService.myApp)(param)
          .then((result) => {
            // console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);

              // console.log('save general works succes');
              this.createNotification('success', 'submitted');
              this.updateStatus = true;

              underdeckItems.forEach((value, index) => {
                this.listOfGeneralWorks[index].id = request[value];
              });
            } else {
              // console.log(request.status, 'save general works failed');
              this.createNotification('error', 'submit');
            }
          })
          .catch((err) => {
            // console.log(err, 'save general works failed');
            this.createNotification('error', 'submit');
          });
      }
    } else {
      // if user are updating
      underdeckItems.forEach((value, index) => {
        param.form[value]['id'] = this.listOfGeneralWorks[index].id;
      });
      // console.log(param);

      if (!this.generalWorksInvalid) {
        restServices.pbksb_MarineService
          .UpdateGeneralWorksForm(this.appService.myApp)(param)
          .then((result) => {
            // console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);
              // console.log('update general works succes');
              this.createNotification('success', 'updated');
              this.updateStatus = true;
            } else {
              this.createNotification('error', 'update');
              // console.log(request.status, 'update general works failed');
            }
            if (!this.onSubmit) {
              this.onSubmit = this.listOfGeneralWorks.some(
                (data) => data.Selected == true
              );
            }
          })
          .catch((err) => {
            this.createNotification('error', 'update');
            // console.log(err, 'update general works failed');
          });
      }
    }
  }

  validateTable() {
    let isSelected = false;
    this.listOfGeneralWorks.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;

        // if (!value.Remarks) {
        //   this.invalidRemarks[i] = true;
        // } else {
        //   this.invalidRemarks[i] = false;
        // }
      }
    });
    if (isSelected) {
      this.generalWorksInvalid = false;
    } else if (this.onSubmit) {
      this.generalWorksInvalid = false;
    } else {
      this.generalWorksInvalid = true;
    }
  }
  validateRemarks(postIndex) {
    this.listOfGeneralWorks.forEach((value, i) => {
      if (i == postIndex) {
        // if (!value.Remarks) {
        //   this.invalidRemarks[i] = true;
        // } else {
        //   this.invalidRemarks[i] = false;
        // }
      }
    });
  }
  onSelected() {
    let isSelected = false;
    this.listOfGeneralWorks.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;
      } else {
        value.Remarks = '';
        // this.invalidRemarks[i] = false;
      }
    });
    if (isSelected) {
      this.generalWorksInvalid = false;
    }
  }

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `General Works is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `General Works failed to ${keywords}. Please try again`;
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
