import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

export interface goodsStorageRequestLineList {
  description: string;
  quantity: number;
  UOM: string;
  remarks: string;
  weight: string;
  selected: boolean;
  invalidDescription: boolean;
  invalidUOM: boolean;
  invalidWeight: boolean;
}

@Component({
  selector: 'app-cwcy-goods-receiving-form',
  templateUrl: './cwcy-goods-receiving-form.component.html',
  styleUrls: ['./cwcy-goods-receiving-form.component.scss'],
})
export class CwcyGoodsReceivingFormComponent implements OnInit {
  @ViewChild('dateElement') dateElement: ElementRef;
  @ViewChild('timeElement') timeElement;
  @ViewChildren('descriptionRef') descriptionRef: QueryList<any>;
  @ViewChildren('UOMRef') UOMRef: QueryList<any>;

  lbl_weight: 'KG Per Line' | 'm² Per Line' = 'KG Per Line';
  isEdit: boolean = false;
  formDataPromise: Promise<any>;
  formData: any;

  companyName: string = '';
  requestBy: string = '';
  requestNo: string = '';
  status: string = '';
  agent = '';
  reqName: string = '';
  reqIC: string = '';
  reqTel: string = '';
  date: Date | string = '';
  time: string = '';
  location: string = 'Common Warehouse';
  requestType: string = 'Local';
  poNumber: string;
  requestPriority: '' | 'normal' | 'urgent' | 'emergency' | 'invalid' = '';
  itemList: goodsStorageRequestLineList[] = [];
  goodsStorageRequestLineList = [];

  timeList = [];
  agentList = [];
  agentSelect = [];
  agentArray = [];
  storageLocationSelect = [
    { content: 'Common Warehouse' },
    { content: 'Common Yard' },
  ];
  uomList = [];
  uomArray = [];
  uomSelect = [];
  reqTypeSelect = [{ content: 'Local' }, { content: 'Bonded' }];

  // Invalid
  agentInvalid: boolean = false;
  agentInvalidText: string = '';
  reqNameInvalid: boolean = false;
  reqICInvalid: boolean = false;
  reqTelInvalid: boolean = false;
  dateInvalid: boolean = false;
  dateInvalidText: string = '';
  timeInvalid: boolean = false;
  timeInvalidText: string = '';
  locationInvalid: boolean = false;
  locationInvalidText: string = '';
  reqTypeInvalid: boolean = false;
  reqTypeInvalidText: string = '';
  poNumberInvalid: boolean = false;

  open: boolean = false;
  isLoading: boolean = false;
  overlay: boolean = false;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getTimeDropdown();
    this.addRow();
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

        let orderNo = this.activatedRoute.snapshot.paramMap.get('formNo');
        if (orderNo !== null) {
          this.isEdit = true;
          let params = { requestNo: orderNo };
          this.formDataPromise =
            restServices.pbksb_CommonWarehouseCommonYardService
              .getStorageRequestByRequestNo(this.appService.myApp)(params)
              .then((result) => {
                let resArr: any = result;
                let gsRequest = this.appService.jsonToArray(resArr);
                this.formData = gsRequest;

                this.requestNo = this.formData.requestNo;
                this.status = this.formData.status;
              });
        } else {
          this.isEdit = false;
        }
        this.getRestServiceApi();
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  getRestServiceApi() {
    let agentPromise = restServices.pbksb_AgentService
      .getAll(this.appService.myApp)()
      .then((result) => {
        const agentArray: any = result;
        const agentDropdown = JSON.parse(agentArray);
        this.agentArray = agentDropdown;
        for (let i = 0; i < this.agentArray.length; i++) {
          this.agentSelect.push({
            content: this.agentArray[i].name,
          });
        }
        this.agentList = this.agentSelect;
      });
    let uomPromise = restServices.pbksb_CommonWarehouseCommonYardService
      .getUOMList(this.appService.myApp)()
      .then((result) => {
        const array: any = result;
        const locationDropdown = JSON.parse(array);
        this.uomArray = locationDropdown;
        for (let i = 0; i < this.uomArray.length; i++) {
          this.uomSelect.push({
            content: this.uomArray[i].name,
          });
        }
        this.uomList = this.uomSelect;
      });

    if (this.isEdit) {
      Promise.all([uomPromise, agentPromise, this.formDataPromise]).then(
        (values) => {
          this.populateData();
        }
      );
    }
    // Promise.all([uomPromise, agentPromise]).then((values) => {
    //   if (this.isEdit) {
    //     this.populateData();
    //   }
    // });
  }

  populateData() {
    if (this.formData.agent) {
      this.agent = this.formData.agent.name;
    }

    if (this.formData.requesterName) {
      this.reqName = this.formData.requesterName;
    }

    if (this.formData.requesterIc) {
      this.reqIC = this.formData.requesterIc;
    }

    if (this.formData.requesterPhoneNo) {
      this.reqTel = this.formData.requesterPhoneNo;
    }

    if (this.formData.arrivalDate) {
      this.date = formatDate(this.formData.arrivalDate, 'dd/MM/Y', 'en-US');
    }

    if (this.formData.arrivalDate) {
      this.time = formatDate(
        this.formData.arrivalDate,
        'HH:mm',
        'en-US'
      ).toString();
    }

    if (this.formData.location) {
      this.location = this.formData.location;
    }

    if (this.location === 'Common Warehouse') {
      this.lbl_weight = 'KG Per Line';
    } else if (this.location === 'Common Yard') {
      this.lbl_weight = 'm² Per Line';
    }

    if (this.formData.requestType) {
      this.requestType = this.formData.requestType
        ? this.formData.requestType[0].toUpperCase() +
          this.formData.requestType.substr(1)
        : '';
    }

    this.poNumber = this.formData?.poNumber ?? '-';

    if (this.formData.cwcyGoodsStorageRequestLine) {
      this.itemList = [];
      this.formData.cwcyGoodsStorageRequestLine.forEach((item) => {
        this.itemList.push({
          description: item.description,
          quantity: item.quantity,
          UOM: item.unitOfMeasurement.name,
          remarks: item.remarks,
          weight: item.weight ? item.weight : item.area ? item.area : '',
          selected: false,
          invalidDescription: false,
          invalidUOM: false,
          invalidWeight: false,
        });
      });
    }
  }

  locationChanged(event) {
    console.log(event);
    if (event.item.content === 'Common Warehouse') {
      this.lbl_weight = 'KG Per Line';
    } else if (event.item.content === 'Common Yard') {
      this.lbl_weight = 'm² Per Line';
    }
  }

  setRequestPriority(bookingDateTime) {
    let dateValidation = true;
    var day = 1000 * 60 * 60 * 24;
    let currentDate = new Date();
    let dateTimeNow = new Date(currentDate);
    let currentTime = currentDate.getHours();

    currentDate.setHours(0, 0, 0, 0);
    let bookDate = new Date(this.date);
    let numberOfDays =
      Math.round(bookDate.getTime() - currentDate.getTime()) / day;
    this.dateInvalid = false;
    if (bookDate < currentDate) {
      this.requestPriority = 'invalid';
      this.dateInvalid = true;
      this.dateInvalidText = 'Invalid Date';
      dateValidation = false;
      this.dateElement.nativeElement.focus();
      return dateValidation;
    }
    if (numberOfDays > 2 || (numberOfDays === 2 && currentTime < 8)) {
      this.requestPriority = 'normal';
    } else {
      var hour = 1000 * 60 * 60;
      let bookDt = new Date(+bookingDateTime);
      let numberOfHour =
        Math.round(bookDt.getTime() - dateTimeNow.getTime()) / hour;
      if (numberOfHour > 6) {
        this.requestPriority = 'urgent';
      } else if (numberOfHour > 2) {
        this.requestPriority = 'emergency';
      } else {
        this.requestPriority = 'invalid';
        this.dateInvalid = true;
        this.dateInvalidText = 'Booking Closed';
        this.dateElement.nativeElement.focus();
      }
    }
    return dateValidation;
  }

  checkBackdate(bookingDateTime) {
    let dateValidation = true;
    var day = 1000 * 60 * 60 * 24;
    let currentDate = new Date();
    let dateTimeNow = new Date(currentDate);
    let currentTime = currentDate.getHours();

    currentDate.setHours(0, 0, 0, 0);
    let bookDate = new Date(this.date);

    this.dateInvalid = false;
    if (bookDate < currentDate) {
      console.log('Hi I am in ');
      let numberOfDays =
        Math.round(currentDate.getTime() - bookDate.getTime()) / day;
      if (numberOfDays > 6) {
        console.log('Backdate cannot be more than 6 days');
        this.requestPriority = 'invalid';
        this.dateInvalid = true;
        this.dateInvalidText = 'Backdate cannot be more than 6 days';
        dateValidation = false;
        this.dateElement.nativeElement.focus();
        return dateValidation;
      } else {
        console.log('Good Date');
        this.requestPriority = 'normal';
        this.dateInvalid = false;
        this.dateInvalidText = 'Invalid Date';
        dateValidation = true;
        return dateValidation;
      }
    }
  }

  submitClick() {
    let startdate;
    if (this.validation()) {
      this.checkDate();
      const sDate = formatDate(this.date, 'M/d/yyyy', 'en_us');
      startdate = new Date(sDate + ' ' + this.time).getTime().toString();

      // this.setRequestPriority(startdate);
      this.checkBackdate(startdate);
      if (this.requestPriority !== 'invalid') {
        this.open = true;
      }
    }
  }

  onSubmit(form: NgForm) {
    this.open = false;
    let startdate;
    let submitData;

    if (this.validation()) {
      this.isLoading = true;
      this.overlay = true;
      if (this.isEdit) {
        this.checkDate();
      }
      this.checkDate();
      const sDate = formatDate(this.date, 'M/d/yyyy', 'en_us');
      startdate = new Date(sDate + ' ' + this.time).getTime().toString();

      // this.setRequestPriority(startdate);
      this.populateGoodsStorageReuqestLine();

      if (this.requestPriority !== 'invalid') {
        submitData = {
          form: {
            requestNo: this.isEdit ? this.requestNo : null,
            customer: this.companyName,
            agent:
              this.agent == null || this.agent.length === 0 ? '' : this.agent,
            requesterName: this.reqName,
            requesterIC: this.reqIC,
            requesterPhoneNo: this.reqTel,
            arrivalDate: startdate,
            location: this.location,
            requestType: this.requestType.toLowerCase(),
            poNumber: this.poNumber,
            // requestPriority: this.requestPriority,
            goodsStorageRequestLineList: this.goodsStorageRequestLineList,
          },
        };

        console.log('submitData ==');
        console.log(submitData);

        if (!this.isEdit) {
          restServices.pbksb_CommonWarehouseCommonYardService
            .createGoodsStorageRequest(this.appService.myApp)(submitData)
            .then((result) => {
              this.isLoading = false;
              this.overlay = false;
              let returnObj = this.appService.jsonToArray(result);

              let currDate = new Date();
              if (returnObj.success) {
                this.router
                  .navigate([
                    '/operation-system/cwcy-goods-receiving-request-list',
                  ])
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
          restServices.pbksb_CommonWarehouseCommonYardService
            .updateGoodsStorageRequest(this.appService.myApp)(submitData)
            .then((result) => {
              this.isLoading = false;
              this.overlay = false;
              let returnObj = this.appService.jsonToArray(result);

              let currDate = new Date();
              if (returnObj.success) {
                this.router
                  .navigate([
                    '/operation-system/cwcy-goods-receiving-form-view/',
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
                  title: 'Cannot Edit',
                  subtitle: returnObj.errorMessage,
                  // 'The request has failed to be submitted. Please try again',
                  time: formatDate(currDate, 'HH:mm', 'en-US'),
                });
              }
            });
        }
      }
    }
  }

  populateGoodsStorageReuqestLine() {
    this.goodsStorageRequestLineList = [];
    if (this.location === 'Common Warehouse') {
      this.itemList.forEach((item) => {
        this.goodsStorageRequestLineList.push({
          description: item.description,
          quantity: item.quantity,
          UOM: item.UOM,
          remarks: item.remarks,
          weight: item.weight === '' ? null : item.weight,
        });
      });
    } else if (this.location === 'Common Yard') {
      this.itemList.forEach((item) => {
        this.goodsStorageRequestLineList.push({
          description: item.description,
          quantity: item.quantity,
          UOM: item.UOM,
          remarks: item.remarks,
          area: item.weight === '' ? null : item.weight,
        });
      });
    }
  }

  checkDate() {
    if (this.date && this.date.toString().includes('/')) {
      let dateArr = this.date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      this.date = new Date(d);
    }
  }

  validation(): boolean {
    let validate: boolean = true;

    if (!this.date) {
      this.dateInvalid = true;
      this.dateInvalidText = 'Please select date';
      validate = false;
    }

    if (!this.time || this.time.length == 0) {
      this.timeInvalid = true;
      this.timeInvalidText = 'Please select time';
      validate = false;
    }

    if (!this.location || this.location.length == 0) {
      this.locationInvalid = true;
      this.locationInvalidText = 'Please select location';
      validate = false;
    }

    if (!this.requestType || this.requestType.length == 0) {
      this.reqTypeInvalid = true;
      this.reqTypeInvalidText = 'Please select Request Type';
      validate = false;
    }

    if (this.dateInvalid) {
      validate = false;
    }

    if (!this.poNumber) {
      this.poNumberInvalid = true;
      validate = false;
    }

    this.itemList.forEach((item) => {
      if (!item.description) {
        item.invalidDescription = true;
        validate = false;
      }

      if (!item.UOM || item.UOM.length == 0) {
        item.invalidUOM = true;
        validate = false;
      }
    });

    this.focusOnInvalid();

    return validate;
  }

  focusOnInvalid() {
    if (this.dateInvalid) {
      this.dateElement.nativeElement.focus();
    } else if (this.timeInvalid) {
      this.timeElement.input.nativeElement.focus();
    } else if (
      this.itemList.some((item) => {
        return item.invalidDescription;
      })
    ) {
      let i = 0;
      for (let item of this.descriptionRef) {
        if (this.itemList[i].invalidDescription) {
          item.nativeElement.focus();
        }
        i++;
      }
    } else if (
      this.itemList.some((item) => {
        return item.invalidUOM;
      })
    ) {
      let i = 0;
      for (let item of this.UOMRef) {
        if (this.itemList[i].invalidUOM) {
          item.input.nativeElement.focus();
        }
        i++;
      }
    }
  }

  dateChange(event) {
    this.dateInvalid = false;
    // let current = new Date();
    // current.setHours(0, 0, 0, 0);
    // let selectedDate = new Date(event);
    // if (selectedDate < current) {
    //   this.dateInvalid = true;
    //   this.dateInvalidText = "Please select today's date or after today's date";
    // } else {
    //   this.dateInvalid = false;
    //   this.dateInvalidText = '';
    // }
  }

  inputValueChange(value) {
    if (this.date) {
      this.dateInvalid = false;
    }

    if (this.time) {
      this.timeInvalid = false;
    }

    if (this.location) {
      this.locationInvalid = false;
    }

    if (this.requestType) {
      this.reqTypeInvalid = false;
    }

    if (this.poNumber) {
      this.poNumberInvalid = false;
    }

    this.itemList.forEach((item) => {
      if (item.description) {
        item.invalidDescription = false;
      }

      if (item.UOM) {
        item.invalidUOM = false;
      }

      if (item.weight) {
        item.invalidWeight = false;
      }
    });
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

  checkSelected(): boolean {
    return this.itemList.some((item) => item.selected === true);
  }

  deleteRow() {
    this.itemList = this.itemList.filter((item) => item.selected !== true);
  }

  onCancel() {
    this.itemList.forEach((rowDetail) => {
      if (rowDetail.selected) {
        rowDetail.selected = false;
      }
    });
  }

  addRow() {
    this.itemList.push({
      description: '',
      quantity: 1,
      UOM: '',
      remarks: '',
      weight: '',
      selected: false,
      invalidDescription: false,
      invalidUOM: false,
      invalidWeight: false,
    });
  }

  redirectToPrevious() {
    history.back();
  }
}
