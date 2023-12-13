import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';
import { typeOfWasteList } from '../interfaces/SWM/swm_interface';

@Component({
  selector: 'app-sw-twg-view',
  templateUrl: './sw-twg-view.component.html',
  styleUrls: ['./sw-twg-view.component.scss'],
})
export class SwTwgViewComponent implements OnInit {
  previousURL = '';
  uploadDoc = [];
  uploadUpdatedDoc = [];

  retrievedFormNo: string;
  companyName: string;
  requestBy: string;
  formNo: string;
  factoryAddress: string;
  telNo: string;
  faxNo: string;
  appointedCompanyAddress: string;
  licenseNo: string;
  uploadedDocuments: string;
  updatedDocuments: string;
  status: string;
  typeOfWasteList = [] as typeOfWasteList[];
  token: any;
  ipUrl = this.appService.apiIP;

  constructor(
    private router: Router,
    private requestFormService: RequestFormService,
    protected appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
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

        this.token = initialData.Token.access_token;
        this.getRestServiceAPI(initialData);
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

  getRestServiceAPI(initData: any) {
    this.retrievedFormNo = this._Activatedroute.snapshot.paramMap.get('formNo');

    var apiParam: any = { formNo: this.retrievedFormNo };
    restServices.pbksb_ScheduledWasteService
      .getTwgRequestsByFormNo(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const previewDetailsAPI = JSON.parse(resArr);

        this.companyName = previewDetailsAPI.customer.name;
        this.requestBy = previewDetailsAPI.requestBy.fullname;
        this.formNo = previewDetailsAPI.formNo;
        this.factoryAddress = previewDetailsAPI.factoryAddress;
        this.telNo = previewDetailsAPI.phoneNo;
        this.faxNo = previewDetailsAPI.faxNo;
        this.appointedCompanyAddress = previewDetailsAPI.appCompanyAddress;
        this.licenseNo = previewDetailsAPI.licenseNo;
        this.status = previewDetailsAPI.status;
        previewDetailsAPI.twgWasteList.forEach((value) => {
          this.typeOfWasteList.push({
            id: value.id,
            wasteCode: value.wasteCode.wasteCode,
            description: value.wasteCode.description,
            qty: value.quantity,
          });
        });
        if (previewDetailsAPI.uploadedFile) {
          previewDetailsAPI.uploadedFile.forEach((value) => {
            this.uploadDoc.push({
              file_ID: value.id,
              file_name: value.fileName,
            });
          });
        }
        if (previewDetailsAPI.approvedFile) {
          previewDetailsAPI.approvedFile.forEach((value) => {
            this.uploadUpdatedDoc.push({
              file_ID: value.id,
              file_name: value.fileName,
            });
          });
        }
      });
  }

  downloadFiles(fileID: string, filename: string): void {
    var apiParam: any = {
      file: {
        fileID: fileID,
        fileName: filename,
      },
    };
    var actualFileID = '';

    restServices.pbksb_ScheduledWasteService
      .downloadTwgUploadedFile(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const downloadfileAPI = JSON.parse(resArr);
        actualFileID = downloadfileAPI.uploadedFile.id;
        const baseUrl = this.ipUrl + 'v2/files/' + actualFileID;

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
      });
  }

  downloadUpdatedFiles(fileID: string, filename: string): void {
    var apiParam: any = {
      file: {
        fileID: fileID,
        fileName: filename,
      },
    };
    var actualFileID = '';

    restServices.pbksb_ScheduledWasteService
      .downloadTwgApprovedFile(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const downloadfileAPI = JSON.parse(resArr);
        actualFileID = downloadfileAPI.approvedFile.id;
        const baseUrl = this.ipUrl + 'v2/files/' + actualFileID;

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
      });
  }

  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();
    this.router.navigate([this.previousURL]);
  }
}
