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

export interface loadingCablingDetails {
  containerNo?: string;
  containerType?: string;
  cablingOnVessel?: boolean;
  fourCore?: boolean;
  remarks?: string;
  invalidContainerNo?: boolean;
  invalidRemarks?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-loading-cabling',
  templateUrl: './loading-cabling.component.html',
  styleUrls: ['./loading-cabling.component.scss'],
})
export class LoadingCablingComponent implements OnInit {
  // Data from parent component (CFS Request Form)
  @Input() companyName: string;
  @Input() requestBy: string;
  @Input() isEdit: boolean;
  @Input() formData: any;

  // field reference
  @ViewChild('dateElement') dateElement;
  @ViewChild('timeElement') timeElement;
  @ViewChild('locationElement') locationElement;
  @ViewChild('vesselNameRef') vesselNameRef;
  @ViewChildren('containerNoRef') containerNoRef;
  @ViewChildren('conTypeRef') conTypeRef;

  // data model
  date;
  time;
  location;
  vesselName;
  loadingCablingDetails: loadingCablingDetails[] = [];

  // dropdown list
  timeList = [];
  locationList = [];
  locationArr: any = [];
  locationSelect: any = [];
  containerNoList: any = [];
  containerNoArr: any = [];
  containerNoSelect: any = [];

  // Invalid
  dateInvalid: boolean = false;
  dateInvalidText: string;
  invalidTime: boolean = false;
  locationInvalid: boolean = false;
  vesselNameInvalid: boolean = false;

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

  constructor(
    private datepipe: DatePipe,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRestServiceApi();
    this.getTimeDropdown();
    this.addRow();
  }

  getRestServiceApi() {
    let locationPromise = restServices.pbksb_PSBService
      .GetSiteLocation(this.appService.myApp)()
      .then((result) => {
        const array: any = result;
        const locationDropdown = JSON.parse(array);

        this.locationArr = locationDropdown;

        for (let i = 0; i < this.locationArr.length; i++) {
          this.locationSelect.push({
            content: this.locationArr[i].description,
          });
        }
        this.locationList = this.locationSelect;
      });

    let params = {
      customer: this.companyName,
      requestType: RequestCFSType['LOADING_CABLING'],
    };
    let containerNoPromise = restServices.pbksb_RequestCFSService
      .getContainersByRequestType(this.appService.myApp)(params)
      .then((result) => {
        let array: any = result;
        console.log(array);
        const containerNoDropdown = JSON.parse(array);

        this.containerNoArr = containerNoDropdown;

        for (let i = 0; i < this.containerNoArr.length; i++) {
          console.log(this.containerNoArr[i].containerNumber);
          this.containerNoSelect.push({
            content: this.containerNoArr[i].containerNumber,
            conType: this.containerNoArr[i].containerType,
          });
        }
        this.containerNoList = this.containerNoSelect;
      });
    Promise.all([locationPromise, containerNoPromise]).then((values) => {
      if (this.isEdit) {
        this.populateData();
      }
    });
  }

  populateData() {
    this.date = formatDate(this.formData.date, 'dd/MM/Y', 'en-US');
    this.time = formatDate(this.formData.date, 'HH:mm', 'en-US').toString();
    this.vesselName = this.formData.vessel;
    this.location = this.formData.location;

    if (this.formData.requestLine) {
      console.log('test');
      this.loadingCablingDetails = [];

      this.formData.requestLine.forEach((item) => {
        this.containerNoList.push({
          content: item.container.containerNumber,
        });
        this.loadingCablingDetails.push({
          containerNo: item.container.containerNumber,
          cablingOnVessel: item.cablingOnVessel,
          fourCore: item.fourCoreDNV,
          containerType: item.container.containerType,
          remarks: item.remarks,
          selected: false,
          invalidContainerNo: false,
          invalidRemarks: false,
        });
      });
    }
  }

  onSelected(event, postIndex) {
    if (event) {
      this.loadingCablingDetails[postIndex].containerType = event.item.conType;
    }
  }

  addRow() {
    this.loadingCablingDetails.push({
      containerNo: '',
      containerType: '',
      cablingOnVessel: false,
      fourCore: false,
      remarks: '',
      selected: false,
      invalidContainerNo: false,
      invalidRemarks: false,
    });
  }

  deleteRow() {
    this.loadingCablingDetails.forEach((rowDetail, i) => {
      if (rowDetail.selected) {
        this.loadingCablingDetails = this.loadingCablingDetails.filter(
          (item) => item.selected !== rowDetail.selected
        );
      }
    });
  }

  cancelAction() {
    this.loadingCablingDetails.forEach((rowDetail) => {
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

  onSubmit(form: NgForm) {
    this.open = false;
    if (this.validation()) {
      let requestLineData = this.loadingCablingDetails.map(
        ({ invalidContainerNo, invalidRemarks, selected, ...rest }) => rest
      );
      let requestLineList = [];
      requestLineData.forEach((item) => {
        requestLineList.push({
          containerNumber: item.containerNo,
          cablingOnVessel: item.cablingOnVessel,
          fourCore: item.fourCore,
          remarks: item.remarks,
        });
      });

      if (!this.isEdit) {
        let requestDate = new Date(this.date);
        let requestTime = this.time.split(':');
        requestDate.setHours(+requestTime[0]);
        let submitData = {
          form: {
            companyName: this.companyName,
            requestBy: this.requestBy,
            requestType: 'LOADING_CABLING',
            date: requestDate.getTime().toString(),
            location: this.location,
            vessel: this.vesselName,
            requestLineList: requestLineList,
          },
        };
        console.log(submitData);
        restServices.pbksb_RequestCFSService
          .createCFSRequest(this.appService.myApp)(submitData)
          .then((result) => {
            let returnObj = this.appService.jsonToArray(result);
            console.log(returnObj);

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
              this.appService.showToaster({
                type: 'error',
                title: 'Cannot Submit',
                subtitle: returnObj.errorMessage,
                // 'The request has failed to be submitted. Please try again',
                time: formatDate(currDate, 'HH:mm', 'en-US'),
              });
            }
          });
      } else {
        console.log(this.date);
        this.checkDate();
        console.log(this.date);
        let requestDate = new Date(this.date);
        let requestTime = this.time.split(':');
        requestDate.setHours(+requestTime[0]);
        let submitData = {
          form: {
            companyName: this.companyName,
            ticketNo: this.formData.ticketNumber,
            date: requestDate.getTime().toString(),
            requestType: 'LOADING_CABLING',
            location: this.location,
            requestLineList: requestLineList,
            vessel: this.vesselName,
          },
        };
        console.log(submitData);
        restServices.pbksb_RequestCFSService
          .editCFSRequest(this.appService.myApp)(submitData)
          .then((result) => {
            let returnObj = this.appService.jsonToArray(result);
            console.log(returnObj);

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
              this.appService.showToaster({
                type: 'error',
                title: 'Cannot Submit',
                subtitle: returnObj.errorMessage,
                // 'The request has failed to be submitted. Please try again',
                time: formatDate(currDate, 'HH:mm', 'en-US'),
              });
            }
          });
      }
    }
  }

  dateChange() {
    if (this.date) {
      let current = new Date();
      let hours = current.getHours;
      current.setHours(0, 0, 0, 0);
      let bookDate = new Date(this.date);
      console.log(bookDate);
      console.log(current);
      this.showNoti = false;

      if (bookDate < current) {
        this.dateInvalid = true;
        this.dateInvalidText = "Please select a date after today's date";
      } else if (bookDate >= current) {
        console.log('notsame');
        this.dateInvalid = false;
        this.dateInvalidText = '';
        this.getTimeDropdown();
        this.validateDate();
      }
    }
  }

  validateDate() {
    let dateValdiation = true;
    var day = 1000 * 60 * 60 * 24;
    let currentDate = new Date();
    let currentTime = currentDate.getHours();
    // console.log(currentTime);
    currentDate.setHours(0, 0, 0, 0);
    let bookDate = new Date(this.date);
    let numberOfDays =
      Math.round(bookDate.getTime() - currentDate.getTime()) / day;
    // console.log(numberOfDays);
    this.dateInvalid = false;

    if (bookDate < currentDate) {
      this.dateInvalid = true;
      this.dateInvalidText = "Please select a date after today's date";
      dateValdiation = false;
    } else {
      if (numberOfDays < 1 || (numberOfDays === 1 && currentTime > 14)) {
        this.showNoti = true;

        this.dateInvalid = true;
        this.dateInvalidText = '';
        dateValdiation = false;
      } else {
        this.showNoti = false;
        this.getTimeDropdown();
      }
    }

    return dateValdiation;
  }

  filterTimeArr() {
    let current = new Date();
    // let latestTime = formatDate(current, 'HH:mm', 'en-US');
    let latestTime = this.datepipe.transform(current, 'HH:mm');

    this.timeList = this.timeList.filter((time) => time.content > latestTime);
    console.log(this.timeList);
  }

  validation() {
    let validate = true;

    if (!this.date) {
      this.dateInvalid = true;
      this.dateInvalidText = 'Date Required';
      validate = false;
    }

    if (this.dateInvalid) {
      validate = false;
    }

    if (!this.time) {
      this.invalidTime = true;
      validate = false;
    }

    if (!this.location) {
      this.locationInvalid = true;
      validate = false;
    }

    if (!this.vesselName) {
      this.vesselNameInvalid = true;
      validate = false;
    }

    this.loadingCablingDetails.forEach((item) => {
      if (!item.containerNo || item.containerNo.length < 1) {
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
    } else if (this.locationInvalid) {
      this.locationElement.input.nativeElement.focus();
    } else if (this.vesselNameInvalid) {
      this.vesselNameRef.nativeElement.focus();
    } else if (
      this.loadingCablingDetails.some((item) => {
        return item.invalidContainerNo;
      })
    ) {
      let i = 0;
      for (let item of this.containerNoRef) {
        if (this.loadingCablingDetails[i].invalidContainerNo) {
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

    if (this.location) {
      this.locationInvalid = false;
    }

    if (this.vesselName) {
      this.vesselNameInvalid = false;
    }

    this.loadingCablingDetails.forEach((item) => {
      if (item.containerNo) {
        item.invalidContainerNo = false;
      }
    });
  }

  checkSelected() {
    return this.loadingCablingDetails.some((item) => item.selected === true);
  }

  getTimeDropdown() {
    console.log('test');
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
    console.log(time);
    for (let i = 0; i < time.length; i++) {
      this.timeList.push({
        content: time[i],
      });
    }
    console.log(this.timeList);
  }
}
