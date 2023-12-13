import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'entities/pbksb_Agent';
import { Customer } from 'entities/pbksb_Customer';
import { RequestStorageLineItem } from 'entities/pbksb_RequestStorageLineItem';
import { RequestTransfer } from 'entities/pbksb_RequestTransfer';
import { StorageLocation } from 'entities/pbksb_StorageLocation';
import { StatusGRAEnum } from 'enums/enums';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-icw-transfer-form',
  templateUrl: './icw-transfer-form.component.html',
  styleUrls: ['./icw-transfer-form.component.scss'],
})
export class IcwTransferFormComponent implements OnInit {
  @ViewChild('agentElement') agentElement: ElementRef;
  @ViewChild('reqNameElement') reqNameElement: ElementRef;
  @ViewChild('reqIcElement') reqIcElement: ElementRef;
  @ViewChild('reqPhoneElement') reqPhoneElement: ElementRef;
  @ViewChild('dateElement') dateElement: ElementRef;
  @ViewChild('timeElement') timeElement: ElementRef;
  @ViewChild('storageLocationElement') storageLocationElement: ElementRef;
  @ViewChild('storageDurationElement') storageDurationElement: ElementRef;
  @ViewChild('allotmentElement') mheElement: ElementRef;
  @ViewChild('itemDetailTable') itemDetailTable: ElementRef;
  @ViewChild('requestNo') requestNoElement: ElementRef;
  @ViewChild('isPacSuppElement') isPacSuppElement: ElementRef;
  @ViewChild('isSkidReturnElement') isSkidReturnElement: ElementRef;

  isPacSupp: boolean = false;
  isSkidReturn: boolean = false;

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

  agentList = [];
  agentSelect = [];
  agentArray = [];

  storageLocationList = [];
  storageLocationSelect = [];
  storageLocationArray = [];

  storageDurationList = [{ content: 'Monthly' }, { content: 'Weekly' }];

  dictionaryStatus = {
    INITIATED: 'Initiated',
    CANCELED: 'Cancelled',
    IN_PROGRESS: 'In Progress',
    PENDING_ENDORSEMENT: 'Pending Endorsement',
    ENDORSED: 'Endorsed',
    CHECKED: 'Checked',
  };

  isOptional = false;
  isCancelled = false;
  isEndorsed = false;
  isCancelDisabled = true;
  isEndorsedDisabled = true;
  isEditDisabled = true;
  isPrintDisabled = true;
  isCancelDisplay = false;
  isEndorsedDisplay = false;
  isEditDisplay = false;

  typeList = [];
  typeArray = [];
  typeSelect = [];

  itemChecked = [];
  lineGRAItemList: RequestStorageLineItem[] = [];
  itemList = [];
  itemlistSelected = [];
  lineItem = [];
  invaliditemlistText = [];
  /* {
      type: 't1',
      description: '',
      expiredate: '',
      uom: '',
      qty: 0,
      reviceQty: 0,
      remarks: '',
      actualFootprint: 0,
      batchNo:0,
      inventoryLocation: 0,
      invalidType: false,
      invalidUom: false,
      invalidExpireDate: false,
      selected: false,
    },
  ];
  */

  requestNo: string;
  status: string = '';
  agent: Agent;
  companyName: string;
  customer: Customer = { name: '' };
  reqName: string;
  reqIc: string;
  reqPhone: string;

  date: Date | string;
  time: string;
  poNumber: string;

  agentName: string;
  storageLocationName: string;
  storageLocation: StorageLocation;
  storageDuration: string;
  mhe: string;

  // Invalid
  agentInvalid: boolean = false;
  invalidReqName: boolean = false;
  invalidReqIc: boolean = false;
  invalidReqPhone: boolean = false;
  dateInvalid: boolean = false;
  timeInvalid: boolean = false;
  storageLocationInvalid: boolean = false;
  storageDurationInvalid: boolean = false;
  invalidMhe: boolean = false;
  poNumberInvalid: boolean = false;

  agentInvalidText: string;
  dateInvalidText: string;
  timeInvalidText: string;
  storageLocationInvalidText: string;
  storageDurationInvalidText: string;

  expireDateInvalidText: string;

  detailTransferRequest: RequestTransfer;
  detailEditedTransfer;

  editedItemLine = [];

  inventoryDetailPromise: Promise<any>;
  agentsPromise: Promise<any>;

  isEdit = false;
  username: string;
  open = false;
  currDate = new Date();
  requestType: '' | 'normal' | 'urgent' | 'emergency' | 'invalid' = '';
  isLoading: boolean = false;
  overlay: boolean = false;
  constructor(
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.paramMap.get('requestno')) {
      console.log("this.activatedRoute.snapshot.paramMap.get('jobNo') == ");

      console.log(this.activatedRoute.snapshot.paramMap.get('requestno'));
      this.isEdit = false;
    } else {
      console.log(
        "exist this.activatedRoute.snapshot.paramMap.get('jobNo' == "
      );

      console.log(this.activatedRoute.snapshot.paramMap.get('requestno'));
      this.isEdit = true;
      this.requestNo = this.activatedRoute.snapshot.paramMap.get('requestno');
      this.status = StatusGRAEnum.SUBMITTED;
    }
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        console.log('userInfo === ');
        console.log(userInfo);
        const initialData = this.appService.populateInitData(userInfo);
        this.companyName = initialData.Company;
        this.username = initialData.Username;
        let c = userInfo.customer;
        delete c._instanceName;
        this.customer = c;
        // this.getRestServiceApi();

        console.log('usrname == ');
        console.log(this.username);

        this.getAgents();
        this.getRestServiceAPI2(this.companyName);
        this.getUOMList();

        this.storageDurationList = [
          { content: 'Monthly' },
          { content: 'Weekly' },
        ];

        Promise.all([this.inventoryDetailPromise, this.agentsPromise]).then(
          () => {
            if (this.isEdit) {
              //this.getRestServiceAPI(initialData.CustomerCode);
              this.getRestServiceAPI(this.customer.name);
            }
          }
        );
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  private getRestServiceAPI(customer: string) {
    const param = { customer };

    restServices.pbksb_ICWTransferRestService
      .getTransferRequestsByCustomer(this.appService.myApp)(param)
      .then((result) => {
        const goodsRecievingRequestList = this.appService.jsonToArray(result);

        console.log('result == ');
        console.log(result);
        console.log('goodsRecievingRequestList == ');
        console.log(goodsRecievingRequestList);
        const index = goodsRecievingRequestList.findIndex(
          (obj) => obj.docketNo == this.requestNo
        );
        console.log('index ==');
        console.log(index);
        console.log(this.requestNo);
        console.log(goodsRecievingRequestList[index]);
        this.detailEditedTransfer = goodsRecievingRequestList[index];
        const tempLineItem = goodsRecievingRequestList[index].transferLineItem;
        // new changes
        tempLineItem.forEach((result) => {
          let index = this.itemList.findIndex((obj) => {
            return (
              obj.chemicalType.chemicalId == result.chemicalType.chemicalId
            );
          });
          if (index >= 0) {
            this.itemList[index].outQty = result.outQuantity;
            this.itemList[index].selected = true;
          }
        });

        // this.editedItemLine = this.itemList;
        // for (let i = 0; i < tempLineItem.length; i++) {
        //   let item = tempLineItem[i];
        //   // item.itemType = tempLineItem[i].item.itemType;
        //   // item.id = tempLineItem[i].item.id;
        //   // item.itemId = tempLineItem[i].item.itemId;
        //   item.outQty = tempLineItem[i].outQuantity;
        //   // item.qty = tempLineItem[i].item.qty;
        //   item.uom = { name: tempLineItem[i].chemicalType.uom.name };
        //   //item.uom.name = tempLineItem[i].item.uom;
        //   // item.transationDate = tempLineItem[i].item.transationDate;
        //   item.outDate = tempLineItem[i].outDate;
        //   // item.docketNo = tempLineItem[i].item.docketNo;
        //   // item.batchId = tempLineItem[i].batchNo;
        //   item.remarks = tempLineItem[i].remarks;
        //   item.selected = true;
        //   item.invalidType = false;
        //   item.invalidOutQty = false;
        //   item.invalidOutQtyText = '';
        //   this.editedItemLine.push(item);
        // }

        // this.status = this.dictionaryStatus[this.detailEditedTransfer.status];
        // this.itemList = this.editedItemLine;
        console.log('this.editedItemLine == ');
        console.log(this.editedItemLine);
        // this.itemList = [];
        //this.itemList = this.editedItemLine;
        this.status = this.dictionaryStatus[this.detailEditedTransfer.status];
        // console.log(this.detailWasteDisposal);
        //this.checkOptional();
        this.populateData();
        this.populateFields();
      });
  }

  private getRestServiceAPI2(customer: string) {
    const param = { customer };

    this.inventoryDetailPromise = restServices.pbksb_ICWTransferRestService
      .getCustomerInventoryItems(this.appService.myApp)(param)
      .then((result) => {
        const array: any = result;
        const typeDropdown = JSON.parse(array);

        this.typeArray = typeDropdown;

        console.log();
        for (let i = 0; i < this.typeArray.length; i++) {
          this.typeArray[i].outQty = 0//this.typeArray[i].qty;
          this.typeArray[i].invalidOutQty = false;
          this.typeArray[i].invalidOutQtyText = '';
          // this.typeArray[i].outDate = '';
        }
        console.log('this.itemList == ');
        console.log(this.itemList);

        this.itemList = this.typeArray;
        console.log('this.itemlist == ');
        console.log(this.itemList);
        console.log(this.typeArray);
        //this.typeSelect = this.typeList;
        // this.locationSelect = this.locationList;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateFields() {
    if (this.detailEditedTransfer.agent) {
      this.agentName = this.detailEditedTransfer.agent.name;
    } ///this.itemList = list;
    this.date = formatDate(
      this.detailEditedTransfer.requestDate,
      'dd/MM/Y',
      'en-US'
    );
    this.time = formatDate(
      this.detailEditedTransfer.requestDate,
      'HH:mm',
      'en-US'
    );

    this.poNumber = this.detailEditedTransfer?.poNumber ?? '-';
  }

  populateData() {
    if (this.detailEditedTransfer.status === 'INITIATED') {
      this.isCancelDisabled = false;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = false;
      this.isPrintDisabled = false;

      this.isCancelDisplay = true;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (this.detailEditedTransfer.status === 'PENDING_ENDORSEMENT') {
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = false;
      this.isEditDisabled = true;
      this.isPrintDisabled = true;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = false;
    }
    if (this.detailEditedTransfer.status === 'CANCELLED') {
      this.isCancelled = true;
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = true;
      this.isPrintDisabled = false;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (this.detailEditedTransfer.status === 'ENDORSED') {
      this.isEndorsed = true;
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = true;
      this.isPrintDisabled = false;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = false;
    }
  }

  onSelected(event, itemIndex: number) {
    if (event.checked) {
      console.log('itemIndex');
      console.log(itemIndex);
      this.itemChecked.push(itemIndex);
      this.itemList[itemIndex].selected = true;
    } else {
      this.itemChecked = this.itemChecked.filter((item) => {
        return item !== itemIndex;
      });
      this.itemList[itemIndex].selected = false;
    }
  }

  onClearItem() {
    this.itemList.forEach((item) => {
      if (item.selected) {
        item.outQty = item.qty;
        item.selected = false;
      }
    });
    this.itemChecked = [];
  }

  onDeleteItem() {
    this.itemList = this.itemList.filter((item) => item.selected !== true);
    this.itemChecked = [];
  }

  onCancel() {
    this.itemList.forEach((item) => {
      item.selected = false;
    });
    this.itemChecked = [];
  }

  checkSelected() {
    return this.itemChecked.length > 0 ? true : false;
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
      this.requestType = 'invalid';
      this.dateInvalid = true;
      this.dateInvalidText = 'Invalid Date';
      dateValdiation = false;
      console.log('invalid Date');
      this.dateElement.nativeElement.focus();
      return dateValdiation;
    }
    if (numberOfDays > 2 || (numberOfDays === 2 && currentTime < 8)) {
      this.requestType = 'normal';
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
        this.requestType = 'urgent';
      } else if (numberOfHour > 2) {
        console.log('emergency Request');
        this.requestType = 'emergency';
      } else {
        console.log('booking closed');
        this.requestType = 'invalid';
        this.dateInvalid = true;
        this.dateInvalidText = 'Booking Closed';
        this.dateElement.nativeElement.focus();
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
      if (this.requestType !== 'invalid') {
        this.open = true;
      }
    }
  }

  onSubmit(form: NgForm) {
    this.open = false;
    let submitData: any;
    let startdate;
    if (this.validation()) {
      this.isLoading = true;
      this.overlay = true;
      this.checkDate();
      const sDate = formatDate(this.date, 'M/d/yyyy', 'en_us');
      startdate = new Date(sDate + ' ' + this.time).getTime().toString();
      this.setRequestType(startdate);

      this.itemlistSelected = this.itemList.filter(
        (item) => item.selected == true
      );
      if (this.itemlistSelected.length == 0) {
        alert('you have to select at least one item');
      } else {
        console.log('this.itemlistSelected = ');
        console.log(this.itemlistSelected);
        this.populateLineItem();
        console.log('this.lineItem = ');
        console.log(this.lineItem);
        submitData = {
          form: {
            _entityName: 'pbksb_RequestTransfer',
            customer: this.customer,
            agent: this.agent,
            requestType: this.requestType,

            requestDate: startdate,
            poNumber: this.poNumber,
            transferLineItem: this.lineItem,
          },
        };
        if (this.requestType !== 'invalid') {
          console.log('submitData == ');
          console.log(submitData);

          if (!this.isEdit) {
            restServices.pbksb_ICWTransferRestService
              .createTransferRequestForm(this.appService.myApp)(submitData)
              .then((result) => {
                this.isLoading = false;
                this.overlay = false;
                let returnobj = this.appService.jsonToArray(result);
                if (returnobj.success) {
                  this.router
                    .navigate(['/operation-system/icw-transfer-list'])
                    .then(() => {
                      console.log('returnobj == ');
                      console.log(returnobj);
                      this.currDate = new Date();
                      this.appService.showToaster({
                        type: 'success',
                        title: 'Request Submitted',
                        subtitle:
                          'Request No. ' +
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
                this.isLoading = false;
                this.overlay = false;
                console.log(err);
                this.appService.terminateSession();
              });
          } else {
            submitData.form.docketNo = this.requestNo;
            console.log('submitData for edit');
            console.log(submitData);
            restServices.pbksb_ICWTransferRestService
              .editTransferRequestForm(this.appService.myApp)(submitData)
              .then((result) => {
                this.isLoading = false;
                this.overlay = false;
                let returnobj = this.appService.jsonToArray(result);
                if (returnobj.success) {
                  this.router
                    .navigate(['/operation-system/icw-transfer-list'])
                    .then(() => {
                      this.currDate = new Date();
                      this.appService.showToaster({
                        type: 'success',
                        title: 'Request Submitted',
                        subtitle:
                          'Request No. ' +
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
                this.isLoading = false;
                this.overlay = false;
                console.error(err);
                this.appService.terminateSession();
              });
          }
        }

        console.log('validation is OK');
      }
    } else {
      console.log('validation isNOT  OK');
    }
  }

  populateLineItem() {
    this.lineItem = [];
    for (let i = 0; i < this.itemlistSelected.length; i++) {
      let item = this.itemlistSelected[i];
      console.log('item' + i);
      console.log(item);
      let populatedItem = {
        _entityName: 'pbksb_ICWRequestTransferLineItem',
        outDate: item.outDate,
        // outDate: "2022-03-26 18:58:30.000",
        // batchNo: item.batchId,
        // batchId: item.batchId,
        outQuantity: parseInt(item.outQty),
        // remarks: item.remarks,
        // item: {
        //   _entityName: 'pbksb_InventoryICW',
        //   // itemCode: item.itemCode,
        //   id: item.id,
        //   itemId: item.itemId,
        //   itemDescription: item.itemDescription,
        // },
        chemicalType: item.chemicalType,
      };
      this.lineItem.push(populatedItem);
    }
  }

  validation() {
    let validate = true;
    this.agentInvalid = false;
    this.invalidReqName = false;
    this.invalidReqIc = false;
    this.invalidReqPhone = false;
    this.dateInvalid = false;
    this.timeInvalid = false;
    this.storageLocationInvalid = false;
    this.storageDurationInvalid = false;
    this.invalidMhe = false;
    this.invaliditemlistText = [];

    let itemList = this.itemList;
    for (let i = 0; i < itemList.length; i++) {
      let outQty = itemList[i].outQty;
      let qty = itemList[i].qty;
      let text = '';
      //if(outQty && outQty === parseInt(outQty + '', 10) && outQty < 0 && outQty > qty){
      // if(outQty ){
      itemList[i].invalidOutQty = false;
      itemList[i].invalidOutQtyText = '';

      //}
    }
    this.itemList = itemList;

    console.log('this.agent.name = ');
    console.log(this.agent);
    //console.log(this.agent.name)
    // if (!this.agent || this.agent.name.length == 0) {
    //   this.agentInvalid = true;
    //   this.agentInvalidText = 'Please select an agent';
    // }

    if (!this.reqName || this.reqName.length == 0) {
      this.invalidReqName = true;
    }
    if (!this.reqIc || this.reqIc.length == 0) {
      this.invalidReqIc = true;
    }

    if (!this.reqPhone || this.reqPhone.length == 0) {
      this.invalidReqPhone = true;
    }

    if (!this.date) {
      this.dateInvalid = true;
      this.dateInvalidText = 'Please select date';
    }

    if (!this.time || this.time.length == 0) {
      this.timeInvalid = true;
      this.timeInvalidText = 'Please select time';
    }
    //if (!this.storageLocation || this.storageLocation.length == 0) {
    console.log('this.storageLocation.name = ');
    console.log(this.storageLocation);
    if (!this.storageLocation || this.storageLocation.name.length == 0) {
      this.storageLocationInvalid = true;
      this.storageLocationInvalidText = 'Please select storage location';
    }

    if (!this.storageDuration || this.storageDuration.length == 0) {
      this.storageDurationInvalid = true;
      this.storageDurationInvalidText = 'Please select storage Duration';
    }

    if (!this.mhe || this.mhe.length == 0) {
      this.invalidMhe = true;
    }

    if (!this.poNumber) {
      this.poNumberInvalid = true;
      validate = false;
    }

    let tempList = this.itemList;
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].selected == true) {
        let outQty = tempList[i].outQty;
        let qty = tempList[i].qty;
        let text = '';
        if (outQty) {
          outQty = parseInt(outQty, 10);
          if (isNaN(outQty)) {
            text = 'Input integer value.';
            tempList[i].invalidOutQty = true;
            tempList[i].invalidOutQtyText = text;
            this.invaliditemlistText.push({
              rowNum: i,
              text: text,
            });
          } else {
            if (outQty < 0 || outQty > qty) {
              text = 'Input value in range 0:' + qty;
              tempList[i].invalidOutQty = true;
              tempList[i].invalidOutQtyText = text;
              this.invaliditemlistText.push({
                rowNum: i,
                text: text,
              });
            }
          }
        } else {
          text = 'Out Qty cannot be empty';
          tempList[i].invalidOutQty = true;
          tempList[i].invalidOutQtyText = text;
          this.invaliditemlistText.push({
            rowNum: i,
            text: text,
          });
        }
      }
    }

    this.itemList = tempList;

    //////////////////////////////////////////////////////

    if (this.agentInvalid) {
      // this.agentElement.nativeElement.focus();
      //validate = false;
    }
    if (this.dateInvalid) {
      this.dateElement.nativeElement.focus();
      validate = false;
    }

    if (this.timeInvalid) {
      this.timeElement.nativeElement.focus();
      validate = false;
    }
    for (let i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].invalidOutQty) {
        this.focusTableData(i, 4);
        validate = false;
      }
    }

    return validate;
  }

  inputValueChange(event) {
    if (this.reqPhone) {
      this.invalidReqPhone = false;
    }
    if (this.date) {
      this.dateInvalid = false;
    }

    if (this.time) {
      this.timeInvalid = false;
    }

    if (this.poNumber) {
      this.poNumberInvalid = false;
    }

    if (this.storageLocationName) {
      this.storageLocationInvalid = false;
      let index = this.storageLocationSelect.findIndex(
        (item) => item.content === this.storageLocationName
      );
      this.storageLocation = this.storageLocationSelect[index].obj;
    }

    if (this.agentName) {
      this.agentInvalid = false;
      let index = this.agentSelect.findIndex(
        (item) => item.content === this.agentName
      );
      this.agent = this.agentSelect[index].obj;
    }

    if (this.storageDuration) {
      this.storageDurationInvalid = false;
    }

    if (this.mhe) {
      this.invalidMhe = false;
    }
    let itemList = this.itemList;
    for (let i = 0; i < itemList.length; i++) {
      let outQty = itemList[i].outQty;
      let qty = itemList[i].qty;
      let text = '';
      //if(outQty && outQty === parseInt(outQty + '', 10) && outQty < 0 && outQty > qty){
      // if(outQty ){
      itemList[i].invalidOutQty = false;
      itemList[i].invalidOutQtyText = '';
      //}
    }
    this.itemList = itemList;

    if (this.itemList[0].type) {
      this.itemList[0].invalidType = false;
      // console.log('8');
      // validate = false;
    }
  }

  focusTableData(rowNum, cellNum) {
    this.itemDetailTable.nativeElement.tBodies[0].rows[rowNum].cells[
      cellNum
    ].focus();
  }

  typeSelected(event, itemIndex: number) {
    console.log('event == ');
    console.log(event);
    if (!this.itemList[itemIndex].invalidType) {
      //const result  = this.typeSelect.filter(t => t.type.chemicalId == this.itemList[itemIndex].type);
      this.itemList[itemIndex].description = event.item.type.name; // result[0].type.name;
    }
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

  dateExpireChange(event, itemIndex: number) {
    let current = new Date();
    current.setHours(0, 0, 0, 0);
    let selectedDate = new Date(event);

    if (selectedDate < current) {
      this.itemList[itemIndex].invalidExpireDate = true;
      this.expireDateInvalidText =
        "Please select today's date or after today's date";
    } else {
      this.itemList[itemIndex].invalidExpireDate = false;
      this.expireDateInvalidText = '';
    }
  }

  checkDate() {
    if (this.date && this.date.toString().includes('/')) {
      let dateArr = this.date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      this.date = new Date(d);
    }
  }

  checkExpireDate(date: string) {
    if (date && date.toString().includes('/')) {
      let dateArr = date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      return new Date(d);
    }
  }

  onClear() {
    this.agentName = '';
    this.storageLocationName = '';
    this.reqName = '';
    this.reqIc = '';
    this.reqPhone = '';
    this.date = '';
    this.time = '';
  }

  addItem() {
    let newItem = {
      type: '',
      description: '',
      expiredate: '',
      uom: '',
      qty: 0,
      reviceQty: 0,
      remarks: '',
      actualFootprint: 0,
      batchNo: 0,
      inventoryLocation: 0,
      invalidType: false,
      invalidUom: false,
      invalidExpireDate: false,
      selected: false,
    };
    this.itemList.push(newItem);
  }

  getUOMList() {
    restServices.pbksb_ICWRestService
      .getUOMList(this.appService.myApp)()
      .then((result) => {
        console.log(result);
        const array: any = result;
        const storageLocationDropdown = JSON.parse(array);

        this.storageLocationArray = storageLocationDropdown;

        for (let i = 0; i < this.storageLocationArray.length; i++) {
          delete this.storageLocationArray[i]._instanceName;
          this.storageLocationList.push({
            content: this.storageLocationArray[i].name,
            obj: this.storageLocationArray[i],
          });
        }
        this.storageLocationSelect = this.storageLocationList;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAgents() {
    this.agentsPromise = restServices.pbksb_AgentService
      .getAll(this.appService.myApp)()
      .then((result) => {
        const array: any = result;
        const agentDropdown = JSON.parse(array);
        this.agentArray = agentDropdown;
        for (let i = 0; i < this.agentArray.length; i++) {
          delete this.agentArray[i]._instanceName;
          this.agentList.push({
            content: this.agentArray[i].name,
            obj: this.agentArray[i],
          });
        }
        this.agentSelect = this.agentList;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateLineGRAItems() {
    for (let i = 0; i < this.itemList.length; i++) {
      const result = this.typeSelect.filter(
        (t) => t.type.chemicalId == this.itemList[i].type
      );
      console.log('this.storageLocationSelect == ');
      console.log(this.storageLocationSelect);
      const uomResult = this.storageLocationSelect.filter(
        (t) => t.obj.name == this.itemList[i].uom
      );
      console.log('this.itemList[i].expiredate == ');
      console.log(this.itemList[i].expiredate);
      const myData = new Date(this.itemList[i].expiredate);
      console.log('this.itemList[i].expiredate ');
      console.log(this.itemList[i].expiredate);
      console.log('myData == ');
      console.log(myData);
      const unixData = new Date(this.itemList[i].expiredate)
        .getTime()
        .toString();
      console.log('this.checkExpireDate(this.itemList[i].expiredate) == ');
      console.log(this.checkExpireDate(this.itemList[i].expiredate));
      const fdate = formatDate(
        this.itemList[i].expiredate,
        'YYYY-MM-dd',
        'en-US'
      );
      console.log('fdate == ');
      console.log(fdate);
      this.lineGRAItemList.push({
        // _entityName: "pbksb_RequestStorageLineItem",
        chemicalId: result[0].type,
        description: this.itemList[i].description,
        expiryDate: fdate,
        uom: uomResult[0].obj,
        qty: this.itemList[i].qty,
      });
    }
  }

  /*
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
  */
}
