import { Component, Input, OnInit } from '@angular/core';
import {
  FileItem,
  TableHeaderItem,
  TableModel,
} from 'carbon-components-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-psb-transfer-owner-buyer-preview',
  templateUrl: './psb-transfer-owner-buyer-preview.component.html',
  styleUrls: ['./psb-transfer-owner-buyer-preview.component.scss'],
})
export class PsbTransferOwnerBuyerPreviewComponent implements OnInit {
  isLoading = false;
  overlay = false;

  quantityAndLocations: any[] = [];

  checkboxFlag = false;

  items: any[] = [];

  locationArr = [];
  locationList = [];

  step: number = 1;
  min: number = 0;
  // max = []
  max: number = 100;

  @Input() files = new Set();
  @Input() buttonType = 'primary';
  @Input() accept = ['.jpg', '.png', '.pdf'];
  @Input() multiple = true;
  @Input() skeleton = false;
  @Input() sizeUploder = 'normal';
  @Input() disabled = false;

  protected maxSize = 500000;

  open = false;

  companyName = '';
  requestBy = '';
  requestNo = '';
  status = '';
  buyer = '';
  PONumber = '';
  invoice = '';
  saleDate = '';
  category = '';
  attachments = [];
  attachmentsList = [];
  remarks = '';
  purchasedGoods = [];
  purchasedGoodsList = [];
  uniqueArray = [];

  invalidQty = [];
  invalidLocation = [];
  requiredQty = [];
  requiredLocation = [];

  Goods = [];

  invalidFile = false;
  fileArray = [];
  fileEvent: any;
  successUpload: any;
  countFiles = 0;
  date = new Date();

  submitArr = [];
  countFile = 0;

  disableComplete = false;
  goodsLength = 0;
  disableQty = false;
  disableLocation = false;

  transferOwnershipID = '';
  uploadForm: FormGroup;

  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    protected notificationService: NotificationService,
    private http: HttpClient,
    public datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {}

  ipUrl = this.appService.apiIP;
  token: any;

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        //console.log(initialData);
        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;
        this.token = initialData.Token.access_token;
        this.getRestServicesAPI();
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

  getRestServicesAPI() {
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

        this.locationList = this.locationList.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        this.items = this.locationList;
      })
      .then((result) => {
        this.requestNo =
          this._Activatedroute.snapshot.paramMap.get('requestNo');
        const params = { requestNumber: this.requestNo };
        restServices.pbksb_PSBService
          .GetTransferOwnerShipBuyerForm(this.appService.myApp)(params)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            this.transferOwnershipID = request.transferOwnershipId;
            this.status = request.status;
            this.buyer = request.buyer;
            this.PONumber = request.poNumber;
            this.invoice = request.invoiceNumber;
            this.saleDate = request.saleDate;
            this.category = request.category;
            this.remarks = request.remarks;

            if (!request.remarks) {
              this.remarks = '-';
            }

            this.checkStatus();
          });

        // console.log(this.items);

        const getCode = { request_no: this.requestNo };
        restServices.pbksb_PSBService
          .ListGoodTransferOwnerShip(this.appService.myApp)(getCode)
          .then((result) => {
            let resArr: any = result;
            let request = JSON.parse(resArr);

            this.purchasedGoods = request;

            this.purchasedGoods.forEach((value, index) => {
              if (value.location) {
                this.Goods.push({
                  ID: value.good.id,
                  Description: value.good.description,
                  FormType: value.good.good_in.form_type,
                  RegNo: value.good.good_in.registration_no,
                  Quantity: value.quantity,
                  RemainingQty: 0,
                  // Location: value.good.good_in.location.description,
                  Location: value.location.description,
                  Selected: false,
                  pair: value.id,
                  maxQty: value.quantity,
                  holdQty: 0,
                });
              } else {
                this.Goods.push({
                  ID: value.good.id,
                  Description: value.good.description,
                  FormType: value.good.good_in.form_type,
                  RegNo: value.good.good_in.registration_no,
                  Quantity: value.quantity,
                  RemainingQty: 0,
                  Location: value.good.good_in.location.description,
                  // Location: value.location.description,
                  Selected: false,
                  pair: value.id,
                  maxQty: value.quantity,
                  holdQty: 0,
                });
              }

              this.goodsLength++;
            });
          });

        const param = { request_no: this.requestNo };
        restServices.pbksb_PSBService
          .GetListTransferOwnershipDocument(this.appService.myApp)(param)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            this.attachments = request;
          });
      });
  }

  downloadFiles(fileID: string, filename: string): void {
    const baseUrl = this.ipUrl + 'v2/files/' + fileID;
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.token
    );

    this.http
      .get(baseUrl, { headers, responseType: 'blob' as 'json' })
      .subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('target', '_self');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (fileID) downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      });
  }

  addLocation() {
    this.Goods.forEach((elem) => {
      if (elem.Selected == true) {
        this.Goods.push({
          checkID: Math.random(),
          ID: elem.ID,
          Description: elem.Description,
          FormType: elem.FormType,
          RegNo: elem.RegNo,
          Quantity: 0,
          RemainingQty: elem.RemainingQty,
          Location: '',
          Selected: false,
          pair: elem.ID,
          maxQty: elem.maxQty,
          holdQty: 0,
        });
      }
    });

    this.Goods.sort((a, b) => a.pair - b.pair);
  }

  checkStatus() {
    if (this.status == 'COMPLETED') {
      this.disableComplete = true;
      this.disableQty = true;
      this.disableLocation = true;
    } else {
      this.disableComplete = false;
    }
  }

  checkPurchaseGoodsLength() {
    return this.Goods.some((item) => item.Selected == true);
  }

  deletePurchaseGoods() {
    this.Goods.forEach((elem) => {
      if (elem.Selected) {
        this.Goods = this.Goods.filter(
          (item) => item.Selected !== elem.Selected
        );
      }
    });
  }

  numberChange(event: any, pair: string, rowIdx: number, id: string) {
    let totalPairHold = 0;

    this.Goods.forEach((element, idx) => {
      if (idx == rowIdx) {
        element.holdQty = event.value;
      }

      if (element.pair == pair) {
        totalPairHold = totalPairHold + element.holdQty;
      }
    });

    this.Goods.forEach((val, idx) => {
      if (val.pair == pair) {
        val.RemainingQty = val.maxQty - totalPairHold;
      }
    });
  }

  selectLocation(event: any) {
    if (event) {
      this.disableComplete = false;
    }
  }

  cancelMethod() {
    this.Goods.forEach((elem) => {
      elem.Selected = false;
    });
  }

  pushArray() {
    this.Goods.forEach((value, index) => {
      this.submitArr.push({
        goodID: value.ID,
        quantity: value.Quantity,
        location: value.Location,
      });
    });

    for (let i = 0; i < this.fileArray.length; i++) {
      // console.log(this.fileArray.length);
      if (this.fileArray[i].file.name) {
        this.countFile++;
      }
    }
  }

  onSubmit() {
    this.open = false;

    try {
      for (let x of this.fileEvent) {
        this.fileArray.push(x);
      }
    } catch (err) {
      console.debug();
    }

    this.pushArray();

    const param = {
      form: {
        transferOwnershipID: this.transferOwnershipID,
        buyerAddItemList: this.submitArr,
      },
    };

    const status = {
      id: this.transferOwnershipID,
      status: 'COMPLETED',
    };

    if (this.Goods.length == this.submitArr.length) {
      restServices.pbksb_PSBService
        .PostLocationBuyerForm(this.appService.myApp)(param)
        .then((result) => {})
        .then(() => {
          if (this.countFile > 0) {
            this.isLoading = true;
            this.overlay = true;

            //upload form data
            this.uploadForm = this.formBuilder.group({
              fileData: [''],
            });

            this.fileArray.forEach((files) => {
              const file = files.file;
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
                  // console.warn(data.id)
                  const filesUploaded = {
                    file: {
                      transferOwnershipID: this.transferOwnershipID,
                      fileID: data.id,
                      fileName: data.name,
                    },
                  };

                  if (!data.id) {
                    this.isLoading = false;
                    this.overlay = false;
                  }

                  restServices.pbksb_PSBService
                    .fileUpload_TransferOwnership(this.appService.myApp)(
                      filesUploaded
                    )
                    .then((result) => {
                      this.successUpload = result;
                      if (this.successUpload) {
                        this.countFiles++;
                      }
                      if (this.countFiles === this.fileArray.length) {
                        restServices.pbksb_PSBService
                          .ChangeStatusTransferOwnerShipBuyerForm(
                            this.appService.myApp
                          )(status)
                          .then((result) => {
                            if (result == 'OK') {
                              const successNotif = {
                                type: 'success',
                                title: 'Request submitted',
                                subtitle:
                                  'Request No.' +
                                  ' ' +
                                  this.requestNo +
                                  ' ' +
                                  'is successfully submitted',
                                time:
                                  `${this.date.getHours()}` +
                                  ' : ' +
                                  `${this.date.getMinutes()}`,
                              };

                              this.appService.showToaster(successNotif);
                              this.router.navigate([
                                '/wms/psb-transfer-owner-list',
                              ]);
                            }
                          });
                      }
                    });
                });
            });
          } else {
            restServices.pbksb_PSBService
              .ChangeStatusTransferOwnerShipBuyerForm(this.appService.myApp)(
                status
              )
              .then((result) => {
                if (result == 'OK') {
                  const successNotif = {
                    type: 'success',
                    title: 'Request submitted',
                    subtitle:
                      'Request No.' +
                      ' ' +
                      this.requestNo +
                      ' ' +
                      'is successfully submitted',
                    time:
                      `${this.date.getHours()}` +
                      ' : ' +
                      `${this.date.getMinutes()}`,
                  };

                  this.appService.showToaster(successNotif);
                  this.router.navigate(['/wms/psb-transfer-owner-list']);
                }
              });
          }
        });
    }
  }

  checkValidation() {
    for (let i = 0; i < this.Goods.length; i++) {
      if (!this.Goods[i].Quantity) {
        this.invalidQty[i] = true;
        this.requiredQty[i] = true;
      } else if (this.Goods[i].Quantity) {
        this.invalidQty[i] = false;
        this.requiredQty[i] = false;
      }

      if (!this.Goods[i].Location) {
        this.invalidLocation[i] = true;
        this.requiredLocation[i] = true;
      } else if (this.Goods[i].Location) {
        this.invalidLocation[i] = false;
        this.requiredLocation[i] = false;
      }

      if (this.Goods[i].Quantity && this.Goods[i].Location) {
        this.open = true;
      }
    }
  }

  onDropped(event: any) {
    this.invalidFile = false;
    this.fileEvent = event;
  }
}
