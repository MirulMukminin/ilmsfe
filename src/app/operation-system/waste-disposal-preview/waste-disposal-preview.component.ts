import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-waste-disposal-preview',
  templateUrl: './waste-disposal-preview.component.html',
  styleUrls: ['./waste-disposal-preview.component.scss'],
})
export class WasteDisposalPreviewComponent implements OnInit {
  open = false;
  openEndorsed = false;

  skidList = [];
  date = new Date();

  requestNo: any;
  name: string;
  detailWasteDisposal;
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
        this.requestNo = this.activatedroute.snapshot.paramMap.get('jobNo');

        this.getRestServiceAPI(initialData.CustomerCode);
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

  private getRestServiceAPI(customer: string) {
    const param = { jobNo: this.requestNo };

    restServices.pbksb_WasteDisposalService
      .getRequestByRequestNumber(this.appService.myApp)(param)
      .then((result) => {
        this.detailWasteDisposal = this.appService.jsonToArray(result);
        this.skidList = this.detailWasteDisposal.skidList;
        this.status = this.dictionaryStatus[this.detailWasteDisposal.status];
        // console.log(this.detailWasteDisposal);
        this.checkOptional();
        this.populateData();
      });
  }

  checkOptional() {
    if (this.detailWasteDisposal.type === 'NORMAL') {
      this.isOptional = false;
      this.type = this.dictionaryType[this.detailWasteDisposal.type];
    } else if (this.detailWasteDisposal.type === 'STORAGE') {
      this.isOptional = true;
      this.type = this.dictionaryType[this.detailWasteDisposal.type];
    }

    if (this.detailWasteDisposal.returnTo) {
      this.returnTo = this.detailWasteDisposal.returnTo.description;
    }
    if (this.detailWasteDisposal.location) {
      this.location = this.detailWasteDisposal.location.description;
    }
  }

  populateData() {
    if (this.detailWasteDisposal.status === 'SUBMITTED') {
      this.isCancelDisabled = false;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = false;
      this.isPrintDisabled = false;

      this.isCancelDisplay = true;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (this.detailWasteDisposal.status === 'PENDING_ENDORSEMENT') {
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = false;
      this.isEditDisabled = true;
      this.isPrintDisabled = true;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = false;
    } else if (this.detailWasteDisposal.status === 'CANCELED') {
      this.isCancelled = true;
      this.isCancelDisabled = true;
      this.isEndorsedDisabled = true;
      this.isEditDisabled = true;
      this.isPrintDisabled = false;

      this.isCancelDisplay = false;
      this.isEndorsedDisplay = true;
      this.isEditDisplay = true;
    } else if (this.detailWasteDisposal.status === 'ENDORSED') {
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
        jobNo: this.requestNo,
        canceledBy: this.name,
      },
    };
    // To Insert Cancel Request
    restServices.pbksb_WasteDisposalService
      .cancelRequest(this.appService.myApp)(params)
      .then(() => {
        this.date = new Date();
        this.router
          .navigate(['/operation-system/waste-disposal-list'])
          .then(() => {
            this.appService.showToaster({
              type: 'error',
              title: 'Cancelled',
              subtitle: this.detailWasteDisposal.jobNo + ' is Cancelled.',
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
        jobNo: this.requestNo,
        endorsedBy: this.name,
      },
    };
    restServices.pbksb_WasteDisposalService
      .endorseRequest(this.appService.myApp)(params)
      .then(() => {
        this.router.navigate(['/operation-system/waste-disposal-endorse-list']);
      });
  }

  onPrint() {
    window.print();
  }

  redirectToPrevious() {
    history.back();
  }
}
