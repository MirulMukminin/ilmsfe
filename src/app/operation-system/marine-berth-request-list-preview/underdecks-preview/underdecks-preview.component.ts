import { formatDate } from '@angular/common';
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
import { UnderDeck } from '../../interfaces/MHE/mhe_interface';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';
@Component({
  selector: 'app-underdecks-preview',
  templateUrl: './underdecks-preview.component.html',
  styleUrls: ['./underdecks-preview.component.scss'],
})
export class UnderdecksPreviewComponent implements OnInit, OnDestroy {
  @Input() formStatus: string;
  @Input() eaDate: string;
  @Output() workProgramSummary = new EventEmitter<any>();
  RequestNo: string = '';
  underArray: any[] = [];
  underDeck: any[] = [];

  counter = 0;
  openEdit: boolean = false;

  listOfUnderDeck = [] as UnderDeck[];
  barrelExist = false;
  timeArr = [];

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  // for invalid UI
  invalidSingleDate: any = [];
  // invalidbackDated = false;
  invalidTonnes: any = [];
  invalidBarrel: any = [];
  invalidTime: any = [];
  underDeckInvalid = false;
  invalidbackDated: any = [];
  dailyDate: any = [];
  currentDate: any = [];
  dateSelect: any = [];
  dateFlag: any = [];

  listOfStatus = [];
  listOfIndicator = [];

  // DropDown Item
  items: any[] = [
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

  date = new Date();
  cancelItem = [];
  formStatusSubs!: Subscription;
  eaDateSubs!: Subscription;
  disabledEdit = false;
  displayEdit = true;
  open = false;

  type = {
    0: 'B_CEMENT',
    1: 'G_CEMENT',
    2: 'BENTONITE',
    3: 'BARITE',
    4: 'OBM',
    5: 'SBM',
    6: 'BRINE',
    7: 'BASE_OIL',
    8: 'SHIP_WATER',
    9: 'SHIP_FUEL',
    10: 'OTHERS_BULK',
  };

  @Input() isAgent: boolean;

  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private berthRequestFormService: BerthRequestFormService
  ) {}

  ngOnInit(): void {
    this.getRestServiceAPI();
    this.populateTable();
    this.getTimeDropdown();

    this.formStatusSubs =
      this.berthRequestFormService.formStatusChanged.subscribe((value: any) => {
        this.formStatus = value;
        this.disableCheckbox();
        this.disableEdit();
      });

    this.eaDateSubs = this.berthRequestFormService.eaDateChanged.subscribe(
      (value: any) => {
        // console.log(value);
        this.eaDate = value;
      }
    );
  }

  ngOnDestroy(): void {
    this.formStatusSubs.unsubscribe();
    this.eaDateSubs.unsubscribe();
  }

  getRestServiceAPI() {
    this.RequestNo = this._Activatedroute.snapshot.paramMap.get('RequestNo');
    const getCode: any = { requestNo: this.RequestNo };

    restServices.pbksb_MarineService
      .GetUnderdeckFormDetails(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);

        this.underArray = array.underDecks;

        this.underArray.forEach((element) => {
          if (element.indicator) {
            this.underDeck.push({
              id: element.id ? element.id : '',
              item: element.item ? element.item : 'N/A',
              itemDisplay: element.item
                ? this.formatItemValue(element.item)
                : 'N/A',
              mrNo: element.material_requisition
                ? element.material_requisition
                : '',
              date: element.date_time
                ? formatDate(element.date_time, 'dd/MM/yyyy', 'en_US')
                : 'N/A',
              time: element.date_time
                ? formatDate(element.date_time, 'HH:mm', 'en_US')
                : 'N/A',
              // tonnes: element.tonnes
              //   ? this.numberWithCommas(element.tonnes)
              //   : '',
              requestQuantityIn: element.requestedQuantityIn
                ? this.numberWithCommas(element.requestedQuantityIn)
                : '',
              requestQuantityOut: element.requestedQuantityOut
                ? this.numberWithCommas(element.requestedQuantityOut)
                : '',
              barrel: element.barrel ? element.barrel : '',
              status: element.status
                ? this.convertToTitleCase(element.status)
                : 'N/A',
              select: false,
              disabled: false,
              indicator: element.indicator ? element.indicator : 'N/A',
              sort_ind: element.sort_ind ? element.sort_ind : '',
            });
            this.listOfStatus.push(element.status);
          }
          this.listOfIndicator.push(element.indicator);
          this.validateData(element);
        });
      })
      .then(() => {
        this.disableCheckbox();
        this.disableEdit();
        this.underDeck = this.underDeck.sort((a, b) => a.sort_ind - b.sort_ind);
      });
  }

  populateTable() {
    this.items.forEach((value) => {
      this.listOfUnderDeck.push({
        id: Math.floor(Math.random() * 100),
        Item: value.content,
        Selected: false,
      });
    });
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

  validateData(value: any) {
    let index = this.getKeyByValue(this.type, value.item);
    if ('indicator' in value) {
      if (value.indicator === true) {
        // this.listOfUnderDeck[index].Item = value.item
        this.listOfUnderDeck[index].Date = value.date_time
          ? formatDate(value.date_time, 'dd/MM/yyyy', 'en_US')
          : '';
        this.listOfUnderDeck[index].Time = value.date_time
          ? formatDate(value.date_time, 'HH:mm', 'en_US')
          : '';
        this.listOfUnderDeck[index].Tonnes = value.tonnes;
        this.listOfUnderDeck[index].Barrel = value.barrel;
        this.listOfUnderDeck[index].Selected = true;
        this.listOfUnderDeck[index].indicator = true;
        this.listOfUnderDeck[index].id = value.id;
        this.listOfUnderDeck[index].status = value.status;
      } else if (value.indicator === false) {
        // this.listOfUnderDeck[index].Item = value.item
        // this.listOfUnderDeck[index].Date = '';
        this.listOfUnderDeck[index].Date = value.date_time
          ? formatDate(value.date_time, 'dd/MM/yyyy', 'en_US')
          : '';
        this.listOfUnderDeck[index].Time = '';
        this.listOfUnderDeck[index].Tonnes = '';
        this.listOfUnderDeck[index].Barrel = '';
        this.listOfUnderDeck[index].Selected = false;
        this.listOfUnderDeck[index].indicator = false;
        this.listOfUnderDeck[index].id = value.id;
      }
    }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  // ------- Table toolbar function (start) ----------
  checkLengthList() {
    return this.underDeck.some((item) => item.select == true);
  }

  deleteList() {
    let indicator = {
      B_CEMENT: false,
      G_CEMENT: false,
      BENTONITE: false,
      BARITE: false,
      OBM: false,
      SBM: false,
      BRINE: false,
      BASE_OIL: false,
      SHIP_WATER: false,
      SHIP_FUEL: false,
      OTHERS_BULK: false,
    };

    for (const item of this.underDeck) {
      if (item.select) {
        // console.log(item.id);
        item.select = false;
        indicator[item.item] = true;

        // this.underDeck = this.underDeck.filter(
        //   (item) => item.select !== item.select
        // );

        this.cancelItem.push(item.item.replace(/_/g, ' '));

        this.counter = 0;
      }
    }

    let param = {
      form: {
        berth_form: this.berthRequestFormService.getBerthFormID(),
        b_cement: { indicator: indicator.B_CEMENT },
        g_cement: { indicator: indicator.G_CEMENT },
        bentonite: { indicator: indicator.BENTONITE },
        barite: { indicator: indicator.BARITE },
        obm: { indicator: indicator.OBM },
        sbm: { indicator: indicator.SBM },
        brine: { indicator: indicator.BRINE },
        base_oil: { indicator: indicator.BASE_OIL },
        ship_water: { indicator: indicator.SHIP_WATER },
        ship_fuel: { indicator: indicator.SHIP_FUEL },
        others_bulk: { indicator: indicator.OTHERS_BULK },
      },
    };

    // console.log(param);

    restServices.pbksb_MarineService
      .CancelUnderdeck(this.appService.myApp)(param)
      .then((result) => {
        let request: any = result;
        let response = JSON.parse(request);
        // console.log(response);

        if (!response.status) {
          // console.log('success cancelled Underdeck');
          this.counter = 0;
          this.underDeck = [];
          this.listOfUnderDeck = [];
          this.workProgramSummary.emit();
          this.listOfIndicator = [];
          this.listOfStatus = [];
          this.open = false;
          this.ngOnInit();
          this.createNotification('success', 'cancelled', 'cancel');
        } else {
          // console.log(response.status, 'Underdeck cancel failed');
          this.createNotification('error', 'cancel', 'cancel');
        }
      })
      .catch((err) => {
        // console.log(err, 'Underdeck cancel failed');
        this.createNotification('error', 'cancel', 'cancel');
      });
  }

  cancelList() {
    this.underDeck.forEach((ticket) => {
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

  onUpdate() {
    this.validateTable();
    // this.validateBackDated();

    let param = {
      form: {
        berth_form: this.berthRequestFormService.getBerthFormID(),
      },
    };

    for (const key in this.type) {
      param.form[this.type[key].toLocaleLowerCase()] = {};
      param.form[this.type[key].toLocaleLowerCase()]['id'] =
        this.listOfUnderDeck[key].id;
      param.form[this.type[key].toLocaleLowerCase()]['date_time'] =
        this.listOfUnderDeck[key].Date !== '' && this.listOfUnderDeck[key].Time
          ? this.convertDate(this.listOfUnderDeck[key].Date) +
            ' ' +
            this.listOfUnderDeck[key].Time
          : formatDate(this.eaDate, 'dd/MM/yyyy HH:mm', 'en_US');
      param.form[this.type[key].toLocaleLowerCase()]['tonnes'] =
        this.listOfUnderDeck[key].Tonnes === ''
          ? '0'
          : this.listOfUnderDeck[key].Tonnes.toString();
      param.form[this.type[key].toLocaleLowerCase()]['barrel'] =
        this.listOfUnderDeck[key].Barrel === ''
          ? '0'
          : this.listOfUnderDeck[key].Barrel.toString();
      param.form[this.type[key].toLocaleLowerCase()]['indicator'] =
        this.listOfUnderDeck[key].Selected;
    }

    // console.log(param);

    // *Check if any invalid value
    let invalidSingleDate = this.invalidSingleDate.includes(true);
    // let invalidbackDated = this.invalidbackDated.includes(true);
    let invalidTonnes = this.invalidTonnes.includes(true);
    let invalidTime = this.invalidTime.includes(true);
    let invalidBarrel = false;

    let barrelItemArray = this.listOfUnderDeck.filter((item) => {
      return (
        item.Item == 'OBM' || item.Item == 'SBM' || item.Item == 'Base Oil'
      );
    });

    barrelItemArray.forEach((element) => {
      if (element.Selected && element.Barrel === '') {
        // invalidBarrel = true;
      }
    });

    if (
      !this.underDeckInvalid &&
      // !invalidBarrel &&
      !invalidTonnes
    ) {
      restServices.pbksb_MarineService
        .UpdateUnderDeckForm(this.appService.myApp)(param)
        .then((result) => {
          // console.log(result);
          let requestList: any = result;
          let request = JSON.parse(requestList);

          if (!request.status) {
            // console.log(request);
            // console.log('Underdeck update success');
            this.underDeck = [];
            this.listOfUnderDeck = [];
            this.workProgramSummary.emit();
            this.ngOnInit();
            this.createNotification('success', 'updated', 'update');
            this.openEdit = false;
          } else {
            // console.log(request.status, 'Underdeck update failed');
            this.createNotification('error', 'update', 'update');
          }
        })
        .catch((err) => {
          // console.log(err, 'Underdeck update failed');
          this.createNotification('error', 'update', 'update');
        });
    } else {
      // console.log('underDeckInvalid', this.underDeckInvalid);
      // console.log('invalidSingleDate', invalidSingleDate);
      // console.log('invalidTonnes', invalidTonnes);
      // console.log('invalidBarrel', invalidBarrel);
      // console.log('invalidTime', invalidTime);
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

  // ------- Validatation before submit (start) ----------
  validateTable() {
    let isSelected = false;
    this.listOfUnderDeck.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;

        if (!value.Date) {
          this.invalidSingleDate[i] = true;
        } else {
          this.invalidSingleDate[i] = false;
        }
        if (!value.Time) {
          this.invalidTime[i] = true;
        } else {
          this.invalidTime[i] = false;
        }
        if (!value.Tonnes || +value.Tonnes <= 0) {
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
        if (!this.dateSelect[i]) {
          var dateParts = element.Date.split('/');
          singleDate = new Date(
            +dateParts[2],
            +dateParts[1] - 1,
            +dateParts[0]
          );
        } else {
          singleDate = new Date(element.Date);
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
          // console.log('same day');
        } else {
          // console.log('more than today');
        }

        // If same date
        if (formatSingleDate.valueOf() === formatCurrent.valueOf()) {
          // if time between 12 am - 3 pm
          if (currentHour >= 0 && currentHour < 15) {
            this.dateFlag[i] = false;
            // console.warn('Accepted form')
            // console.log('Equal date')
          } else {
            this.dateFlag[i] = true;
            // console.log('Equal date')
            // console.warn('Will be in the waiting list')
          }
        } else {
          this.dateFlag[i] = false;
          // console.error('backdated or present date')
        }
      }
    });
  }

  validateDate(postIndex) {
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
        if (!value.Tonnes || +value.Tonnes <= 0) {
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
      } else {
        // value.Date = '';
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
  // ------- Validatation before submit (end) ----------

  // Disable edit button if all underdeck are cancel
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

    this.displayEdit = this.underArray.some(
      (value) => !value.status.toLowerCase().includes('cancel')
    );
  }

  createNotification(type, keywords, status) {
    let title = '';
    let subtitle = '';

    if (status == 'update') {
      if (type == 'success') {
        title = `Request ${keywords}`;
        subtitle = `Underdeck is successfully ${keywords}`;
      } else {
        title = `Cannot ${keywords}`;
        subtitle = `Underdeck failed to ${keywords}. Please try again`;
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
      this.underDeck.forEach((element) => {
        if (this.formStatus.toLowerCase() != 'booked') {
          element.disabled = true;
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

  clearSelect() {
    this.listOfUnderDeck.forEach((element) => {
      if (!element['indicator']) {
        element.Selected = false;
      }
    });
  }

  formatItemValue(value: any) {
    if (value == 'OBM' || value == 'SBM') {
      return value;
    } else if (value == 'SHIP_WATER') {
      return 'Ship To Ship Water';
    } else if (value == 'SHIP_FUEL') {
      return 'Ship To Ship Fuel';
    } else {
      return value
        .replace(/_/g, ' ')
        .replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
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

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
}
