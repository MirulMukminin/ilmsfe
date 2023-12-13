import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { FuelWaterTank } from '../../interfaces/MHE/mhe_interface';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-fuel-water',
  templateUrl: './fuel-water.component.html',
  styleUrls: ['./fuel-water.component.scss'],
})
export class FuelWaterComponent implements OnInit {
  @Output() stepChanged: EventEmitter<number> = new EventEmitter();
  @ViewChild('singleDateElement') singleDateElement: ElementRef;
  @ViewChild('PoNumberElement') PoNumberElement: ElementRef;
  @ViewChild('locationElement') locationElement: ElementRef;
  @Input() poNumber: string;
  @Input() arrivalDate: string;

  listOfTank = [] as FuelWaterTank[];
  berthFormId = '';
  poNum = '';
  bookingDate = '';
  remarks = '';
  currentStep = 1;

  // for invalid UI
  location: any;
  invalidLocation = false;
  fuelWaterTankInvalid = false;
  formInvalid = false;
  invalidWeight: any = [];
  invalidPONum = false;
  invalidPONumText = 'PO Number Required';
  invalidBookingDate = false;
  invalidBookingDateText = 'Booking Date Required';
  supplyType: string = 'VESSEL';
  invalidbackDated = false;
  invalidStartTime: any = [];
  invalidTank: any = [];
  dailyDate: any;
  currentDate: any;
  invalidDate = false;

  //date
  size: 'sm' | 'md' | 'xl' = 'md';
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';

  locationNames: any[] = [];
  locationList: any[] = [];

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

  companyName: any;
  requestByName: any;
  RequestNo: string;

  updateStatus = false;
  formID: any;
  date = new Date();
  dateSelect = false;
  dateFlag: boolean;
  timeArr = [];
  numericCounter: any = 0;
  invalidNumeric = false;

  counterFuelWater = 0;
  tankArr = [{ content: 'FUEL' }, { content: 'WATER' }];
  onSubmit = false;

  invalidTankText = [];

  showAddButton: boolean = true;

  constructor(
    private berthRequestFormService: BerthRequestFormService,
    protected appService: AppService,
    public datepipe: DatePipe,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.populateTable();
    this.getTimeDropdown();
    // console.log(this.poNumber);
    this.poNum = this.poNumber;

    if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
      this.RequestNo = this._Activatedroute.snapshot.paramMap.get('requestNum');
      this.getRestQueryAPI(this.RequestNo);
    } else if (this.berthRequestFormService.getrequestNo()) {
      this.RequestNo = this.berthRequestFormService.getrequestNo();
      this.getRestQueryAPI(this.RequestNo);
    }
  }

  populateTable() {
    this.items.forEach((value) => {
      this.listOfTank.push({
        id: Math.floor(Math.random() * 100),
        Tank: value.content,
        Selected: false,
      });
    });
  }

  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'BRF1BA74E9E' };
    var getCodeView: any = { requestNo: requestNo };

    restServices.pbksb_MarineService
      .ListLocation(this.appService.myApp)()
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        if (request.status != 'BAD_REQUEST') {
          // console.log(request);
          request.site.forEach((element) => {
            this.locationNames.push({
              content: element.description,
            });
          });
        }

        this.locationList = this.locationNames.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
      })
      .then(() => {
        restServices.pbksb_MarineService
          .GetFuelWaterRequestFormDetails(this.appService.myApp)(getCodeView)
          .then((result) => {
            // console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (request.status != 'BAD_REQUEST') {
              this.updateStatus = true;
              this.fuelWaterValidate(request['fuelWater']);
              request['tank'].forEach((value, index) => {
                this.tankValidate(value);
              });
              if (this.listOfTank.length == 1) {
                if (this.listOfTank[0].Tank == 'FUEL') {
                  this.addFuelWaterRow('WATER');
                } else {
                  this.addFuelWaterRow('FUEL');
                }
              } else if (this.listOfTank.length == 0) {
                this.addFuelWaterRow('FUEL');
                this.addFuelWaterRow('WATER');
              }
            }

            this.onSubmit = this.listOfTank.some((data) => data.StartTime);
          });
        // .catch((err) => console.log(err));
        // console.log('fuelWaterList', this.fuelWaterList);
      });
    // .catch((err) => console.log(err));
  }

  fuelWaterValidate(value: any) {
    this.berthFormId = value.berth_form.id;
    this.supplyType = value.supply
      ? value.supply === 'VESSEL'
        ? 'Vessel'
        : 'Other'
      : 'Vessel';
    this.poNum = value.po_number ? value.po_number : this.poNumber;
    this.location = value.location ? value.location.description : '';
    this.bookingDate = value.booking_date
      ? formatDate(value.booking_date, 'dd/MM/yyyy', 'en_US')
      : '';

    if (value.remarks) {
      this.numericCount(value.remarks);
      this.remarks = value.remarks;
    } else {
      this.remarks = '';
    }
  }

  tankValidate(value: any) {
    // let index = this.listOfTank.findIndex(
    //   (item) => item.Tank.toLowerCase() === value.tank.toLowerCase()
    // );
    this.listOfTank.push({
      id: value.tank_id ? value.tank_id : Math.floor(Math.random() * 10000),
      Tank: value.item ? value.item : '',
      FullTank: value.full_tank ? 'Yes' : 'No',
      Weight: value.requested_quantity
        ? value.requested_quantity.toString()
        : '',
      Selected: '',
      Status: '',
      // StartTime: value.start_time ? value.start_time.slice(0, 5) : '',
      StartTime: value.booking_time ? value.booking_time : '',
      indicator: value.indicator,
    });
  }

  changeStep(step: any) {
    this.currentStep = step;
    this.stepChanged.emit(this.currentStep);
  }

  onSave() {
    // console.log('test');
    
    this.validateBookingDate();
    if(!this.invalidBookingDate){
    this.validateTable();
    }
    this.validateForm();
    

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

    let param = {
      form: {
        berth_form: this.berthFormId
          ? this.berthFormId
          : this.berthRequestFormService.getFormID(),
        supply: this.supplyType.toUpperCase(),
        po_number: this.poNum,
        location: this.location ? this.location : '',
        booking_date: this.bookingDate
          ? this.convertDate(this.bookingDate)
          : '',
        remarks: this.remarks,
        berthFuelWaterTanks: berthFuelWaterTanks,
      },
    };

    // console.log(param);
    let invalidWeight = this.invalidWeight.includes(true);
    let invalidStartTime = this.invalidStartTime.includes(true);
    let invalidTank = this.invalidTank.includes(true);

    if (!this.updateStatus) {
      if (
        !this.fuelWaterTankInvalid &&
        !this.formInvalid &&
        !invalidWeight &&
        !invalidStartTime &&
        !invalidTank &&
        // !this.invalidLocation &&
        !this.invalidbackDated &&
        !this.invalidDate
      ) {
        restServices.pbksb_MarineService
          .PostBerthRequestFuelWaterForm(this.appService.myApp)(param)
          .then((result) => {
            // console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (request.status != 'BAD_REQUEST') {
              // console.log(request);
              // console.log('fuel water save success');
              this.createNotification('success', 'submitted');
              this.updateStatus = true;

              this.listOfTank[0].id = request.fuelTank;
              this.listOfTank[1].id = request.waterTank;
            } else {
              this.createNotification('error', 'submit');
              // console.log(request.status, 'fuel water save failed');
            }
          })
          .catch((err) => {
            this.createNotification('error', 'submit');
            // console.log(err, 'fuel water save failed');
          });
      }
    } else {
      // param.form.fuel['fuel_water'] = this.listOfTank[0].id;
      // param.form.water['fuel_water'] = this.listOfTank[1].id;

      if (
        !this.fuelWaterTankInvalid &&
        !this.formInvalid &&
        !invalidWeight &&
        !invalidStartTime &&
        !invalidTank &&
        // !this.invalidLocation &&
        !this.invalidbackDated &&
        !this.invalidDate
      ) {
        restServices.pbksb_MarineService
          .UpdateBerthRequestFuelWaterForm(this.appService.myApp)(param)
          .then((result) => {
            // console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (request.status != 'BAD_REQUEST') {
              // console.log(request);
              // console.log('fuel water update success');
              this.createNotification('success', 'updated');
              this.updateStatus = true;

              this.listOfTank.forEach((data, index) => {
                data.id = request.fuelWaterTanks[index].fuelWaterTank_Id;
              });
            } else {
              this.createNotification('error', 'update');
              // console.log(request.status, 'fuel water update failed');
            }

            if (!this.onSubmit) {
              this.onSubmit = this.listOfTank.some((data) => data.StartTime);
            }
          })
          .catch((err) => {
            this.createNotification('error', 'update');
            // console.log(err, 'fuel water update failed');
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

  validateForm() {
    if (this.poNum) {
      this.invalidPONum = false;
    } else {
      this.invalidPONum = true;
    }

    if (this.location && this.location != '') {
      this.invalidLocation = false;
    } else {
      this.invalidLocation = true;
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

  validateBookingDate() {
    if (this.bookingDate) {
      this.invalidBookingDate = false;
      this.invalidbackDated = false;
      this.invalidDate = false;

      let singleDate;
      if (this.updateStatus && !this.dateSelect) {
        var dateParts = this.bookingDate.split('/');
        singleDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      } else {
        singleDate = new Date(this.bookingDate);
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

      if (new Date(dateInput) < new Date(todayDate)) {
        this.invalidbackDated = true;
        // console.log('less than today');
      }

      var arrivalParts =
        typeof this.arrivalDate == 'string'
          ? this.arrivalDate.split('/')
          : formatDate(this.arrivalDate, 'dd/MM/yyyy', 'en_us').split('/');

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

      if (new Date(dateInput) < new Date(dateArrival)) {
        this.invalidDate = true;
      } else {
        // console.log(dateInput, dateArrival);
      }
    } else {
      this.invalidBookingDate = true;
    }
  }

  validateTable() {
    let isSelected = false;

    this.listOfTank.forEach((value, i) => {
      if (value.indicator == true) {
        isSelected = true;
      }
      if (value.FullTank == 'No') {
        this.invalidWeight[i] =
          !value.Weight || +value.Weight <= 0 ? true : false;
      } else {
        this.invalidWeight[i] = false;
      }

      this.invalidStartTime[i] = value.indicator
        ? value.StartTime
          ? false
          : true
        : false;
      // this.invalidStartTime[i] = value.StartTime ? false : true;
      this.invalidTank[i] = value.Tank ? false : true;
      this.invalidTankText[i] = 'Tank Required';
    });
    // if (this.listOfTank.length === 2) {
    //   let isSame = this.listOfTank[0].Tank === this.listOfTank[1].Tank;
    //   if (isSame) {
    //     this.invalidTank[0] = true;
    //     this.invalidTank[1] = true;
    //     this.invalidTankText[0] = 'Tank Item Cannot Be The Same';
    //     this.invalidTankText[1] = 'Tank Item Cannot Be The Same';
    //   }
    // }
    this.tankSelected(0);

    if (isSelected) {
      this.fuelWaterTankInvalid = false;
    } else if (this.onSubmit && !this.formInvalid) {
      this.fuelWaterTankInvalid = false;
    } else {
      this.fuelWaterTankInvalid = true;
    }
  }

  inputValueChange() {
    if (this.poNum) {
      this.invalidPONum = false;
    }
  }

  locationValueChange() {
    if (this.location && this.location != '') {
      this.invalidLocation = false;
    } else {
      this.invalidLocation = true;
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

  onSelected() {
    let isSelected = false;
    this.listOfTank.forEach((value, i) => {
      if (value.indicator == true) {
            isSelected = true;
            console.log(isSelected)
          }
      });
    // this.listOfTank.forEach((value, i) => {
    //   if (value.Selected == true) {
    //     isSelected = true;
    //   } else {
    //     value.Weight = '';
    //     value.StartTime = '';
    //     this.invalidWeight[i] = false;
    //     this.invalidStartTime[i] = false;
    //   }
    // });
    if (isSelected) {
      this.fuelWaterTankInvalid = false;
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
    // console.log(event);
    this.listOfTank.forEach((element, i) => {
      if (element.id == event.source.name) {
        element.FullTank = event.value;

        // if (element.Selected) {
        //   if (element.FullTank == 'Yes') {
        //     this.invalidWeight[i] = false;
        //     element.Weight = '';
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

  onSelectSupply(event: any) {
    this.supplyType = event.value;
    // console.log(this.supplyType);
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

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `Fuel Water is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `Fuel Water failed to ${keywords}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
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

  numericCount(value) {
    this.numericCounter = value.length;
    if (this.numericCounter == 100) {
      this.invalidNumeric = true;
    } else {
      this.invalidNumeric = false;
    }
  }

  // Add Row Logic
  public addFuelWaterRow(tank): void {
    this.listOfTank.push({
      id: Math.floor(Math.random() * 10000),
      indicator: false,
      Tank: tank,
      FullTank: 'Yes',
      Weight: '',
      Selected: '',
      Status: '',
      StartTime: '',
    });

    this.fuelWaterTankInvalid = false;
    this.checkRow();
    // console.log(this.listOfTank);
  }

  checkRow() {
    let checkArr = this.listOfTank.filter((item) => item.indicator == true);
    if (checkArr.length >= 2) {
      this.showAddButton = false;
    } else {
      this.showAddButton = true;
    }
  }

  // Delete Row Logic
  deleteFuelWater() {
    for (let i = 0; i < this.listOfTank.length; i++) {
      this.invalidWeight[i] = false;
      this.invalidStartTime[i] = false;
    }

    this.listOfTank.forEach((ticket) => {
      if (ticket.Selected && !isNaN(ticket.id)) {
        ticket.indicator = null;
      } else if (ticket.Selected && isNaN(ticket.id)) {
        ticket.indicator = false;
        ticket.Selected = false;
      }
    });

    this.listOfTank = this.listOfTank.filter((item) => item.indicator != null);

    this.counterFuelWater = 0;
    this.checkRow();
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

  tankSelected(postIndex) {
    if (this.listOfTank.length == 1) {
      // this.invalidTank[postIndex] = false;
    } else {
      if (this.listOfTank[0].Tank && this.listOfTank[1]) {
        // let isSame = this.listOfTank[0].Tank === this.listOfTank[1].Tank;
        let isSame;
        let finalArr = this.listOfTank.filter((item) => item.indicator == true);
        const uniqueVal = new Set(finalArr.map((item) => item.Tank));
        if (uniqueVal.size < finalArr.length) {
          isSame = true;
        } else {
          isSame = false;
        }

        console.log('isSame: ', isSame);
        if (isSame) {
          this.listOfTank.forEach((item, i) => {
            if (item.Tank == finalArr[0].Tank) {
              this.invalidTank[i] = true;
              this.invalidTankText[i] = 'Tank Item Cannot Be The Same';
            }
          });
        } else {
          this.invalidTank.fill(false);
          this.invalidTankText.fill('');
        }
      }
    }
  }
}
