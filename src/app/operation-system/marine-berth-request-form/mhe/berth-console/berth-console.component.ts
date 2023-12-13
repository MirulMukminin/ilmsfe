import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { restServices } from 'services';
import {
  MachineryConsole,
  MheForm,
} from 'src/app/operation-system/interfaces/MHE/mhe_interface';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from 'src/app/operation-system/services/Marine/berth-request-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-berth-console',
  templateUrl: './berth-console.component.html',
  styleUrls: ['./berth-console.component.scss'],
})
export class BerthConsoleComponent implements OnInit {
  @Output() stepChanged2: EventEmitter<number> = new EventEmitter();

  @ViewChild('requestOnBehalfElement') requestOnBehalfElement: ElementRef;
  @ViewChild('jobDescriptionElement') jobDescriptionElement: ElementRef;
  @ViewChild('bookingDateElement') bookingDateElement: ElementRef;
  @ViewChild('estDurationElement') estDurationElement: ElementRef;
  @ViewChild('estTripElement') estTripElement: ElementRef;
  @ViewChild('estQuantityElement') estQuantityElement: ElementRef;
  @ViewChild('machineryLoading') machineryLoading: ElementRef;
  @ViewChild('machineryDischarge') machineryDischarge: ElementRef;

  currentStep = 1;

  mheForm: MheForm = {};

  description: string =
    'Please add required services in the table below. To Remove, select the check box and press remove button in the console';
  machineryTableInvalid: boolean = false;

  requestOnBehalfList: any[] = [];
  requestOnBehalfArr: any[] = [];
  requestOnBehalfName: any[] = [];
  timeArr = [];
  location = [];
  sitesArr: any[] = [];
  sitesName: any[] = [];
  sitesList: any[] = [];

  locationMachinery = '';
  timeMachinery = '';
  dailyDate: any;
  machineryConsoleListDischarge: MachineryConsole[] = [
    {
      id: 1,
      Selected: false,
      Item: 'Forklift 03T',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
    {
      id: 2,
      Selected: false,
      Item: 'Prime Mover',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
    {
      id: 3,
      Selected: false,
      Item: 'Road Sweeper CF 60',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
  ];

  machineryConsoleListLoading: MachineryConsole[] = [
    {
      id: 1,
      Selected: false,
      Item: 'Forklift 03T',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
    {
      id: 2,
      Selected: false,
      Item: 'Prime Mover',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
    {
      id: 3,
      Selected: false,
      Item: 'Road Sweeper CF 60',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
  ];

  //for invalid UI
  invalidRequestOnBehalf = false;
  invalidJobDescription = false;
  invalidBookingDate = false;
  invalidEstDuration = false;
  invalidEstTrip = false;
  invalidEstGoods = false;
  invalidTimeMachinery: any = [];
  invalidLocationMachinery: any = [];
  invalidLoadingTimeMachinery: any = [];
  invalidLoadingLocationMachinery: any = [];
  requiredTime: any = [];
  requiredLocation: any = [];
  disable: any = [];
  invalidSingleDate = false;
  invalidbackDated = false;
  backDatedDate = false;
  invalidEstDurationText = 'Estimated Duration(Hour) Required';
  invalidEstTripText = 'Estimated Trip Required';
  invalidEstQuantityText = 'Estimated Quantity of Goods Required';
  consoleTableInvalid = false;

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  // For numbering input
  step = 1;
  min = 0;
  max = 2;
  maxGood = 6;
  value = 0;

  dateString = '';
  selectDate = '';
  userDate = new Date();
  current = new Date();
  currentDate = formatDate(this.current, 'dd/MM/yyyy', 'en_US');

  dateFlag: boolean;
  open = false;

  dateInvalid = '';
  updateStatus = false;
  formID: any;
  mheRequestFormID: any;
  date = new Date();
  RequestNo: string;
  dateSelect = false;

  // location: any[] = [
  //   {
  //     content: 'Chemical Warehouse 01',
  //   },
  //   {
  //     content: 'Warehouse 02',
  //   },
  //   {
  //     content: 'Berth 03',
  //   },
  // ];

  constructor(
    private appService: AppService,
    private berthRequestFormService: BerthRequestFormService,
    public datepipe: DatePipe,
    private _Activatedroute: ActivatedRoute
  ) {
    this.mheForm.requestType = 'Console';
    this.mheForm.estTrip = 0;
    this.mheForm.estDuration = 0;
    this.mheForm.estGoods = 0;
  }

  ngOnInit(): void {
    this.getTimeDropdown();
    this.userInfo();
  }
  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.getRestServiceAPI(initialData);

        // console.log(initialData);
      })
      .catch((err) => {
        console.error(err);
        
        let errorObject = {
          type: 'error',
          title: 'Server Error',
          subtitle:
            'Server Error. Please try again'
        };
        this.appService.showToaster(errorObject);
        this.appService.terminateSession();
      });
  }

  getRestServiceAPI(initData: any) {
    const getCode: any = {
      userID: initData.UserID,
      CustomerCode: initData.CustomerCode,
    };

    restServices.pbksb_CustomerService
      .getRequestFrom(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const cust = JSON.parse(resArr);

        console.log(cust);

        this.requestOnBehalfArr = cust.CustomerOnBehalf;
        this.sitesArr = cust.sites;

        for (let i = 0; i < this.requestOnBehalfArr.length; i++) {
          this.requestOnBehalfName.push({
            content: this.requestOnBehalfArr[i].customer_behalf.name,
          });
        }

        //LOCATION
        for (let i = 0; i < this.sitesArr.length; i++) {
          if (this.sitesArr[i].description) {
            this.sitesName.push({
              content: this.sitesArr[i].description,
            });
          }
        }

        this.location = this.sitesName.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.requestOnBehalfList = this.requestOnBehalfName;

        // console.log(this.requestOnBehalfList);
      })
      .then(() => {
        if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
          this.RequestNo =
            this._Activatedroute.snapshot.paramMap.get('requestNum');
          this.getData(this.RequestNo);
        } else if (this.berthRequestFormService.getrequestNo()) {
          this.RequestNo = this.berthRequestFormService.getrequestNo();
          this.getData(this.RequestNo);
          // this.updateStatus = false;
        }
        // this.getData(this.RequestNo);
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

  filterTimeArr() {
    let current = new Date();
    let latestTime = this.datepipe.transform(current, 'HH:mm');

    this.timeArr = this.timeArr.filter((time) => time.content > latestTime);
  }

  onSave() {
    this.validateForm();
    this.validateTable();

    let dischargeConsole = [];
    let loadingConsole = [];

    this.machineryConsoleListDischarge.forEach((element, index) => {
      if (element.Selected) {
        dischargeConsole.push({
          item: element.Item.toUpperCase(),
          quantity: element.Quantity,
          time: element.Time,
          location: element.Location,
        });
      }
    });

    this.machineryConsoleListLoading.forEach((element, index) => {
      if (element.Selected) {
        loadingConsole.push({
          item: element.Item.toUpperCase(),
          quantity: element.Quantity,
          time: element.Time,
          location: element.Location,
        });
      }
    });

    let booking_date;
    if (this.updateStatus && !this.dateSelect) {
      var dateParts = this.mheForm.singleDate.split('/');
      booking_date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    } else {
      booking_date = this.mheForm.singleDate;
    }

    let param = {
      form: {
        formID: this.berthRequestFormService.getFormID(),
        request_behalf: this.mheForm.requestOnBehalf,
        job_description: this.mheForm.jobDescription,
        booking_date: formatDate(booking_date, 'yyyy-MM-dd', 'en_US'),
        estimated_duration: this.mheForm.estDuration,
        estimated_trip: this.mheForm.estTrip,
        estimated_quantity_goods: this.mheForm.estGoods,
        remarks: this.mheForm.remarks ?? '',
        reference_number: this.mheForm.refNo ?? '',
        discharge: dischargeConsole,
        loading: loadingConsole,
      },
    };

    console.log(param);
    let invalidTimeMachinery = this.invalidTimeMachinery.includes(true);
    let invalidLocationMachinery = this.invalidLocationMachinery.includes(true);
    let invalidLoadingTimeMachinery =
      this.invalidLoadingTimeMachinery.includes(true);
    let invalidLoadingLocationMachinery =
      this.invalidLoadingLocationMachinery.includes(true);

    if (!this.updateStatus) {
      if (
        !this.consoleTableInvalid &&
        !this.invalidRequestOnBehalf &&
        !this.invalidJobDescription &&
        !this.invalidEstDuration &&
        !this.invalidEstTrip &&
        !this.invalidEstGoods &&
        !this.invalidbackDated &&
        !this.invalidSingleDate &&
        !invalidTimeMachinery &&
        !invalidLocationMachinery &&
        !invalidLoadingTimeMachinery &&
        !invalidLoadingLocationMachinery
      ) {
        restServices.pbksb_MarineService
          .PostBerthMHERequestConsole(this.appService.myApp)(param)
          .then((result) => {
            console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);

              console.log('mhe console save success');
              this.createNotification('success', 'submitted');
              this.updateStatus = true;
              dischargeConsole = [];
              loadingConsole = [];
              this.getData(request.BerthMHERequest.berth_form.request_number);
            } else {
              console.log(request.status, 'mhe console failed');
              this.createNotification('error', 'submit');
            }
          })
          .catch((err) => {
            console.log(err, 'mhe console failed');
            this.createNotification('error', 'submit');
          });
      } else {
        this.focusOnInvalid();
      }
    } else {
      param.form.discharge = [];
      param.form.loading = [];
      dischargeConsole = [];
      loadingConsole = [];

      param.form['mheRequestFormID'] = this.mheRequestFormID;

      this.machineryConsoleListDischarge.forEach((element, index) => {
        if (element.Selected) {
          dischargeConsole.push({
            id: isNaN(element.id) ? element.id : null,
            quantity: element.Quantity,
            time: element.Time,
            location: element.Location,
          });
        }
      });

      this.machineryConsoleListLoading.forEach((element, index) => {
        if (element.Selected) {
          loadingConsole.push({
            id: isNaN(element.id) ? element.id : null,
            quantity: element.Quantity,
            time: element.Time,
            location: element.Location,
          });
        }
      });

      param.form.discharge = dischargeConsole;
      param.form.loading = loadingConsole;

      if (
        !this.invalidRequestOnBehalf &&
        !this.invalidJobDescription &&
        !this.invalidEstDuration &&
        !this.invalidEstTrip &&
        !this.invalidEstGoods &&
        !this.invalidbackDated &&
        !this.invalidSingleDate &&
        !invalidTimeMachinery &&
        !invalidLocationMachinery &&
        !invalidLoadingTimeMachinery &&
        !invalidLoadingLocationMachinery
      ) {
        restServices.pbksb_MarineService
          .UpdateBerthMHERequestConsole(this.appService.myApp)(param)
          .then((result) => {
            console.log(result);
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);

              console.log('mhe console update success');
              this.createNotification('success', 'updated');
              this.updateStatus = true;
            } else {
              console.log(request, 'mhe console update failed');
              this.createNotification('error', 'update');
            }
          })
          .catch((err) => {
            console.log(err, 'mhe console update failed');
            this.createNotification('error', 'update');
          });
      } else {
        this.focusOnInvalid();
      }
    }
  }

  validateForm() {
    if (this.mheForm.requestOnBehalf) {
      this.invalidRequestOnBehalf = false;
    } else {
      this.invalidRequestOnBehalf = true;
    }
    if (this.mheForm.jobDescription) {
      this.invalidJobDescription = false;
    } else {
      this.invalidJobDescription = true;
    }
    if (this.mheForm.estDuration) {
      if (this.mheForm.estDuration > this.max) {
        this.invalidEstDuration = true;
        this.invalidEstDurationText = 'Maximum amount exceeded';
      } else {
        this.invalidEstDuration = false;
        this.invalidEstDurationText = 'Estimated Duration(Hour) Required';
      }
    } else {
      this.invalidEstDuration = true;
    }
    if (this.mheForm.estTrip) {
      if (this.mheForm.estTrip > this.max) {
        this.invalidEstTrip = true;
        this.invalidEstTripText = 'Maximum amount exceeded';
      }
    } else {
      this.invalidEstTrip = true;
    }
    if (this.mheForm.estGoods) {
      if (this.mheForm.estGoods > this.maxGood) {
        this.invalidEstGoods = true;
        this.invalidEstQuantityText = 'Maximum amount exceeded';
      }
    } else {
      this.invalidEstGoods = true;
    }
    // this.validateBookingDate();
  }

  validateBookingDate() {
    if (this.mheForm.singleDate) {
      this.invalidSingleDate = false;
      this.backDatedDate = false;
      this.invalidbackDated = false;

      let singleDate;

      // Get input date
      // let dateToString = this.mheForm.singleDate.toString();

      if (this.updateStatus && !this.dateSelect) {
        var dateParts = this.mheForm.singleDate.split('/');
        singleDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      } else {
        singleDate = new Date(this.mheForm.singleDate);
      }

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
        this.backDatedDate = true;
        this.invalidbackDated = true;
        this.timeArr = [];
        this.getTimeDropdown();
        // console.log(dateInput);
        // console.log(todayDate);
        // console.log('less than today');
      } else if (dateInput == todayDate) {
        // console.log('same day');
        // console.log(dateInput);
        // console.log(todayDate);
        this.filterTimeArr();
      } else {
        // console.log(dateInput);
        // console.log(todayDate);
        // console.log('more than today');
        this.timeArr = [];
        this.getTimeDropdown();
      }

      // If same date
      if (formatSingleDate.valueOf() === formatCurrent.valueOf()) {
        // if time between 12 am - 3 pm
        if (currentHour >= 0 && currentHour < 15) {
          this.dateFlag = false;
          // console.warn('Accepted form')
          // console.log('Equal date')
        } else {
          this.dateFlag = true;
          // console.log('Equal date')
          // console.warn('Will be in the waiting list')
        }
      } else {
        this.dateFlag = false;
        // console.error('backdated or present date')
      }
    } else {
      this.invalidSingleDate = true;
    }

    this.focusOnInvalid();
  }

  focusOnInvalid() {
    if (this.invalidRequestOnBehalf) {
      this.requestOnBehalfElement.nativeElement.focus();
    } else if (this.invalidJobDescription) {
      this.jobDescriptionElement.nativeElement.focus();
      this.jobDescriptionElement.nativeElement.select();
    } else if (this.invalidSingleDate) {
      this.bookingDateElement.nativeElement.focus();
    } else if (this.invalidbackDated) {
      this.bookingDateElement.nativeElement.focus();
    } else if (this.invalidEstDuration) {
      this.estDurationElement.nativeElement.focus();
    } else if (this.invalidEstTrip) {
      this.estTripElement.nativeElement.focus();
    } else if (this.invalidEstGoods) {
      this.estQuantityElement.nativeElement.focus();
    } else if (
      this.invalidTimeMachinery.includes(true) ||
      this.invalidLocationMachinery.includes(true)
    ) {
      this.machineryDischarge.nativeElement.focus();
    } else if (
      this.invalidLoadingTimeMachinery.includes(true) ||
      this.invalidLoadingLocationMachinery.includes(true)
    ) {
      this.machineryLoading.nativeElement.focus();
    }
  }

  changeStep(step: any) {
    this.currentStep = step;
    this.stepChanged2.emit(this.currentStep);
  }

  inputValueChange() {
    if (this.mheForm.requestOnBehalf) {
      this.invalidRequestOnBehalf = false;
    }
    if (this.mheForm.jobDescription) {
      this.invalidJobDescription = false;
    }
    if (this.mheForm.estDuration) {
      if (this.mheForm.estDuration > this.max) {
        this.invalidEstDuration = true;
        this.invalidEstDurationText = 'Maximum amount exceeded';
      } else {
        this.invalidEstDuration = false;
        this.invalidEstDurationText = 'Estimated Duration(Hour) Required';
      }
    }
    if (this.mheForm.estTrip) {
      if (this.mheForm.estTrip > this.max) {
        this.invalidEstTrip = true;
        this.invalidEstTripText = 'Maximum amount exceeded';
      } else {
        this.invalidEstTrip = false;
        this.invalidEstTripText = 'Estimated Trip Required';
      }
    }
    if (this.mheForm.estGoods) {
      if (this.mheForm.estGoods > this.maxGood) {
        this.invalidEstGoods = true;
        this.invalidEstQuantityText = 'Maximum amount exceeded';
      } else {
        this.invalidEstGoods = false;
        this.invalidEstQuantityText = 'Estimated Quantity of Goods Required';
      }
    }

    this.machineryConsoleListDischarge.forEach((value, i) => {
      if (value.Selected == true) {
        if (value.Time) {
          this.invalidTimeMachinery[i] = false;
        }
        if (value.Location) {
          this.invalidLocationMachinery[i] = false;
        }
      }
    });

    this.machineryConsoleListLoading.forEach((value, i) => {
      if (value.Selected == true) {
        if (value.Time) {
          this.invalidLoadingTimeMachinery[i] = false;
        }
        if (value.Location) {
          this.invalidLoadingLocationMachinery[i] = false;
        }
      }
    });
  }

  dateValueChange(event: any) {
    this.dateSelect = true;
    this.validateBookingDate();
  }

  validateTable() {
    let isSelected = false;
    this.machineryConsoleListDischarge.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;

        if (!value.Time) {
          this.invalidTimeMachinery[i] = true;
        } else {
          this.invalidTimeMachinery[i] = false;
        }
        if (!value.Location) {
          this.invalidLocationMachinery[i] = true;
        } else {
          this.invalidLocationMachinery[i] = false;
        }
      }
    });
    this.machineryConsoleListLoading.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;

        if (!value.Time) {
          this.invalidLoadingTimeMachinery[i] = true;
        } else {
          this.invalidLoadingTimeMachinery[i] = false;
        }
        if (!value.Location) {
          this.invalidLoadingLocationMachinery[i] = true;
        } else {
          this.invalidLoadingLocationMachinery[i] = false;
        }
      }
    });
    if (isSelected) {
      this.consoleTableInvalid = false;
    } else {
      this.consoleTableInvalid = true;
    }
  }

  onSelected(tableType: any) {
    let isSelected = false;
    if (tableType == 'loading') {
      this.machineryConsoleListLoading.forEach((value, i) => {
        if (value.Selected == true) {
          isSelected = true;
        } else {
          value.Time = '';
          value.Location = '';
          this.invalidLoadingTimeMachinery[i] = false;
          this.invalidLoadingLocationMachinery[i] = false;
        }
      });
    } else if (tableType == 'discharge') {
      this.machineryConsoleListDischarge.forEach((value, i) => {
        if (value.Selected == true) {
          isSelected = true;
        } else {
          value.Time = '';
          value.Location = '';
          this.invalidTimeMachinery[i] = false;
          this.invalidLocationMachinery[i] = false;
        }
      });
    }

    if (isSelected) {
      this.consoleTableInvalid = false;
    }
  }

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `MHE Console is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `The request failed to ${keywords}. Please try again`;
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

  onReset() {}

  getData(requestNo: any) {
    // requestNo = 'BRF551C91FE';

    // GET MHE Request Form Details
    restServices.pbksb_MarineService
      .GetMHERequestFormDetails(this.appService.myApp)({
        requestNo: requestNo,
      })
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);
        // console.log(array);

        if (array.berthMHERequest.length > 0) {
          // console.log('in');
          this.updateStatus = true;

          this.mheForm.requestOnBehalf =
            array.berthMHERequest[0].request_behalf.name;

          this.mheForm.jobDescription =
            array.berthMHERequest[0].job_description;

          this.mheForm.singleDate = formatDate(
            array.berthMHERequest[0].booking_date,
            'dd/MM/yyyy',
            'en_US'
          );

          this.mheForm.estDuration =
            array.berthMHERequest[0].estimated_duration ?? 0;
          this.mheForm.estTrip = array.berthMHERequest[0].estimated_trip ?? 0;
          this.mheForm.estGoods =
            array.berthMHERequest[0].estimated_quantity ?? 0;
          this.mheForm.remarks = array.berthMHERequest[0].remarks;
          this.mheForm.refNo = array.berthMHERequest[0].reference_number;
          this.mheRequestFormID = array.berthMHERequest[0].id;

          // console.log(this.machineryConsoleListLoading);

          array.machineries.forEach((element) => {
            if (element.program == 'DISCHARGE') {
              this.machineryConsoleListDischarge.forEach((data) => {
                if (element.item.description == data.Item.toUpperCase()) {
                  data.id = element.id;
                  data.Location = element.location.description;
                  data.Time = element.time.slice(0, 5);
                  data.Selected = true;
                }
              });
            } else if (element.program == 'LOADING') {
              this.machineryConsoleListLoading.forEach((data) => {
                if (element.item.description == data.Item.toUpperCase()) {
                  data.id = element.id;
                  data.Location = element.location.description;
                  data.Time = element.time.slice(0, 5);
                  data.Selected = true;
                }
              });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  }
}
