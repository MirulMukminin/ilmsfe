import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-underdeck-preview',
  templateUrl: './underdeck-preview.component.html',
  styleUrls: ['./underdeck-preview.component.scss'],
})
export class UnderdeckPreviewComponent implements OnInit {
  RequestNo: string;
  underdeckList = [];
  underdeckitems = [
    'Oil Field Equipment',
    'Container',
    'Casing Tubing',
    'B Cement',
    'G Cement',
    'Bentonite',
    'Barite',
    'OBM',
    'SBM',
    'Brine',
    'Base Oil',
    'Ship To Ship Water',
    'Ship To Ship Fuel',
    'Others Bulk',
  ];

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
        let errorObject = {
          type: 'error',
          title: 'Server Error',
          subtitle: 'Server Error. Please try again',
        };
        this.appService.showToaster(errorObject);
        this.appService.terminateSession();
      });
  }

  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'BRF8F021F7A' };
    var getCodeView: any = { requestNo: requestNo };
    //fire api and get response data

    restServices.pbksb_MarineService
      .GetUnderdeckFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        this.underdeckitems.forEach((val) => {
          request['underDecks'].forEach((value, index) => {
            if (
              val.toLowerCase() ===
              this.formatItemValue(value.item).toLowerCase()
            ) {
              this.validateData(value);
            }
          });
        });
      })
      .then(() => {
        // this.underdeckList = this.underdeckList.sort(
        //   (a, b) => a.sort_ind - b.sort_ind
        this.underdeckList = this.underdeckList;
      })
      .catch((err) => {
        // console.log(err)
      });
  }

  validateData(value: any) {
    // check if indicator property exist
    if ('indicator' in value) {
      if (value.indicator === true) {
        this.underdeckList.push({
          item: value.item ? this.formatItemValue(value.item) : 'N/A',
          date: value.date_time
            ? formatDate(value.date_time, 'dd/MM/yyyy', 'en_US')
            : 'N/A',
          time: value.date_time
            ? formatDate(value.date_time, 'HH:mm', 'en_US')
            : 'N/A',
          requestQuantityIn: value.requestedQuantityIn
            ? this.numberWithCommas(value.requestedQuantityIn)
            : '',
          requestQuantityOut: value.requestedQuantityOut
            ? this.numberWithCommas(value.requestedQuantityOut)
            : '',
          barrel: value.barrel ? value.barrel : '',
          sort_ind: value.sort_ind ? value.sort_ind : '',
        });
      }
    }
  }

  formatItemValue(value: any) {
    if (value == 'OBM' || value == 'SBM') {
      return value;
    } else if (value == 'SHIP_WATER') {
      return 'Ship To Ship Water';
    } else if (value == 'SHIP_FUEL') {
      return 'Ship To Ship Fuel';
    } else {
      return value
        .replace(/_/g, ' ')
        .replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
}
