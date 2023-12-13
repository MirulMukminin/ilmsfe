import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';
import { listOfGoodsIn } from '../interfaces/goods_interface';

@Component({
  selector: 'app-psb-goods-in-preview',
  templateUrl: './psb-goods-in-preview.component.html',
  styleUrls: ['./psb-goods-in-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class PsbGoodsInPreviewComponent implements OnInit {
  previousURL = '';
  RegistrationNo = '';
  detailsCompanyName: string = '';
  detailsRequestBy: string = '';
  detailsformType: string = '';
  detailsRegistrationNo: string = '';
  detailsMoveDate: string = '';
  detailsLocation: string = '';
  detailsInvoiceNo: string = '';
  detailsCategory: string = '';
  detailsRequestNo: string = '';
  detailsStatus: string = '';
  detailsRemark: string = '';
  listOfGoodsIn = [] as listOfGoodsIn[];

  constructor(
    private router: Router,
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private requestFormService: RequestFormService,
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

        this.getRestServiceAPI(initialData);
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

  getRestServiceAPI(initData: any) {
    this.RegistrationNo =
      this._Activatedroute.snapshot.paramMap.get('RegistrationNo');
    var apiParam: any = { reference_no: this.RegistrationNo };
    restServices.pbksb_PSBService
      .GetGoodsInFormDetails(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const formDetailsAPI = JSON.parse(resArr);

        this.detailsformType = formDetailsAPI.form_type;
        this.detailsRegistrationNo = formDetailsAPI.registration_no;
        this.detailsMoveDate = formatDate(
          formDetailsAPI.move_date,
          'dd/MM/yyyy',
          'en_US'
        );
        this.detailsCompanyName = formDetailsAPI.customer.name;
        this.detailsRequestBy = formDetailsAPI.request_by;
        this.detailsLocation = formDetailsAPI.location.description;
        // this.detailsInvoiceNo = formDetailsAPI.test2;
        if (formDetailsAPI.invoice_no) {
          this.detailsInvoiceNo = formDetailsAPI.invoice_no;
        } else {
          this.detailsInvoiceNo = '-';
        }
        this.detailsCategory = formDetailsAPI.category;
        this.detailsRequestNo = formDetailsAPI.reference_no;
        this.detailsStatus = formDetailsAPI.status.replace(/_/g, ' ');
        this.detailsStatus = this.titlecasePipe.transform(this.detailsStatus);
        if (formDetailsAPI.remarks) {
          this.detailsRemark = formDetailsAPI.remarks;
        } else {
          this.detailsRemark = '-';
        }
      });
    restServices.pbksb_PSBService
      .GetListGoods(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const tableDetailsAPI = JSON.parse(resArr);
        //console.log(tableDetailsAPI);
        tableDetailsAPI.forEach((value, index) => {
          this.listOfGoodsIn.push({
            id: value.id,
            customs_code: value.customs_code,
            description: value.description,
            quantity: value.quantity,
            value: value.value,
            uom: value.uom,
            totalValue: value.totalValueGoodIn,
            Selected: false,
          });
        });
      });
  }

  onPrint() {
    window.print();
  }

  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();
    this.router.navigate([this.previousURL]);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  addZeroes(num) {
    const dec = num.toString().split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return this.numberWithCommas(Number(num).toFixed(len));
  }
}
