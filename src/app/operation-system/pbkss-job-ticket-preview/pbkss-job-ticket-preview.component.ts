import { formatDate, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableModel } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-pbkss-job-ticket-preview',
  templateUrl: './pbkss-job-ticket-preview.component.html',
  styleUrls: ['./pbkss-job-ticket-preview.component.scss'],
})
export class PbkssJobTicketPreviewComponent implements OnInit {
  @Input() service = new TableModel();

  jobTickeNo = '';
  jrNo = '';
  location = '';
  company = '';
  requestNo = '';
  supplyTo = '';
  requestBy = '';
  requestDate = '';
  requestOnBehalf = '';
  poNumber = '';
  booking_date = '';
  status = '';
  remarks = '';
  date = '';
  fuelWaterId = '';
  openModalAmmend = false;
  amendNotes = '';
  endorsedBy = '';
  endorsedDate = '';

  // jobTicket: any;
  openModal = false;

  services = [];

  constructor(
    private _location: Location,
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private berthRequestFormService: BerthRequestFormService
  ) {}

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get('jobNo')) {
      this.jobTickeNo = this._Activatedroute.snapshot.paramMap.get('jobNo');
      this.getRestServiceAPI();
    }
  }

  getRestServiceAPI() {
    if (this.berthRequestFormService.viewJobTicket) {
      restServices.pbksb_MarineService
        .GetBerthFuelWaterJobTicketPreview(this.appService.myApp)({
          jobTicket: this.jobTickeNo,
        })
        .then((result) => {
          const resArr: any = result;
          const array = JSON.parse(resArr);

          let bookingdate = array?.booking_date ?? ''; //Wed Dec 29 00:00:00 MYT 2021
          let bookingDate: any = '';
          if (bookingdate) {
            bookingDate = [
              bookingdate.slice(0, 10),
              bookingdate.slice(24, 29),
              bookingdate.slice(11, 20),
            ].join(' ');
          }

          let requestdate = array?.request_date ?? '';
          let requestDate: any = '';
          if (requestdate) {
            requestDate = [
              requestdate.slice(0, 10),
              requestdate.slice(24, 29),
              requestdate.slice(11, 20),
            ].join(' ');
          }

          let completiondate = array?.completion_date ?? '';
          let completionDate: any = '';
          if (completiondate) {
            completionDate = [
              completiondate.slice(0, 10),
              completiondate.slice(24, 29),
              completiondate.slice(11, 20),
            ].join(' ');
          }

          this.jobTickeNo = array?.job_ticket ?? 'N/A';
          this.jrNo = array?.jr_no ?? 'N/A';
          this.location = array?.location ?? 'N/A';
          this.company = array?.company ?? 'N/A';
          this.requestNo = array?.waterfuel_requestNo ?? 'N/A';
          this.supplyTo = array?.supply ?? 'N/A';
          this.requestBy = array?.request_by ?? 'N/A';
          this.requestDate = requestdate
            ? formatDate(requestDate, 'dd/MM/yyyy hh:MM', 'en_US')
            : '';
          this.requestOnBehalf = array?.request_on_behalf ?? 'N/A';
          this.poNumber = array?.po_no ?? 'N/A';
          this.booking_date = bookingdate
            ? formatDate(bookingDate, 'dd/MM/yyyy', 'en_US')
            : '';
          this.status = array?.services[0]?.water_fuel_job?.status ?? 'N/A';
          this.remarks = array?.remarks ?? '';
          // this.date = array?.Date ?? '';
          this.date = completiondate
            ? formatDate(completionDate, 'dd/MM/yyyy', 'en_US')
            : '';
          this.fuelWaterId = array?.fuelWater?.Id;
          this.endorsedBy = array?.endorsed_by ?? '';
          this.endorsedDate = array?.endorsed_date
            ? formatDate(array?.endorsed_date, 'dd/MM/yyyy', 'en_US')
            : '';

          array.services.forEach((element, i) => {
            this.services.push({
              // id: element.custom_id,
              item: element.service_code ?? 'N/A',
              operators: element?.operators ?? '',
              full_tank: element.full_tank ? 'Yes' : 'No',
              qty: element.request_quantity
                ? this.numberWithCommas(element.request_quantity)
                : '0',
              actualQtyIn: element.actual_quantity_in
                ? this.numberWithCommas(element.actual_quantity_in)
                : '0',
              actualQtyOut: element.actual_quantity_out
                ? this.numberWithCommas(element.actual_quantity_out)
                : '0',
              // session: element.session3_start
              //   ? '3'
              //   : element.session2_start
              //   ? '2'
              //   : '1',
              sess1Start: element.session1_start
                ? element.session1_start.slice(0, 5)
                : '-',
              sess1End: element.session1_end
                ? element.session1_end.slice(0, 5)
                : '-',
              sess1Hours: element.session1_hours ? element.session1_hours : '-',
              sess2Start: element.session2_start
                ? element.session2_start.slice(0, 5)
                : '-',
              sess2End: element.session2_end
                ? element.session2_end.slice(0, 5)
                : '-',
              sess2Hours: element.session2_hours ? element.session2_hours : '-',
              sess3Start: element.session3_start
                ? element.session3_start.slice(0, 5)
                : '-',
              sess3End: element.session3_end
                ? element.session3_end.slice(0, 5)
                : '-',
              sess3Hours: element.session3_hours ? element.session3_hours : '-',
              sess4Start: element.session4_start
                ? element.session4_start.slice(0, 5)
                : '-',
              sess4End: element.session4_end
                ? element.session4_end.slice(0, 5)
                : '-',
              sess4Hours: element.session4_hours ? element.session4_hours : '-',
              totalHours: element.total_hours,
              remarks: array?.remarks_job ?? '',
            });
          });
        });
    } else {
      restServices.pbksb_MarineService
        .GetBerthFuelWaterStandaloneJobTicketPreview(this.appService.myApp)({
          jobTicket: this.jobTickeNo,
        })
        .then((result) => {
          const resArr: any = result;
          const array = JSON.parse(resArr);

          // console.log(array);

          let bookingdate = array?.booking_date ?? ''; //Wed Dec 29 00:00:00 MYT 2021
          let bookingDate: any = '';
          if (bookingdate) {
            bookingDate = [
              bookingdate.slice(0, 10),
              bookingdate.slice(24, 29),
              bookingdate.slice(11, 20),
            ].join(' ');
          }

          let requestdate = array?.request_date ?? '';
          let requestDate: any = '';
          if (requestdate) {
            requestDate = [
              requestdate.slice(0, 10),
              requestdate.slice(24, 29),
              requestdate.slice(11, 20),
            ].join(' ');
          }

          let completiondate = array?.completion_date ?? '';
          let completionDate: any = '';
          if (completiondate) {
            completionDate = [
              completiondate.slice(0, 10),
              completiondate.slice(24, 29),
              completiondate.slice(11, 20),
            ].join(' ');
          }

          this.jobTickeNo = array?.job_ticket ?? 'N/A';
          this.jrNo = array?.jr_no ?? 'N/A';
          this.location = array?.location ?? 'N/A';
          this.company = array?.company ?? 'N/A';
          this.requestNo = array?.waterfuel_requestNo ?? 'N/A';
          this.supplyTo = array?.supply ?? 'N/A';
          this.requestBy = array?.request_by ?? 'N/A';
          this.requestDate = requestdate
            ? formatDate(requestDate, 'dd/MM/yyyy hh:MM', 'en_US')
            : '';
          this.requestOnBehalf = array?.request_on_behalf ?? '';
          this.poNumber = array?.po_no ?? 'N/A';
          this.booking_date = bookingdate
            ? formatDate(bookingDate, 'dd/MM/yyyy', 'en_US')
            : '';
          this.status = array?.services[0]?.water_fuel_job?.status ?? 'N/A';
          this.remarks = array?.remarks ?? '';
          // this.date = array?.Date ?? '';
          this.date = completiondate
            ? formatDate(completionDate, 'dd/MM/yyyy', 'en_US')
            : '';
          this.fuelWaterId = array?.fuelWater?.Id;
          this.endorsedBy = array?.endorsed_by ?? '';
          this.endorsedDate = array?.endorsed_date
            ? formatDate(array?.endorsed_date, 'dd/MM/yyyy', 'en_US')
            : '';

          array.services.forEach((element, i) => {
            this.services.push({
              // id: element.custom_id,
              item: element?.service_code ?? 'N/A',
              operators: element?.operators ?? '',
              full_tank: element.full_tank ? 'Yes' : 'No',
              qty: element.request_quantity
                ? this.numberWithCommas(element.request_quantity)
                : '0',
              actualQtyIn: element.actual_quantity_in
                ? this.numberWithCommas(element.actual_quantity_in)
                : '0',
              actualQtyOut: element.actual_quantity_out
                ? this.numberWithCommas(element.actual_quantity_out)
                : '0',
              // session: element.session3_start
              //   ? '3'
              //   : element.session2_start
              //   ? '2'
              //   : '1',
              sess1Start: element.session1_start
                ? element.session1_start.slice(0, 5)
                : '-',
              sess1End: element.session1_end
                ? element.session1_end.slice(0, 5)
                : '-',
              sess1Hours: element.session1_hours ? element.session1_hours : '-',
              sess2Start: element.session2_start
                ? element.session2_start.slice(0, 5)
                : '-',
              sess2End: element.session2_end
                ? element.session2_end.slice(0, 5)
                : '-',
              sess2Hours: element.session2_hours ? element.session2_hours : '-',
              sess3Start: element.session3_start
                ? element.session3_start.slice(0, 5)
                : '-',
              sess3End: element.session3_end
                ? element.session3_end.slice(0, 5)
                : '-',
              sess3Hours: element.session3_hours ? element.session3_hours : '-',
              sess4Start: element.session4_start
                ? element.session4_start.slice(0, 5)
                : '-',
              sess4End: element.session4_end
                ? element.session4_end.slice(0, 5)
                : '-',
              sess4Hours: element.session4_hours ? element.session4_hours : '-',
              totalHours: element.total_hours,
              remarks: array?.remarks_job ?? '',
            });
          });
        });
    }

    this.service.header = [
      // new TableHeaderItem({ data: 'ID' }),
      new TableHeaderItem({ data: 'Item' }),
      new TableHeaderItem({ data: 'No. of Operators' }),
      new TableHeaderItem({ data: 'Full Tank' }),
      new TableHeaderItem({ data: 'Request Qty. (L)' }),
      new TableHeaderItem({ data: 'Actual Qty. In (L)' }),
      new TableHeaderItem({ data: 'Actual Qty. Out (L)' }),
      new TableHeaderItem({ data: 'Session' }),
      new TableHeaderItem({ data: 'Start' }),
      new TableHeaderItem({ data: 'End' }),
      new TableHeaderItem({ data: 'Hours' }),
      new TableHeaderItem({ data: 'Remarks' }),
    ];
  }

  onPrint() {
    window.print();
  }

  backClicked() {
    this._location.back();
  }

  // addZeroes(num) {
  //   const dec = num.toString().split('.')[1];
  //   const len = dec && dec.length > 2 ? dec.length : 2;
  //   return this.numberWithCommas(Number(num).toFixed(len));
  // }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  endorseJob() {
    // restServices.pbksb_MarineService
    //   .EndorsedFuelWater(this.appService.myApp)({
    //     berthFuelWaterID: {
    //       fuelWater: this.fuelWaterId,
    //     },
    //   })
    //   .then((result) => {
    //     let requestList: any = result;
    //     let request = JSON.parse(requestList);

    //     if (!request.status) {
    // console.log(result);
    // console.log('Endorse fuel water success');
    //       this._location.back();
    //     } else {
    // console.log(request.status, 'Endorse fuel water failed');
    //     }
    //   })
    //   .catch((err) => {
    // console.log(err, 'Endorse fuel water failed');
    //   });

    restServices.pbksb_MarineService
      .EndorsedFuelWaterJobTicket(this.appService.myApp)({
        jobTicket: this.jobTickeNo,
      })
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        if (!request.status) {
          // console.log(result);
          // console.log('Endorse fuel water success');

          let date = new Date();
          const successNotif = {
            type: 'success',
            title: 'Endorsed Success',
            // subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
            subtitle: 'Job ticket is sucessfully endorsed',
            time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
          };
          this.appService.showToaster(successNotif);

          this._location.back();
        } else {
          // console.log(request.status, 'Endorse fuel water failed');
          let date = new Date();

          const successNotif = {
            type: 'error',
            title: 'Endorsed Failed',
            // subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
            subtitle: 'Failed to endorsed job ticket',
            time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
          };
          this.appService.showToaster(successNotif);

          this.openModal = false;
        }
      })
      .catch((err) => {
        // console.log(err, 'Endorse fuel water failed');
        let date = new Date();

        const successNotif = {
          type: 'error',
          title: 'Endorsed Failed',
          // subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
          subtitle: 'Failed to endorsed job ticket',
          time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
        };
        this.appService.showToaster(successNotif);

        this.openModal = false;
      });
  }

  openEndorseModal() {
    this.openModal = true;
  }

  convertToTitleCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }

  onblurAmend(event: any) {
    this.amendNotes = event.target.value;
  }

  submitAmmend() {
    let date = new Date();

    restServices.pbksb_MarineService
      .RejectFuelWaterStandAloneForm(this.appService.myApp)({
        jobticket: this.jobTickeNo,
        comment: this.amendNotes,
      })
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        const successNotif = {
          type: 'success',
          title: 'Amendment submitted',
          subtitle: 'Amendment' + ' ' + 'is successfully submitted',
          time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
        };

        this.appService.showToaster(successNotif);
        this.status = this.convertToTitleCase(request.status);
      })
      .catch((err) => {
        // console.log(err);
        const successNotif2 = {
          type: 'error',
          title: 'Amendment is not submitted',
          subtitle: 'Amendment' + ' ' + 'is not submitted',
          time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
        };

        this.appService.showToaster(successNotif2);
      });

    this.amendNotes = '';
    this.openModalAmmend = false;
  }
}
