import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-waste-disposal-form',
  templateUrl: './waste-disposal-form.component.html',
  styleUrls: ['./waste-disposal-form.component.scss'],
})
export class WasteDisposalFormComponent implements OnInit {
  @ViewChild('storageDateElement') storageDateElement: ElementRef;
  @ViewChild('locationElement') locationElement;
  @ViewChild('returnToElement') returnToElement;
  @ViewChild('dateElement') dateElement: ElementRef;
  @ViewChild('timeElement') timeElement: ElementRef;
  @ViewChild('pmNORef') pmNORef: ElementRef;
  @ViewChild('skidDetailTable') skidDetailTable: ElementRef;
  @ViewChild('skidIdElement') skidIdElement: ElementRef;

  isOptional: boolean = false;
  SkidChecked = [];
  skidList = [
    {
      skidId: '',
      oddSize: false,
      advancedCleaning: false,
      remarks: '',
      selected: false,
      invalidSkidId: false,
      invalidRemarks: false,
    },
    {
      skidId: '',
      oddSize: false,
      advancedCleaning: false,
      remarks: '',
      selected: false,
      invalidSkidId: false,
      invalidRemarks: false,
    },
    {
      skidId: '',
      oddSize: false,
      advancedCleaning: false,
      remarks: '',
      selected: false,
      invalidSkidId: false,
      invalidRemarks: false,
    },
    {
      skidId: '',
      oddSize: false,
      advancedCleaning: false,
      remarks: '',
      selected: false,
      invalidSkidId: false,
      invalidRemarks: false,
    },
    {
      skidId: '',
      oddSize: false,
      advancedCleaning: false,
      remarks: '',
      selected: false,
      invalidSkidId: false,
      invalidRemarks: false,
    },
    {
      skidId: '',
      oddSize: false,
      advancedCleaning: false,
      remarks: '',
      selected: false,
      invalidSkidId: false,
      invalidRemarks: false,
    },
  ];
  oldSkidId = [];
  locationList = [];
  timeList = [
    { content: '00:00' },
    { content: '01:00' },
    { content: '02:00' },
    { content: '03:00' },
    { content: '04:00' },
    { content: '05:00' },
    { content: '06:00' },
    { content: '07:00' },
    { content: '08:00' },
    { content: '09:00' },
    { content: '10:00' },
    { content: '11:00' },
    { content: '12:00' },
    { content: '13:00' },
    { content: '14:00' },
    { content: '15:00' },
    { content: '16:00' },
    { content: '17:00' },
    { content: '18:00' },
    { content: '19:00' },
    { content: '20:00' },
    { content: '21:00' },
    { content: '22:00' },
    { content: '23:00' },
  ];

  companyName: string;
  requestBy: string;
  reqType: string = 'Normal';
  storageStartDate: string;
  storageEndDate: string;
  location: string;
  date: Date | string;
  time: string;
  poNumber: string;
  primeMoverNumber;
  skidId: string;

  returnTo: string;

  skidArr = [];

  locationArr = [];
  locationSelect = [];

  startDateInvalid: boolean = false;
  endDateInvalid: boolean = false;
  locationInvalid: boolean = false;
  returnToInvalid: boolean = false;
  dateInvalid: boolean = false;
  timeInvalid: boolean = false;
  poNumberInvalid: boolean = false;
  primeMoverNumberInvalid: boolean = false;

  startDateInvalidText: string;
  endDateInvalidText: string;
  dateInvalidText: string;
  timeInvalidText: string;
  skidIdInvalidText: string;

  isEdit = false;
  requestNo: any;
  detailWasteDisposal;

  open = false;

  currDate = new Date();
  storageDate;

  constructor(
    private router: Router,
    private appService: AppService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.paramMap.get('jobNo')) {
      this.isEdit = false;
    } else {
      // console.log(this.activatedRoute.snapshot.paramMap.get('jobNo'));
      this.isEdit = true;
      this.requestNo = this.activatedRoute.snapshot.paramMap.get('jobNo');
    }

    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;

        this.getRestServiceApi();
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

  getRestServiceApi() {
    restServices.pbksb_PSBService
      .GetSiteLocation(this.appService.myApp)()
      .then((result) => {
        const array: any = result;
        const locationDropdown = JSON.parse(array);

        this.locationArr = locationDropdown;

        for (let i = 0; i < this.locationArr.length; i++) {
          this.locationList.push({
            content: this.locationArr[i].description,
          });
        }
        this.locationSelect = this.locationList;

        if (this.isEdit) {
          const param = { jobNo: this.requestNo };
          restServices.pbksb_WasteDisposalService
            .getRequestByRequestNumber(this.appService.myApp)(param)
            .then((result) => {
              this.detailWasteDisposal = this.appService.jsonToArray(result);
              // console.log(this.detailWasteDisposal);
              this.populateData();
            });
        }
      });
  }

  populateData() {
    if (this.detailWasteDisposal.type === 'NORMAL') {
      this.reqType = 'Normal';
      this.isOptional = false;
    } else {
      this.reqType = 'Storage';
      this.isOptional = true;
      this.storageStartDate = formatDate(
        this.detailWasteDisposal.storageStart,
        'dd/MM/Y',
        'en-US'
      );
      this.storageEndDate = formatDate(
        this.detailWasteDisposal.storageEnd,
        'dd/MM/Y',
        'en-US'
      );
      this.storageDate = [this.storageStartDate, this.storageEndDate];
    }
    if (this.detailWasteDisposal.returnTo) {
      this.returnTo = this.detailWasteDisposal.returnTo.description;
    }
    if (this.detailWasteDisposal.location) {
      this.location = this.detailWasteDisposal.location.description;
    }
    this.primeMoverNumber = this.detailWasteDisposal?.primeMoverNumber ?? '-';
    this.poNumber = this.detailWasteDisposal?.poNumber ?? '-';
    const dateTime = this.detailWasteDisposal.startDate.toString().split(' ');
    this.date = formatDate(dateTime[0], 'dd/MM/Y', 'en-US');
    this.time = dateTime[1].substring(0, 5);
    // console.log(this.time);

    this.detailWasteDisposal.skidList.forEach((item, index) => {
      this.skidList[index].skidId = item.skidId;
      this.skidList[index].oddSize = item.oddSize;
      this.skidList[index].advancedCleaning = item.advancedCleaning;
      this.skidList[index].remarks = item.remarks;

      this.oldSkidId.push(item.skidId);
    });
  }

  onRequestTypeChanged(event) {
    if (event.value === 'Storage') {
      this.isOptional = true;
    } else {
      this.isOptional = false;
      this.storageDate = null;
      this.storageStartDate = undefined;
      this.storageEndDate = undefined;
    }
  }

  onSelected(event, skidIndex: number) {
    if (event.checked) {
      this.SkidChecked.push(skidIndex);
      this.skidList[skidIndex].selected = true;
    } else {
      this.SkidChecked = this.SkidChecked.filter((item) => {
        return item !== skidIndex;
      });
      this.skidList[skidIndex].selected = false;
    }
  }

  onClearSkid() {
    this.skidList.forEach((item) => {
      if (item.selected) {
        item.skidId = '';
        item.remarks = '';
        item.selected = false;
      }
    });
    this.SkidChecked = [];
  }

  onCancel() {
    this.skidList.forEach((item) => {
      item.selected = false;
    });
    this.SkidChecked = [];
  }

  checkSelected() {
    return this.SkidChecked.length > 0 ? true : false;
  }

  onSubmit(form: NgForm) {
    this.open = false;
    let submitData: any;
    let startdate;
    let storageSDate;
    let storageEDate;

    // let storageStartDate;
    if (this.validation()) {
      this.checkDate();
      const sDate = formatDate(this.date, 'M/d/yyyy', 'en_us');
      startdate = new Date(sDate + ' ' + this.time).getTime().toString();

      if (this.storageStartDate) {
        const sSDate = formatDate(this.storageStartDate, 'M/d/yyyy', 'en_us');
        storageSDate = new Date(sSDate).getTime().toString();
      } else {
        storageSDate = null;
      }

      if (this.storageEndDate) {
        const sEDate = formatDate(this.storageEndDate, 'M/d/yyyy', 'en_us');
        storageEDate = new Date(sEDate).getTime().toString();
      } else {
        storageEDate = null;
      }
      submitData = {
        form: {
          companyName: this.companyName,
          requestBy: this.requestBy,
          location: form.value.location,
          returnTo: this.returnTo,
          type: this.reqType,
          startDate: startdate,
          storageStart: storageSDate,
          storageEnd: storageEDate,
          poNumber: this.poNumber,
          primeMoverNumber: this.primeMoverNumber,
          skidList: this.skidArr,
        },
      };
      if (!this.isEdit) {
        restServices.pbksb_WasteDisposalService
          .createWasteDisposalForm(this.appService.myApp)(submitData)
          .then((result) => {
            let returnobj = this.appService.jsonToArray(result);
            if (returnobj.success) {
              this.router
                .navigate(['/operation-system/waste-disposal-list'])
                .then(() => {
                  this.currDate = new Date();
                  this.appService.showToaster({
                    type: 'success',
                    title: 'Request Submitted',
                    subtitle:
                      'Job No. ' +
                      returnobj.requestNo +
                      ' is successfully submitted.',
                    time: formatDate(this.currDate, 'HH:mm', 'en-US'),
                  });
                });
            } else {
              this.appService.showToaster({
                type: 'error',
                title: 'Cannot Submit',
                subtitle: returnobj.errorMessage,
                // 'The request has failed to be submitted. Please try again',
                time: formatDate(this.currDate, 'HH:mm', 'en-US'),
              });
            }
          })
          .catch((err) => {
            console.error(err);
            this.appService.terminateSession();
          });
      } else {
        submitData = {
          form: {
            jobNo: this.requestNo,
            location: form.value.location,
            returnTo: this.returnTo,
            type: this.reqType,
            startDate: startdate,
            storageStart: storageSDate,
            storageEnd: storageEDate,
            primeMoverNumber: this.primeMoverNumber,
            poNumber: this.poNumber,
            skidList: this.skidArr,
          },
        };
        restServices.pbksb_WasteDisposalService
          .editWasteDisposalForm(this.appService.myApp)(submitData)
          .then(() => {
            this.router.navigate([
              '/operation-system/waste-disposal-preview',
              this.requestNo,
            ]);
          })
          .catch((err) => {
            console.error(err);
            this.appService.terminateSession();
          });
      }
    } else {
      if (this.isEdit) {
        if (this.storageStartDate) {
          this.storageStartDate = formatDate(
            this.storageStartDate,
            'dd/MM/Y',
            'en-US'
          );
        }
        if (this.storageEndDate) {
          this.storageEndDate = formatDate(
            this.storageEndDate,
            'dd/MM/Y',
            'en-US'
          );
        }
      }
    }
  }

  checkDate() {
    if (this.date && this.date.toString().includes('/')) {
      let dateArr = this.date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      this.date = new Date(d);
    }
    if (
      this.storageStartDate &&
      this.storageStartDate.toString().includes('/')
    ) {
      let dateArr = this.storageStartDate.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      this.storageStartDate = d;
    }
    if (this.storageEndDate && this.storageEndDate.toString().includes('/')) {
      let dateArr = this.storageEndDate.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      this.storageEndDate = d;
    }
  }

  validation() {
    this.checkDate();
    let validate = true;
    this.startDateInvalid = false;
    this.endDateInvalid = false;
    this.locationInvalid = false;
    this.returnToInvalid = false;
    this.dateInvalid = false;
    this.timeInvalid = false;
    this.poNumberInvalid = false;
    this.primeMoverNumberInvalid = false;

    this.dateInvalidText = '';
    this.startDateInvalidText = '';
    this.endDateInvalidText = '';
    this.skidIdInvalidText = '';

    if (
      this.reqType === 'Storage' &&
      (!this.storageStartDate || this.storageStartDate.length == 0)
    ) {
      this.startDateInvalid = true;
      this.startDateInvalidText = 'Storage Start Date Required';
      // this.storageDateElement.nativeElement.focus();
      // validate = false;
    }

    if (
      this.reqType === 'Storage' &&
      (!this.storageEndDate || this.storageEndDate.length == 0)
    ) {
      this.endDateInvalid = true;
      this.endDateInvalidText = 'Please select date';

      // validate = false;
    }

    if (!this.location || this.location.length == 0) {
      this.locationInvalid = true;
      // this.locationElement.nativeElement.focus();
      // validate = false;
    }

    if (!this.returnTo || this.returnTo.length == 0) {
      this.returnToInvalid = true;
      // this.returnToElement.nativeElement.focus();
      // validate = false;
    }

    if (!this.date) {
      this.dateInvalid = true;
      this.dateInvalidText = 'Please select date';
      // this.dateElement.nativeElement.focus();
      // validate = false;
    }

    if (!this.time || this.time.length == 0) {
      this.timeInvalid = true;
      this.timeInvalidText = 'Please select time';
      // this.timeElement.nativeElement.focus();
      // validate = false;
    }

    if (!this.poNumber) {
      this.poNumberInvalid = true;
      validate = false;
    }

    if (!this.primeMoverNumber) {
      this.primeMoverNumberInvalid = true;
      validate = false;
    }

    if (!this.validateDate()) {
      // validate = false;
    }

    if (!this.skidValidation()) {
      // validate = false;
    }

    // focus on invalid
    if (this.startDateInvalid) {
      this.storageDateElement.nativeElement.focus();
      validate = false;
    } else if (this.locationInvalid) {
      this.locationElement.input.nativeElement.focus();
      validate = false;
    } else if (this.returnToInvalid) {
      this.returnToElement.input.nativeElement.focus();
      validate = false;
    } else if (this.dateInvalid) {
      this.dateElement.nativeElement.focus();
      validate = false;
    } else if (this.timeInvalid) {
      this.timeElement.nativeElement.focus();
      validate = false;
    } else if (this.primeMoverNumberInvalid) {
      this.pmNORef.nativeElement.focus();
      validate = false;
    } else if (this.skidList[0].invalidSkidId) {
      this.skidIdElement.nativeElement.focus();
      validate = false;
    }

    return validate;
  }

  skidValidation() {
    let validateSkid = true;
    let filledSkidRow = [];
    this.skidArr = [];

    this.skidList.forEach((skid, index) => {
      skid.skidId = skid.skidId.trim();
      skid.invalidRemarks = false;
      skid.invalidSkidId = false;
      if (skid.skidId.length != 0) {
        filledSkidRow.push(skid);
        // if (skid.remarks.length == 0) {
        //   skid.invalidRemarks = true;
        //   validateSkid = false;
        // }
      }
    });
    // console.log(filledSkidRow);
    if (validateSkid) {
      if (filledSkidRow.length < 1) {
        validateSkid = false;
        this.skidList[0].invalidSkidId = true;
        this.skidIdInvalidText = 'Required';
      }
    }

    if (validateSkid) {
      const ids = new Set(filledSkidRow.map((filledSkid) => filledSkid.skidId));
      if ([...ids].length === filledSkidRow.length) {
        // console.log('no duplicate IDs');
        validateSkid = true;
      } else {
        // console.log('Duplicated');
        validateSkid = false;
        const keys = filledSkidRow.map((item) => item['skidId']);
        let duplicate = keys.filter(
          (key) => keys.indexOf(key) !== keys.lastIndexOf(key)
        );
        let a = new Set(duplicate);
        a.forEach((item) => {
          this.skidList.forEach((skid) => {
            if (item == skid.skidId) {
              skid.invalidSkidId = true;
              this.skidIdInvalidText = 'Duplicate IDs';
            }
          });
        });
      }
      filledSkidRow.forEach((item) => {
        let { selected, invalidSkidId, invalidRemarks, ...partialObject } =
          item;
        this.skidArr.push(partialObject);
      });
    }

    return validateSkid;
  }

  validateDate() {
    let validateDates = true;
    if (this.date && this.time && !this.startDateInvalid) {
      let today = new Date();
      // today.setHours(0, 0, 0, 0);

      const startDate = new Date(this.date);

      let timeSplit = this.time.split(':');
      startDate.setHours(+timeSplit[0]);

      if (startDate < today) {
        today.setHours(0, 0, 0, 0);
        if (startDate < today) {
          validateDates = false;
          this.dateInvalid = true;
          this.dateInvalidText =
            "Please select today's date or after today's date";
          this.dateElement.nativeElement.focus();
        } else if (startDate < (today = new Date())) {
          validateDates = false;
          this.timeInvalid = true;
          this.timeInvalidText = 'Please select time after current time';
          this.timeElement.nativeElement.focus();
          // console.log('invalid time');
        }
      }
      startDate.setHours(0, 0, 0, 0);

      if (validateDates && this.reqType === 'Storage') {
        const ssdate = new Date(this.storageStartDate);
        const sedate = new Date(this.storageEndDate);

        if (ssdate < startDate) {
          validateDates = false;
          this.startDateInvalid = true;
          this.startDateInvalidText =
            'Date cannot be earlier than the booking date.';
          this.storageDateElement.nativeElement.focus();
        } else if (sedate < ssdate) {
          validateDates = false;
          this.endDateInvalid = true;
          this.endDateInvalidText = 'Invalid Date';
        }
      }
    } else {
      validateDates = false;
    }

    return validateDates;
  }

  onClear() {
    this.storageDate = null;
    this.storageStartDate = null;
    this.storageEndDate = null;
    this.location = '';
    this.returnTo = '';
    this.date = '';
    this.time = '';
    this.skidList.forEach((item) => {
      item.skidId = '';
      item.remarks = '';
      item.invalidRemarks = false;
      item.invalidSkidId = false;
    });
  }

  dateChange(event) {
    let current = new Date();
    current.setHours(0, 0, 0, 0);
    let selectedDate = new Date(event);

    if (selectedDate < current) {
      this.dateInvalid = true;
      this.dateInvalidText = "Please select today's date or after today's date";
    } else {
      this.dateInvalid = false;
      this.dateInvalidText = '';
    }
  }

  dateValueChange(event) {
    if (this.storageDate.length == 2) {
      this.storageStartDate = this.storageDate[0];
      this.storageEndDate = this.storageDate[1];
      this.validateDate();
      this.startDateInvalid = false;
    }
  }

  inputValueChange(event) {
    if (this.reqType === 'Storage' && this.storageStartDate) {
      this.startDateInvalid = false;
    }

    if (this.reqType === 'Storage' && this.storageEndDate) {
      this.endDateInvalid = false;
    }

    if (this.location) {
      this.locationInvalid = false;
    }

    if (this.returnTo) {
      this.returnToInvalid = false;
    }

    if (this.date) {
      this.dateInvalid = false;
    }

    if (this.time) {
      this.timeInvalid = false;
    }

    if (this.primeMoverNumber) {
      this.primeMoverNumberInvalid = false;
    }

    if (this.poNumber) {
      this.poNumberInvalid = false;
    }

    if (this.validateDate()) {
      // validate = false;
      // console.log('7');
    }

    if (this.skidList[0].skidId) {
      this.skidList[0].invalidSkidId = false;
      // console.log('8');
      // validate = false;
    }
  }
}
