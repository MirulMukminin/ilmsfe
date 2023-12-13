import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestTransferStatusEnum } from 'enums/enums';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-icw-as-endorsed-view',
  templateUrl: './icw-as-endorsed-view.component.html',
  styleUrls: ['./icw-as-endorsed-view.component.scss'],
  providers: [TitleCasePipe],
})
export class IcwAsEndorsedViewComponent implements OnInit {
  open = false;
  openEndorsed = false;

  itemList = [];
  date = new Date();
  username: string;

  requestNo: any;
  name: string;
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
    SUBMITTED: 'INITIATED',
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
        this.requestNo = this.activatedroute.snapshot.paramMap.get('docketNo');
        console.log("this.activatedroute.snapshot.paramMap.get('docketNo') =");
        console.log(this.activatedroute.snapshot.paramMap.get('docketNo'));
        console.log('initialData from view = ');
        console.log(initialData);
        this.username = initialData.Username;

        //this.getRestServiceAPI(initialData.CustomerCode);
        this.getRestServiceAPI(initialData.Company);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }
  private getRestServiceAPI(customer: string) {
    const param = { customer };

    restServices.pbksb_ICWAddSRestService
      .getEndorsedASRequestsByCustomer(this.appService.myApp)(param)
      .then((result) => {
        const goodsRecievingRequestList = this.appService.jsonToArray(result);
        console.log('goodsRecievingRequestList == ');
        console.log(goodsRecievingRequestList);
        const index = goodsRecievingRequestList.findIndex(
          (obj) => obj.docketNo == this.requestNo
        );

        console.log('index ==');
        console.log(index);
        console.log(this.requestNo);
        console.log(goodsRecievingRequestList[index]);
        this.detailRequestStorage = goodsRecievingRequestList[index];

        this.itemList = this.detailRequestStorage.lineItem;
        //this.status = this.dictionaryStatus[this.detailRequestStorage.status];
        this.status = this.detailRequestStorage.status;
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
      this.detailRequestStorage.status === RequestTransferStatusEnum.INITIATED
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
      RequestTransferStatusEnum.PENDING_ENDORSEMENT
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
      this.detailRequestStorage.status === RequestTransferStatusEnum.CANCELLED
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
      this.detailRequestStorage.status === RequestTransferStatusEnum.ENDORSED
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
        requestNo: this.requestNo,
        canceledByUserName: this.username,
      },
    };
    // To Insert Cancel Request
    restServices.pbksb_ICWAddSRestService
      .cancelASRequest(this.appService.myApp)(params)
      .then(() => {
        this.date = new Date();
        this.router
          .navigate(['/operation-system/icw-as-endorsed-list'])
          .then((result) => {
            let returnobj = this.appService.jsonToArray(result);
            let type;
            let title;
            console.log('result from cancel == ');
            console.log(result);
            console.log(returnobj);
            if (returnobj === true) {
              type = 'success';
              title = 'Transfer Cancelled';
            } else {
              type = 'error';
              title = 'Cannot Cancel';
            }
            this.appService.showToaster({
              type: type,
              title: title,
              subtitle:
                ' Cancel, docket No: ' + this.detailRequestStorage.docketNo,
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
        requestNo: this.requestNo,
        endorsedByUserName: this.username,
      },
    };

    restServices.pbksb_ICWAddSRestService
      .endorseASRequest(this.appService.myApp)(params)
      .then((result) => {
        console.log('result endorse == ');
        console.log(result);
        let returnobj = this.appService.jsonToArray(result);
        if (returnobj['success'] == true) {
          this.appService.showToaster({
            type: 'success',
            title: 'Request Endorsed',
            subtitle:
              this.detailRequestStorage.docketNo + ' is endorsed successfully',
            time: formatDate(this.date, 'HH:mm', 'en-US'),
          });
        } else {
          this.appService.showToaster({
            type: 'error',
            title: 'Cannot Endorse',
            subtitle: 'Docket No: ' + this.detailRequestStorage.docketNo,
            time: formatDate(this.date, 'HH:mm', 'en-US'),
          });
        }
        this.router.navigate(['/operation-system/icw-as-endorsed-list']);
      });
  }

  onPrint() {
    window.print();
  }
}
