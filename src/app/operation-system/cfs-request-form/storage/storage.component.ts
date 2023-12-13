import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestCFSType } from 'enums/enums';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

export interface storageDetails {
  containerNumber?: string;
  containerType?: string;
  remarks?: string;
  invalidContainerNo?: boolean;
  invalidContainerType?: boolean;
  invalidRemarks?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  // Data from parent component (CFS Request Form)
  @Input() companyName: string;
  @Input() requestBy: string;
  @Input() isEdit: boolean;
  @Input() formData: any;

  // field reference
  @ViewChild('dateElement') dateElement;
  @ViewChild('timeElement') timeElement;
  @ViewChild('locationElement') locationElement;
  @ViewChildren('containerNoRef') containerNoRef;

  // data model
  date;
  time;
  // location;
  storageDetail: storageDetails[] = [];

  // dropdown list
  timeList = [];
  // locationList = [];
  // locationArr: any = [];
  // locationSelect: any = [];
  containerNoList: any = [];
  containerNoArr: any = [];
  containerNoSelect: any = [];
  containerTypeList: any = [
    {
      content: 'DRY',
    },
    {
      content: 'CHILLER_FREEZER',
    },
  ];

  // Invalid
  dateInvalid: boolean = false;
  dateInvalidText: string;
  invalidTime: boolean = false;
  // locationInvalid: boolean = false;

  // modal
  open: boolean = false;

  //noti
  notiCutoffCollection = {
    type: 'info',
    title: 'Booking is closed for this date.',
    message:
      'Any Booking needs to be made 1 day before 3 PM from the booking date. <br />Please contact KSB at 08-863 4378 for more information. ',
    showClose: false,
    lowContrast: true,
  };
  showNoti: boolean = false;

  isLoading: boolean = false;
  overlay: boolean = false;

  requestPriority: '' | 'normal' | 'urgent' | 'emergency' | 'invalid' = '';

  poNumber: string;
  poNumberInvalid: boolean = false;

  constructor(
    private datepipe: DatePipe,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.userInfo();
    this.getRestServiceApi();
    this.getTimeDropdown();
    this.addRow();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        // this.companyName = initialData.Company;
        // this.requestBy = initialData.Fullname;
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
      if (this.isEdit) {
        this.populateData();
      }
    });
  }

  populateData() {
    this.date = formatDate(this.formData.date, 'dd/MM/Y', 'en-US');
    this.time = formatDate(this.formData.date, 'HH:mm', 'en-US').toString();
    // this.location = this.formData.location;
    this.poNumber = this.formData?.poNumber ?? '-';

    if (this.formData.requestLine) {
      this.storageDetail = [];

      this.formData.requestLine.forEach((item) => {
        this.containerNoList.push({
          content: item.containerNumber,
        });
        this.storageDetail.push({
          containerNumber: item.containerNumber,
          containerType: item.containerType,
          remarks: item.remarks,
          selected: false,
          invalidContainerNo: false,
          invalidRemarks: false,
        });
      });
    }
  }
  onSearch(event, index) {
    this.storageDetail[index].containerNumber = event;
  }

  onSelected(event, index) {
    this.storageDetail[index].containerType = event.item.conType;
  }

  addRow() {
    this.storageDetail.push({
      containerNumber: '',
      remarks: '',
      selected: false,
      invalidContainerNo: false,
      invalidRemarks: false,
    });
  }

  deleteRow() {
    this.storageDetail.forEach((rowDetail, i) => {
      if (rowDetail.selected) {
        this.storageDetail = this.storageDetail.filter(
          (item) => item.selected !== rowDetail.selected
        );
      }
    });
  }

  cancelAction() {
    this.storageDetail.forEach((rowDetail) => {
      if (rowDetail.selected) {
        rowDetail.selected = false;
      }
    });
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
    this.dateInvalid = false;
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
        // Alow backdate
        // console.log('booking closed');
        this.requestPriority = 'normal';
        // this.dateInvalid = true;
        // this.dateInvalidText = 'Booking Closed';
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

  onSubmit(form: NgForm) {
    let startdate;
    this.open = false;
    this.isLoading = true;
    this.overlay = true;
    if (this.validation()) {
      this.checkDate();
      const sDate = formatDate(this.date, 'M/d/yyyy', 'en_us');
      startdate = new Date(sDate + ' ' + this.time).getTime().toString();

      this.setRequestType(startdate);
      let requestLineList = this.storageDetail.map(
        ({
          invalidContainerNo,
          invalidRemarks,
          invalidContainerType,
          selected,
          ...rest
        }) => rest
      );
      if (!this.isEdit) {
        let requestDate = new Date(this.date);
        let requestTime = this.time.split(':');
        requestDate.setHours(+requestTime[0]);
        let submitData = {
          form: {
            companyName: this.companyName,
            requestBy: this.requestBy,
            requestType: 'STORAGE',
            date: requestDate.getTime().toString(),
            poNumber: this.poNumber,
            // location: this.location,
            requestLineList: requestLineList,
            // requestPriority: this.requestPriority,
          },
        };

        restServices.pbksb_RequestCFSService
          .createCFSRequest(this.appService.myApp)(submitData)
          .then((result) => {
            this.isLoading = false;
            this.overlay = false;
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
        this.checkDate();
        let requestDate = new Date(this.date);
        let requestTime = this.time.split(':');
        requestDate.setHours(+requestTime[0]);
        let submitData = {
          form: {
            companyName: this.companyName,
            ticketNo: this.formData.ticketNumber,
            date: requestDate.getTime().toString(),
            requestType: 'STORAGE',
            // location: this.location,
            poNumber: this.poNumber,
            requestLineList: requestLineList,
            // requestPriority: this.requestPriority,
          },
        };
        restServices.pbksb_RequestCFSService
          .editCFSRequest(this.appService.myApp)(submitData)
          .then((result) => {
            this.isLoading = false;
            this.overlay = false;
            let returnObj = this.appService.jsonToArray(result);

            let currDate = new Date();
            if (returnObj.success) {
              this.router
                .navigate([
                  '/operation-system/cfs-request-preview/',
                  returnObj.requestNo,
                ])
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
  }

  // dateChange() {
  //   if (this.date) {
  //     let current = new Date();
  //     let hours = current.getHours;
  //     current.setHours(0, 0, 0, 0);
  //     let bookDate = new Date(this.date);
  //     this.showNoti = false;

  //     if (bookDate < current) {
  //       this.dateInvalid = true;
  //       this.dateInvalidText = "Please select a date after today's date";
  //     } else if (bookDate >= current) {
  //       this.dateInvalid = false;
  //       this.dateInvalidText = '';
  //       this.getTimeDropdown();
  //       this.validateDate();
  //     }
  //   }
  // }

  // validateDate() {
  //   let dateValdiation = true;
  //   var day = 1000 * 60 * 60 * 24;
  //   let currentDate = new Date();
  //   let currentTime = currentDate.getHours();
  //   currentDate.setHours(0, 0, 0, 0);
  //   let bookDate = new Date(this.date);
  //   let numberOfDays =
  //     Math.round(bookDate.getTime() - currentDate.getTime()) / day;
  //   this.dateInvalid = false;

  //   if (bookDate < currentDate) {
  //     this.dateInvalid = true;
  //     this.dateInvalidText = "Please select a date after today's date";
  //     dateValdiation = false;
  //   } else {
  //     if (numberOfDays < 1 || (numberOfDays === 1 && currentTime > 14)) {
  //       this.showNoti = true;

  //       this.dateInvalid = true;
  //       this.dateInvalidText = '';
  //       dateValdiation = false;
  //     } else {
  //       this.showNoti = false;
  //       this.getTimeDropdown();
  //     }
  //   }

  //   return dateValdiation;
  // }

  filterTimeArr() {
    let current = new Date();
    // let latestTime = formatDate(current, 'HH:mm', 'en-US');
    let latestTime = this.datepipe.transform(current, 'HH:mm');

    this.timeList = this.timeList.filter((time) => time.content > latestTime);
  }

  validation() {
    let validate = true;

    if (!this.date) {
      this.dateInvalid = true;
      this.dateInvalidText = 'Date Required';
      validate = false;
    }

    if (!this.time) {
      this.invalidTime = true;
      validate = false;
    }

    if (!this.poNumber) {
      this.poNumberInvalid = true;
      validate = false;
    }

    // if (!this.location) {
    //   this.locationInvalid = true;
    //   validate = false;
    // }

    this.storageDetail.forEach((item) => {
      if (!item.containerNumber || item.containerNumber.length < 1) {
        item.invalidContainerNo = true;
        validate = false;
      }
    });

    this.focusOnInvalid();
    return validate;
  }

  focusOnInvalid() {
    if (this.dateInvalid) {
      this.dateElement.nativeElement.focus();
    } else if (this.invalidTime) {
      this.timeElement.input.nativeElement.focus();
    }
    // else if (this.locationInvalid) {
    //   this.locationElement.input.nativeElement.focus();
    // }
    else if (
      this.storageDetail.some((item) => {
        return item.invalidContainerNo;
      })
    ) {
      let i = 0;
      for (let item of this.containerNoRef) {
        if (this.storageDetail[i].invalidContainerNo) {
          item.input.nativeElement.focus();
          return false;
        }
        i++;
      }
    }
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

    this.storageDetail.forEach((item) => {
      if (item.containerNumber) {
        item.invalidContainerNo = false;
      }
    });
  }

  checkSelected() {
    return this.storageDetail.some((item) => item.selected === true);
  }

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
}
