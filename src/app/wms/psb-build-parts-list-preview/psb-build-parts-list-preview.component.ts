import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-psb-build-parts-list-preview',
  templateUrl: './psb-build-parts-list-preview.component.html',
  styleUrls: ['./psb-build-parts-list-preview.component.scss'],
})
export class PsbBuildPartsListPreviewComponent implements OnInit {
  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    protected notificationService: NotificationService
  ) {}

  requestNo: string = '';
  data: any = '';

  companyName = '';
  requestBy = '';
  partsIssueDate = '';
  category = '';
  remarks = '';
  attachments = [];
  attachmentsList = [];

  partsIssue = [];
  newParts = [];
  partsIssueList = [];
  newPartsList = [];

  piID = '';
  piDescription = '';
  piFormType = '';
  piRegNo = '';
  piQuantity = 0;
  piLocation = '';

  npID = '';
  npDescription = '';
  npFormType = '';
  npRegNo = '';
  npQuantity = 0;
  npLocation = '';

  pushFormType = [];
  pushRegNo = [];

  token: any;

  ipUrl = this.appService.apiIP;

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;
        this.token = initialData.Token.access_token;
        this.getRestServiceAPI();
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

  getRestServiceAPI() {
    this.requestNo = this._Activatedroute.snapshot.paramMap.get('requestNo');
    const getCode = { request_no: this.requestNo };
    restServices.pbksb_PSBService
      .GetBuildFromPartsFormDetails(this.appService.myApp)(getCode)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        // console.log(request);

        this.partsIssueDate = request.issue_date;
        this.category = request.category;
        this.remarks = request.remarks;
      });

    restServices.pbksb_PSBService
      .GetListBuildPartsIssue(this.appService.myApp)(getCode)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        this.partsIssue = request;

        // console.log(this.partsIssue);

        this.partsIssue.forEach((value, index) => {
          this.apiPartsIssueTableValidation(value);
          this.pushPartsIssueListApi();
        });

        this.pushFormType = this.partsIssueList.map((item) => item.FormType);
        this.pushRegNo = this.partsIssueList.map((item) => item.RegNo);
      })
      .then((result) => {
        restServices.pbksb_PSBService
          .GetListNewParts(this.appService.myApp)(getCode)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            this.newParts = request;
            // console.log(request);

            this.newParts.forEach((value, index) => {
              this.apiNewPartsTableValidation(value);
              this.pushNewPartsListApi();
            });
          });
      });

    restServices.pbksb_PSBService
      .GetListBuildFromPartsFormDocument(this.appService.myApp)(getCode)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        // console.log(request);

        this.attachments = request;

        this.attachments.forEach((value) => {
          this.attachmentsList.push({
            ID: value.file_ID,
            FileName: value.file_name,
          });
        });
      });
  }

  onPrint() {
    window.print();
  }

  apiPartsIssueTableValidation(value: any) {
    if (value.good.id) {
      this.piID = value.good.id;
    } else {
      this.piID = 'N/A';
    }

    if (value.good.description) {
      this.piDescription = value.good.description;
    } else {
      this.piDescription = 'N/A';
    }

    if (value.good.good_in.form_type) {
      this.piFormType = value.good.good_in.form_type;
      // this.pushFormType = value.good.good_in.form_type
    } else {
      this.piFormType = 'N/A';
    }

    if (value.good.good_in.registration_no) {
      this.piRegNo = value.good.good_in.registration_no;
      // this.pushRegNo = value.good.good_in.registration_no
    } else {
      this.piRegNo = 'N/A';
    }

    if (value.good.quantity) {
      this.piQuantity = value.good.quantity;
    } else {
      this.piQuantity = 0;
    }

    if (value.good.location.description) {
      this.piLocation = value.good.location.description;
    } else {
      this.piLocation = 'N/A';
    }
  }

  pushPartsIssueListApi() {
    this.partsIssueList.push({
      ID: this.piID,
      Description: this.piDescription,
      FormType: this.piFormType,
      RegNo: this.piRegNo,
      Quantity: this.piQuantity,
      Location: this.piLocation,
    });
  }

  apiNewPartsTableValidation(value: any) {
    if (value.id) {
      this.npID = value.id;
    } else {
      this.npID = 'N/A';
    }

    if (value.item) {
      this.npDescription = value.item;
    } else {
      this.npDescription = 'N/A';
    }

    if (value.quantity) {
      this.npQuantity = value.quantity;
    } else {
      this.npQuantity = 0;
    }

    if (value.location.description) {
      this.npLocation = value.location.description;
    } else {
      this.npLocation = 'N/A';
    }
  }

  pushNewPartsListApi() {
    this.newPartsList.push({
      ID: this.npID,
      Description: this.npDescription,
      FormType: this.pushFormType[0],
      RegNo: this.pushRegNo[0],
      Quantity: this.npQuantity,
      Location: this.npLocation,
    });
  }

  downloadFiles(fileID: string, filename: string): void {
    const baseUrl = this.ipUrl + 'v2/files/' + fileID;
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.token
    );

    this.http
      .get(baseUrl, { headers, responseType: 'blob' as 'json' })
      .subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('target', '_self');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (fileID) downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      });
  }
}
