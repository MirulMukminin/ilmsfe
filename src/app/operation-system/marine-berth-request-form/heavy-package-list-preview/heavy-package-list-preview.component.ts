import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-heavy-package-list-preview',
  templateUrl: './heavy-package-list-preview.component.html',
  styleUrls: ['./heavy-package-list-preview.component.scss']
})
export class HeavyPackageListPreviewComponent implements OnInit {
  RequestNo: string;
  heavyPackageList=[];
  heavyPackageSelect=[
    {code:"_15_25_TONNES",content:'>15 - 25 tonnes'},
    {code:"_25_50_TONNES",content:'>25 - 50 tonnes'},
    {code:"_50_75_TONNES",content:'>50 - 75 tonnes'},
    {code:"MORE_75_TONNES",content:'>75 tonnes'},
    
  ];

  constructor(
    private berthRequestFormService: BerthRequestFormService,
    protected appService: AppService,
    private _Activatedroute: ActivatedRoute
    ){
  }

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
      .GetBerthHeavyPackages(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);
        if (request['berthHeavyPackages'].length > 0) {
          this.heavyPackageSelect.forEach(item => {
           
          request['berthHeavyPackages'].forEach((value, index) => {                      
            if(item.code=== value.heavy_packages){
              value.heavy_packages=item.content;
              this.validateData(value);
            }
            
          });       

        });

        }
      }).then(() => {        
        this.heavyPackageList = this.heavyPackageList
      });
     
  }

  validateData(value: any) {
      this.heavyPackageList.push({
        heavy_package: value.heavy_packages,
        quantity_in: value.quantity_in ? value.quantity_in : '',
        quantity_out: value.quantity_out ? value.quantity_out : '',
        total: value.total? value.total:'',
      });
   
  }
}
