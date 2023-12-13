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

export interface plugOnOffDetails {
  containerNo?: string;
  containerType?: string;
  plugOnOff?: string;
  remarks?: string;
  invalidContainerNo?: boolean;
  invalidRemarks?: boolean;
  selected?: boolean;
}
@Component({
  selector: 'app-plug-on-off',
  templateUrl: './plug-on-off.component.html',
  styleUrls: ['./plug-on-off.component.scss'],
})
export class PlugOnOffComponent implements OnInit {
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
  location;
  plugOnOffDetails: plugOnOffDetails[] = [];

  // dropdown list
  timeList = [];
  locationList = [];
  locationArr: any = [];
  locationSelect: any = [];
  containerNoList = [];
  containerNoArr: any = [];
  containerNoSelect: any = [];

  // Invalid
  dateInvalid: boolean = false;
  dateInvalidText: string;
  invalidTime: boolean = false;
  locationInvalid: boolean = false;

  // modal
  open: boolean = false;

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
      requestType: RequestCFSType['PLUG_ON_OFF'],
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
    this.location = this.formData.location;

    if (this.formData.requestLine) {
      console.log('test');
      this.plugOnOffDetails = [];

      this.formData.requestLine.forEach((item) => {
        this.containerNoList.push({
          content: item.container.containerNumber,
        });
        this.plugOnOffDetails.push({
          containerNo: item.container.containerNumber,
          containerType: item.container.containerType,
          plugOnOff: item.plugOn ? item.container.containerType : 'Off',
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
      this.plugOnOffDetails[postIndex].containerType = event.item.conType;
    }
  }

  addRow() {
    this.plugOnOffDetails.push({
      containerNo: '',
      containerType: '',
      plugOnOff: 'On',
      remarks: '',
      selected: false,
      invalidContainerNo: false,
      invalidRemarks: false,
    });
  }

  deleteRow() {
    this.plugOnOffDetails.forEach((rowDetail, i) => {
      if (rowDetail.selected) {
        this.plugOnOffDetails = this.plugOnOffDetails.filter(
          (item) => item.selected !== rowDetail.selected
        );
      }
    });
  }

  cancelAction() {
    this.plugOnOffDetails.forEach((rowDetail) => {
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
      let requestLineData = this.plugOnOffDetails.map(
        ({ invalidContainerNo, invalidRemarks, selected, ...rest }) => rest
      );
      let requestLineList = [];
      requestLineData.forEach((item) => {
        requestLineList.push({
          containerNumber: item.containerNo,
          plugOn: item.plugOnOff === 'Off' ? false : true,
          plugOff: item.plugOnOff === 'Off' ? true : false,
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
            requestType: 'PLUG_ON_OFF',
            date: requestDate.getTime().toString(),
            location: this.location,
            requestLineList: requestLineList,
          },
        };
        // console.log(submitData);
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
            requestType: 'PLUG_ON_OFF',
            date: requestDate.getTime().toString(),
            location: this.location,
            requestLineList: requestLineList,
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

      if (bookDate < current) {
        this.dateInvalid = true;
        this.dateInvalidText = "Please select a date after today's date";
      } else if (bookDate > current) {
        console.log('notsame');
        this.dateInvalid = false;
        this.dateInvalidText = '';
        this.getTimeDropdown();
      } else {
        console.log('same');
        this.dateInvalid = false;
        this.dateInvalidText = '';
        this.getTimeDropdown();
        this.filterTimeArr();
      }
    }
  }

  removeItem(event) {
    // // console.log(event);
    // console.log(this.plugOnOffDetails);
    // // console.log(this.containerNoList);
    // console.log(this.containerNoSelect);
    // let test = this.containerNoSelect
    //   .filter((object1) => {
    //     return !this.plugOnOffDetails.some((object2) => {
    //       return object1.content === object2.containerNo;
    //     });
    //   })
    //   .map((item) => ({ ...item }));
    // console.log(this.containerNoSelect);
    // console.log(test);
    // test.forEach((item) => {
    //   this.containerNoList.forEach((item2) => {
    //     if (item.content === item2.content) {
    //       item2.selected = true;
    //     }
    //   });
    // });
    // console.log(this.containerNoList);
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

    this.plugOnOffDetails.forEach((item) => {
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
    } else if (
      this.plugOnOffDetails.some((item) => {
        return item.invalidContainerNo;
      })
    ) {
      let i = 0;
      for (let item of this.containerNoRef) {
        if (this.plugOnOffDetails[i].invalidContainerNo) {
          item.nativeElement.focus();
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

    this.plugOnOffDetails.forEach((item) => {
      if (item.containerNo) {
        item.invalidContainerNo = false;
      }
    });
  }

  checkSelected() {
    return this.plugOnOffDetails.some((item) => item.selected === true);
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
