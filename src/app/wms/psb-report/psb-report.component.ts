import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'entities/pbksb_Customer';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-psb-report',
  templateUrl: './psb-report.component.html',
  styleUrls: ['./psb-report.component.scss'],
})
export class PsbReportComponent implements OnInit {
  documentTypeList: any;
  documentArray: any;

  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.documentPreview = [];
    this.userInfo();
  }

  isLoading = false;
  documentPreview = [];
  documentList = [];
  token: any;
  company = '';
  companyId = '';
  requestByName = '';
  ipUrl = this.appService.apiIP;
  date = new Date();

  checkLengthDocList() {
    return this.documentPreview.some((item) => item.select == true);
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        console.log(initialData);
        this.company = initialData.Company;
        this.requestByName = initialData.Fullname;
        this.token = initialData.Token.access_token;
        this.companyId = initialData.CustomerID;
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

  openFile(docPath: any) {
    window.open(docPath, '_blank');
  }

  downloadFiles(fileID: string, filename: string): void {
    const baseUrl = this.ipUrl + 'v2/files/' + fileID;
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.token
    );

    // console.log(headers);

    this.http
      .get(baseUrl, { headers, responseType: 'blob' as 'json' })
      .subscribe(
        (response: any) => {
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
        },
        (error: any) => {
          // console.log('failed download', error);
          this.createNotification(filename);
        }
      );
  }

  createNotification(filename: any) {
    const successNotif = {
      type: 'error',
      title: 'Session Timeout',
      subtitle: `Failed to download ${filename} file. Please relogin again to download the file`,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
  }


  async getRestServiceAPI() {
    // this.RequestNo = this._Activatedroute.snapshot.paramMap.get('requestNum');

    var customer = { id: this.companyId };
    const getCode = {
      customer: customer,
      toDate: 130000,
      fromDate: 13000000,
    };

    //document list
    await restServices.pbksb_PsbService
      .getPsbReportListByCustomerAndDate(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);

        console.log(result);
        console.log(array);
        this.documentArray = array;

        // if(this.company == this.companyName){
        this.documentArray.forEach((element) => {
          this.documentPreview.push({
            fileId: element.id,
            fileName: element.fileName,
            id: element.file.id,
            docType: element.documentType,
            docID: element.id,
            status: element.status,
            lastPrintDate : new Date(),
            fromDate: element.fromDate,
            toDate: element.toDate,
            fromApi: true,
            select: false,
          });
        });
        // }
      });
  }
}
