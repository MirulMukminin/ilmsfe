import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-heavy-package-list',
  templateUrl: './heavy-package-list.component.html',
  styleUrls: ['./heavy-package-list.component.scss']
})
export class HeavyPackageListComponent implements OnInit {
  @Output() stepChanged: EventEmitter<number> = new EventEmitter();


heavyPackageList=[];
heavyPackageItemList=[];
tempItemList=[];
heavyPackageSelect=[
  {code:"_15_25_TONNES",content:'>15 - 25 tonnes'},
  {code:"_25_50_TONNES",content:'>25 - 50 tonnes'},
  {code:"_50_75_TONNES",content:'>50 - 75 tonnes'},
  {code:"MORE_75_TONNES",content:'>75 tonnes'},
  
];
// {content:'>15 - 25 tonnes'},
//   {content:'>25 - 50 tonnes'},
//   {content:'>50 - 75 tonnes'},
//   {content:'>75 tonnes'},

// _15_25_TONNES: '>15 - 25 tonnes',
//   _25_50_TONNES: '>25 - 50 tonnes',
//   _50_75_TONNES: '>50 - 75 tonnes',
//   MORE_75_TONNES: '>75 tonnes',

itemList = [
  {
    id: null,
    heavyPackage:'',
    weightIn:0,
    weightOut:0,
    totalWeight:0,
    invalidheavyPackage: false,    
    selected: false,
  }
]
  RequestNo: string;
  itemChecked = [];
  currentStep= 1;
  updateStatus= false;
  heavyPackageInvalid= false;
  date = new Date();
  onSubmit=false;
  validateHeavypackage=true;
  constructor(private berthRequestFormService: BerthRequestFormService,
    protected appService: AppService,
    private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userInfo();
    this.heavyPackageSelect=this.heavyPackageSelect;
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
          this.updateStatus = true;    
          this.heavyPackageSelect.forEach(item => {      
          request['berthHeavyPackages'].forEach((value, index) => {                      
           if(item.code===value.heavy_packages){
            value.heavy_packages=item.content;
            this.validateData(value);
           }
            
          });    
        });
          this.itemList=this.tempItemList;   
        }
        this.onSubmit = request['berthHeavyPackages'].some(
          (data) => data.indicator == true
        );
      }).then(() => {        
        this.heavyPackageList = this.heavyPackageList
      });
     
  }

  validateData(value: any) {
    
      this.tempItemList.push({
        id:value.id,
        heavyPackage: value.heavy_packages,
        weightIn: value.quantity_in ? value.quantity_in : '',
        weightOut: value.quantity_out ? value.quantity_out : '',
        totalWeight: value.total? value.total:'',
        invalidheavyPackage: false,    
        selected: false,
      });
    
  }
  changeStep(step: any) {
    this.currentStep = step;
    this.stepChanged.emit(this.currentStep);
  }

  checkSelected() {
    return this.itemChecked.length > 0 ? true : false;
  }
  heavyPackageSelected(event, itemIndex: number) {
    console.log('heavyPackageSelected event == ');
    console.log(event.item);
    console.log(event.item.content);
    console.log(event.item.code);
    console.log(this.itemList[itemIndex].heavyPackage)
    // this.itemList[itemIndex].heavyPackage=event.item.code;
  }

  inputValueChange(event,itemIndex: number) {
    console.log('inputValueChange event == ');
    console.log(this.itemList[itemIndex].weightIn);
    console.log(this.itemList[itemIndex].weightOut);
    let number1:number = this.itemList[itemIndex].weightIn;
    let number2:number = this.itemList[itemIndex].weightOut;
    let sum:number= +number1 + +number2;
    this.itemList[itemIndex].totalWeight= sum;

    // if (!this.itemList[itemIndex].invalidType) {
    
    
  }

  onSelected(event, itemIndex: number) {
    if (event.checked) {
      console.log('itemIndex');
      console.log(itemIndex);
      this.itemChecked.push(itemIndex);
      this.itemList[itemIndex].selected = true;
    } else {
      this.itemChecked = this.itemChecked.filter((item) => {
        return item !== itemIndex;
      });
      this.itemList[itemIndex].selected = false;
    }
  }

  onClearItem() {
    this.itemList.forEach((item) => {
      if (item.selected) {
        item.heavyPackage = '';
        item.weightIn = 0;
        item.weightOut = 0;
        item.totalWeight = 0;       
        item.selected = false;
      }
    });
    this.itemChecked = [];
  }

  onDeleteItem() {
    this.itemList = this.itemList.filter((item) => item.selected !== true);
    this.itemChecked = [];
  }

  onCancel() {
    this.itemList.forEach((item) => {
      item.selected = false;
    });
    this.itemChecked = [];
  }

  addItem() {
    let isValid=true;
    
    this.itemList.forEach((item) => {
      console.log(item.heavyPackage)      
      if(!item.heavyPackage){
        isValid=false;
        item.invalidheavyPackage=true;
      }
       
    });
    console.log(this.itemList.length)
    console.log('first: ', this.itemList);
   if(this.itemList.length<4){
      let newItem = {
        id: null,
      heavyPackage:'',
      weightIn:0,
      weightOut:0,
      totalWeight:0,
      invalidheavyPackage: false,    
      selected: false,
      };
      this.itemList.push(newItem);
  }
    console.log('second: ', this.itemList);
    
  }

  onSave() {
    this.validateItem();

    if(this.validateHeavypackage){
    if (!this.updateStatus) {
      let param = {
        form: {
          berthForm: this.berthRequestFormService.getFormID(),
          berthFormRequestNumber: this.RequestNo,
          heavyPackages: this.itemList
        },
      };
      console.log(param);

      if (!this.heavyPackageInvalid) {
        restServices.pbksb_MarineService
          .UpdateBerthHeavyPackagesForm(this.appService.myApp)(param)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);
              

              // console.log('work with permit save success');
              this.createNotification('success', 'submitted');
              this.updateStatus = true;
              this.onSubmit=true;
            } else {
              // console.log(request.status, 'work with permit save failed');
              this.createNotification('error', 'submit');
            }
          })
          .catch((err) => {
            // console.log('work with permit save failed', err);
            this.createNotification('error', 'submit');
          });
      }
    } else {
      let param2 = {
        form: {
          berthForm: this.berthRequestFormService.getFormID(),
          berthFormRequestNumber: this.RequestNo,
          heavyPackages: this.itemList
        },
      };

      // console.log(param2);
      if (!this.heavyPackageInvalid) {
        restServices.pbksb_MarineService
          .UpdateBerthHeavyPackagesForm(this.appService.myApp)(param2)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              // console.log(request);

              // console.log('work with permit update success');
              this.createNotification('success', 'update');
              this.updateStatus = true;
              this.onSubmit=true;
            } else {
              // console.log(request.status, 'work with permit update failed');
              this.createNotification('error', 'update');
            }

            
          })
          .catch((err) => {
            // console.log('work with permit update failed', err);
            this.createNotification('error', 'submit');
          });
      }
    }
    
    this.itemList.forEach(item=> {
      this.heavyPackageSelect.forEach(hvpackage=> {
        if(hvpackage.code===item.heavyPackage){
          item.heavyPackage=hvpackage.content;
        }
      })
    });
  }
  }
  validateItem() {
    console.log("validateItem==")
    this.validateHeavypackage=true;
    
    this.itemList.forEach(item=> 
      {
        if(!item.heavyPackage){
          item.invalidheavyPackage=true;
          this.validateHeavypackage=false;
        }
      }
    );
console.log(this.validateHeavypackage);
    if(this.validateHeavypackage){
      this.heavyPackageItemList =this.itemList;
      this.heavyPackageItemList.forEach(item=> 
        {
          this.heavyPackageSelect.forEach(heavypackage=> {      
          if(heavypackage.content===item.heavyPackage){
            item.heavyPackage=heavypackage.code;
          }
          })
        });
    }
    
  }

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `Heavy package is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `Heavy package failed to ${keywords}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
  }
  

}
