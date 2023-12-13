import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-cfs-request-form',
  templateUrl: './cfs-request-form.component.html',
  styleUrls: ['./cfs-request-form.component.scss'],
})
export class CfsRequestFormComponent implements OnInit {
  companyName: string = '';
  requestBy: string = '';
  requestType: string = '';
  requestTypeList = [
    { content: 'Storage of Food Container' },
    { content: 'Plug On/ Plug Off Food Container Services' },
    { content: 'Request Loading & Cabling Container on Vessel' },
    {
      content: 'Request Housekeeping, Cleaning And Stuffing In Food Container',
    },
    {
      content: 'Request Repair Container',
    },
  ];

  // edit
  isEdit: boolean = false;
  formNo;
  status;
  formData;
  reqTypeEnum = {
    STORAGE: 'Storage of Food Container',
    PLUG_ON_OFF: 'Plug On/ Plug Off Food Container Services',
    LOADING_CABLING: 'Request Loading & Cabling Container on Vessel',
    HOUSEKEEPING_CLEANING_STUFFING:
      'Request Housekeeping, Cleaning And Stuffing In Food Container',
    REPAIR: 'Request Repair Container',
  };

  constructor(
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        this.companyName = initialData.Company;
        this.requestBy = userInfo.username.name;

        let orderNo = this.activatedRoute.snapshot.paramMap.get('formNo');
        if (orderNo !== null) {
          this.isEdit = true;
          let params = { ticketNo: orderNo };
          // restServices.pbksb_RequestCFSService
          //   .getRequestsByCustomer(this.appService.myApp)(params)
          //   .then((result) => {
          //     let resArr: any = result;
          //     let cfsRequestList = this.appService.jsonToArray(resArr);

          //     cfsRequestList.forEach((item) => {
          //       if (item.ticketNumber === orderNo) {
          //         this.formData = item;
          //       }
          //     });
          //     this.formNo = this.formData.ticketNumber;
          //     this.status = this.formData.status;
          //     this.requestType = this.reqTypeEnum[this.formData.requestType];
          //   });
          restServices.pbksb_RequestCFSService
            .getRequestByTicketNumber(this.appService.myApp)(params)
            .then((result) => {
              let resArr: any = result;
              let cfsRequest = this.appService.jsonToArray(resArr);
              this.formData = cfsRequest;

              this.formNo = this.formData.ticketNumber;
              this.status = this.formData.status;
              this.requestType = this.reqTypeEnum[this.formData.requestType];
            });
        } else {
          this.requestType = 'Storage of Food Container';
          this.isEdit = false;
        }
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }
}
