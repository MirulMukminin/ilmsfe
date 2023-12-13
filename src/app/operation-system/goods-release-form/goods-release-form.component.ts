import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'entities/pbksb_Agent';
import { Customer } from 'entities/pbksb_Customer';
import { GoodsRelease } from 'entities/pbksb_GoodsRelease';
import { LineGRAItem } from 'entities/pbksb_LineGRAItem';
import { StorageLocation } from 'entities/pbksb_StorageLocation';
import { StatusGRAEnum, StorageDurationEnum } from 'enums/enums';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-goods-release-form',
  templateUrl: './goods-release-form.component.html',
  styleUrls: ['./goods-release-form.component.scss'],
})
export class GoodsReleaseFormComponent implements OnInit {
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

  storageDurationList = [
    { content: StorageDurationEnum.MONTHLY },
    { content: StorageDurationEnum.WEEKLY },
  ];

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
  lineGRAItemList: LineGRAItem[] = [];
  itemList = [];
  /*
  itemList = [
    {
      type: '',
      description: '',
      qty: 0,
      outQty: 0,
      remarks: '',
      actualFootprint: 0,
      batchNo:0,
      inventoryLocation: 0,
      invalidType: false,
      selected: false,
      invalidOutQty: false,
      invalidOutQtyText: ''
    },
  ]; */

  itemlistSelected = [];
  invalidItemList = false;
  invaliditemlistText = [];
  lineItem = [];

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

  agentName: string;
  storageLocationName: string;
  storageLocation: StorageLocation;
  storageDuration: StorageDurationEnum;
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

  agentInvalidText: string;
  dateInvalidText: string;
  timeInvalidText: string;
  storageLocationInvalidText: string;
  storageDurationInvalidText: string;

  detailGoodsReceiving: GoodsRelease;
  detailEditedGRA: GoodsRelease;

  editedItemLine = [];

  username: string;
  isEdit = false;

  open = false;
  currDate = new Date();
  constructor(
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.paramMap.get('requestno')) {
      this.isEdit = false;
    } else {
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
        const initialData = this.appService.populateInitData(userInfo);
        this.companyName = initialData.Company;
        this.username = initialData.Username;
        let c = userInfo.customer;
        delete c._instanceName;
        this.customer = c;
        // this.getRestServiceApi();

        this.getAgents();

        this.getItemTypes();
        this.getStorageLocations();
        this.getRestServiceAPI2(this.companyName);

        this.storageDurationList = [
          { content: StorageDurationEnum.MONTHLY },
          { content: StorageDurationEnum.WEEKLY },
        ];

        if (this.isEdit) {
          //this.getRestServiceAPI(initialData.CustomerCode);
          this.getRestServiceAPI(this.customer.name);
        }
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  private getRestServiceAPI(customer: string) {
    const param = { customer };

    restServices.pbksb_GRNRestService
      .getGRNRequestsByCustomer(this.appService.myApp)(param)
      .then((result) => {
        const goodsRecievingRequestList = this.appService.jsonToArray(result);
        // default sorting on JobNo from latest
        /*
        this.goodsRecievingRequestList.sort((a, b) => {
          return b.requestNo  == a.requestNo;
        });
        */

        const index = goodsRecievingRequestList.findIndex(
          (obj) => obj.releaseNo == this.requestNo
        );

        this.detailEditedGRA = goodsRecievingRequestList[index];
        const tempLineItem = goodsRecievingRequestList[index].lineItem;
        //this.editedItemLine = this.detailEditedGRA.lineItem;
        /*
         let item =  {
            item_name:  tempLineItem[i].item_name, inDate: tempLineItem[i].item.inDate,
            qty: tempLineItem[i].item.qty, outQty: tempLineItem[i].qty,
                         requestNo: tempLineItem[i].item.requestNo.requestNo,
                         batchNo: tempLineItem[i].item.batchNo, remarks: tempLineItem[i].remarks,
                         invalidType: false, selected: true
                      }
        */

        this.editedItemLine = this.itemList;
        for (let i = 0; i < tempLineItem.length; i++) {
          let item = tempLineItem[i];
          item.itemId = tempLineItem[i].item.itemId;
          item.id = tempLineItem[i].item.id;
          item.outQty = tempLineItem[i].qty;
          item.qty = tempLineItem[i].item.qty;
          item.requestNo = tempLineItem[i].item.requestNo.requestNo;
          item.item_name = tempLineItem[i].item.item_name;
          item.inDate = tempLineItem[i].item.inDate;
          item.batchNo = tempLineItem[i].item.batchNo;
          item.remarks = tempLineItem[i].item.remarks;
          item.selected = true;
          item.invalidType = false;
          item.invalidOutQty = false;
          item.invalidOutQtyText = '';
          this.editedItemLine.push(item);
        }

        this.status = this.dictionaryStatus[this.detailEditedGRA.status];
        this.itemList = this.editedItemLine;

        this.populateData();
        this.populateFields();
      });
  }

  private getRestServiceAPI2(customer: string) {
    const param = { customer };

    restServices.pbksb_GRNRestService
      .getCustomerInventoryItems(this.appService.myApp)(param)
      .then((result) => {
        const array: any = result;
        const typeDropdown = JSON.parse(array);

        this.typeArray = typeDropdown;

        console.log();
        for (let i = 0; i < this.typeArray.length; i++) {
          this.typeArray[i].outQty = this.typeArray[i].qty;
          this.typeArray[i].requestNo = this.typeArray[i].requestNo.requestNo;
          this.typeArray[i].invalidOutQty = false;
          this.typeArray[i].invalidOutQtyText = '';
          // this.typeArray[i].outDate = '';
          /*
          this.itemList.push({
            type: item.itemType,
            batchId: item.batchId,
            docketNo: item.docketNo,
            uom: item.uom.name,
            itemDescription: item.itemDescription,

          });
          */
        }

        this.itemList = this.typeArray;
        //this.typeSelect = this.typeList;
        // this.locationSelect = this.locationList;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateFields() {
    this.requestNo = this.detailEditedGRA.releaseNo;
    this.agentName = this.detailEditedGRA.agent.name;
    this.reqName = this.detailEditedGRA.requestorName;
    this.reqIc = this.detailEditedGRA.requestorIC;
    this.reqPhone = this.detailEditedGRA.requestorPhone;
    //this.storageDuration = this.detailEditedGRA.du;
    //this.storageLocationName = this.detailEditedGRA.storageLocation.name;
    this.date = formatDate(
      this.detailEditedGRA.releaseDate,
      'dd/MM/Y',
      'en-US'
    );
    this.time = formatDate(this.detailEditedGRA.releaseDate, 'HH:mm', 'en-US');
    //this.mhe = this.detailEditedGRA.allotmentNo;
    //this.date = new Date(this.detailEditedGRA.arrivalDate). | date: "dd/MM/YYYY HH:mm";
  }

  populateData() {
    if (this.detailEditedGRA.status === 'INITIATED') {
      this.isCancelDisabled = false;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = false;
      this.isPrintDisabled = false;

      this.isCancelDisplay = true;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (this.detailEditedGRA.status === 'PENDING_ENDORSEMENT') {
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = false;
      this.isEditDisabled = true;
      this.isPrintDisabled = true;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = false;
    }
    if (this.detailEditedGRA.status === 'CANCELLED') {
      this.isCancelled = true;
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = true;
      this.isPrintDisabled = false;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (this.detailEditedGRA.status === 'ENDORSED') {
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

  onSubmit(form: NgForm) {
    this.open = false;
    let submitData: any;
    let startdate;
    if (this.validation()) {
      this.checkDate();
      const sDate = formatDate(this.date, 'M/d/yyyy', 'en_us');
      startdate = new Date(sDate + ' ' + this.time).getTime().toString();

      //this.populateLineGRAItems();

      this.itemlistSelected = this.itemList.filter(
        (item) => item.selected == true
      );
      if (this.itemlistSelected.length == 0) {
        alert('you have to select at least one item');
      } else {
        //submitData : GoodsReceiving;
        //delete this.customer._instanceName;

        this.populateLineItem(startdate);

        submitData = {
          form: {
            _entityName: 'pbksb_GoodsRelease',
            customer: this.customer,
            agent: this.agent,
            requestorName: this.reqName,
            requestorIC: this.reqIc,
            requestorPhone: this.reqPhone,
            userName: this.username,
            //arrivalDate: "2022-03-12",
            // location: form.value.location,

            requestDate: startdate,
            lineItem: this.lineItem,
          },
        };

        if (!this.isEdit) {
          restServices.pbksb_GRNRestService
            .createGRNRequestForm(this.appService.myApp)(submitData)
            .then((result) => {
              let returnobj = this.appService.jsonToArray(result);
              if (returnobj['success']) {
                this.router
                  .navigate(['/operation-system/goods-recieving-form'])
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
              console.log(err);
              this.appService.terminateSession();
            });
        } else {
          submitData.form.releaseNo = this.requestNo;
          restServices.pbksb_GRNRestService
            .editGRNRequestForm(this.appService.myApp)(submitData)
            .then((result) => {
              let returnobj = this.appService.jsonToArray(result);
              if (returnobj.success) {
                this.router
                  .navigate(['/operation-system/goods-release-list'])
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
              console.error(err);
              this.appService.terminateSession();
            });
        }

        console.log('validation is OK');
      }
    } else {
      console.log('validation isNOT  OK');
    }
  }
  populateLineItem(startdate) {
    for (let i = 0; i < this.itemlistSelected.length; i++) {
      let item = this.itemlistSelected[i];
      let populatedItem = {
        _entityName: 'pbksb_InventoryItemOut',
        //outDate: item.outDate,
        //outDate: startdate,
        // outDate: "2022-03-26 18:58:30.000",
        batchNo: item.batchId,
        //outQty: parseInt(item.outQty),
        qty: parseInt(item.outQty),
        remarks: item.remarks,
        item: {
          _entityName: 'pbksb_InventoryICYS',
          id: item.id,
          itemId: item.itemId,
          itemType: item.itemType,
          item_name: item.item_name,
          inQty: item.inQty,
          qty: item.qty,
          inDate: item.inDate,
        },
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
    if (!this.agent || this.agent.name.length == 0) {
      this.agentInvalid = true;
      this.agentInvalidText = 'Please select an agent';
    }

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
      this.agentElement.nativeElement.focus();
      validate = false;
    }

    if (this.invalidReqName == true) {
      this.reqNameElement.nativeElement.focus();
      validate = false;
    }

    if (this.invalidReqIc == true) {
      this.reqIcElement.nativeElement.focus();
      validate = false;
    }

    if (this.invalidReqPhone == true) {
      this.reqPhoneElement.nativeElement.focus();
      validate = false;
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
    if (this.reqName) {
      this.invalidReqName = false;
    }
    if (this.reqIc) {
      this.invalidReqIc = false;
    }

    if (this.reqPhone) {
      this.invalidReqPhone = false;
    }
    if (this.date) {
      this.dateInvalid = false;
    }

    if (this.time) {
      this.timeInvalid = false;
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

  checkDate() {
    if (this.date && this.date.toString().includes('/')) {
      let dateArr = this.date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      this.date = new Date(d);
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

  focusTableData(rowNum, cellNum) {
    this.itemDetailTable.nativeElement.tBodies[0].rows[rowNum].cells[
      cellNum
    ].focus();
  }
  /*
  addItem(){
    let newItem = {
      type: '',
      description: '',
      qty: 0,
      reviceQty: 0,
      remarks: '',
      actualFootprint: 0,
      batchNo:0,
      inventoryLocation: 0,
      invalidType: false,
      selected: false,
    }
    this.itemList.push(newItem)
  }
*/
  getItemTypes() {
    // restServices.pbksb_GoodsRecievingService
    // .getItemTypes(this.appService.myApp)()
    // .then((result) => {
    //   const array: any = result;
    //     const typeDropdown = JSON.parse(array);
    //     this.typeArray = typeDropdown;
    //     for (let i = 0; i < this.typeArray.length; i++) {
    //       this.typeList.push({
    //         content: this.typeArray[i].typeName,
    //         type: this.typeArray[i]
    //       });
    //     }
    //     this.typeSelect = this.typeList;
    //    // this.locationSelect = this.locationList;
    // }).catch((error) => {
    //   console.log(error);
    // });
  }

  getStorageLocations() {
    // restServices.pbksb_GoodsRecievingService
    // .getStorageLocations(this.appService.myApp)()
    // .then((result) => {
    //   const array: any = result;
    //     const storageLocationDropdown = JSON.parse(array);
    //     this.storageLocationArray = storageLocationDropdown;
    //     for (let i = 0; i < this.storageLocationArray.length; i++) {
    //       delete this.storageLocationArray[i]._instanceName;
    //       this.storageLocationList.push({
    //         content: this.storageLocationArray[i].name,
    //         obj: this.storageLocationArray[i]
    //       }
    //       );
    //     }
    //     this.storageLocationSelect = this.storageLocationList;
    // }).catch((error) => {
    //   console.log(error);
    // });
  }

  getAgents() {
    // restServices.pbksb_GoodsRecievingService
    // .getAgents(this.appService.myApp)()
    // .then((result) => {
    //   const array: any = result;
    //     const agentDropdown = JSON.parse(array);
    //     this.agentArray = agentDropdown;
    //     for (let i = 0; i < this.agentArray.length; i++) {
    //       delete this.agentArray[i]._instanceName;
    //       this.agentList.push({
    //         content: this.agentArray[i].name,
    //         obj: this.agentArray[i]
    //       }
    //       );
    //     }
    //     this.agentSelect = this.agentList;
    // }).catch((error) => {
    //   console.log(error);
    // });
  }

  populateLineGRAItems() {
    for (let i = 0; i < this.itemList.length; i++) {
      const result = this.typeSelect.filter(
        (t) => t.type.typeName == this.itemList[i].type
      );
      this.lineGRAItemList.push({
        // _entityName: "pbksb_LineGRAItem",
        type: result[0].type,
        description: this.itemList[i].description,
        qty: this.itemList[i].qty,
      });
    }
  }
}
