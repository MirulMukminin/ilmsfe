import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { FuelWaterTank } from '../../interfaces/MHE/mhe_interface';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-fuelwater-preview',
  templateUrl: './fuelwater-preview.component.html',
  styleUrls: ['./fuelwater-preview.component.scss'],
})
export class FuelwaterPreviewComponent implements OnInit, OnDestroy {
  // @Input() formStatus: string;
  @Output() workProgramSummary = new EventEmitter<any>();
  @ViewChild('singleDateElement') singleDateElement: ElementRef;
  @ViewChild('PoNumberElement') PoNumberElement: ElementRef;
  @ViewChild('locationElement') locationElement: ElementRef;

  RequestNo: string = '';
  requestFormNo = '';
  supply = '';
  location = '';
  poNumber = '';
  bookingDate = '';
  remarks = '';
  status = '';
  jobTicket = 'XX5012545658';
  formStatus = '';
  fwRequestNumber = '';
  invalidPONum = false;

  fuelWaterArr: any[] = [];
  fuelWater: any[] = [];

  openEdit = false;
  items: any[] = [
    {
      content: 'Fuel',
    },
    {
      content: 'Water',
    },
  ];
  typeOfFullTank: any[] = [
    {
      type: 'Yes',
      checked: true,
    },
    {
      type: 'No',
    },
  ];

  listOfTank = [] as FuelWaterTank[];

  fuelWaterTankInvalid = false;
  invalidWeight: any = [];
  invalidStartTime: any = [];
  invalidTank: any = [];
  indicator: any = [];
  counter: number = 0;
  disabledEdit = false;
  displayEdit = true;

  date = new Date();
  cancelItem = [];
  formStatusSubs!: Subscription;
  flagChargeSubs!: Subscription;
  timeArr = [];
  formChargeStatus = [];
  flagCharge = false;
  open = false;
  onUpdateTable = false;
  counterFuelWater = 0;
  tankArr = [{ content: 'FUEL' }, { content: 'WATER' }];

  //date
  size: 'sm' | 'md' | 'xl' = 'md';
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';

  invalidbackDated = false;
  invalidBookingDate = false;
  invalidDate = false;
  invalidNumeric = false;
  numericCounter: any = 0;
  dateSelect = false;
  dailyDate: any;
  currentDate: any;
  @Input() arrivalDate: string;
  formInvalid = false;

  @Input() isAgent: boolean;

  constructor(
    private berthRequestFormService: BerthRequestFormService,
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getRestServiceAPI();
    this.getTimeDropdown();

    this.formStatusSubs =
      this.berthRequestFormService.formStatusChanged.subscribe((value: any) => {
        this.formStatus = value;
        this.disableCheckbox();
        this.disableEdit();
      });

    this.flagChargeSubs =
      this.berthRequestFormService.flagChargeChanged.subscribe((value: any) => {
        this.flagCharge = value;
      });
  }

  ngOnDestroy(): void {
    this.formStatusSubs.unsubscribe();
    this.flagChargeSubs.unsubscribe();
  }

  getRestServiceAPI() {
    this.RequestNo = this._Activatedroute.snapshot.paramMap.get('RequestNo');
    const getCode: any = { requestNo: this.RequestNo };

    restServices.pbksb_MarineService
      .GetFuelWaterRequestFormDetails(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const arr = JSON.parse(resArr);
        // console.log(arr);

        // if have no error
        if (arr.status != 'BAD_REQUEST') {
          this.requestFormNo =
            arr?.fuelWater?.berth_form?.request_number ?? null;
          this.supply = arr?.fuelWater?.supply ?? '';
          this.location = arr?.fuelWater?.location ?? '';
          this.poNumber = arr?.fuelWater?.po_number ?? '';
          this.bookingDate = arr?.fuelWater?.booking_date
            ? formatDate(arr?.fuelWater?.booking_date, 'dd/MM/yyyy', 'en_us')
            : '';
          this.remarks = arr?.fuelWater?.remarks ?? '';
          this.status =
            this.convertToTitleCase(arr?.fuelWater?.status) ?? 'N/A';
          this.jobTicket = arr?.job_ticket ?? 'N/A';
          this.fwRequestNumber = arr?.fuelWater?.request_number ?? 'N/A';

          let inProgress =
            this.status.toLowerCase().includes('pending') ||
            this.status.toLowerCase().includes('progress') ||
            this.status.toLowerCase().includes('endorse')
              ? true
              : false;

          if (!arr.fuelWater.remarks) {
            this.remarks = '-';
          }
          this.fuelWaterArr = arr.tank;
          this.formChargeStatus = [];

          this.fuelWaterArr.forEach((element, index) => {
            if (
              element.indicator ||
              element.status.toLowerCase().includes('cancel')
            ) {
              this.fuelWater.push({
                id: element.tank_id,
                item: element.item,
                fullTank: element.full_tank ? 'Yes' : 'No',
                startTime:
                  !element.status.toLowerCase().includes('pending') ||
                  !element.status.toLowerCase().includes('progress') ||
                  !element.status.toLowerCase().includes('endorse')
                    ? element.booking_time
                      ? element.booking_time
                      : ''
                    : element?.actual_time
                    ? element?.actual_time
                    : '',
                weight:
                  !element.status.toLowerCase().includes('pending') ||
                  !element.status.toLowerCase().includes('progress') ||
                  !element.status.toLowerCase().includes('endorse')
                    ? element.requested_quantity != '0'
                      ? this.numberWithCommas(element.requested_quantity)
                      : ''
                    : element?.actual_quantity_in
                    ? element?.actual_quantity_in
                    : element?.actual_quantity_out,
                usage: element.usage,
                status: this.convertToTitleCase(element.status),
                select: false,
                disabled: false,
                jobTicket: element?.job_ticket ? element?.job_ticket : '',
              });

              if (element.status.toLocaleLowerCase() != 'cancelled') {
                this.formChargeStatus.push(true);
              } else {
                this.formChargeStatus.push(false);
              }
            }
            this.indicator[element.tank] = element.indicator;
            this.tankValidate(element);
          });

          // console.log(this.fuelWater);
        }
      })
      .then(() => {
        this.disableCheckbox();
        this.disableEdit();
        this.berthRequestFormService.setFormChargeStatus(
          'fuelWater',
          this.fuelWater.length >= 1,
          'fuelWaterCancel',
          this.formChargeStatus.includes(true)
        );
      });
  }

  tankValidate(value: any) {
    if (value.indicator || value.status.toLowerCase().includes('cancel')) {
      this.listOfTank.push({
        id: value.tank_id ? value.tank_id : 'N/A', //Math.floor(Math.random() * 100),
        Tank: value.item ? value.item : 'N/A',
        Selected: '',
        FullTank: value.full_tank === true ? 'Yes' : 'No',
        Weight: value.requested_quantity
          ? value.requested_quantity.toString()
          : '',
        Status: value.status ? value.status : 'N/A',
        StartTime: value.booking_time ? value.booking_time : '',
        indicator: true,
      });
    }
  }

  // ------- Validatation before submit (start) ----------
  validateTable() {
    let isSelected = false;
    // this.listOfTank.forEach((value, i) => {
    //   if (value.Selected == true) {
    //     isSelected = true;
    //     if(value.FullTank == 'No') {
    //       this.invalidWeight[i] = !value.Weight || +value.Weight <= 0  ? true : false;
    //     } else {
    //       this.invalidWeight[i] = false;
    //     }
    //     this.invalidStartTime[i] = !value.StartTime ? true : false;
    //   }
    // });

    this.listOfTank.forEach((value, i) => {
      isSelected = true;
      if (value.FullTank == 'No') {
        this.invalidWeight[i] =
          !value.Weight || +value.Weight <= 0 ? true : false;
      } else {
        this.invalidWeight[i] = false;
      }

      this.invalidStartTime[i] = value.StartTime ? false : true;
      this.invalidTank[i] = value.Tank ? false : true;
    });

    if (isSelected) {
      this.fuelWaterTankInvalid = false;
    } else {
      this.fuelWaterTankInvalid = true;
    }
  }

  validateWeight(postIndex) {
    this.listOfTank.forEach((value, i) => {
      if (i == postIndex) {
        if (!value.Weight || +value.Weight <= 0) {
          this.invalidWeight[i] = true;
        } else {
          this.invalidWeight[i] = false;
        }
      }
    });
  }

  onChange(event: any) {
    this.listOfTank.forEach((element, i) => {
      if (element.id == event.source.name) {
        element.FullTank = event.value;

        // if (element.Selected) {
        //   if(element.FullTank == 'Yes') {
        //     this.invalidWeight[i] = false;
        //     element.Weight = ''
        //   } else {
        //     this.invalidWeight[i] = true;
        //     element.Weight = '';
        //   }
        // }

        if (element.FullTank == 'Yes') {
          this.invalidWeight[i] = false;
          element.Weight = '';
        } else {
          this.invalidWeight[i] = true;
          element.Weight = '';
        }
      }
    });
  }
  // ------- Validatation before submit (end) ----------

  onUpdate() {
    this.validateTable();
    this.validateBookingDate();
    this.validateForm();
    let invalidWeight = this.invalidWeight.includes(true);
    let invalidStartTime = this.invalidStartTime.includes(true);

    let berthFuelWaterTanks = [];

    this.listOfTank.forEach((data) => {
      berthFuelWaterTanks.push({
        id: isNaN(data.id) ? data.id : '',
        tank: data.Tank.toUpperCase(),
        indicator: data.indicator,
        full_tank: data.FullTank === 'No' ? false : true,
        start_time: data.StartTime,
        weight:
          data.FullTank === 'No'
            ? data.Weight === '' || !data.Weight
              ? '0'
              : data.Weight.toString()
            : '0',
      });
    });

    if (
      !invalidStartTime &&
      !invalidWeight &&
      !this.formInvalid &&
      !this.invalidbackDated &&
      !this.fuelWaterTankInvalid &&
      !this.invalidDate
    ) {
      let date: any;
      if (!this.dateSelect) {
        var dateParts = this.bookingDate.split('/');
        date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      } else {
        date = new Date(this.bookingDate);
      }

      let param = {
        form: {
          berth_form: this.berthRequestFormService.getBerthFormID(),
          supply: this.supply.toUpperCase(),
          location: this.location,
          po_number: this.poNumber,
          booking_date: formatDate(date, 'yyyy-MM-dd', 'en_US'),
          remarks: this.remarks,
          berthFuelWaterTanks: berthFuelWaterTanks,
        },
      };

      // UpdateBerthRequestFuelWaterForm

      restServices.pbksb_MarineService
        .UpdateBerthRequestFuelWaterFormStatusBooked(this.appService.myApp)(
          param
        )
        .then((result) => {
          let requestList: any = result;
          let request = JSON.parse(requestList);
          this.dateSelect = false;
          if (!request.status) {
            // console.log(result);
            // console.log('fuel water update succes');
            this.fuelWater = [];
            this.listOfTank = [];
            this.openEdit = false;
            this.open = false;
            this.ngOnInit();
            this.createNotification('success', 'updated', 'update');
          } else {
            // console.log(request.status, 'fuel water update failed');
            this.createNotification('error', 'update', 'update');
          }
        })
        .catch((err) => {
          // console.log(err, 'fuel water update failed');
          this.createNotification('error', 'update', 'update');
        });
    }
  }

  // ------- Table toolbar function (start) ----------
  checkLengthList() {
    return this.fuelWater.some((item) => item.select == true);
  }

  deleteList() {
    let water = false;
    let fuel = false;

    let berthFuelWaterTanks = [];

    this.fuelWater.forEach((ticket) => {
      if (ticket.select) {
        // if (ticket.item.toLowerCase().includes('water')) {
        //   water = true;
        // } else {
        //   fuel = true;
        // }
        berthFuelWaterTanks.push({ id: ticket.id });

        this.cancelItem.push(ticket.item);
      }
    });

    // indicator true to cancel
    const param = {
      form: {
        berth_form: this.berthRequestFormService.getBerthFormID(),
        // fuel: { indicator: fuel },
        // water: { indicator: water },
        berthFuelWaterTanks: berthFuelWaterTanks,
      },
    };

    restServices.pbksb_MarineService
      .CancelFuelWaterItem(this.appService.myApp)(param)
      .then((result) => {
        let request: any = result;
        let response = JSON.parse(request);

        if (!response.status) {
          // console.log(response);
          // console.log('fuel water cancel success');
          this.fuelWater = [];
          this.listOfTank = [];
          this.counter = 0;
          this.workProgramSummary.emit();
          this.open = false;
          this.ngOnInit();
          this.createNotification('success', 'cancelled', 'cancel');
        } else {
          // console.log(response.status, 'fuel water cancel failed');
          this.createNotification('error', 'cancel', 'cancel');
        }
      })
      .catch((err) => {
        // console.log(err, 'fuel water cancel failed');
        this.createNotification('error', 'cancel', 'cancel');
      });
  }

  cancelList() {
    this.fuelWater.forEach((ticket) => {
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
    this.displayEdit = true;
    if (this.formStatus.toLowerCase().includes('book')) {
      this.disabledEdit = false;
    } else if (
      this.listOfTank.some((data) =>
        data.Status.toLowerCase().includes('cancel')
      )
    ) {
      this.disabledEdit = true;
      this.displayEdit = false;
    } else {
      this.disabledEdit = false;
    }
  }

  createNotification(type, keywords, status) {
    let title = '';
    let subtitle = '';

    if (status == 'update') {
      if (type == 'success') {
        title = `Request ${keywords}`;
        subtitle = `Fuel water is successfully ${keywords}`;
      } else {
        title = `Cannot ${keywords}`;
        subtitle = `Fuel water failed to ${keywords}. Please try again`;
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
      // subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };
    this.appService.showToaster(successNotif);
    this.cancelItem = [];
  }

  disableCheckbox() {
    if (this.formStatus) {
      this.fuelWater.forEach((element) => {
        if (this.formStatus != 'BOOKED') {
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

  filterTimeArr() {
    let current = new Date();
    let latestTime = this.datepipe.transform(current, 'HH:mm');

    this.timeArr = this.timeArr.filter((time) => time.content > latestTime);
  }

  openModal(type: any) {
    this.listOfTank.forEach((value, i) => {
      if (value.Selected == true) {
        this.invalidWeight[i] =
          !value.Weight || +value.Weight <= 0 ? true : false;
        this.invalidStartTime[i] = !value.StartTime ? true : false;
      }
    });

    this.open =
      this.invalidWeight.includes(true) || this.invalidStartTime.includes(true)
        ? false
        : true;

    this.onUpdateTable = type == 'update' ? true : false;
  }

  clearSelect() {
    this.listOfTank.forEach((element) => {
      if (!this.indicator[element.Tank]) {
        element.Selected = false;
      }
    });
  }

  convertToTitleCase(str) {
    if (str) {
      return str
        .replace(/_/g, ' ')
        .replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    } else {
      return '';
    }
  }

  // Add Row Logic
  public addFuelWaterRow(): void {
    this.listOfTank.push({
      id: Math.floor(Math.random() * 10000),
      indicator: true,
      Tank: '',
      FullTank: 'Yes',
      Weight: '',
      Selected: '',
      Status: '',
      StartTime: '',
    });
  }

  // Delete Row Logic
  deleteFuelWater() {
    for (let i = 0; i < this.listOfTank.length; i++) {
      this.invalidWeight[i] = false;
      this.invalidStartTime[i] = false;
    }

    this.listOfTank.forEach((ticket) => {
      if (ticket.Selected) {
        this.listOfTank = this.listOfTank.filter(
          (item) => item.Selected !== ticket.Selected
        );
      }
    });
    this.counterFuelWater = 0;
  }

  cancelMethodFuelWater() {
    this.listOfTank.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
    this.counterFuelWater = 0;
  }

  checkLengthFuelWater() {
    return this.listOfTank.some((item) => item.Selected == true);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  checkIsNaN(value) {
    return isNaN(value);
  }

  viewJobTicket() {
    this.berthRequestFormService.setJobTicketPreview(true);
  }

  inputValueChange() {
    if (this.poNumber) {
      this.invalidPONum = false;
    }
  }

  dateValueChange() {
    if (this.bookingDate) {
      this.invalidBookingDate = false;
      this.dateSelect = true;
      this.validateBookingDate();
      if (this.convertDate(this.bookingDate) == this.convertDate(new Date())) {
        this.filterTimeArr();
      } else {
        this.timeArr = [];
        this.getTimeDropdown();
      }
    }
  }

  numericCount(value) {
    this.numericCounter = value.length;
    if (this.numericCounter == 100) {
      this.invalidNumeric = true;
    } else {
      this.invalidNumeric = false;
    }
  }

  validateBookingDate() {
    if (this.bookingDate) {
      this.invalidBookingDate = false;
      this.invalidbackDated = false;
      this.invalidDate = false;

      let singleDate: any;
      if (!this.dateSelect) {
        var dateParts = this.bookingDate.split('/');
        singleDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
        // console.log(this.bookingDate, singleDate);
      } else {
        singleDate = new Date(this.bookingDate);
        // console.log(this.bookingDate, singleDate);
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
        this.invalidbackDated = true;
        // console.log('less than today');
      }

      // var arrivalParts =
      //   typeof this.arrivalDate == 'string'
      //     ? this.arrivalDate.split('/')
      //     : formatDate(this.arrivalDate, 'dd/MM/yyyy', 'en_us').split('/');

      var arrivalParts = formatDate(
        this.arrivalDate,
        'dd/MM/yyyy',
        'en_us'
      ).split('/');

      let arrival = new Date(
        +arrivalParts[2],
        +arrivalParts[1] - 1,
        +arrivalParts[0]
      );

      let dateArrival =
        arrival.getFullYear() +
        '/' +
        (arrival.getMonth() + 1) +
        '/' +
        ('0' + arrival.getDate()).slice(-2);
      // console.log(this.arrivalDate, arrivalParts, arrival, dateInput);

      if (dateInput < dateArrival) {
        this.invalidDate = true;
      } else {
        // console.log(dateInput, dateArrival);
      }
    } else {
      this.invalidBookingDate = true;
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

  validateForm() {
    if (this.poNumber) {
      this.invalidPONum = false;
    } else {
      this.invalidPONum = true;
    }

    if (this.bookingDate) {
      this.invalidBookingDate = false;
      this.validateBookingDate();
    } else {
      this.invalidBookingDate = true;
    }

    if (!this.invalidPONum && !this.invalidBookingDate) {
      this.formInvalid = false;
    } else {
      this.formInvalid = true;
    }

    this.focusOnInvalid();
  }

  focusOnInvalid() {
    if (this.invalidPONum) {
      this.PoNumberElement.nativeElement.focus();
      this.PoNumberElement.nativeElement.select();
    }
    if (this.invalidBookingDate) {
      this.singleDateElement.nativeElement.focus();
    } else if (this.invalidbackDated) {
      this.singleDateElement.nativeElement.focus();
    } else if (this.invalidDate) {
      this.singleDateElement.nativeElement.focus();
    }

    // if (this.invalidLocation) {
    //   this.locationElement.nativeElement.focus();
    // }
  }
}
