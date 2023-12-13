import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-general-works-preview',
  templateUrl: './general-works-preview.component.html',
  styleUrls: ['./general-works-preview.component.scss'],
})
export class GeneralWorksPreviewComponent implements OnInit {
  generalWorksList = [];
  RequestNo: string;

  generalWorkitems = [
    'DISCHARGE',
'LOADING',
'INSPECTION',
'MAINTENANCE',
'STANDBY',
'TOUCH AND GO',
'MOORING',
'UNMOORING',
'Fire Fighter',
'Pneumatic Rubber Fender',
'GANGWAY 6M',
'GANGWAY 10M',
'GANGWAY 15M',
'CREW CHANGE',

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
        this.appService.terminateSession();
      });
  }

  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'BRF34883583' };
    var getCodeView: any = { requestNo: requestNo };
    //fire api and get response data

    restServices.pbksb_MarineService
      .GetGeneralWorksFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);
        this.generalWorkitems.forEach(val=>{

          request['generalWorks'].forEach((value, index) => {
            if(val.toLowerCase() === this.formatItemValue(value.item).toLowerCase()){
            this.validateData(value);
            }
          });
        })
        // request['generalWorks'].forEach((value, index) => {
        //   this.validateData(value);
        // });
      }).then(() => {
        // this.generalWorksList = this.generalWorksList.sort((a, b) => a.sort_ind - b.sort_ind)
        this.generalWorksList = this.generalWorksList
      });


  }

  validateData(value: any) {
    if (value.indicator === true) {
      this.generalWorksList.push({
        item: value.item ? this.formatItemValue(value.item) : 'N/A',
        remarks: value.remarks ? value.remarks : '',
        sort_ind: value.sort_ind ? value.sort_ind : '',
      });
    }
  }

  formatItemValue(value: any) {
    if (value == 'FIREFIGHTER') {
      return 'Fire Fighter';
    } else {
      return value.replace(/_/g, ' ');
    }
  }
}
