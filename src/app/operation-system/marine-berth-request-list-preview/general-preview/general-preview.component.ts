import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-general-preview',
  templateUrl: './general-preview.component.html',
  styleUrls: ['./general-preview.component.scss'],
})
export class GeneralPreviewComponent implements OnInit, OnDestroy {
  @Input() formStatus: string;
  @Output() workProgramSummary = new EventEmitter<any>();
  RequestNo: string = '';
  generalArr: any[] = [];
  general: any[] = [];
  counter = 0;

  listOfGeneralWorks = [];
  invalidRemarks: any = [];
  generalWorksInvalid = false;
  openEdit = false;
  indicator: any = [];
  formID: any;

  listOfStatus = [];
  listOfIndicator = [];
  date = new Date();
  cancelItem = [];
  subscription!: Subscription;
  flagChargeSubs!: Subscription;
  flagCharge = false;
  disabledEdit = false;
  displayEdit = true;
  mooringUnmooringStatus = [];
  mooringUnmooring = false;
  cancelWarning = false;
  updateWarning = false;
  open = false;

  mooringSelected = false;
  unmooringSelected = false;
  cancelModal = false;

  // DropDown Item
  items: any = [
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
  @Input() isAgent: boolean;

  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private berthRequestFormService: BerthRequestFormService
  ) {}

  ngOnInit(): void {
    this.getRestServiceAPI();
    this.populateTable();

    this.subscription =
      this.berthRequestFormService.formStatusChanged.subscribe((value: any) => {
        this.formStatus = value;
        // console.log('formStatus', this.formStatus);
        this.disableCheckbox();
        this.disableEdit();
      });

    this.flagChargeSubs =
      this.berthRequestFormService.flagChargeChanged.subscribe((value: any) => {
        this.flagCharge = value;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.flagChargeSubs.unsubscribe();
  }

  populateTable() {
    this.items.forEach((value) => {
      this.listOfGeneralWorks.push({
        id: Math.floor(Math.random() * 100),
        Item: value,
        Selected: false,
      });
      this.indicator[value] = value.indicator;
    });
  }

  getRestServiceAPI() {
    this.RequestNo = this._Activatedroute.snapshot.paramMap.get('RequestNo');
    const getCode: any = { requestNo: this.RequestNo };

    restServices.pbksb_MarineService
      .GetGeneralWorksFormDetails(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);

        this.generalArr = array.generalWorks;
        this.mooringUnmooringStatus = [];

        this.generalArr.forEach((element, index) => {
          if (element.indicator == true) {
            this.general.push({
              id: element.id ? element.id : 'N/A',
              item: element.item ? element.item : 'N/A',
              itemDisplay: element.item
                ? this.formatItemValue(element.item)
                : 'N/A',
              indicator: element.indicator ? element.indicator : 'N/A',
              remarks: element.remarks ? element.remarks : '',
              status: element.status
                ? this.convertToTitleCase(element.status)
                : 'N/A',
              select: false,
              disabled: false,
              sort_ind: element.sort_ind ? element.sort_ind : '',
            });
            this.listOfStatus.push(element.status);
            if (
              element.item.toLocaleLowerCase() == 'mooring' ||
              element.item.toLocaleLowerCase() == 'unmooring'
            ) {
              this.mooringUnmooring = true;
              if (element.status.toLocaleLowerCase() != 'cancelled') {
                this.mooringUnmooringStatus.push(true);
              } else {
                this.mooringUnmooringStatus.push(false);
              }
            }
          }
          this.listOfIndicator.push(element.indicator);
          this.validateData(element);
        });
        // console.log(this.listOfStatus);
      })
      .then(() => {
        this.general = this.general.sort((a, b) => a.sort_ind - b.sort_ind);
        this.disableCheckbox();
        this.disableEdit();
        this.berthRequestFormService.setFormChargeStatus(
          'generalWorks',
          this.mooringUnmooring,
          'generalWorksCancel',
          this.mooringUnmooringStatus.includes(true)
        );
      });
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
      this.listOfGeneralWorks[index].indicator = value.indicator;
      this.listOfGeneralWorks[index].id = value.id;
      this.listOfGeneralWorks[index].Status = value.status;
    }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  // ------- Validatation before submit (start) ----------
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
  onSelected(type: any, event: any) {
    let isSelected = false;
    // console.log(type, event);

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

    if (type.toLocaleLowerCase() == 'mooring') {
      this.mooringSelected = event;
    }

    if (type.toLocaleLowerCase() == 'unmooring') {
      this.unmooringSelected = event;
    }

    // console.log(this.mooringSelected, this.unmooringSelected);

    this.updateWarning =
      this.mooringSelected || this.unmooringSelected ? true : false;
  }
  // ------- Validatation before submit (end) ----------

  onUpdate() {
    this.validateTable();

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
    ];

    let param = {
      form: {
        berth_form: this.berthRequestFormService.getBerthFormID(),
      },
    };

    underdeckItems.forEach((value, index) => {
      param.form[value] = {};
      param.form[value]['id'] = this.listOfGeneralWorks[index].id;
      param.form[value]['remarks'] = this.listOfGeneralWorks[index].Remarks;
      param.form[value]['indicator'] = this.listOfGeneralWorks[index].Selected;
    });

    // console.log(param);

    let invalidRemarks = this.invalidRemarks.includes(true);

    if (!this.generalWorksInvalid) {
      restServices.pbksb_MarineService
        .UpdateGeneralWorksForm(this.appService.myApp)(param)
        .then((result) => {
          // console.log(result);
          let requestList: any = result;
          let request = JSON.parse(requestList);

          if (!request.status) {
            // console.log(result);
            // console.log('general works update succes');
            this.listOfGeneralWorks = [];
            this.general = [];
            this.openEdit = false;
            this.open = false;
            this.workProgramSummary.emit();
            this.ngOnInit();
            this.createNotification('success', 'updated', 'update');
          } else {
            // console.log(request.status, 'general works update failed');
            this.createNotification('error', 'update', 'update');
          }
        })
        .catch((err) => {
          // console.log(err, 'general works update failed');
          this.createNotification('error', 'update', 'update');
        })
        .finally(() => {});
    }
  }

  // ------- Table toolbar function (end) ----------
  checkLengthList() {
    return this.general.some((item) => item.select == true);
  }

  deleteList() {
    let id = {
      discharge: '',
      loading: '',
      inspection: '',
      maintenance: '',
      standby: '',
      touchngo: '',
      mooring: '',
      unmooring: '',
      firefighter: '',
      pneumatic_rubber_fender: '',
      gangway_6m: '',
      gangway_10m: '',
      gangway_15m: '',
    };

    let param = {
      form: {
        berth_form: this.berthRequestFormService.getBerthFormID(),
      },
    };

    for (const key in id) {
      param.form[key] = {};
      param.form[key]['id'] = id[key];
    }

    // console.log(this.general, param);

    for (const value of this.general) {
      if (value.select) {
        value.select = false;
        // id[value.item.toLowerCase()] = value.id;
        this.cancelItem.push(value.item);
        if (value.item.toLowerCase() == 'touch_and_go') {
          param.form['touchngo']['id'] = value.id;
        } else if (value.item.toLowerCase() == 'pneumatic_rubber_fender') {
          param.form['pneumatic_rubber_fender']['id'] = value.id;
        } else {
          param.form[value.item.toLowerCase()]['id'] = value.id;
        }

        // this.general = this.general.filter(
        //   (item) => item.select !== value.select
        // );

        this.counter = 0;
      }
    }

    // console.log(param);

    restServices.pbksb_MarineService
      .CancelGeneralWorks(this.appService.myApp)(param)
      .then((result) => {
        let request: any = result;
        let response = JSON.parse(request);

        if (!response.status) {
          // console.log(response);
          // console.log('general works cancel succes');
          this.listOfGeneralWorks = [];
          this.general = [];
          this.counter = 0;
          this.workProgramSummary.emit();
          this.listOfIndicator = [];
          this.listOfStatus = [];
          this.open = false;
          this.ngOnInit();
          this.createNotification('success', 'cancelled', 'cancel');
        } else {
          // console.log(response.status, 'general works cancel failed');
          this.createNotification('error', 'cancel', 'cancel');
        }
      })
      .catch((err) => {
        // console.log(err, 'general works cancel failed');
        this.createNotification('error', 'cancel', 'cancel');
      });
  }

  cancelList() {
    this.general.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counter = 0;
  }

  listCheckbox(event: any) {
    if (event === true) {
      this.counter++;
    } else if (event == false) {
      this.counter--;
    }
  }
  // ------- Table toolbar function (end) ----------

  // Disable edit button if all general works are cancel
  disableEdit() {
    if (this.formStatus != 'BOOKED') {
      this.disabledEdit = true;
    } else if (
      this.listOfStatus.includes('BOOKED') ||
      this.listOfIndicator.includes(false)
    ) {
      this.disabledEdit = false;
    } else {
      this.disabledEdit = true;
    }

    this.displayEdit = this.generalArr.some(
      (value) => !value.status.toLowerCase().includes('cancel')
    );
  }

  createNotification(type, keywords, status) {
    let title = '';
    let subtitle = '';

    if (status == 'update') {
      if (type == 'success') {
        title = `Request ${keywords}`;
        subtitle = `General Works is successfully ${keywords}`;
      } else {
        title = `Cannot ${keywords}`;
        subtitle = `General Works failed to ${keywords}. Please try again`;
      }
    } else {
      let array = this.cancelItem.join(', ');
      if (type == 'success') {
        title = `Request ${keywords}`;
        subtitle = `${array} is successfully ${keywords}`;
      } else {
        title = `Cannot ${keywords}`;
        subtitle = `${array} failed to ${keywords}. Please try again`;
      }
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };
    this.appService.showToaster(successNotif);
    this.cancelItem = [];
  }

  disableCheckbox() {
    if (this.formStatus) {
      this.general.forEach((element) => {
        if (this.formStatus.toLowerCase() != 'booked') {
          element.disabled = true;
          // console.log('in');
        } else {
          if (
            element.status.toLowerCase().includes('cancel') ||
            element.status.toLowerCase().includes('pending') ||
            element.status.toLowerCase().includes('endorse')
          ) {
            element.disabled = true;
          }
        }
      });
    }
  }

  openModal(type: any) {
    this.listOfGeneralWorks.forEach((value, i) => {
      if (value.Selected == true) {
        // if (!value.Remarks) {
        //   this.invalidRemarks[i] = true;
        // } else {
        //   this.invalidRemarks[i] = false;
        // }
      }
    });

    this.open = this.invalidRemarks.includes(true) ? false : true;
    this.cancelWarning = false;
    this.cancelModal = false;

    this.general.forEach((element) => {
      if (
        element.item.toLocaleLowerCase() == 'mooring' ||
        element.item.toLocaleLowerCase() == 'unmooring'
      ) {
        if (element.select) {
          this.cancelWarning = true;
        }
      }
    });

    this.cancelModal = type == 'cancel' ? true : false;
  }

  clearSelect() {
    this.listOfGeneralWorks.forEach((element) => {
      if (!element.indicator) {
        element.Selected = false;
      }
    });
  }

  formatItemValue(value: any) {
    if (value == 'FIREFIGHTER') {
      return 'Fire Fighter';
    } else {
      return value.replace(/_/g, ' ');
    }
  }

  convertToTitleCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }
}
