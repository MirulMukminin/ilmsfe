import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WasteDisposal } from 'entities/pbksb_WasteDisposal';
import { GoodsRelease } from 'entities/pbksb_GoodsRelease';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { StatusGRNEnum } from 'enums/enums'

@Component({
  selector: 'app-goods-release-view',
  templateUrl: './goods-release-view.component.html',
  styleUrls: ['./goods-release-view.component.scss']
})
export class GoodsReleaseViewComponent implements OnInit {
  open = false;
  openEndorsed = false;

  itemList = [];
  date = new Date();

  requestNo: any;
  name: string;
  userName: string;
  detailGoodsRecieving: GoodsRelease;
  status: string;
  type: string;
  storageStart;
  storageEnd;

  isOptional = false;
  isCancelled = false;
  isEndorsed = false;
  isCancelDisabled = true;
  isEndorsedDisabled = true;
  isEditDisabled = true;
  isPrintDisabled = true;
  isCancelDisplay = false;
  isEndorsedDisplay = false;
  isEditDisplay = false;

  dictionaryStatus = {
    SUBMITTED: 'Submitted',
    CANCELLED: 'Cancelled',
    IN_PROGRESS: 'In Progress',
    PENDING_ENDORSEMENT: 'Pending Endorsement',
    ENDORSED: 'Endorsed',
    CHECKED: 'Checked',
  };

  dictionaryType = {
    NORMAL: 'Normal',
    STORAGE: 'Optional Storage',
  };

  returnTo: string = '';
  location: string = '';

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private appService: AppService
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
        this.userName = initialData.Username;
        this.requestNo = this.activatedroute.snapshot.paramMap.get('requestNo');
        console.log("this.activatedroute.snapshot.paramMap.get('requestNo') =");
        console.log(this.activatedroute.snapshot.paramMap.get('requestNo'));


        //this.getRestServiceAPI(initialData.CustomerCode);
        this.getRestServiceAPI(initialData.Company);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }
/*
  private getRestServiceAPI(customer: string) {
    const param = { requestNo: this.requestNo  };

    restServices.pbksb_GoodsRecievingService
      .getGRARequestByRequestNumber(this.appService.myApp)(param)
      .then((result) => {
        this.detailGoodsRecieving = this.appService.jsonToArray(result);
        this.itemList = this.detailGoodsRecieving.lineItem;
        this.status = this.dictionaryStatus[this.detailGoodsRecieving.status];
        // console.log(this.detailWasteDisposal);
        //this.checkOptional();
        this.populateData();
      });
  }

  
  private getRestServiceAPI(customer: string) {
    const param = { requestNo: this.requestNo  };

    restServices.pbksb_GoodsRecievingService
      .getGRARequestByRequestNumber(this.appService.myApp)(param)
      .then((result) => {
        this.detailGoodsRecieving = this.appService.jsonToArray(result);
        this.itemList = this.detailGoodsRecieving.lineItem;
        this.status = this.dictionaryStatus[this.detailGoodsRecieving.status];
        // console.log(this.detailWasteDisposal);
        //this.checkOptional();
        this.populateData();
      });
  }
  */
  private getRestServiceAPI(customer: string) {
    const param = { customer };

    restServices.pbksb_GRNRestService
      .getGRNRequestsByCustomer(this.appService.myApp)(param)
      .then((result) => {
        const goodsRecievingRequestList = this.appService.jsonToArray(result);
        // default sorting on JobNo from latest
        /*
        this.goodsRecievingRequestList.sort((a, b) => {
          return b.requestNo  == a.requestNo;
        });
        */
       console.log("goodsRecievingRequestList == ")
       console.log(goodsRecievingRequestList);
       const index = goodsRecievingRequestList.findIndex(obj => obj.releaseNo == this.requestNo);
      /*
       let index;
       for(let i = 0; i < goodsRecievingRequestList.length; i++){
         if(goodsRecievingRequestList[i].requestNo == this.requestNo){
           index = i;
           break;
         }
       }
       */
       console.log("index ==");
       console.log(index);
       console.log(this.requestNo)
       console.log(goodsRecievingRequestList[index])
       this.detailGoodsRecieving = goodsRecievingRequestList[index];
       
        this.itemList = this.detailGoodsRecieving.lineItem;
        this.status = this.dictionaryStatus[this.detailGoodsRecieving.status];
        console.log("this.detailGoodsRecieving == ");
        console.log(this.detailGoodsRecieving);
        //this.checkOptional();
        this.populateData();  
      });
  }



/*
  checkOptional() {
    if (this.detailGoodsRecieving.type === 'NORMAL') {
      this.isOptional = false;
      this.type = this.dictionaryType[this.detailGoodsRecieving.type];
    } else if (this.detailGoodsRecieving.type === 'STORAGE') {
      this.isOptional = true;
      this.type = this.dictionaryType[this.detailGoodsRecieving.type];
    }

    if (this.detailGoodsRecieving.returnTo) {
      this.returnTo = this.detailGoodsRecieving.returnTo.description;
    }
    if (this.detailGoodsRecieving.location) {
      this.location = this.detailGoodsRecieving.location.description;
    }
  }
  */

  populateData() {
    console.log("this.status == ");
    console.log(this.status);
    if (this.detailGoodsRecieving.status === StatusGRNEnum.INITIATED) {
      this.isCancelDisabled = false;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = false;
      this.isPrintDisabled = false;

      this.isCancelDisplay = true;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (this.detailGoodsRecieving.status === StatusGRNEnum.PENDING_ENDORSEMENT) {
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = false;
      this.isEditDisabled = true;
      this.isPrintDisabled = true;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = false;
    }; if (this.detailGoodsRecieving.status === StatusGRNEnum.CANCELLED) {
      this.isCancelled = true;
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = true;
      this.isPrintDisabled = false;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (this.detailGoodsRecieving.status === StatusGRNEnum.ENDORSED) {
      this.isEndorsed = true;
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = true;
      this.isPrintDisabled = false;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = false;
    }
  }

  onCancel() {
    this.open = false;

    const params = {
      form: {
        releaseNo: this.requestNo,
        canceledByUserName: this.userName,
      },
    };
    // To Insert Cancel Request
    restServices.pbksb_GRNRestService
      .cancelGRNRequest(this.appService.myApp)(params)
      .then(() => {
        this.date = new Date();
        this.router
          .navigate(['/operation-system/goods-release-list'])
          .then(() => {
            this.appService.showToaster({
              type: 'error',
              title: 'Cancelled',
              subtitle: this.detailGoodsRecieving.releaseNo + ' is Cancelled.',
              time: formatDate(this.date, 'HH:mm', 'en-US'),
            });
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onEndorsed() {
    const params = {
      form: {
        releaseNo: this.requestNo,
        endorsedByUserName: this.userName,
      },
    };
    restServices.pbksb_GRNRestService
      .endorseGRNRequest(this.appService.myApp)(params)
      .then((result) => {
        console.log("result endorse == ");
        console.log(result);
        let returnobj = this.appService.jsonToArray(result);
        if(returnobj["success"] == true){
          this.appService.showToaster({
            type: 'success',
            title: 'Request Endorsed',
            subtitle: this.detailGoodsRecieving.releaseNo + ' is endorsed successfully',
            time: formatDate( new Date(), 'HH:mm', 'en-US'),
          });
        } else {
          this.appService.showToaster({
            type: 'error',
            title: 'Cannot Endorse',
            subtitle: returnobj.errorMessage,
            // 'The request has failed to be submitted. Please try again',
            time: formatDate( new Date(), 'HH:mm', 'en-US'),
          });
        }
        this.router.navigate(['/operation-system/goods-release-list']);
      });
  }

  onPrint() {
    window.print();
  }
}
