import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-cwcy-goods-release-view',
  templateUrl: './cwcy-goods-release-view.component.html',
  styleUrls: ['./cwcy-goods-release-view.component.scss'],
  providers: [TitleCasePipe],
})
export class CwcyGoodsReleaseViewComponent implements OnInit {
  // label
  lbl_weight: 'Weight (KG)' | 'Area (m²)' = 'Weight (KG)';
  lbl_actual_weight: 'Weight Remained (KG)' | 'Area Remained (m²)' =
    'Weight Remained (KG)';

  name = '';
  formData = [];

  companyName: string = '';
  requestBy: string = '';
  requestNo: string = '';
  agent: string = '';
  reqName: string = '';
  reqIC: string = '';
  reqTel: string = '';
  dateTime: Date;
  location: string = '';
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
      .getReleaseRequestByRequestNo(this.appService.myApp)(getParams)
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
    this.dateTime = value.releaseDate ? value.releaseDate : '-';
    this.location = value.location ? value.location : '-';
    this.poNumber = value?.poNumber ?? '-';
    this.status = value.status ? value.status.replaceAll('_', ' ') : '-';
    this.status = this.titlecasePipe.transform(this.status);
    this.lbl_weight =
      this.location === 'Common Warehouse'
        ? 'Weight (KG)'
        : this.location === 'Common Yard'
        ? 'Area (m²)'
        : 'Weight (KG)';
    this.lbl_actual_weight =
      this.location === 'Common Warehouse'
        ? 'Weight Remained (KG)'
        : this.location === 'Common Yard'
        ? 'Area Remained (m²)'
        : 'Weight Remained (KG)';

    if (value.cwcyGoodsReleaseRequestLine.length > 0) {
      value.cwcyGoodsReleaseRequestLine.forEach((item) => {
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
    //     '/operation-system/cwcy-endorsed-goods-release-request-list',
    //   ]);
    // } else {
    //   this.router.navigate([
    //     '/operation-system/cwcy-goods-releasing-request-list',
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
      .cancelGoodsReleaseRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        if (returnObj.success) {
          let dateNow = new Date();
          this.router
            .navigate(['/operation-system/cwcy-goods-releasing-request-list'])
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
      .endorseGoodsReleaseRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        let currDate = new Date();
        if (returnObj.success) {
          this.router
            .navigate([
              '/operation-system/cwcy-endorsed-goods-release-request-list',
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
