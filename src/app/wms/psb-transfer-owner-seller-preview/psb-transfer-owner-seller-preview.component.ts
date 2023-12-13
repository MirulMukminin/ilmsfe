import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { TransferOwnerService } from 'src/app/wms/services/transfer-owner/transfer-owner.service';

@Component({
  selector: 'app-psb-transfer-owner-seller-preview',
  templateUrl: './psb-transfer-owner-seller-preview.component.html',
  styleUrls: ['./psb-transfer-owner-seller-preview.component.scss'],
})
export class PsbTransferOwnerSellerPreviewComponent implements OnInit {
  statusAPI = 'Pending Confirmation';

  requestNo: string = '';
  data: any;

  goodsArr = [];
  Goods = [];

  uploadDoc = [];
  dataForm = [];
  dataFormList = [];
  status = '';
  companyName = '';
  request_by = '';
  buyer = [];
  po_no = '';
  invoice_no = '';
  selling_date = '';
  category = '';
  remarks = '';

  constructor(
    private transferOwnerService: TransferOwnerService,
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    protected notificationService: NotificationService
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

        this.companyName = initialData.Company;
        this.request_by = initialData.Fullname;
        this.token = initialData.Token.access_token;

        this.getRestServiceAPI();
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

  getRestServiceAPI() {
    this.requestNo = this._Activatedroute.snapshot.paramMap.get('requestNo');
    const getCode = { request_no: this.requestNo };
    // const getCode = {request_no: 'Req-091'}

    restServices.pbksb_PSBService
      .GetGoodsDetailsByRequestNo(this.appService.myApp)(getCode)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        this.dataForm = request;
      });

    restServices.pbksb_PSBService
      .ListGoodTransferOwnerShip(this.appService.myApp)(getCode)
      .then((result) => {
        let resArr: any = result;
        let request = JSON.parse(resArr);

        this.goodsArr = request;

        this.goodsArr.forEach((value, index) => {
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
          } else if (!value.location) {
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
        });
      });

    restServices.pbksb_PSBService
      .GetListTransferOwnershipDocument(this.appService.myApp)(getCode)
      .then((result) => {
        let resArr: any = result;
        let request = JSON.parse(resArr);
        this.uploadDoc = request;
      });
  }

  onPrint() {
    window.print();
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
}
