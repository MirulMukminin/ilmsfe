import { DatePipe, formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestCFSType } from 'enums/enums';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { OtherActivityService } from '../services/CFS/other-activity.service';

@Component({
  selector: 'app-cfs-other-activity-form',
  templateUrl: './cfs-other-activity-form.component.html',
  styleUrls: ['./cfs-other-activity-form.component.scss'],
})
export class CfsOtherActivityFormComponent implements OnInit {
  companyName;
  requestBy;
  date;
  time;
  poNumber;
  requestPriority;

  // drop-down list
  timeList = [];
  containerNoList: any = [];
  containerNoArr: any = [];
  containerNoSelect: any = [];
  containerTypeList: any = [
    {
      content: 'DRY',
    },
    {
      content: 'CHILLER',
    },
    {
      content: 'FREEZER',
    },
  ];

  //invalid
  invalidDate: boolean = false;
  invalidDateText: string = '';
  invalidTime: boolean = false;
  invalidTimeText: string = '';
  poNumberInvalid: boolean = false;

  // date notification
  showNoti;
  notiCutoffCollection = {
    type: 'info',
    title: 'Booking is closed for this date.',
    message:
      'Any Booking needs to be made 1 day before 3 PM from the booking date. <br />Please contact KSB at 08-863 4378 for more information. ',
    showClose: false,
    lowContrast: true,
  };

  // table details
  plugOnOffDetails = [];

  // tabs
  @Input() followFocus = true;
  @Input() cacheActive = true;
  @Input() isNavigation = true;
  @Input() type = 'default';

  // tab checkbox appear when fill item
  plugOnCheckbox: boolean;
  loadingCheckbox: boolean;
  housekeepingCheckbox: boolean;
  repairCheckbox: boolean;

  // edit
  isEdit: boolean = false;
  formNo;
  status;
  formData;
  plugOnData;
  loadingData;
  housekeepingData;
  repairData;
  locationData;
  vesselData;

  // modal
  open: boolean = false;

  isLoading: boolean = false;
  overlay: boolean = false;

  constructor(
    private datepipe: DatePipe,
    private appService: AppService,
    private cfsService: OtherActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.formNo = this.activatedRoute.snapshot.paramMap.get('formNo');
    this.cfsService.resetData();
    this.getTimeDropdown();
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.companyName = initialData.Company;
        this.requestBy = userInfo.username.name;

        let orderNo = this.activatedRoute.snapshot.paramMap.get('formNo');
        if (orderNo !== null) {
          this.cfsService.setFormNo(orderNo);
          this.isEdit = true;
          let params = { ticketNo: orderNo };
          restServices.pbksb_RequestCFSService
            .getRequestByTicketNumber(this.appService.myApp)(params)
            .then((result) => {
              let resArr: any = result;
              let cfsRequest = this.appService.jsonToArray(resArr);
              this.formData = cfsRequest;

              this.formNo = this.formData.ticketNumber;
              this.status = this.formData.status;

              if (this.isEdit) {
                this.populateData();
              }
            });
        }
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  getRestServiceApi() {
    // let locationPromise = restServices.pbksb_PSBService
    //   .GetSiteLocation(this.appService.myApp)()
    //   .then((result) => {
    //     const array: any = result;
    //     const locationDropdown = JSON.parse(array);

    //     this.locationArr = locationDropdown;

    //     for (let i = 0; i < this.locationArr.length; i++) {
    //       this.locationSelect.push({
    //         content: this.locationArr[i].description,
    //       });
    //     }
    //     this.locationList = this.locationSelect;
    //   });

    let params = {
      customer: this.companyName,
      requestType: RequestCFSType['STORAGE'],
    };
    let containerNoPromise = restServices.pbksb_RequestCFSService
      .getContainersByRequestType(this.appService.myApp)(params)
      .then((result) => {
        let array: any = result;
        const containerNoDropdown = JSON.parse(array);

        this.containerNoArr = containerNoDropdown;

        for (let i = 0; i < this.containerNoArr.length; i++) {
          this.containerNoSelect.push({
            content: this.containerNoArr[i].containerNumber,
            conType: this.containerNoArr[i].containerType,
          });
        }
        this.containerNoList = this.containerNoSelect;
      });
    Promise.all([containerNoPromise]).then((values) => {
      // if (this.isEdit) {
      //   this.populateData();
      // }
    });
  }

  populateData() {
    this.date = formatDate(this.formData.date, 'dd/MM/Y', 'en-US');
    this.time = formatDate(this.formData.date, 'HH:mm', 'en-US').toString();
    this.poNumber = this.formData?.poNumber ?? '-';

    if (this.formData.plugOnLine) {
      this.plugOnData = this.formData.plugOnLine;
      this.plugOnCheckbox = this.formData.plugOnLine.length > 0 ? true : false;
    }

    if (this.formData.loadingLine) {
      this.loadingData = this.formData.loadingLine;
      this.loadingCheckbox =
        this.formData.loadingLine.length > 0 ? true : false;
    }

    if (this.formData.housekeepingLine) {
      this.housekeepingData = this.formData.housekeepingLine;
      this.housekeepingCheckbox =
        this.formData.housekeepingLine.length > 0 ? true : false;
    }

    if (this.formData.repairLine) {
      this.repairData = this.formData.repairLine;
      this.repairCheckbox = this.formData.repairLine.length > 0 ? true : false;
    }

    if (this.formData.location) {
      this.locationData = this.formData.location.description;
    }

    if (this.formData.vessel) {
      this.vesselData = this.formData.vessel.name;
    }
  }

  checkDate() {
    if (this.date && this.date.toString().includes('/')) {
      let dateArr = this.date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      this.date = new Date(d);
      this.date.setHours(0, 0, 0, 0);
    }
  }

  setRequestType(bookingDateTime) {
    let dateValdiation = true;
    var day = 1000 * 60 * 60 * 24;
    let currentDate = new Date();
    let dateTimeNow = new Date(currentDate);
    let currentTime = currentDate.getHours();
    // console.log(currentTime);
    currentDate.setHours(0, 0, 0, 0);
    let bookDate = new Date(this.date);
    let numberOfDays =
      Math.round(bookDate.getTime() - currentDate.getTime()) / day;
    console.log('numberOfDays: ', numberOfDays);
    console.log('currentTime: ', currentTime);
    this.invalidDate = false;
    if (bookDate < currentDate) {
      this.requestPriority = 'normal';
      return dateValdiation;
    }
    if (numberOfDays > 2 || (numberOfDays === 2 && currentTime < 8)) {
      this.requestPriority = 'normal';
      console.log('normal request');
    } else {
      console.log('urgent/emergency request');
      var hour = 1000 * 60 * 60;
      let bookDt = new Date(+bookingDateTime);
      console.log(bookDt);
      let numberOfHour =
        Math.round(bookDt.getTime() - dateTimeNow.getTime()) / hour;
      console.log(dateTimeNow);
      console.log(numberOfHour);
      if (numberOfHour > 6) {
        console.log('urgent Request');
        this.requestPriority = 'urgent';
      } else if (numberOfHour > 2) {
        console.log('emergency Request');
        this.requestPriority = 'emergency';
      } else {
        // Allow backdate
        // console.log('booking closed');
        this.requestPriority = 'normal';
        // this.invalidDate = true;
        // this.invalidDateText = 'Booking Closed';
        // this.dateElement.nativeElement.focus();
      }
    }
    return dateValdiation;
  }

  submitClick() {
    let startdate;
    if (this.validation()) {
      this.checkDate();
      const sDate = formatDate(this.date, 'M/d/yyyy', 'en_us');
      startdate = new Date(sDate + ' ' + this.time).getTime().toString();

      this.setRequestType(startdate);
      if (this.requestPriority !== 'invalid') {
        this.open = true;
      }
    }
  }

  onSubmit(cfsForm) {}

  submitForm() {
    this.open = false;
    let allError = this.cfsService.getAllError();
    if (this.validation() && allError.length < 1) {
      if (this.isEdit) {
        this.checkDate();
      }
      let requestDate = new Date(this.date);
      let requestTime = this.time.split(':');
      requestDate.setHours(+requestTime[0]);
      this.cfsService.setMainData(
        this.companyName,
        this.requestBy,
        requestDate.getTime().toString(),
        // this.requestPriority,
        this.poNumber
      );
      let submitData = this.cfsService.getFormData();
      console.log('submitData =');
      console.log(submitData);
      if (
        submitData.form.requestPlugOnLineList.length < 1 &&
        submitData.form.requestLoadingLineList.length < 1 &&
        submitData.form.requestHousekeepingLineList.length < 1 &&
        submitData.form.requestRepairLineList.length < 1
      ) {
        console.log('No line request');
        let now = new Date();
        this.appService.showToaster({
          type: 'error',
          title: 'Cannot Submit',
          subtitle: 'Please fill in at least one of the service details. ',
          // 'The request has failed to be submitted. Please try again',
          time: formatDate(now, 'HH:mm', 'en-US'),
        });
      } else {
        if (!this.isEdit) {
          restServices.pbksb_RequestCFSService
            .createCFSRequest(this.appService.myApp)(submitData)
            .then((result) => {
              let returnObj = this.appService.jsonToArray(result);

              let currDate = new Date();
              if (returnObj.success) {
                this.router
                  .navigate(['/operation-system/cfs-request-list'])
                  .then(() => {
                    this.appService.showToaster({
                      type: 'success',
                      title: 'Request Submitted',
                      subtitle:
                        'Form No. ' +
                        returnObj.requestNo +
                        ' is successfully submitted.',
                      time: formatDate(currDate, 'HH:mm', 'en-US'),
                    });
                  });
              } else {
                let errorMsg = returnObj.errorMessage.split(':');
                this.appService.showToaster({
                  type: 'error',
                  title: 'Cannot Submit',
                  subtitle: errorMsg.length > 1 ? errorMsg[1] : errorMsg[0],
                  // 'The request has failed to be submitted. Please try again',
                  time: formatDate(currDate, 'HH:mm', 'en-US'),
                });
              }
            });
        } else {
          // edit API
          restServices.pbksb_RequestCFSService
            .editCFSRequest(this.appService.myApp)(submitData)
            .then((result) => {
              let returnObj = this.appService.jsonToArray(result);

              let currDate = new Date();
              if (returnObj.success) {
                this.router
                  .navigate(['/operation-system/cfs-request-list'])
                  .then(() => {
                    this.appService.showToaster({
                      type: 'success',
                      title: 'Request Edited',
                      subtitle:
                        'Form No. ' +
                        returnObj.requestNo +
                        ' is successfully edited.',
                      time: formatDate(currDate, 'HH:mm', 'en-US'),
                    });
                  });
              } else {
                let errorMsg = returnObj.errorMessage.split(':');
                this.appService.showToaster({
                  type: 'error',
                  title: 'Cannot Submit',
                  subtitle: errorMsg.length > 1 ? errorMsg[1] : errorMsg[0],
                  // 'The request has failed to be submitted. Please try again',
                  time: formatDate(currDate, 'HH:mm', 'en-US'),
                });
              }
            });
        }
      }
    } else if (allError.length > 0) {
      let now = new Date();
      let errormsg = 'Please resolve the error in ';
      allError.forEach((item, index) => {
        errormsg += item;
        errormsg += index === allError.length - 1 ? ', ' : '';
      });
      this.appService.showToaster({
        type: 'error',
        title: 'Cannot Submit',
        subtitle: errormsg,
        // 'The request has failed to be submitted. Please try again',
        time: formatDate(now, 'HH:mm', 'en-US'),
      });
    }

    if (allError.length < 1) {
      let plugOnLineRequest = this.cfsService.getPlugOnLineRequest();
      let loadingCablingLineRequest =
        this.cfsService.getLoadingCablingLineRequest();
      let housekeepingLineRequest =
        this.cfsService.getHousekeepingLineRequest();
      let repairLineRequest = this.cfsService.getRepairLineRequest();
    } else {
    }
  }

  validation() {
    let validate = true;

    if (!this.date) {
      this.invalidDate = true;
      this.invalidDateText = 'Date Required';
      validate = false;
    }

    // if (this.invalidDate) {
    //   validate = false;
    // }

    if (!this.time) {
      this.invalidTime = true;
      validate = false;
    }

    if (!this.poNumber) {
      this.poNumberInvalid = true;
      validate = false;
    }

    return validate;
  }

  checkSelected() {
    // return this.plugOnOffDetails.some((item) => item.selected === true);
    return true;
  }

  inputValueChange() {
    if (this.time) {
      this.invalidTime = false;
    }

    if (this.poNumber) {
      this.poNumberInvalid = false;
    }

    // if (this.location) {
    //   this.locationInvalid = false;
    // }

    // this.storageDetail.forEach((item) => {
    //   if (item.containerNumber) {
    //     item.invalidContainerNo = false;
    //   }
    // });
  }

  dateChange() {
    // if (this.date) {
    //   let current = new Date();
    //   let hours = current.getHours;
    //   current.setHours(0, 0, 0, 0);
    //   let bookDate = new Date(this.date);
    //   this.showNoti = false;
    //   if (bookDate < current) {
    //     this.invalidDate = true;
    //     this.invalidDateText = "Please select a date after today's date";
    //   } else if (bookDate >= current) {
    //     this.invalidDate = false;
    //     this.invalidDateText = '';
    //     this.getTimeDropdown();
    //     this.validateDate();
    //   }
    // }
  }

  // validateDate() {
  //   let dateValdiation = true;
  //   var day = 1000 * 60 * 60 * 24;
  //   let currentDate = new Date();
  //   let currentTime = currentDate.getHours();
  //   currentDate.setHours(0, 0, 0, 0);
  //   let bookDate = new Date(this.date);
  //   let numberOfDays =
  //     Math.round(bookDate.getTime() - currentDate.getTime()) / day;
  //   this.invalidDate = false;

  //   if (bookDate < currentDate) {
  //     this.invalidDate = true;
  //     this.invalidDateText = "Please select a date after today's date";
  //     dateValdiation = false;
  //   } else {
  //     if (numberOfDays < 1 || (numberOfDays === 1 && currentTime > 14)) {
  //       this.showNoti = true;

  //       this.invalidDate = true;
  //       this.invalidDateText = '';
  //       dateValdiation = false;
  //     } else {
  //       this.showNoti = false;
  //       this.getTimeDropdown();
  //     }
  //   }

  //   return dateValdiation;
  // }

  getTimeDropdown() {
    this.timeList = [];
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
      this.timeList.push({
        content: time[i],
      });
    }
  }

  filterTimeArr() {
    let current = new Date();
    // let latestTime = formatDate(current, 'HH:mm', 'en-US');
    let latestTime = this.datepipe.transform(current, 'HH:mm');

    this.timeList = this.timeList.filter((time) => time.content > latestTime);
  }

  onTabSelected(event) {}

  showCheckbox(display) {
    this.plugOnCheckbox = display;
  }

  showLoadingCheckbox(display) {
    this.loadingCheckbox = display;
  }

  showHousekeepingCheckbox(display) {
    this.housekeepingCheckbox = display;
  }

  showRepairCheckbox(display) {
    this.repairCheckbox = display;
  }

  redirectToPrevious() {
    history.back();
  }
}
