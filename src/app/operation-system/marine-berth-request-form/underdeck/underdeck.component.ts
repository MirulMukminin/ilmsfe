import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { UnderDeck } from '../../interfaces/MHE/mhe_interface';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-underdeck',
  templateUrl: './underdeck.component.html',
  styleUrls: ['./underdeck.component.scss'],
})
export class UnderdeckComponent implements OnInit {
  @Output() stepChanged: EventEmitter<number> = new EventEmitter();
  @Input() arrivalDate: string;
  @Input() arrivalTime: string;

  currentStep = 1;
  listOfUnderDeck = [] as UnderDeck[];
  barrelExist = false;
  timeArr = [];

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  // for invalid UI
  invalidSingleDate: any = [];
  invalidTonnes: any = [];
  invalidBarrel: any = [];
  invalidTime: any = [];
  underDeckInvalid = false;
  invalidbackDated: any = [];
  dailyDate: any = [];
  currentDate: any = [];
  dateSelect: any = [];
  dateFlag: any = [];

  // DropDown Item
  items: any[] = [
    {
      content: 'Oil Field Equipment',
    },
    {
      content: 'Container',
    },
    {
      content: 'Casing / Tubing',
    },
    {
      content: 'B.Cement',
    },
    {
      content: 'G.Cement',
    },
    {
      content: 'Bentonite',
    },
    {
      content: 'Barite',
    },
    {
      content: 'OBM',
    },
    {
      content: 'SBM',
    },
    {
      content: 'Brine',
    },
    {
      content: 'Base Oil',
    },
    {
      content: 'Ship to Ship Water',
    },
    {
      content: 'Ship to Ship Fuel',
    },
    {
      content: 'Others Bulk',
    },
  ];
  RequestNo: string;
  updateStatus = false;
  formID: any;
  date = new Date();
  onSubmit = false;

  constructor(
    private berthRequestFormService: BerthRequestFormService,
    protected appService: AppService,
    private _Activatedroute: ActivatedRoute,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userInfo();
    this.populateTable();
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
        // this.updateStatus = true;
        // this.getRestQueryAPI(this.RequestNo);
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
    // var getCodeView: any = { requestNo: 'BRF1BA74E9E' };
    var getCodeView: any = { requestNo: requestNo };
    //fire api and get response data

    restServices.pbksb_MarineService
      .GetUnderdeckFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        if (request['underDecks'].length > 0) {
          this.updateStatus = true;
          request['underDecks'].forEach((value, index) => {
            this.validateData(value);
          });
        }
        this.onSubmit = this.listOfUnderDeck.some(
          (data) => data.Selected == true
        );
        // console.log(this.listOfUnderDeck);
      });
    // .catch((err) => console.log(err));

    this.formID = this.berthRequestFormService.getFormID();
    // get form id if form id from services is null
    if (!this.formID || this.formID == '') {
      restServices.pbksb_MarineService
        .GetBerthRequestDetailsByRequestNo(this.appService.myApp)({
          requestNo: this.RequestNo,
        })
        .then((result) => {
          const resArr: any = result;
          const array = JSON.parse(resArr);

          this.formID = array.berthForm.id;
          // console.log(this.formID);
        });
      // .catch((err) => console.log(err));
    } else {
      this.formID = this.berthRequestFormService.getFormID();
    }
  }

  validateData(value: any) {
    let type = {
      0: 'OIL_FIELD_EQUIPMENT',
      1: 'CONTAINER',
      2: 'CASING_TUBING',
      3: 'B_CEMENT',
      4: 'G_CEMENT',
      5: 'BENTONITE',
      6: 'BARITE',
      7: 'OBM',
      8: 'SBM',
      9: 'BRINE',
      10: 'BASE_OIL',
      11: 'SHIP_WATER',
      12: 'SHIP_FUEL',
      13: 'OTHERS_BULK',
    };
    let index = this.getKeyByValue(type, value.item);
    if ('indicator' in value) {
      if (value.indicator === true) {
        // this.listOfUnderDeck[index].Item = value.item

        this.listOfUnderDeck[index].Date = value.date_time
          ? formatDate(value.date_time, 'dd/MM/yyyy', 'en_US')
          : '';
        this.listOfUnderDeck[index].Time = value.date_time
          ? formatDate(value.date_time, 'HH:mm', 'en_US')
          : '';
        this.listOfUnderDeck[index].requestQuantityIn =
          value.requestedQuantityIn;
        this.listOfUnderDeck[index].requestQuantityOut =
          value.requestedQuantityOut;
        this.listOfUnderDeck[index].Barrel = value.barrel;
        this.listOfUnderDeck[index].Selected = true;
        this.listOfUnderDeck[index].id = value.id ? value.id : '';
      } else if (value.indicator === false) {
        // this.listOfUnderDeck[index].Item = value.item
        this.listOfUnderDeck[index].Date = '';
        this.listOfUnderDeck[index].Time = '';
        this.listOfUnderDeck[index].requestQuantityIn = '';
        this.listOfUnderDeck[index].requestQuantityOut = '';
        this.listOfUnderDeck[index].Barrel = '';
        this.listOfUnderDeck[index].Selected = false;
        this.listOfUnderDeck[index].id = value.id ? value.id : '';
      }
    }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  populateTable() {
    this.items.forEach((value) => {
      this.listOfUnderDeck.push({
        id: Math.floor(Math.random() * 100),
        Item: value.content,
        Selected: false,
      });
    });
    this.getTimeDropdown();
  }

  getTimeDropdown() {
    const interval = 60; // 1 Hour interval
    const time = [];
    let startT = 0;
    for (let i = 0; startT < 24 * 60; i++) {
      const hh = Math.floor(startT / 60);
      const mm = startT % 60;
      time[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2);
      startT += interval;
    }

    for (let i = 0; i < time.length; i++) {
      this.timeArr.push({
        content: time[i],
      });
    }
  }

  changeStep(step: any) {
    this.currentStep = step;
    this.stepChanged.emit(this.currentStep);
  }
  onSave() {
    this.validateTable();
    // this.validateBackDated();

    let param = {
      form: {
        // berth_form: this.berthRequestFormService.getFormID(),
        berth_form: this.formID ?? this.berthRequestFormService.getFormID(),
      },
    };

    let type = {
      0: 'oil_field_equipment',
      1: 'container',
      2: 'casing_tubing',
      3: 'b_cement',
      4: 'g_cement',
      5: 'bentonite',
      6: 'barite',
      7: 'obm',
      8: 'sbm',
      9: 'brine',
      10: 'base_oil',
      11: 'ship_water',
      12: 'ship_fuel',
      13: 'others_bulk',
    };

    // console.log(this.listOfUnderDeck);

    for (const key in type) {
      param.form[type[key]] = {};
      param.form[type[key]]['date_time'] =
        this.listOfUnderDeck[key].Date != '' && this.listOfUnderDeck[key].Time
          ? this.convertDate(this.listOfUnderDeck[key].Date) +
            ' ' +
            this.listOfUnderDeck[key].Time
          : this.convertDate(this.arrivalDate) + ' ' + this.arrivalTime;
      param.form[type[key]]['requestQuantityIn'] =
        this.listOfUnderDeck[key].requestQuantityIn === ''
          ? '0'
          : Math.abs(this.listOfUnderDeck[key].requestQuantityIn).toString();
      param.form[type[key]]['requestQuantityOut'] =
        this.listOfUnderDeck[key].requestQuantityOut === ''
          ? '0'
          : Math.abs(this.listOfUnderDeck[key].requestQuantityOut).toString();
      param.form[type[key]]['barrel'] =
        this.listOfUnderDeck[key].Barrel === ''
          ? '0'
          : Math.abs(this.listOfUnderDeck[key].Barrel).toString();
      param.form[type[key]]['indicator'] = this.listOfUnderDeck[key].Selected;
    }

    // console.log(param);

    // *Check if any invalid value
    let invalidSingleDate = this.invalidSingleDate.includes(true);
    let invalidbackDated = this.invalidbackDated.includes(true);
    let invalidTonnes = this.invalidTonnes.includes(true);
    let invalidTime = this.invalidTime.includes(true);
    let invalidBarrel = false;

    let barrelItemArray = this.listOfUnderDeck.filter((item) => {
      return (
        item.Item == 'OBM' ||
        item.Item == 'SBM' ||
        item.Item == 'Base Oil' ||
        item.Item == 'Ship to Ship Water' ||
        item.Item == 'Ship to Ship Fuel'
      );
    });

    barrelItemArray.forEach((element) => {
      if (element.Selected && element.Barrel === '') {
        // invalidBarrel = true;
      }
    });
    console.log('Params: ', param);

    if (!this.updateStatus) {
      if (
        !this.underDeckInvalid &&
        !invalidSingleDate &&
        !invalidTonnes &&
        // !invalidBarrel &&
        !invalidTime &&
        !invalidbackDated
      ) {
        restServices.pbksb_MarineService
          .PostUnderDeckForm(this.appService.myApp)(param)
          .then((result) => {
            // console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);

              // console.log('Underdeck save success');
              this.createNotification('success', 'submitted');
              this.updateStatus = true;

              for (const key in type) {
                this.listOfUnderDeck[key].id = request[type[key]];
              }

              // console.log(this.listOfUnderDeck);
            } else {
              // console.log(request.status, 'Underdeck save failed');
              this.createNotification('error', 'submit');
            }
          })
          .catch((err) => {
            // console.log(err, 'Underdeck save failed');
            this.createNotification('error', 'submit');
          });
      }
    } else {
      // if user are updating
      for (const key in type) {
        param.form[type[key]]['id'] = this.listOfUnderDeck[key].id;
      }

      if (
        !this.underDeckInvalid &&
        !invalidSingleDate &&
        !invalidTonnes &&
        // !invalidBarrel &&
        !invalidTime &&
        !invalidbackDated
      ) {
        restServices.pbksb_MarineService
          .UpdateUnderDeckForm(this.appService.myApp)(param)
          .then((result) => {
            // console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log('Underdeck update success');
              this.createNotification('success', 'updated');
              this.updateStatus = true;
            } else {
              // console.log(request.status, 'Underdeck update failed');
              this.createNotification('error', 'update');
            }

            if (!this.onSubmit) {
              this.onSubmit = this.listOfUnderDeck.some(
                (data) => data.Selected == true
              );
            }
          })
          .catch((err) => {
            // console.log(err, 'Underdeck update failed');
            this.createNotification('error', 'update');
          });
      }
    }
  }

  convertDate(date: any) {
    // check if date is string or date type
    if (typeof date === 'string') {
      let dateParts: any = date.split('/');
      let newDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
      return formatDate(newDate, 'yyyy-MM-dd', 'en_US');
    } else {
      return formatDate(date, 'yyyy-MM-dd', 'en_US');
    }
  }

  validateTable() {
    let isSelected = false;
    this.listOfUnderDeck.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;

        // if (!value.Date) {
        //   this.invalidSingleDate[i] = true;
        // } else {
        //   this.invalidSingleDate[i] = false;
        // }
        // if (!value.Time) {
        //   this.invalidTime[i] = true;
        // } else {
        //   this.invalidTime[i] = false;
        // }
        if (
          (!value.requestQuantityIn || +value.requestQuantityIn <= 0) &&
          (!value.requestQuantityOut || +value.requestQuantityOut <= 0)
        ) {
          this.invalidTonnes[i] = true;
        } else {
          this.invalidTonnes[i] = false;
        }
        // if (!value.Barrel || +value.Barrel <= 0) {
        //   this.invalidBarrel[i] = true;
        // } else {
        //   this.invalidBarrel[i] = false;
        // }
      }
    });
    if (isSelected) {
      this.underDeckInvalid = false;
    } else if (this.onSubmit) {
      this.underDeckInvalid = false;
    } else {
      this.underDeckInvalid = true;
    }
  }

  validateBackDated() {
    this.listOfUnderDeck.forEach((element, i) => {
      if (element.Date) {
        this.invalidSingleDate[i] = false;
        this.invalidbackDated[i] = false;

        let singleDate;
        if (this.updateStatus && !this.dateSelect[i]) {
          var dateParts = element.Date.split('/');
          singleDate = new Date(
            +dateParts[2],
            +dateParts[1] - 1,
            +dateParts[0]
          );
        } else {
          // singleDate = new Date(element.Date);
          if (typeof element.Date === 'string') {
            let dateParts: any = element.Date.split('/');
            singleDate = new Date(
              +dateParts[2],
              dateParts[1] - 1,
              +dateParts[0]
            );
          } else {
            singleDate = new Date(element.Date);
          }
        }

        // Get input date
        // let dateToString = this.mheForm.singleDate.toString();

        let formatSingleDate = formatDate(singleDate, 'yyyy/MM/dd', 'en_US');
        let dateInput =
          singleDate.getFullYear() +
          '/' +
          (singleDate.getMonth() + 1) +
          '/' +
          ('0' + singleDate.getDate()).slice(-2);

        // Get current date
        let current = new Date();
        let formatCurrent = formatDate(current, 'yyyy/MM/dd', 'en_US');
        let todayDate =
          current.getFullYear() +
          '/' +
          (current.getMonth() + 1) +
          '/' +
          ('0' + current.getDate()).slice(-2);

        // Get current time
        let time = new Date();
        let currentHour = time.getHours();
        // console.warn(currentHour)

        this.dailyDate = formatSingleDate;
        this.currentDate = formatCurrent;

        if (dateInput < todayDate) {
          this.invalidbackDated[i] = true;
          // console.log('less than today');
        } else if (dateInput == todayDate) {
          // console.log(todayDate);
        } else {
          // console.log('more than today');
        }
      }
    });
  }

  validateDate(postIndex) {
    let current = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

    this.listOfUnderDeck.forEach((value, i) => {
      if (i == postIndex) {
        if (!value.Date) {
          this.invalidSingleDate[i] = true;
        } else {
          this.dateSelect[i] = true;
          this.invalidSingleDate[i] = false;
          // this.validateBackDated();
        }
      }
    });
  }

  validateTime(postIndex) {
    this.getTimeDropdown();
    this.listOfUnderDeck.forEach((value, i) => {
      if (i == postIndex) {
        if (!value.Time) {
          this.invalidTime[i] = true;
        } else {
          this.invalidTime[i] = false;
        }
      }
    });
  }

  validateTonnes(postIndex) {
    this.listOfUnderDeck.forEach((value, i) => {
      if (i == postIndex) {
        if (
          (!value.requestQuantityIn || +value.requestQuantityIn <= 0) &&
          (!value.requestQuantityOut || +value.requestQuantityOut <= 0)
        ) {
          this.invalidTonnes[i] = true;
        } else {
          this.invalidTonnes[i] = false;
        }
      }
    });
  }

  validateBarrel(postIndex) {
    this.listOfUnderDeck.forEach((value, i) => {
      if (i == postIndex) {
        // if (!value.Barrel || +value.Barrel <= 0) {
        //   this.invalidBarrel[i] = true;
        // } else {
        //   this.invalidBarrel[i] = false;
        // }
      }
    });
  }

  onSelected() {
    let isSelected = false;
    this.listOfUnderDeck.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;
        value.Date = this.arrivalDate;
        value.Time = this.arrivalTime;
      } else {
        value.Date = '';
        value.Time = '';
        value.Tonnes = '';
        value.Barrel = '';
        this.invalidSingleDate[i] = false;
        this.invalidTime[i] = false;
        this.invalidTonnes[i] = false;
        // this.invalidBarrel[i] = false;
      }
    });
    if (isSelected) {
      this.underDeckInvalid = false;
    }
  }

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `Underdeck is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `Underdeck failed to ${keywords}. Please try again`;
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

  filterTimeArr() {
    let current = new Date();
    let latestTime = this.datepipe.transform(current, 'HH:mm');

    this.timeArr = this.timeArr.filter((time) => time.content > latestTime);
  }
}
