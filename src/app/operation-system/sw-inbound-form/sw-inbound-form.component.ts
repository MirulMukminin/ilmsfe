import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RadioGroup } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from '../services/MHE/request-form.service';
import { SwmInboundForm } from '../services/SWM/swm-inbound-form.service';

export interface inboundWasteDetails {
  wasteCode?: string;
  quantity?: number;
  uom?: string;
  time?: string;
  location?: string;
  // oddSize?: boolean;
  // cargoSize?: string;
  selected?: boolean;
  invalidWasteCode?: boolean;
  invalidUOM?: boolean;
  invalidTime?: boolean;
  invalidLocation?: boolean;
}

@Component({
  selector: 'app-sw-inbound-form',
  templateUrl: './sw-inbound-form.component.html',
  styleUrls: ['./sw-inbound-form.component.scss'],
})
export class SwInboundFormComponent implements OnInit {
  @ViewChild('bookingDateRef') bookingDateRef: ElementRef;
  @ViewChild('reqOnBehalfRef') reqOnBehalfRef: ElementRef;
  @ViewChild('jobDescRef') jobDescRef;
  @ViewChild('oddSizeRemarksRef') oddSizeRemarksRef;
  @ViewChild('poNORef') poNORef;
  @ViewChild('tableRef') tableRef: ElementRef;
  @ViewChild('returnSkidRef') returnSkidRef: RadioGroup;

  previousURL: string = '';

  // initial Data
  companyName: string = '';
  requestBy: string = '';
  serviceOrderNo: string = '';

  // dropdown list
  requestOnBehalfList = [];
  requestOnBehalfArr = [];

  wcArr = [];
  wcSelect = [];
  wasteCodeList = [
    {
      content: 'SW101',
    },
    {
      content: 'SW102',
    },
    {
      content: 'SW103',
    },
  ];

  UOMArr = [];
  UOMSelect = [];
  UOMList = [];
  locationArr = [];
  locationSelect = [];
  locationList = [];

  timeList = [];

  requireASList = [
    {
      content: 'Yes',
    },
    {
      content: 'No',
    },
  ];

  // notification msg for cut off
  notiCutoffCollection = {
    type: 'info',
    title: '',
    message: '',
    showClose: false,
    lowContrast: true,
  };
  withCollectionNotiTitle = 'Collection booking is closed for this date.';
  withCollectionNotiMsg =
    'Any Collection Booking needs to be made 2 days before 3PM from the booking date. <br />Please contact KSB at 08-863 4378 for more information. ';
  noCollectionNotiTitle = 'Booking is closed for this date.';
  noCollectionNotiMsg =
    'Any Booking needs to be made 1 day before 3 PM from the booking date. <br />Please contact KSB at 08-863 4378 for more information. ';
  showNoti: boolean = false;

  // 2way binding data
  reqOnBehalf = [];
  jobDesc: string;
  collection: boolean = false;
  PONo: string;
  bookingDate: string | Date;
  remarks: string;
  oddSize = true;
  oddSizeRemarks: string = '';
  refNo: string;
  reqAddServices: string = 'No';
  // modal Data
  returnSkid: boolean = true;
  repackaging: boolean = true;
  newPackaging: boolean = true;
  packing: boolean = true;
  drumCrushing: boolean = true;

  // inbound waste details row
  inboundWasteDetails?: inboundWasteDetails[] = [];

  //Invalid
  jobDescInvalid: boolean = false;
  JobDescInvalidText: string = 'Job Description Required';
  PONoInvalid: boolean = false;
  PONoInvalidText: string = 'PO No Required';
  bookingDateInvalid: boolean = false;
  bookingDateInvalidText: string = '';
  oddSizeInvalid: boolean = false;
  oddSizeInvalidText: string = 'Odd Size Remarks Required';

  // button disabled
  addDetSerDisabled: boolean = true;

  // modal Open
  modalOpen: boolean = false;

  // Job Description Numeric Counter
  invalidNumericJobDesc;
  numericJobDesc = 0;

  invalidNumericOddSize;
  numericOddSize = 0;

  invalidNumericRemarks;
  numericRemarks = 0;

  constructor(
    private appService: AppService,
    private router: Router,
    private inboundService: SwmInboundForm,
    private requestForm: RequestFormService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.previousURL = this.requestForm.getPreviousUrl();
    if (this.previousURL !== '/operation-system/sw-inbound-preview') {
      this.oddSize = false;
    }
    this.userInfo();
    this.getTimeDropdown();
    this.addInboundDetailRow();
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
    let UOMPromise = restServices.pbksb_ScheduledWasteService
      .getScheduledWasteUom(this.appService.myApp)()
      .then((result) => {
        // console.log(result);
        const UOMArray: any = result;
        const UOMDropdown = JSON.parse(UOMArray);
        this.UOMArr = UOMDropdown;
        for (let i = 0; i < this.UOMArr.length; i++) {
          // capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""
          this.UOMSelect.push({
            // content: this.UOMArr[i],
            content: this.UOMArr[i].replaceAll('_', ' '),
          });
        }
        // this.UOMSelect = this.UOMSelect.sort((a, b) =>
        //   a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        // );
        this.UOMList = this.UOMSelect;
      });

    let wasteCodePromise = restServices.pbksb_ScheduledWasteService
      .getWasteCodeList(this.appService.myApp)({ customer: this.companyName })
      .then((wcResult: any) => {
        const wcDropdown = JSON.parse(wcResult);
        this.wcArr = wcDropdown;
        for (let i = 0; i < this.wcArr.length; i++) {
          this.wcSelect.push({
            content: this.wcArr[i].wasteCode,
          });
        }
        this.wcSelect = this.wcSelect.sort((a, b) =>
          a['content'].localeCompare(b['content'], 'en', { numeric: true })
        );
        this.wasteCodeList = this.wcSelect;
      });

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

    let reqOnBehalfPromise = restServices.pbksb_MarineService
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
    if (this.previousURL === '/operation-system/sw-inbound-preview') {
      // setTimeout(() => {
      //   this.populateData();
      // }, 4000);
      Promise.all([
        locationPromise,
        reqOnBehalfPromise,
        UOMPromise,
        wasteCodePromise,
      ]).then((values) => {
        this.populateData();
      });
    }
  }

  populateData() {
    let value = this.inboundService.getValueForm();
    // console.log(value);
    this.returnSkid = false;
    this.repackaging = false;
    this.bookingDate = formatDate(value.form.bookingDate, 'dd/MM/Y', 'en-US');
    this.reqOnBehalf = value.form.requestOnBehalf;
    this.jobDesc = value.form.jobDescription;
    this.collection = value.form.collection;
    this.oddSize = value.form.oddSize;
    this.oddSizeRemarks = value.form.oddSizeRemark;
    this.PONo = value.form.poNumber;
    this.remarks = value.form.remarks;
    this.refNo = value.form.referenceNo;
    this.reqAddServices = value.form.additionalService ? 'Yes' : 'No';
    this.addDetSerDisabled = value.form.additionalService ? false : true;
    this.returnSkid = value.form.returnSkid;
    this.repackaging = value.form.repackingFrom;
    this.newPackaging = value.form.newPackMaterial;
    this.packing = value.form.packingPalletStrapping;
    this.drumCrushing = value.form.drumCrushing;

    this.inboundWasteDetails = value.form.inboundWasteDetailsList.map(
      (item) => ({
        ...item,
        selected: false,
        invalidWasteCode: false,
        invalidLocation: false,
        invalidTime: false,
        invalidUOM: false,
      })
    );
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
      this.timeList.push({
        content: time[i],
      });
    }
  }

  checkSelected() {
    return this.inboundWasteDetails.some((item) => item.selected === true);
  }

  addInboundDetailRow() {
    this.inboundWasteDetails.push({
      wasteCode: '',
      quantity: 1,
      uom: '',
      time: '',
      location: '',
      selected: false,
      invalidWasteCode: false,
      invalidLocation: false,
      invalidTime: false,
      invalidUOM: false,
    });
  }

  deleteWasteDetails() {
    this.inboundWasteDetails.forEach((rowDetail, i) => {
      if (rowDetail.selected) {
        this.inboundWasteDetails = this.inboundWasteDetails.filter(
          (item) => item.selected !== rowDetail.selected
        );
      }
    });
  }

  cancelWasteDetails() {
    this.inboundWasteDetails.forEach((rowDetail) => {
      if (rowDetail.selected) {
        rowDetail.selected = false;
      }
    });
  }

  oddSizeChange(event) {
    if (!event.value) {
      console.log('enable remarks');
      this.oddSizeRemarks = '';
    }
  }

  onSubmit(form: NgForm) {
    let submitData;
    // if (form.valid) {
    //   this.router.navigate(['/operation-system/sw-inbound-preview']);
    // } else {
    //   this.validation();
    // }

    if (this.validation()) {
      let formatDate = this.bookingDate.toString();
      if (formatDate.includes('/')) {
        let splitDate = formatDate.split('/');
        this.bookingDate = new Date(
          +splitDate[2],
          +splitDate[1] - 1,
          +splitDate[0]
        );
      }
      const arr = this.inboundWasteDetails.map(
        ({
          invalidWasteCode,
          invalidLocation,
          invalidTime,
          invalidUOM,
          selected,
          ...rest
        }) => rest
      );
      submitData = {
        form: {
          companyName: this.companyName,
          requestBy: this.requestBy,
          requestOnBehalf: this.reqOnBehalf,
          bookingDate: new Date(this.bookingDate).getTime().toString(),
          jobDescription: this.jobDesc,
          collection: this.collection,
          oddSize: this.oddSize,
          oddSizeRemark: this.oddSizeRemarks,
          poNumber: this.PONo,
          referenceNo: this.refNo,
          additionalService: this.reqAddServices === 'Yes' ? true : false,
          remarks: this.remarks,
          inboundWasteDetailsList: arr,
          returnSkid: this.reqAddServices === 'Yes' ? this.returnSkid : null,
          repackingFrom:
            this.reqAddServices === 'Yes' ? this.repackaging : null,
          newPackMaterial:
            this.reqAddServices === 'Yes' ? this.newPackaging : null,
          packingPalletStrapping:
            this.reqAddServices === 'Yes' ? this.packing : null,
          drumCrushing:
            this.reqAddServices === 'Yes' ? this.drumCrushing : null,
        },
      };

      this.inboundService.setFormValue(submitData);
      this.router.navigate(['/operation-system/sw-inbound-preview']);
    }
  }

  validateDate() {
    let dateValdiation = true;
    var day = 1000 * 60 * 60 * 24;
    let currentDate = new Date();
    let currentTime = currentDate.getHours();
    currentDate.setHours(0, 0, 0, 0);
    let bookDate = new Date(this.bookingDate);
    let numberOfDays =
      Math.round(bookDate.getTime() - currentDate.getTime()) / day;
    this.bookingDateInvalid = false;

    if (bookDate < currentDate) {
      this.bookingDateInvalid = true;
      this.bookingDateInvalidText = "Please select a date after today's date";
      dateValdiation = false;
    } else {
      if (this.collection) {
        if (numberOfDays < 2 || (numberOfDays === 2 && currentTime > 14)) {
          this.notiCutoffCollection = {
            type: 'info',
            title: this.withCollectionNotiTitle,
            message: this.withCollectionNotiMsg,
            showClose: false,
            lowContrast: true,
          };

          this.bookingDateInvalid = true;
          this.bookingDateInvalidText = '';
          this.showNoti = true;
          dateValdiation = false;
        } else {
          this.showNoti = false;
        }
      } else {
        if (numberOfDays < 1 || (numberOfDays === 1 && currentTime > 14)) {
          this.notiCutoffCollection = {
            type: 'info',
            title: this.noCollectionNotiTitle,
            message: this.noCollectionNotiMsg,
            showClose: false,
            lowContrast: true,
          };

          this.bookingDateInvalid = true;
          this.bookingDateInvalidText = '';
          this.showNoti = true;
          dateValdiation = false;
        } else {
          this.showNoti = false;
        }
      }
    }

    return dateValdiation;
  }

  validation() {
    let validate = true;
    this.jobDescInvalid = false;
    this.PONoInvalid = false;
    this.bookingDateInvalid = false;
    this.oddSizeInvalid = false;
    this.inboundWasteDetails.forEach((item) => {
      item.invalidLocation = false;
      item.invalidWasteCode = false;
      item.invalidTime = false;
      item.invalidUOM = false;
    });

    if (!this.jobDesc) {
      this.jobDescInvalid = true;
      validate = false;
    }

    if (!this.PONo) {
      this.PONoInvalid = true;
      validate = false;
    }

    if (!this.bookingDate) {
      this.bookingDateInvalid = true;
      this.bookingDateInvalidText = 'Booking Date Required';
      validate = false;
    }

    if (this.oddSize && (this.oddSizeRemarks == '' || !this.oddSizeRemarks)) {
      this.oddSizeInvalid = true;
      validate = false;
    }

    this.inboundWasteDetails.forEach((item) => {
      if (!item.wasteCode || item.wasteCode.length < 1) {
        item.invalidWasteCode = true;
        validate = false;
      }
      if (!item.uom || item.uom.length < 1) {
        item.invalidUOM = true;
        validate = false;
      }
      if (!item.time || item.time.length < 1) {
        item.invalidTime = true;
        validate = false;
      }
      if (this.collection) {
        if (!item.location || item.location.length < 1) {
          item.invalidLocation = true;
          validate = false;
        }
      }
    });

    if (this.bookingDate) {
      if (!this.validateDate()) {
        validate = false;
      }
    }

    this.focusOnInvalid();
    return validate;
  }

  focusOnInvalid() {
    if (this.bookingDateInvalid) {
      this.bookingDateRef.nativeElement.focus();
    } else if (this.jobDescInvalid) {
      this.jobDescRef.nativeElement.focus();
    } else if (this.oddSizeInvalid) {
      this.oddSizeRemarksRef.nativeElement.focus();
    } else if (this.PONoInvalid) {
      this.poNORef.nativeElement.focus();
    } else if (
      this.inboundWasteDetails.some((item) => {
        return item.invalidWasteCode;
      })
    ) {
      this.tableRef.nativeElement.focus();
    } else if (
      this.inboundWasteDetails.some((item) => {
        return item.invalidUOM;
      })
    ) {
      this.tableRef.nativeElement.focus();
    } else if (
      this.inboundWasteDetails.some((item) => {
        return item.invalidTime;
      })
    ) {
      this.tableRef.nativeElement.focus();
    } else if (
      this.inboundWasteDetails.some((item) => {
        return item.invalidLocation;
      })
    ) {
      this.tableRef.nativeElement.focus();
    }
  }

  inputValueChange(event) {
    if (this.jobDesc) {
      this.jobDescInvalid = false;
    }

    if (this.PONo) {
      this.PONoInvalid = false;
    }

    if (this.bookingDate) {
      this.bookingDateInvalid = false;
      this.bookingDateInvalidText = 'Booking Date Required';
    }

    if (this.oddSize && this.oddSizeRemarks) {
      this.oddSizeInvalid = false;
    }

    this.inboundWasteDetails.forEach((item) => {
      if (item.wasteCode) {
        item.invalidWasteCode = false;
      }
      if (item.uom) {
        item.invalidUOM = false;
      }
      if (item.time) {
        item.invalidTime = false;
      }
      if (!this.collection) {
        item.invalidLocation = false;
      }
      if (this.collection && item.location) {
        item.invalidLocation = false;
      }
    });
  }

  additionalServicesChange(event) {
    if (event.item.content === 'Yes') {
      this.addDetSerDisabled = false;
    } else if (event.item.content === 'No') {
      this.addDetSerDisabled = true;
    }
  }

  closeModal() {
    this.modalOpen = false;
  }

  saveModal() {
    this.modalOpen = false;
  }

  numericCount(type, value) {
    if (type === 'jobDesc') {
      this.numericJobDesc = value.length;
      this.invalidNumericJobDesc = this.numericJobDesc >= 100 ? true : false;
    } else if (type === 'oddSize') {
      this.numericOddSize = value.length;
      this.invalidNumericOddSize = this.numericOddSize >= 100 ? true : false;
    } else if (type === 'remarks') {
      this.numericRemarks = value.length;
      this.invalidNumericRemarks = this.numericRemarks >= 100 ? true : false;
    }
  }
}
