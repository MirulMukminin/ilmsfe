import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { FuelWaterTank } from '../interfaces/MHE/mhe_interface';

@Component({
  selector: 'app-marine-fuelwater-request-form',
  templateUrl: './marine-fuelwater-request-form.component.html',
  styleUrls: ['./marine-fuelwater-request-form.component.scss'],
})
export class MarineFuelwaterRequestFormComponent implements OnInit {
  @ViewChild('singleDateElement') singleDateElement: ElementRef;
  @ViewChild('PoNumberElement') PoNumberElement: ElementRef;
  @ViewChild('locationElement') locationElement: ElementRef;
  @ViewChild('requestOnBehalfElement') requestOnBehalfElement: ElementRef;
  @ViewChild('vesselNameElement') vesselNameElement: ElementRef;
  @ViewChild('companyNameElement') companyNameElement: ElementRef;
  @ViewChild('terminalElement') terminalElement: ElementRef;
  @ViewChild('fuelWaterForm') fuelWaterForm: NgForm;

  listOfTank = [] as FuelWaterTank[];
  poNum = '';
  bookingDate = '';
  remarks = '';
  location: any;
  vesselName = '';
  companyName = '';
  terminal: string = 'KSB';

  dailyDate: any;
  currentDate: any;

  // for invalid UI
  invalidLocation = false;
  fuelWaterTankInvalid = false;
  formInvalid = false;
  invalidWeight: any = [];
  invalidPoNum = false;
  supplyType: string = 'VESSEL';
  invalidBookingDate = false;
  invalidbackDated = false;
  invalidStartTime: any = [];
  invalidRequestOnBehalf = false;
  requestOnBehalf = '';
  requestOnBehalfList: any[] = [];
  requestOnBehalfArr: any[] = [];
  terminalArr: any[] = [];
  terminalList: any[] = [];
  invalidTerminal = false;

  invalidVesselName = false;
  vesselNameArr: any[] = [];
  vesselNameList: any[] = [];

  invalidCompanyName = false;
  companyNameArr: any[] = [];
  companyNameList: any[] = [];

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

  initialData: any;
  requestByName: any;
  updateStatus = false;
  fuelWaterId: any;
  fuelWaterRequestNo: any;
  date = new Date();
  dateSelect = false;
  dateFlag: boolean;
  timeArr = [];
  numericCounter: any = 0;
  invalidNumeric = false;
  status = '';
  counterFuelWater = 0;
  tankArr = [{ content: 'FUEL' }, { content: 'WATER' }];
  invalidTank = [];
  invalidTankText = [];

  showAddButton: boolean = true;

  constructor(
    protected appService: AppService,
    public datepipe: DatePipe,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.populateTable();
    this.userInfo();
    this.getTimeDropdown();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        this.initialData = this.appService.populateInitData(userInfo);
        this.requestByName = this.initialData.Fullname;
        if (this._Activatedroute.snapshot.paramMap.get('requestNo')) {
          this.fuelWaterRequestNo =
            this._Activatedroute.snapshot.paramMap.get('requestNo');
          this.getRestServiceApi(this.fuelWaterRequestNo);
        } else {
          this.getRestServiceApi();
        }
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

  async getRestServiceApi(requestNo?: any) {
    //vessel name
    await restServices.pbksb_MarineService
      .ListVessel(this.appService.myApp)()
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);
        let array = resArr.vessel;

        array.forEach((element) => {
          this.vesselNameArr.push({
            content: element.name,
          });
        });

        this.vesselNameArr = this.vesselNameArr.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.vesselNameList = this.vesselNameArr;
      });

    await restServices.pbksb_MarineService
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
      });

    // request on behalf
    await restServices.pbksb_MarineService
      .ListCustomer(this.appService.myApp)()
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);
        let array = resArr.customer;

        array.forEach((element) => {
          if (element.full_name) {
            this.requestOnBehalfArr.push({
              content: element.name,
            });
          }
        });

        this.requestOnBehalfArr = this.requestOnBehalfArr.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.requestOnBehalfList = this.requestOnBehalfArr;
      });

    // terminal
    // await restServices.pbksb_MarineService
    // .ListCustomer(this.appService.myApp)()
    // .then((result) => {
    //   const resArr = this.appService.jsonToArray(result);
    //   let array = resArr.customer;

    //   array.forEach((element) => {
    //     if (element.full_name) {
    //       this.terminalArr.push({
    //         content: element.name,
    //       });
    //     }
    //   });

    //   this.terminalArr = this.terminalArr.sort((a, b) =>
    //     a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
    //   );
    //   this.terminalList = this.terminalArr;
    // });

    if (this.fuelWaterRequestNo) {
      const getCode: any = { requestNo: this.fuelWaterRequestNo };
      restServices.pbksb_MarineService
        .GetFuelWaterRequestFormStandAloneDetails(this.appService.myApp)(
          getCode
        )
        .then((result) => {
          const resArr: any = result;
          const request = JSON.parse(resArr);
          this.getFuelWaterFormDetails(request);
        });
    } else if (sessionStorage.getItem('fuelwaterstandalone')) {
      let data = JSON.parse(sessionStorage.getItem('fuelwaterstandalone')).form;
      let request = {
        fuelWater: {
          supply: data.supply,
          request_by_company: {
            name: data.requested_by_company,
          },
          vessel: {
            name: data.vessel_name,
          },
          company: {
            name: data.company,
          },

          terminal: data.terminal,
          po_number: data.po_number,
          booking_date: new Date(data.booking_date),
          remarks: data.remarks,
        },
        tank: [],
      };
      let listOfTank = [];

      data.berthFuelWaterTanks.forEach((val) => {
        listOfTank.push({
          id: Math.floor(Math.random() * 10000),
          full_tank: val.full_tank,
          item: val.tank.toUpperCase(),
          requested_quantity: val.weight,
          booking_time: val.start_time,
          indicator: val.indicator,
        });
      });

      request.tank = listOfTank;
      this.getFuelWaterFormDetails(request);
    } else {
      this.addFuelWaterRow('FUEL');
      this.addFuelWaterRow('WATER');
    }
  }

  getFuelWaterFormDetails(request): any {
    // if have no error
    if (request.status != 'BAD_REQUEST') {
      this.updateStatus = this.fuelWaterRequestNo ? true : false;
      this.supplyType = request.fuelWater.supply
        ? request.fuelWater.supply
        : '';
      this.companyName = request?.fuelWater?.company?.name
        ? request.fuelWater.company.name
        : '';
      this.vesselName = request?.fuelWater?.vessel?.name
        ? request.fuelWater.vessel.name
        : '';
      this.requestOnBehalf = request?.fuelWater?.request_on_behalf?.name
        ? request.fuelWater.request_on_behalf.name
        : '';
      this.terminal = request.fuelWater.terminal
        ? request.fuelWater.terminal
        : '';
      this.poNum = request.fuelWater.po_number
        ? request.fuelWater.po_number
        : '';
      this.bookingDate = request.fuelWater.booking_date
        ? formatDate(request.fuelWater.booking_date, 'dd/MM/yyyy', 'en_us')
        : '';
      this.remarks = request.fuelWater.remarks ? request.fuelWater.remarks : '';
      this.fuelWaterId = request.fuelWater.id ? request.fuelWater.id : '';
      this.status = request.fuelWater.status ? request.fuelWater.status : '';

      if (request.tank) {
        request.tank.forEach((element) => {
          // if (element.tank.toLowerCase() == 'fuel') {
          //   this.listOfTank[0].id = element.id ? element.id : '';
          //   this.listOfTank[0].FullTank = element.full_tank ? 'Yes' : 'No';
          //   this.listOfTank[0].Weight = element.weight
          //     ? element.weight
          //     : '';
          //   this.listOfTank[0].StartTime = element.start_time
          //     ? element.start_time.slice(0, 5)
          //     : '';
          //   this.listOfTank[0].Selected = element.indicator ? true : false;
          // } else if (element.tank.toLowerCase() == 'water') {
          //   this.listOfTank[1].id = element.id ? element.id : '';
          //   this.listOfTank[1].FullTank = element.full_tank ? 'Yes' : 'No';
          //   this.listOfTank[1].Weight = element.weight
          //     ? element.weight
          //     : '';
          //   this.listOfTank[1].StartTime = element.start_time
          //     ? element.start_time.slice(0, 5)
          //     : '';
          //   this.listOfTank[1].Selected = element.indicator ? true : false;
          // }

          this.listOfTank.push({
            id: element.tank_id
              ? element.tank_id
              : Math.floor(Math.random() * 10000),
            FullTank: element.full_tank ? 'Yes' : 'No',
            Tank: element.item.toUpperCase(),
            Weight: element.requested_quantity
              ? element.requested_quantity
              : '',
            StartTime: element.booking_time ? element.booking_time : '',
            Selected: '',
            Status: '',
            indicator: element.indicator,
          });
        });
        this.checkRow();
        if (this.listOfTank.length == 1) {
          if (this.listOfTank[0].Tank == 'FUEL') {
            this.addFuelWaterRow('WATER');
          } else {
            this.addFuelWaterRow('FUEL');
          }
        }
      }
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
  onSelectTerminal(event: any) {
    this.terminal = event.value;
  }

  inputValueChange() {
    if (this.poNum) {
      this.invalidPoNum = false;
    }

    if (this.companyName) {
      this.invalidCompanyName = false;
    }

    if (this.vesselName) {
      this.invalidVesselName = false;
    }

    if (this.requestOnBehalf) {
      this.invalidRequestOnBehalf = false;
    }

    if (this.location) {
      this.invalidLocation = false;
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

  onSelectSupply(event: any) {
    this.supplyType = event.value;
  }

  onSubmit() {
    
    this.validateBookingDate();
    if(!this.invalidBookingDate){
    this.validateTable();
    }
    this.validateForm();

    let berthFuelWaterTanks = [];
    let invalidTank = this.invalidTank.includes(true);

    if (!invalidTank) {
      this.listOfTank.forEach((data, index) => {
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

      // berthFuelWaterTanks.forEach((data, index) => {

      //   if(data.tank == "WATER"){
      //     berthFuelWaterTanks.push({
      //       id: isNaN(data.id) ? data.id : '',
      //       tank: "FUEL",
      //       indicator: false,
      //       full_tank: false,
      //       start_time: "",
      //       weight: "0",
      //     });
      //   }
      //  else if(data.tank == "FUEL"){
      //     berthFuelWaterTanks.push({
      //       id: isNaN(data.id) ? data.id : '',
      //       tank: "WATER",
      //       indicator: false,
      //       full_tank: false,
      //       start_time: "",
      //       weight: "0",
      //     });
      //   }

      // })
    }

    let param = {
      form: {
        requested_by: this.initialData.Fullname,
        requested_by_company: this.initialData.Company,
        company: this.companyName,
        supply: this.supplyType.toUpperCase(),
        // location: this.location ?? '',
        terminal: this.terminal,
        po_number: this.poNum,
        booking_date: this.bookingDate
          ? this.convertDate(this.bookingDate)
          : '',
        remarks: this.remarks,
        berthFuelWaterTanks: berthFuelWaterTanks,
        // fuel: {
        //   indicator: this.listOfTank[0].Selected,
        //   // indicator: this.listOfTank[0].StartTime ? true : false,
        //   full_tank: this.listOfTank[0].FullTank === 'No' ? false : true,
        //   start_time: this.listOfTank[0].StartTime,
        //   weight:
        //     this.listOfTank[0].FullTank == 'No'
        //       ? this.listOfTank[0].Weight === '' || !this.listOfTank[0].Weight
        //         ? '0'
        //         : this.listOfTank[0].Weight.toString()
        //       : '0',
        // },
        // water: {
        //   indicator: this.listOfTank[1].Selected,
        //   // indicator: this.listOfTank[1].StartTime ? true : false,
        //   full_tank: this.listOfTank[1].FullTank === 'No' ? false : true,
        //   start_time: this.listOfTank[1].StartTime,
        //   weight:
        //     this.listOfTank[1].FullTank == 'No'
        //       ? this.listOfTank[1].Weight === '' || !this.listOfTank[1].Weight
        //         ? '0'
        //         : this.listOfTank[1].Weight.toString()
        //       : '0',
        // },
      },
    };

    if (this.supplyType.toUpperCase() == 'VESSEL') {
      param.form['vessel_name'] = this.vesselName;
    } else {
      param.form['request_on_behalf'] = this.requestOnBehalf;
    }

    sessionStorage.setItem('fuelwaterstandalone', JSON.stringify(param));

    // console.log(param);
    let invalidWeight = this.invalidWeight.includes(true);
    let invalidStartTime = this.invalidStartTime.includes(true);

    if (
      !this.fuelWaterTankInvalid &&
      !this.formInvalid &&
      !invalidWeight &&
      !invalidStartTime &&
      !this.invalidbackDated &&
      !invalidTank
    ) {
      if (this.fuelWaterRequestNo) {
        this.router.navigate([
          '/operation-system/marine-fuelwater-form-preview',
          this.fuelWaterRequestNo,
        ]);
      } else {
        this.router.navigate([
          '/operation-system/marine-fuelwater-form-preview',
        ]);
      }
    }
  }

  validateForm() {
    this.invalidPoNum = this.poNum ? false : true;
    this.invalidLocation = this.location && this.location != '' ? false : true;

    if (this.bookingDate) {
      this.invalidBookingDate = false;
      this.validateBookingDate();
    } else {
      this.invalidBookingDate = true;
    }

    if (this.supplyType.toUpperCase() == 'VESSEL') {
      this.invalidCompanyName =
        this.companyName && this.companyName != '' ? false : true;
      this.invalidVesselName =
        this.vesselName && this.vesselName != '' ? false : true;
      if (
        // !this.invalidLocation &&
        !this.invalidPoNum &&
        !this.invalidBookingDate &&
        !this.invalidCompanyName &&
        !this.invalidVesselName
      ) {
        this.formInvalid = false;
      } else {
        this.formInvalid = true;
      }
    } else {
      this.invalidRequestOnBehalf =
        this.requestOnBehalf && this.requestOnBehalf != '' ? false : true;
      if (
        // !this.invalidLocation &&
        !this.invalidPoNum &&
        !this.invalidBookingDate &&
        !this.invalidRequestOnBehalf
      ) {
        this.formInvalid = false;
      } else {
        this.formInvalid = true;
      }
    }

    this.focusOnInvalid();
  }

  validateTable() {
    console.log("validateTable==")
    let isSelected = false;
    // this.listOfTank.forEach((value, i) => {
    //   if (value.Selected == true) {
    //     isSelected = true;
    //     if (value.FullTank == 'No') {
    //       this.invalidWeight[i] =
    //         !value.Weight || +value.Weight <= 0 ? true : false;
    //     } else {
    //       this.invalidWeight[i] = false;
    //     }

    //     this.invalidStartTime[i] = !value.StartTime ? true : false;
    //   }
    // });

    this.listOfTank.forEach((value, i) => {
      if (value.indicator == true) {
            isSelected = true;
      }
      console.log(isSelected)
      // isSelected = true;
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
      // this.invalidStartTime[i] = value.StartTime && value.indicator ? false : true;
      this.invalidTank[i] = value.Tank ? false : true;
      this.invalidTankText[i] = 'Tank Required';
      console.log('invalidTankText ', this.invalidTankText);
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
    } else {
      this.fuelWaterTankInvalid = true;
    }
  }

  onSelected(event) {
    console.log("onSelected==")
    let isSelected = false;
    console.log(event)
    if(event.checked){
      isSelected=true;
    }

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
    // if (event === true) {
    //   this.counterFuelWater++;
    // } else if (event == false) {
    //   this.counterFuelWater--;
    // }
    console.log(isSelected);
    console.log(this.fuelWaterTankInvalid);
    
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

  validateBookingDate() {
    if (this.bookingDate) {
      this.invalidBookingDate = false;
      // this.backDatedDate = false;
      this.invalidbackDated = false;

      let singleDate;
      if (this.updateStatus && !this.dateSelect) {
        var dateParts = this.bookingDate.split('/');
        singleDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      } else {
        if (!sessionStorage.getItem('fuelwaterstandalone')) {
          singleDate = new Date(this.bookingDate);
        } else {
          if (!this.dateSelect) {
            var dateParts = this.bookingDate.split('/');
            singleDate = new Date(
              +dateParts[2],
              +dateParts[1] - 1,
              +dateParts[0]
            );
          } else {
            singleDate = new Date(this.bookingDate);
          }
        }
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

      // console.log(dateInput, todayDate);

      if (new Date(dateInput) < new Date(todayDate)) {
        this.invalidbackDated = true;
        // console.log('less than today');
      } else if (new Date(dateInput) == new Date(todayDate)) {
        // console.log('today day');
      } else {
        // console.log('more than today');
      }
    } else {
      this.invalidBookingDate = true;
    }

    this.focusOnInvalid();
  }

  focusOnInvalid() {
    if (this.invalidPoNum) {
      this.PoNumberElement.nativeElement.focus();
      this.PoNumberElement.nativeElement.select();
    }
    if (this.invalidBookingDate) {
      this.singleDateElement.nativeElement.focus();
    } else if (this.invalidbackDated) {
      this.singleDateElement.nativeElement.focus();
    }

    // if (this.invalidLocation) {
    //   this.locationElement.nativeElement.focus();
    // }

    if (this.invalidCompanyName) {
      this.companyNameElement.nativeElement.focus();
    }
    if (this.invalidTerminal) {
      this.terminalElement.nativeElement.focus();
    }

    if (this.supplyType == 'VESSEL') {
      if (this.invalidVesselName) {
        this.vesselNameElement.nativeElement.focus();
      }
    } else {
      if (this.invalidRequestOnBehalf) {
        this.requestOnBehalfElement.nativeElement.focus();
      }
    }
  }

  onChange(event: any) {
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
      // subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
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
    // console.log(this.listOfTank);

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

    console.log(this.listOfTank);

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
