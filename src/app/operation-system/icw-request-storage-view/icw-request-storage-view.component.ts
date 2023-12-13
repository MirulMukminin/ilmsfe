import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStorageStatusEnum } from 'enums/enums';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-icw-request-storage-view',
  templateUrl: './icw-request-storage-view.component.html',
  styleUrls: ['./icw-request-storage-view.component.scss'],
  providers: [TitleCasePipe],
})
export class IcwRequestStorageViewComponent implements OnInit {
  open = false;
  openEndorsed = false;

  itemList = [];
  date = new Date();

  requestNo: any;
  name: string;
  username: string;
  detailRequestStorage;
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
    CANCELED: 'Cancelled',
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
    private appService: AppService,
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

        this.username = initialData.Username;
        this.requestNo = this.activatedroute.snapshot.paramMap.get('docketNo');
        console.log("this.activatedroute.snapshot.paramMap.get('docketNo') =");
        console.log(this.activatedroute.snapshot.paramMap.get('docketNo'));

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

    restServices.pbksb_ICWRestService
      .getStorageRequestsByCustomer(this.appService.myApp)(param)
      .then((result) => {
        const goodsRecievingRequestList = this.appService.jsonToArray(result);
        // default sorting on JobNo from latest
        /*
        this.goodsRecievingRequestList.sort((a, b) => {
          return b.requestNo  == a.requestNo;
        });
        */
        console.log('goodsRecievingRequestList == ');
        console.log(goodsRecievingRequestList);
        const index = goodsRecievingRequestList.findIndex(
          (obj) => obj.docketNo == this.requestNo
        );
        /*
       let index;
       for(let i = 0; i < goodsRecievingRequestList.length; i++){
         if(goodsRecievingRequestList[i].requestNo == this.requestNo){
           index = i;
           break;
         }
       }
       */
        console.log('index ==');
        console.log(index);
        console.log(this.requestNo);
        console.log(goodsRecievingRequestList[index]);
        this.detailRequestStorage = goodsRecievingRequestList[index];

        this.itemList = this.detailRequestStorage.lineItem;
        this.status = this.dictionaryStatus[this.detailRequestStorage.status];
        this.status = this.titlecasePipe.transform(this.status);
        // console.log(this.detailWasteDisposal);
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
    console.log('this.status == ');
    console.log(this.status);
    if (
      this.detailRequestStorage.status === RequestStorageStatusEnum.SUBMITTED
    ) {
      this.isCancelDisabled = false;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = false;
      this.isPrintDisabled = false;

      this.isCancelDisplay = true;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (
      this.detailRequestStorage.status ===
      RequestStorageStatusEnum.PENDING_ENDORSEMENT
    ) {
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = false;
      this.isEditDisabled = true;
      this.isPrintDisabled = true;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = false;
    }
    if (
      this.detailRequestStorage.status === RequestStorageStatusEnum.CANCELLED
    ) {
      this.isCancelled = true;
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = true;
      this.isPrintDisabled = false;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (
      this.detailRequestStorage.status === RequestStorageStatusEnum.ENDORSED
    ) {
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
        docketNo: this.requestNo,
        cancecanceledByUserNameledBy: this.username,
      },
    };
    // To Insert Cancel Request
    restServices.pbksb_ICWRestService
      .cancelStorageRequest(this.appService.myApp)(params)
      .then((result) => {
        let returnObj = this.appService.jsonToArray(result);
        if (returnObj['success'] == true) {
          this.date = new Date();
          this.router
            .navigate(['/operation-system/icw-request-storage-list'])
            .then(() => {
              this.appService.showToaster({
                type: 'success',
                title: 'Cancelled',
                subtitle: this.detailRequestStorage.docketNo + ' is Cancelled.',
                time: formatDate(this.date, 'HH:mm', 'en-US'),
              });
            });
        } else {
          this.appService.showToaster({
            type: 'error',
            title: 'Cancel failed',
            subtitle:
              this.detailRequestStorage.docketNo + ' is failed to cancel',
            time: formatDate(this.date, 'HH:mm', 'en-US'),
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onEndorsed() {
    const params = {
      form: {
        docketNo: this.requestNo,
        endorsedByUserName: this.username,
      },
    };
    restServices.pbksb_ICWRestService
      .endorseStorageRequest(this.appService.myApp)(params)
      .then((result) => {
        console.log('result...');
        console.log(result);
        console.log('result[success]');
        console.log(result['success']);
        let returnObj = this.appService.jsonToArray(result);
        console.log('returnObj.status) == ');
        console.log(returnObj.status);
        console.log('returnObj[success]');
        console.log(returnObj['success']);
        if (returnObj['success'] == true) {
          this.appService.showToaster({
            type: 'success',
            title: 'Request Endorsed',
            subtitle:
              this.detailRequestStorage.docketNo + ' is endorsed successfully',
            time: formatDate(this.date, 'HH:mm', 'en-US'),
          });

          this.router.navigate([
            '/operation-system/icw-request-storage-endorsed-list',
          ]);
        } else {
          this.appService.showToaster({
            type: 'error',
            title: 'Endorse failed',
            subtitle:
              this.detailRequestStorage.docketNo + ' is failed to endorse',
            time: formatDate(this.date, 'HH:mm', 'en-US'),
          });
        }
      });
  }

  onPrint() {
    window.print();
  }
}
