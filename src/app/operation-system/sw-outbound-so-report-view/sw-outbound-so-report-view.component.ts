import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';

@Component({
  selector: 'app-sw-outbound-so-report-view',
  templateUrl: './sw-outbound-so-report-view.component.html',
  styleUrls: ['./sw-outbound-so-report-view.component.scss'],
  providers: [TitleCasePipe],
})
export class SwOutboundSoReportViewComponent implements OnInit {
  previousURL = '';
  retrievedFormNo = '';
  outboundWasteList = [];
  loggedinUserCompany: '';
  companyName = '';
  requestBy = '';
  formNo = '';
  dateReceived = '';
  expiryDate = '';
  serviceOrderNo = '';
  status = '';
  openModal = false;
  isLoading = false;
  overlay = false;

  constructor(
    private router: Router,
    private requestFormService: RequestFormService,
    protected appService: AppService,
    private activatedRoute: ActivatedRoute,
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
        this.loggedinUserCompany = initialData.Company;
        this.getRestServicesAPI(initialData.Company);
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

  getRestServicesAPI(company: string) {
    this.retrievedFormNo = this.activatedRoute.snapshot.paramMap.get('FormNo');
    var apiParam: any = { formNo: this.retrievedFormNo };

    restServices.pbksb_ScheduledWasteService
      .getOutboundSOReportView(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const getOutboundSOReportViewAPI = JSON.parse(resArr);

        const dateReceivedFormatted = formatDate(
          getOutboundSOReportViewAPI.dateReceived,
          'dd/MM/yyyy',
          'en_us'
        );

        const expiryDateFormatted = formatDate(
          getOutboundSOReportViewAPI.expiryDate,
          'dd/MM/yyyy',
          'en_us'
        );

        this.companyName = getOutboundSOReportViewAPI.customer.name;
        this.requestBy =
          getOutboundSOReportViewAPI.scheduledWaste.requestedBy.fullname;
        this.formNo = getOutboundSOReportViewAPI.formNo;
        this.dateReceived = dateReceivedFormatted;
        this.expiryDate = expiryDateFormatted;
        this.serviceOrderNo = getOutboundSOReportViewAPI.scheduledWaste.jobNo;
        this.status = getOutboundSOReportViewAPI.status;
        

        this.status=this.titlecasePipe.transform(
          this.status.replace(/_/g, ' ')
        ); 
        getOutboundSOReportViewAPI.inventoryItems.forEach((value, index) => {
          var locationApi = 'N/A';
          if (value.location) {
            locationApi = value.location ? value.location : 'N/A';
          }
          let expiryDateFormatted = formatDate(
            value.expiryDate,
            'dd/MM/yyyy',
            'en_us'
          );

          this.outboundWasteList.push({
            palletID: value.palletId,
            wasteCode: value.itemCode,
            uom: value.uom,
            qty: value.quantity,
            palletWeight: value.palletWeight,
            locationID: locationApi,
            expiryDate: expiryDateFormatted,
          });
        });
      });
  }

  onEndorse() {
    this.isLoading = true;
    this.overlay = true;
    const data = {
      form: { formNo: this.formNo, endorsedBy: this.loggedinUserCompany },
    };

    restServices.pbksb_ScheduledWasteService
      .endorseOutboundSoReport(this.appService.myApp)(data)
      .then((result) => {
        let requestList: any = result;
        let APIResult = JSON.parse(requestList);

        this.isLoading = false;
        this.overlay = false;
        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
        if (APIResult.success == true) {
          let notiObject = {
            type: 'success',
            title: 'Endorsed',
            subtitle: APIResult.requestNo + ' is successfully endorsed',
            time: currentTime,
          };
          this.appService.showToaster(notiObject);
          this.router.navigate([
            '/operation-system/sw-outbound-so-report-list',
          ]);
        } else {
          let errorObject = {
            type: 'error',
            title: 'Cannot Endorse',
            subtitle: 'The request has failed to be endorsed. Please try again',
            time: currentTime,
          };
          this.appService.showToaster(errorObject);
          this.router.navigate([
            '/operation-system/sw-outbound-so-report-list',
          ]);
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.overlay = false;
        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
        let errorObject = {
          type: 'error',
          title: 'Cannot Endorse',
          subtitle: 'The request has failed to be endorsed. Please try again',
          time: currentTime,
        };
        this.appService.showToaster(errorObject);
        this.router.navigate(['/operation-system/sw-outbound-so-report-list']);
      });
  }

  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();
    this.router.navigate([this.previousURL]);
  }
}
