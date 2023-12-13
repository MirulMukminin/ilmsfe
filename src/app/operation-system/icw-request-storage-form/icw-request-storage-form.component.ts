import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'entities/pbksb_Agent';
import { Customer } from 'entities/pbksb_Customer';
import { RequestStorage } from 'entities/pbksb_RequestStorage';
import { StorageLocation } from 'entities/pbksb_StorageLocation';
import { StatusGRAEnum } from 'enums/enums';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-icw-request-storage-form',
  templateUrl: './icw-request-storage-form.component.html',
  styleUrls: ['./icw-request-storage-form.component.scss'],
})
export class IcwRequestStorageFormComponent implements OnInit {
  @ViewChild('agentElement') agentElement: ElementRef;
  @ViewChild('reqNameElement') reqNameElement: ElementRef;
  @ViewChild('reqIcElement') reqIcElement: ElementRef;
  @ViewChild('reqPhoneElement') reqPhoneElement: ElementRef;
  @ViewChild('dateElement') dateElement: ElementRef;
  @ViewChild('timeElement') timeElement: ElementRef;
  @ViewChild('storageLocationElement') storageLocationElement: ElementRef;
  @ViewChild('storageDurationElement') storageDurationElement: ElementRef;
  @ViewChild('mheElement') mheElement: ElementRef;
  @ViewChild('itemDetailTable') itemDetailTable: ElementRef;
  @ViewChild('requestNo') requestNoElement: ElementRef;
  @ViewChild('isPacSuppElement') isPacSuppElement: ElementRef;
  @ViewChild('isSkidReturnElement') isSkidReturnElement: ElementRef;
  @ViewChildren('uploadElement') uploadElement;
  @ViewChildren('fileUpload') fileUpload;

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

  storageDurationList = [{ content: 'Weekly' }];//{ content: 'Monthly' },

  dictionaryStatus = {
    SUBMITTED: 'Submitted',
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

  chemicalIdArray=[];

  uomList=[];
  uomSelect = [];
  selecteduom=[];

  invaliditemlistText = [];

  itemChecked = [];
  lineGRAItemList = [];
  itemList = [
    {
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
      files: null,
      fileId: null,
      fileName: null,
      invalidType: false,
      invalidUom: false,
      invalidExpireDate: false,
      invalidFile: false,
      selected: false,
      uomItemList:[],
    },
  ];

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
  storageDuration: string;
  poNumber: string;
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

  detailGoodsReceiving: RequestStorage;
  detailEditedGRA;

  editedItemLine = [];

  isEdit = false;

  open = false;
  currDate = new Date();
  requestType: '' | 'normal' | 'urgent' | 'emergency' | 'invalid' = '';
  isLoading: boolean = false;
  overlay: boolean = false;

  itemTypePromise: Promise<any>;
  UOMPromise: Promise<any>;
  agentPromise: Promise<any>;

  //Upload config
  @Input() files = new Set();
  @Input() buttonType = 'primary';
  @Input() accept = ['.jpg', '.png', '.pdf'];
  @Input() multiple = false;
  @Input() skeleton = false;
  @Input() sizeUploder = 'sm';
  @Input() disabled = false;

  // Upload var
  fileToUpload = [];
  uploadEvent: any;
  ipUrl = this.appService.apiIP;
  token: any;
  uploadForm;
  filesUploadedDetails = [];

  constructor(
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
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

      //console.log(this.activatedRoute.snapshot.paramMap.get('requestno'));
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
        this.token = initialData.Token.access_token;
        let c = userInfo.customer;
        delete c._instanceName;
        this.customer = c;
        console.log(this.customer);
        // this.getRestServiceApi();

        this.getAgents();
        this.getItemTypes();
        this.getUOMList();

        this.storageDurationList = [
        
          { content: 'Weekly' },
        ];//  { content: 'Monthly' },
        this.storageDuration='Weekly';
        if (this.isEdit) {
          //this.getRestServiceAPI(initialData.CustomerCode);
          Promise.all([
            this.UOMPromise,
            this.agentPromise,
            this.itemTypePromise,
          ]).then(() => {
            this.getRestServiceAPI(this.customer.name);
          });
        }
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  private getRestServiceAPI(customer: string) {
    const param = { customer };

    restServices.pbksb_ICWRestService
      .getStorageRequestsByCustomer(this.appService.myApp)(param)
      .then((result) => {
        const goodsRecievingRequestList = this.appService.jsonToArray(result);
        // default sorting on JobNo from latest
        /*
        this.goodsRecievingRequestList.sort((a, b) => {
          return b.requestNo  == a.requestNo;
        });
        */
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
        this.detailEditedGRA = goodsRecievingRequestList[index];
        const tempLineItem = goodsRecievingRequestList[index].lineItem;
        //this.editedItemLine = this.detailEditedGRA.lineItem;

        for (let i = 0; i < tempLineItem.length; i++) {
          let item = {
            type: tempLineItem[i].chemicalId.chemicalId,
            qty: tempLineItem[i].qty,
            description: tempLineItem[i].chemicalId.name,
            expiredate: formatDate(
              tempLineItem[i].expiryDate,
              'dd/MM/Y',
              'en-US'
            ),
            uom: tempLineItem[i].uom.name,
            invalidType: false,
            selected: false,
            fileId: tempLineItem[i].fileId,
            fileName: tempLineItem[i].fileName,
            uomSelectItem: [],
          };
          this.editedItemLine.push(item);
        }
        console.log('this.editedItemLine Uom == ');
        // this.populateUOM(this.editedItemLine[0].item.type)
        // console.log('this.editedItemLine Uom == '+this.editedItemLine[0].item.uom);
        // console.log('this.editedItemLine == '+this.editedItemLine[0].item.type);
        console.log(this.editedItemLine[0].type);
        // this.populateUOM(this.editedItemLine[0].type);
        this.itemList = [];
        this.itemList = this.editedItemLine;
        this.itemList.forEach((item, index) => {
          this.populateUOM(item.type,index);
        });
        this.status = this.dictionaryStatus[this.detailEditedGRA.status];
        // console.log(this.detailWasteDisposal);
        //this.checkOptional();
        this.populateData();
        this.populateFields();
      });
  }

  populateFields() {
    if (this.detailEditedGRA.agent) {
      this.agentName = this.detailEditedGRA.agent.name;
    }
    this.isPacSupp = this.detailEditedGRA.pacSupp;
    this.isSkidReturn = this.detailEditedGRA.skidReturn;
    this.reqPhone = this.detailEditedGRA.pacSuppName;
    this.storageDuration =
      this.detailEditedGRA.duration == 'WEEKLY' ? 'Weekly' : 'Monthly';
    this.date = formatDate(
      this.detailEditedGRA.requestDate,
      'dd/MM/Y',
      'en-US'
    );
    this.time = formatDate(this.detailEditedGRA.requestDate, 'HH:mm', 'en-US');
    console.log('This.Time: ', this.time);
    // this.time = this.time.substring(0, 1) + '0' + this.time.substring(1 + 1);
    // this.time = this.time.substring(0, 3) + '0' + this.time.substring(1 + 3);
    // this.time = this.time.substring(0, 4) + '0' + this.time.substring(1 + 4);
    console.log(this.time);
    this.mhe = this.detailEditedGRA.mheRequestId;
    console.log('from populate time');
    console.log(this.time);
    this.poNumber = this.detailEditedGRA.poNumber;
    //this.date = new Date(this.detailEditedGRA.arrivalDate). | date: "dd/MM/YYYY HH:mm";
  }

  populateData() {
    if (this.detailEditedGRA.status === 'SUBMITTED') {
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
        item.type = '';
        item.description = '';
        item.qty = 0;
        item.reviceQty = 0;
        item.remarks = '';
        item.actualFootprint = 0;
        item.batchNo = 0;
        item.inventoryLocation = 0;
        item.selected = false;
        item.uomItemList=[];
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
    let test = 'a';
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
      this.populateLineGRAItems();

      //submitData : GoodsReceiving;
      //delete this.customer._instanceName;
      if (this.requestType !== 'invalid') {
        this.uploadForm = this.formBuilder.group({
          fileData: [''],
        });

        let count = 0;
        console.log('itemList', this.itemList[0].files);
        let needUpload = this.itemList.some(
          (item) => item.files !== null && item.files !== undefined
        );
        if (needUpload) {
          console.log('testing', needUpload);
          this.itemList.forEach((item, index) => {
            console.log('item.files', item.files);
            // console.log('item.files name', item.files.name);
            if (item.files) {
              const file = item.files;
              this.uploadForm.get('fileData').setValue(file);

              let formData = new FormData();
              formData.append('file', this.uploadForm.get('fileData').value);

              const httpOptions = {
                headers: new HttpHeaders({
                  Authorization: 'Bearer ' + this.token,
                }),
              };

              this.http
                .post<any>(this.ipUrl + 'v2/files', formData, httpOptions)
                .subscribe((data) => {
                  let fileData = {
                    fileID: data.id,
                    fileName: data.name,
                  };

                  count++;
                  console.log('lineGRAItem', this.lineGRAItemList);
                  this.lineGRAItemList[index].fileId = data.id;
                  this.lineGRAItemList[index].fileName = data.name;

                  if (count === this.itemList.length) {
                    if (this.requestType !== 'invalid') {
                      submitData = {
                        form: {
                          _entityName: 'pbksb_RequestStorage',
                          customer: this.customer,
                          agent: this.agent,
                          //arrivalDate: "2022-03-12",
                          // location: form.value.location,
                          mheRequestId: this.mhe,
                          storageLocation: this.storageLocation,
                          duration: this.storageDuration,
                          requestType: this.requestType,
                          poNumber: this.poNumber,

                          pacSupp: this.isPacSupp,
                          pacSuppName: this.reqPhone,
                          skidReturn: this.isSkidReturn,

                          requestDate: startdate,
                          lineItem: this.lineGRAItemList,
                        },
                      };
                      console.log('submitData == ');
                      console.log(submitData);
                      console.log('itemList == ');
                      console.log(this.itemList);
                      if (test === 'a') {
                        if (!this.isEdit) {
                          restServices.pbksb_ICWRestService
                            .createStorageRequestForm(this.appService.myApp)(
                              submitData
                            )
                            .then((result) => {
                              this.isLoading = false;
                              this.overlay = false;
                              let returnobj =
                                this.appService.jsonToArray(result);
                              if (returnobj.success) {
                                this.router
                                  .navigate([
                                    '/operation-system/icw-request-storage-list',
                                  ])
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
                                      time: formatDate(
                                        this.currDate,
                                        'HH:mm',
                                        'en-US'
                                      ),
                                    });
                                  });
                              } else {
                                this.appService.showToaster({
                                  type: 'error',
                                  title: 'Cannot Submit',
                                  subtitle: returnobj.errorMessage,
                                  // 'The request has failed to be submitted. Please try again',
                                  time: formatDate(
                                    this.currDate,
                                    'HH:mm',
                                    'en-US'
                                  ),
                                });
                              }
                            })
                            .catch((err) => {
                              this.isLoading = false;
                              this.overlay = false;
                              console.log(err);
                              // this.appService.terminateSession();
                            });
                        } else {
                          submitData.form.docketNo = this.requestNo;
                          restServices.pbksb_ICWRestService
                            .editStorageRequestForm(this.appService.myApp)(
                              submitData
                            )
                            .then((result) => {
                              this.isLoading = false;
                              this.overlay = false;
                              let returnobj =
                                this.appService.jsonToArray(result);
                              if (returnobj.success) {
                                this.router
                                  .navigate([
                                    '/operation-system/icw-request-storage-list',
                                  ])
                                  .then(() => {
                                    this.currDate = new Date();
                                    this.appService.showToaster({
                                      type: 'success',
                                      title: 'Request Submitted',
                                      subtitle:
                                        'Request No. ' +
                                        returnobj.requestNo +
                                        ' is successfully submitted.',
                                      time: formatDate(
                                        this.currDate,
                                        'HH:mm',
                                        'en-US'
                                      ),
                                    });
                                  });
                              } else {
                                this.appService.showToaster({
                                  type: 'error',
                                  title: 'Cannot Submit',
                                  subtitle: returnobj.errorMessage,
                                  // 'The request has failed to be submitted. Please try again',
                                  time: formatDate(
                                    this.currDate,
                                    'HH:mm',
                                    'en-US'
                                  ),
                                });
                              }
                            })
                            .catch((err) => {
                              this.isLoading = false;
                              this.overlay = false;
                              console.error(err);
                              // this.appService.terminateSession();
                            });
                        }
                      }
                    }
                  }
                });
            }
          });
        } else {
          submitData = {
            form: {
              _entityName: 'pbksb_RequestStorage',
              customer: this.customer,
              agent: this.agent,
              //arrivalDate: "2022-03-12",
              // location: form.value.location,
              poNumber: this.poNumber,
              mheRequestId: this.mhe,
              storageLocation: this.storageLocation,
              duration: this.storageDuration,
              requestType: this.requestType,

              pacSupp: this.isPacSupp,
              pacSuppName: this.reqPhone,
              skidReturn: this.isSkidReturn,

              requestDate: startdate,
              lineItem: this.lineGRAItemList,
            },
          };
          console.log('submitData == ');
          console.log(submitData);
          console.log('itemList == ');
          console.log(this.itemList);
          if (test === 'a') {
            if (!this.isEdit) {
              restServices.pbksb_ICWRestService
                .createStorageRequestForm(this.appService.myApp)(submitData)
                .then((result) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let returnobj = this.appService.jsonToArray(result);
                  if (returnobj.success) {
                    this.router
                      .navigate(['/operation-system/icw-request-storage-list'])
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
                  // this.appService.terminateSession();
                });
            } else {
              submitData.form.docketNo = this.requestNo;
              restServices.pbksb_ICWRestService
                .editStorageRequestForm(this.appService.myApp)(submitData)
                .then((result) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let returnobj = this.appService.jsonToArray(result);
                  if (returnobj.success) {
                    this.router
                      .navigate(['/operation-system/icw-request-storage-list'])
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
                  // this.appService.terminateSession();
                });
            }
          }
        }
      }

      console.log('validation is OK');
    } else {
      console.log('validation isNOT  OK');
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

    if (this.isPacSupp && (!this.reqPhone || this.reqPhone.length == 0)) {
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
    console.log("validate==");
    console.log(validate)
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
    
    let checkFile = this.itemList.some((item) => item.files == null);
    if (!this.isEdit && checkFile) {
      this.itemList.forEach((item) => {
        if (item.files === null) {
          item.invalidFile = true;
          validate = false;
        }
      });
    }
    
    let text = '';
    let itemtype = this.itemList[0].type;
        if (!itemtype) {
          text = 'Chemical ID cannot be empty';
          this.itemList[0].invalidType = true;        
          validate=false;         
        }else{
          let itemuom = this.itemList[0].uom;
          if (!itemuom) {
            text = 'UOM cannot be empty';
            this.itemList[0].invalidUom = true;           
            validate=false;
            console.log("invaliduom==");
          }
        }

    console.log('checkFile', checkFile, this.itemList);

    //////////////////////////////////////////////////////

    if (this.agentInvalid) {
      // this.agentElement.nativeElement.focus();
      // validate = false;
    }

    /*
    if(this.invalidReqName == true){
      this.reqNameElement.nativeElement.focus();
      validate = false;
    }

    */
    /*
    if(this.invalidReqIc == true){
      this.reqIcElement.nativeElement.focus();
      validate = false;
    }
*/
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
    /*
    if (this.storageLocationInvalid) {
      this.storageLocationElement.nativeElement.focus();
      validate = false;
    }
    */

    if (this.storageDurationInvalid) {
      this.storageDurationElement.nativeElement.focus();
      validate = false;
    }

    if (this.invalidMhe == true) {
      this.mheElement.nativeElement.focus();
      validate = false;
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
    
  }

  typeSelected(event, itemIndex: number) {
    console.log('event == ');
    console.log(event);
    if (this.itemList[itemIndex].type) {
      this.itemList[itemIndex].invalidType = false;
     
    }
    if (!this.itemList[itemIndex].invalidType) {
      //const result  = this.typeSelect.filter(t => t.type.chemicalId == this.itemList[itemIndex].type);
      this.itemList[itemIndex].description = event.item.type.name; // result[0].type.name;
      // this.itemList[itemIndex].uom = event.item.type.uom.name;     
      this.populateUOM(event.item.type.chemicalId,itemIndex)
    }
  }

   populateUOM(descriptionname:string,itemIndex: number) {
    console.log("populateUOM");
    console.log(descriptionname);
    this.uomList=[];
    this.uomSelect=[];
    for (let i = 0; i < this.typeArray.length; i++) {
      if(descriptionname===this.typeArray[i].chemicalId)
      this.uomList.push({
        content:this.typeArray[i].uom.name,
        type:this.typeArray[i].uom});
    }
    this.itemList[itemIndex].uomItemList=this.uomList;
    this.uomSelect=this.uomList;
    console.log("uomSelect ");
    console.log(this.uomSelect);
  }

  uomSelected(event, itemIndex: number) {
    console.log('event == ');
    console.log(event);
    if(this.itemList[itemIndex].uom){
      this.itemList[0].invalidUom = false;
    }
    console.log(this.itemList[itemIndex].uom)
    // this.itemList[itemIndex].uom = event.item.uom;
    // if (!this.itemList[itemIndex].invalidType) {
     
    // }
    console.log(this.itemList[itemIndex].uom)
console.log("Selected UOM "+event.item.uom);
this.selecteduom=[];
    for (let i = 0; i < this.uomSelect.length; i++) {
      if(this.itemList[itemIndex].uom === this.uomSelect[i].content){
        this.selecteduom[0] = this.uomSelect[i];
      }
    }    

    console.log( this.selecteduom[0]);

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

  editDateFormat(oldDate) {
    let newDate;
    if (oldDate && oldDate.toString().includes('/')) {
      let dateArr = oldDate.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      newDate = new Date(d);
    }
    return newDate;
  }

  checkExpireDate(date: string) {
    if (date && date.toString().includes('/')) {
      let dateArr = date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      return new Date(d);
    }
    return date;
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
    console.log('first: ', this.itemList);
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
      files: null,
      fileId: null,
      fileName: null,
      inventoryLocation: 0,
      invalidType: false,
      invalidUom: false,
      invalidExpireDate: false,
      invalidFile: false,
      selected: false,
      uomItemList:[],
    };
    this.itemList.push(newItem);
    console.log('second: ', this.itemList);
    console.log('uploadElement', this.uploadElement);
  }

  getItemTypes() {
    let param = { customer: this.companyName };
    this.itemTypePromise = restServices.pbksb_ICWRestService
      .getItemTypes(this.appService.myApp)(param)
      .then((result) => {
        const array: any = result;
        const typeDropdown = JSON.parse(array);

        this.typeArray = typeDropdown;

        console.log("chemicalIdArray");
        
        this.chemicalIdArray=[];
        for (let i = 0; i < this.typeArray.length; i++) {
          console.log(this.chemicalIdArray.includes(this.typeArray[i].chemicalId))
          if(!this.chemicalIdArray.includes(this.typeArray[i].chemicalId)){
            this.chemicalIdArray.push(
              this.typeArray[i].chemicalId
            )
            this.typeList.push({
              content: this.typeArray[i].chemicalId,
              type: this.typeArray[i],
            });
          }
          
        }
        console.log(this.chemicalIdArray);

        this.typeSelect = this.typeList;
        // this.locationSelect = this.locationList;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUOMList() {
    this.UOMPromise = restServices.pbksb_ICWRestService
      .getUOMList(this.appService.myApp)()
      .then((result) => {
        console.log(result);
        const array: any = result;
        const storageLocationDropdown = JSON.parse(array);

        this.storageLocationArray = storageLocationDropdown;

        for (let i = 0; i < this.storageLocationArray.length; i++) {
          delete this.storageLocationArray[i]._iremovenstanceName;
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
    this.agentPromise = restServices.pbksb_AgentService
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
    this.lineGRAItemList = [];
    for (let i = 0; i < this.itemList.length; i++) {
      const result = this.typeSelect.filter(
        (t) => t.type.chemicalId == this.itemList[i].type
      );
      console.log('this.storageLocationSelect == ');
      console.log(this.uomSelect);
      // const uomResult = this.uomSelect.filter(
      //   (t) => t.obj.name == this.itemList[i].uom
      // );
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
        this.checkExpireDate(this.itemList[i].expiredate),
        'YYYY-MM-dd',
        'en-US'
      );
      console.log('fdate == ');
      console.log(fdate);
      console.log('selecteduom');
      this.selecteduom=[];
      let selectUOM=this.itemList[i].uom
      let uomItemList=this.itemList[i].uomItemList;
      // console.log('uomItemList',uomItemList);
      for (let j = 0; j < uomItemList.length; j++) {
        // console.log(uomItemList[j].content);
        if(selectUOM === uomItemList[j].content){
          this.selecteduom[0] = uomItemList[j];
        }
      }
      console.log(this.selecteduom[0]);
      this.lineGRAItemList.push({
        _entityName: 'pbksb_RequestStorageLineItem',
        chemicalId: result[0].type,
        description: this.itemList[i].description,
        expiryDate: fdate,
        uom: this.selecteduom[0].type,
        qty: this.itemList[i].qty,
        fileId: this.itemList[i].fileId,
        fileName: this.itemList[i].fileName,
      });
    }
  }

  onFileChange(event, itemIndex) {
    console.log(event);

    const file = event.target.files[0];

    if (file) {
      console.log(file);
      this.itemList[itemIndex].files = file;
      this.itemList[itemIndex].invalidFile = false;
      console.log(this.itemList);
      // this.fileName = file.name;
    }
  }

  removeFiles(itemIndex) {
    console.log(this.fileUpload);
    var filterIndex = this.fileUpload.filter((e, i) => i == itemIndex);
    console.log(filterIndex);
    // console.log(this.fileUpload._result[itemIndex]);
    filterIndex[0].nativeElement.value = '';
    // this.fileUpload[itemIndex].nativeElement.value = '';
    this.itemList[itemIndex].files = null;
    console.log('after remove file', this.itemList);
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
