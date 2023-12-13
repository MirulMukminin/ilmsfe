import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-fuel-water-preview',
  templateUrl: './fuel-water-preview.component.html',
  styleUrls: ['./fuel-water-preview.component.scss'],
})
export class FuelWaterPreviewComponent implements OnInit {
  fuelWaterList = [];
  request_number: any;
  supply: any;
  location: any;
  po_number: any;
  booking_date: any;
  remarks: string;
  status: any;
  RequestNo: any;
  fwRequestNumber = '';

  constructor(
    private berthRequestFormService: BerthRequestFormService,
    protected appService: AppService,
    private _Activatedroute: ActivatedRoute
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
        if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
          this.RequestNo =
            this._Activatedroute.snapshot.paramMap.get('requestNum');
          this.getRestQueryAPI(this.RequestNo);
        } else if (this.berthRequestFormService.getrequestNo()) {
          this.RequestNo = this.berthRequestFormService.getrequestNo();
          this.getRestQueryAPI(this.RequestNo);
        }
        // console.log(initialData);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'BRF34883583' };
    var getCodeView: any = { requestNo: requestNo };

    //fire api and get response data

    restServices.pbksb_MarineService
      .GetFuelWaterRequestFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        // if not have error
        if (!request.status) {
          this.fuelWaterValidate(request['fuelWater']);
          request['tank'].forEach((value, index) => {
            this.tankValidate(value);
          });
        }
      })
      .catch((err) => {
        // console.log(err);
      });

    // console.log('fuelWaterList', this.fuelWaterList);
  }

  fuelWaterValidate(value: any) {
    this.request_number = value.berth_form.request_number
      ? value.berth_form.request_number
      : 'N/A';
    this.supply = value.supply ? value.supply : 'N/A';
    this.location = value.location ? value.location.description : '';
    this.po_number = value.po_number ? value.po_number : 'N/A';
    this.booking_date = value.booking_date
      ? formatDate(value.booking_date, 'dd/MM/yyyy', 'en_US')
      : 'N/A';
    this.remarks = value.remarks ? value.remarks : '';
    this.status = value.status ? value.status : 'Initiated';
    this.fwRequestNumber = value?.request_number ?? 'N/A';
  }

  tankValidate(value: any) {
    if (value.indicator === true) {
      this.fuelWaterList.push({
        item: value.item ? value.item : 'N/A',
        full_tank: value.full_tank ? 'Yes' : 'No' ?? 'N/A',
        weight: value.requested_quantity
          ? this.numberWithCommas(value.requested_quantity)
          : '',
        start_time: value.booking_time ? value.booking_time : '',
      });
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
}
