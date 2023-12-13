import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-cwcy-goods-receiving-view',
  templateUrl: './cwcy-goods-receiving-view.component.html',
  styleUrls: ['./cwcy-goods-receiving-view.component.scss'],
  providers: [TitleCasePipe],
})
export class CwcyGoodsReceivingViewComponent implements OnInit {
  // label
  lbl_weight: 'KG Per Line' | 'm² Per Line' = 'KG Per Line';
  lbl_actual_weight: 'Actual Weight (KG)' | 'Actual Area (m²)' =
    'Actual Weight (KG)';
  name = '';

  formData = [];
  companyName: string = '';
  requestBy: string = '';
  requestNo: string = '';
  agent: string = '';
  reqName: string = '';
  reqIC: string = '';
  reqTel: string = '';
  dateTime: string = '';
  location: string = '';
  requestType: string = '';
  poNumber: string;
  status: string = '';
  itemList = [];

  // controls
  isCancelDisplay: boolean = false;
  isEditDisplay: boolean = false;
  isEndorseDisplay: boolean = false;

  //modal
  open: boolean = false;
  openEndorsed: boolean = false;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.name = initialData.Fullname;
        let orderNo = this.activatedRoute.snapshot.paramMap.get('formNo');

        this.getRestServiceAPI(initialData.Company, orderNo);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  private getRestServiceAPI(company, orderNo: string) {
    let params = { customer: company };

    let getParams = { requestNo: orderNo };
    restServices.pbksb_CommonWarehouseCommonYardService
      .getStorageRequestByRequestNo(this.appService.myApp)(getParams)
      .then((result) => {
        let arr: any = result;
        let request = this.appService.jsonToArray(arr);
        this.formData = request;
        this.populateData(this.formData);
        console.log('formData ==');
        console.log(this.formData);
      });
  }

  populateData(value) {
    this.companyName = value.customer ? value.customer.name : '-';
    this.requestNo = value.requestNo ? value.requestNo : '-';
    this.agent = value.agent ? value.agent.name : '-';
    this.reqName = value.requesterName ? value.requesterName : '-';
    this.reqIC = value.requesterIc ? value.requesterIc : '-';
    this.reqTel = value.requesterPhoneNo ? value.requesterPhoneNo : '-';
    this.dateTime = value.arrivalDate ? value.arrivalDate : '-';
    this.location = value.location ? value.location : '-';
    this.poNumber = value?.poNumber ?? '-';
    this.requestType = value.requestType
      ? value.requestType[0].toUpperCase() + value.requestType.substr(1)
      : '-';
    this.status = value.status ? value.status.replaceAll('_', ' ') : '-';
    this.status = this.titlecasePipe.transform(this.status);
    this.lbl_weight =
      this.location === 'Common Warehouse'
        ? 'KG Per Line'
        : this.location === 'Common Yard'
        ? 'm² Per Line'
        : 'KG Per Line';
    this.lbl_actual_weight =
      this.location === 'Common Warehouse'
        ? 'Actual Weight (KG)'
        : this.location === 'Common Yard'
        ? 'Actual Area (m²)'
        : 'Actual Weight (KG)';

    if (value.cwcyGoodsStorageRequestLine.length > 0) {
      value.cwcyGoodsStorageRequestLine.forEach((item) => {
        this.itemList.push({
          description: item.description,
          quantity: item.quantity,
          UOM: item.unitOfMeasurement ? item.unitOfMeasurement.name : '-',
          remarks: item.remarks ? item.remarks : '-',
          weight: item.weight ? item.weight : item.area ? item.area : '-',
          actualWeight: item.actualWeight
            ? item.actualWeight
            : item.actualArea
            ? item.actualArea
            : '-',
          lineAllotmentNo: item.lineAllotmentNo,
        });
      });
    }

    this.checkButtonDisplay();
  }

  checkButtonDisplay() {
    if (this.status === 'Submitted') {
      this.isCancelDisplay = true;
      this.isEditDisplay = true;
      this.isEndorseDisplay = false;
    } else if (this.status === 'Cancelled') {
      this.isCancelDisplay = false;
      this.isEditDisplay = false;
      this.isEndorseDisplay = false;
    } else if (this.status === 'Pending Endorsement') {
      this.isCancelDisplay = false;
      this.isEditDisplay = false;
      this.isEndorseDisplay = true;
    } else {
      this.isCancelDisplay = false;
      this.isEditDisplay = false;
    }
  }

  redirectToPrevious() {
    history.back();
    // if (this.status === 'ENDORSED') {
    //   this.router.navigate([
    //     '/operation-system/cwcy-endorsed-goods-receiving-request-list',
    //   ]);
    // } else {
    //   this.router.navigate([
    //     '/operation-system/cwcy-goods-receiving-request-list',
    //   ]);
    // }
  }

  onPrint() {
    window.print();
  }

  onCancel() {
    this.open = false;
    let params = {
      form: {
        requestNo: this.requestNo,
        cancelledBy: this.name,
      },
    };

    restServices.pbksb_CommonWarehouseCommonYardService
      .cancelGoodsStorageRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        if (returnObj.success) {
          let dateNow = new Date();
          this.router
            .navigate(['/operation-system/cwcy-goods-receiving-request-list'])
            .then(() => {
              this.appService.showToaster({
                type: 'error',
                title: 'Cancelled',
                subtitle: this.requestNo + ' is Cancelled.',
                time: formatDate(dateNow, 'HH:mm', 'en-US'),
              });
            });
        }
      });
  }

  onEndorse() {
    this.openEndorsed = false;
    let params = {
      form: {
        requestNo: this.requestNo,
        endorsedBy: this.name,
      },
    };
    restServices.pbksb_CommonWarehouseCommonYardService
      .endorseGoodsStorageRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        let currDate = new Date();
        if (returnObj.success) {
          this.router
            .navigate([
              '/operation-system/cwcy-endorsed-goods-receiving-request-list',
            ])
            .then(() => {
              this.appService.showToaster({
                type: 'success',
                title: 'Form Endorsed',
                subtitle:
                  'Form No. ' +
                  returnObj.requestNo +
                  ' is successfully endorsed.',
                time: formatDate(currDate, 'HH:mm', 'en-US'),
              });
            });
        } else {
          this.appService.showToaster({
            type: 'error',
            title: 'Cannot Endorsed',
            subtitle: returnObj.errorMessage,
            // 'The request has failed to be submitted. Please try again',
            time: formatDate(currDate, 'HH:mm', 'en-US'),
          });
        }
      });
  }
}
