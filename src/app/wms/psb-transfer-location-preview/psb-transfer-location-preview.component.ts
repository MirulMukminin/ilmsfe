import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableHeaderItem, TableModel } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-psb-transfer-location-preview',
  templateUrl: './psb-transfer-location-preview.component.html',
  styleUrls: ['./psb-transfer-location-preview.component.scss'],
})
export class PsbTransferLocationPreviewComponent implements OnInit {
  @Input() fromLocationModal = new TableModel();
  @Input() toLocationModal = new TableModel();
  open = false;
  requestBy: string;
  companyName: string;
  category: string;
  transferDate: string;
  submitData: any;
  remarks: string;

  fromLocation = [];
  toLocation = [];
  submitted = false;
  isLoading = false;
  overlay = false;

  constructor(
    private appService: AppService,
    private router: Router,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userInfo();
    this.checkOrigin();
    this.createTableHeader();
    this.getFormData();
  }

  // ngAfterViewInit(){

  // console.log(this.submitData);

  // }

  checkOrigin() {
    const urlParam = this._Activatedroute.snapshot.paramMap.get('requestNo');

    if (urlParam) {
      this.getFormDetails(urlParam);
      this.getOldLocation(urlParam);
      this.getNewLocation(urlParam);
      this.submitted = true;
    }
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.requestBy = initialData.Fullname;
        this.companyName = initialData.Company;
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

  getFormDetails(reqNo) {
    let param = { request_no: reqNo };

    restServices.pbksb_PSBService
      .GetTransferLocationFormDetails(this.appService.myApp)(param)
      .then((result) => {
        let resArr = this.appService.jsonToArray(result);

        // console.log(resArr);
        this.companyName = resArr.customer.name;
        this.requestBy = resArr.request_by;
        this.transferDate = formatDate(
          resArr.transfer_date,
          'dd/MM/yyyy',
          'en_us'
        );
        this.category = resArr.category;
        this.remarks = resArr.remarks;
      });
  }

  getOldLocation(reqNo) {
    let param = { request_no: reqNo };
    restServices.pbksb_PSBService
      .GetListPreviousLocation(this.appService.myApp)(param)
      .then((result) => {
        let resArr = this.appService.jsonToArray(result);
        // console.log(resArr);

        resArr.forEach((element) => {
          this.fromLocation.push({
            item: element.good.description,
            formtype: element.good.good_in.form_type,
            regNo: element.good.good_in.registration_no,
            // qty: element.good.quantity,
            qty: element.previous_quantity ? element.previous_quantity : '',
            location: element.previous_location
              ? element.previous_location.description
              : 'N/A',
          });
        });
      });
  }

  getNewLocation(reqNo) {
    let param = { request_no: reqNo };
    restServices.pbksb_PSBService
      .GetListNewLocation(this.appService.myApp)(param)
      .then((result) => {
        let resArr = this.appService.jsonToArray(result);
        // console.log(resArr);

        resArr.forEach((element) => {
          this.toLocation.push({
            item: element.good.description,
            formtype: element.good.good_in.form_type,
            regNo: element.good.good_in.registration_no,
            qty: element.quantity,
            // location: element.good.location.description,
            location: element.location.description,
          });
        });

        // console.log(this.toLocation);
      });
  }

  createTableHeader() {
    this.fromLocationModal.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Goods Description' }),
      new TableHeaderItem({ data: 'Form Type' }),
      new TableHeaderItem({ data: 'Registration No.' }),
      new TableHeaderItem({ data: 'Quantity' }),
      new TableHeaderItem({ data: 'Location' }),
    ];

    this.toLocationModal.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Goods Description' }),
      new TableHeaderItem({ data: 'Form Type' }),
      new TableHeaderItem({ data: 'Registration No.' }),
      new TableHeaderItem({ data: 'Quantity' }),
      new TableHeaderItem({ data: 'Location' }),
    ];
  }

  getFormData() {
    this.submitData = this.appService.passObj;

    if (this.submitData) {
      this.category = this.submitData.form.category;
      this.transferDate = this.submitData.form.transfer_date;
      this.remarks = this.submitData.form.remarks;
      let newRows = this.submitData.form.psbNewLocationForm;
      let oldRows = this.submitData.form.psbOldLocationForm;
      this.pushRow(newRows, oldRows);
    }
    // console.log(this.submitData.form.psbNewLocationForm);
  }

  submit() {
    this.isLoading = true;
    this.overlay = true;
    // console.log(this.submitData);
    restServices.pbksb_PSBService
      .PostTransferLocationRequestForm(this.appService.myApp)(this.submitData)
      .then((result) => {
        this.isLoading = false;
        this.overlay = false;
        // console.log(result);
        this.notify();
      });
  }

  notify() {
    const toastObj = {
      type: 'success',
      title: 'Transfer location',
      subtitle: 'Your request has been successfully submitted',
      time: 'OK',
    };

    this.appService.showToaster(toastObj);
    this.router.navigate(['/wms/psb-transfer-location-list']);
    this.appService.passObj = [];
  }

  edit() {
    // console.log(this.submitData);

    this.appService.passObj = this.submitData;
    this.router.navigate(['/wms/psb-transfer-location-form']);
  }

  pushRow(newRowsData: any, oldRowsData: any) {
    // console.log(rowsData);
    newRowsData.forEach((goodsIn) => {
      this.toLocation.push({
        item: goodsIn.items,
        formtype: goodsIn.formType,
        regNo: goodsIn.regNo,
        qty: goodsIn.quantity,
        location: goodsIn.location,
      });
    });

    oldRowsData.forEach((goodsIn) => {
      this.fromLocation.push({
        item: goodsIn.items,
        formtype: goodsIn.formType,
        regNo: goodsIn.regNo,
        qty: goodsIn.quantity,
        location: goodsIn.location,
      });
    });
  }

  onPrint() {
    window.print();
  }
}
