import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sw-twg-print',
  templateUrl: './sw-twg-print.component.html',
  styleUrls: ['./sw-twg-print.component.scss'],
})
export class SwTwgPrintComponent implements OnInit {
  topAddress: string;
  telNo: string;
  faxNo: string;
  companyName: string;
  appointedCompanyName: string;
  appointedCompanyAddress: string;
  licenseNo: string;
  twgFormNo: string;

  wasteTableList = [];

  constructor(
    private appService: AppService,
    private router: Router,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.companyName = initialData.Company;
        this.getRestServiceApi();
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

  getRestServiceApi() {
    this.twgFormNo = this._Activatedroute.snapshot.paramMap.get('formNo');

    if (this.twgFormNo) {
      var apiParam: any = { formNo: this.twgFormNo };
      restServices.pbksb_ScheduledWasteService
        .getTwgRequestsByFormNo(this.appService.myApp)(apiParam)
        .then((result) => {
          const resArr: any = result;
          const previewDetailsAPI = JSON.parse(resArr);

          this.companyName = previewDetailsAPI.customer.name;
          this.topAddress = previewDetailsAPI.factoryAddress;
          this.telNo = previewDetailsAPI.phoneNo;
          this.faxNo = previewDetailsAPI.faxNo;
          this.appointedCompanyName = previewDetailsAPI.appointedCompany;
          this.appointedCompanyAddress = previewDetailsAPI.appCompanyAddress;
          this.licenseNo = previewDetailsAPI.licenseNo;
          previewDetailsAPI.twgWasteList.forEach((value) => {
            this.wasteTableList.push({
              wasteCode: value.wasteCode.wasteCode,
              description: value.wasteCode.description,
              quantity: value.quantity,
            });
          });
          // previewDetailsAPI.uploadedFile.forEach((value) => {
          //   this.uploadDoc.push({
          //     file_ID: value.id,
          //     file_name: value.fileName
          //   })
          // });
        });
    }
  }

  onClose() {
    this.router.navigate(['/operation-system/sw-twg-list']);
  }
  onPrint() {
    window.print();
  }
}
