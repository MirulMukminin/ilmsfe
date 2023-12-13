import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sw-additional-service-report-view',
  templateUrl: './sw-additional-service-report-view.component.html',
  styleUrls: ['./sw-additional-service-report-view.component.scss'],
  providers: [TitleCasePipe],
})
export class SwAdditionalServiceReportViewComponent implements OnInit {
  // data
  formNo: string = '';
  status: string = '';
  inboundFormNo: string = '';
  serviceOrderNo: string = '';
  company: string = '';
  requestBy: string = '';
  dateOfService: string = '';
  time: string = '';
  location: string = '';
  pallet: string = '';
  trip: string = '';

  repackagingFromData = [];

  newPackagingData = [];

  packingData = [];

  totalWeight: string = '';
  totalUnitWeight: string = '';
  operations: string = '';
  openModal = false;
  isLoading = false;
  overlay = false;
  loggedinUserCompany = '';
  palletUnit = '';
  drumUnit = '';

  oddSizeCargoData = [];
  jobTicket = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    protected appService: AppService,
    private router: Router,
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
        this.getRestServicesAPI();
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
  getRestServicesAPI() {
    this.formNo = this.activatedRoute.snapshot.paramMap.get('formNo');
    restServices.pbksb_ScheduledWasteService
      .getAddServiceReportView(this.appService.myApp)({ formNo: this.formNo })
      .then((result) => {
        const resArr: any = result;
        const response = JSON.parse(resArr);
        console.log(response);

        this.status = response?.status.replace(/_/g, ' ') ?? 'N/A';
        this.status = this.titlecasePipe.transform(this.status);
        this.inboundFormNo = response?.inboundFormNo ?? 'N/A';
        this.serviceOrderNo = response?.scheduledWaste.jobNo ?? 'N/A';
        this.company = response?.customer?.name ?? 'N/A';
        this.requestBy = response?.scheduledWaste.requestedBy.fullname ?? 'N/A';
        this.dateOfService = response.date
          ? formatDate(response.date, 'dd/MM/yyyy', 'en_US')
          : 'N/A';
        this.time = response.date
          ? formatDate(response.date, 'HH:mm', 'en_US')
          : 'N/A';
        if (response.location) {
          this.location = response?.location.description ?? 'N/A';
        } else {
          this.location = 'N/A';
        }
        this.pallet = response?.palletNum ?? 'N/A';
        this.trip = response?.trips ?? 'N/A';
        this.totalWeight = response?.totalWeight ?? 'N/A';
        this.totalUnitWeight = response?.totalUnitWeight ?? 'N/A';
        this.palletUnit = response?.palletUnit ?? '-';
        this.drumUnit = response?.drumUnit ?? '-';
        console.log('masuk');

        if (response.packingList) {
          response.packingList.forEach((value, index) => {
            this.repackagingFromData.push({
              qty: value.quantity,
              uom: value.oum,
            });
          });
        }
        if (response.newPackingList) {
          response.newPackingList.forEach((value, index) => {
            this.newPackagingData.push({
              qty: value.quantity,
              material: value.material,
            });
          });
        }
        if (response.oddSizeCargoList) {
          response.oddSizeCargoList.forEach((value, index) => {
            var jobTicketNoSplit = value.jtNo.split(',');
            this.jobTicket = [];
            jobTicketNoSplit.forEach((value, index) => {
              this.jobTicket.push({
                number: value,
              });
            });

            this.oddSizeCargoData.push({
              type: value.cargoType,
              reqNo: value.mheRequestNo,
              jobTicketNumber: this.jobTicket,
            });
          });
        }
      });
  }

  onEndorse() {
    this.isLoading = true;
    this.overlay = true;
    const data = {
      form: { formNo: this.formNo, endorsedBy: this.loggedinUserCompany },
    };

    restServices.pbksb_ScheduledWasteService
      .endorseAddServiceReport(this.appService.myApp)(data)
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
            '/operation-system/sw-additional-service-report-list',
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
            '/operation-system/sw-additional-service-report-list',
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
        this.router.navigate([
          '/operation-system/sw-additional-service-report-list',
        ]);
      });
  }

  onPrint() {
    window.print();
  }
}
