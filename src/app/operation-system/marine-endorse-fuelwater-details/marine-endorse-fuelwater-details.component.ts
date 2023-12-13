import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-marine-endorse-fuelwater-details',
  templateUrl: './marine-endorse-fuelwater-details.component.html',
  styleUrls: ['./marine-endorse-fuelwater-details.component.scss'],
})
export class MarineEndorseFuelwaterDetailsComponent implements OnInit {
  requestNo = '';
  supplyTo = '';
  companyName = '';
  requestBy = '';
  vesselName = '';
  location = '';
  poNumber = '';
  bookingDate = '';
  remarks = '';
  status = '';
  jobTicket = '';
  logNo = '';
  logo = false;
  fuelwaterId = '';
  bookedDate = '';
  date = new Date();
  openModal = false;
  requestOnBehalf = '';

  fuelWaterList = [
    // {
    //   serviceCode: 'Waterman',
    //   qty: '1',
    //   requestedQty: '100,000',
    //   qtyIn: '90,000',
    //   qtyOut: '30,000',
    //   bookingTime: '09:00',
    //   session1Start: '09:00',
    //   session1End: '12:00',
    //   session1Hours: '3.0',
    //   session2Start: '38:00',
    //   session2End: '18.00',
    //   session2Hours: '3.0',
    //   session3Start: '00:00',
    //   session3End: '00:00',
    //   session3Hours: '0.0',
    //   totalHours: '6.0',
    //   remarks:
    //     'Non do excepteur ipsum anim ullamco proident do fugiat laboris do fugiat laboris do fugiat laborisdd',
    // },
    // {
    //   serviceCode: 'Fuelman',
    //   qty: '1',
    //   requestedQty: '100,000',
    //   qtyIn: '90,000',
    //   qtyOut: '50,000',
    //   bookingTime: '09:00',
    //   session1Start: '09:00',
    //   session1End: '12:00',
    //   session1Hours: '3.0',
    //   session2Start: '38:00',
    //   session2End: '18.00',
    //   session2Hours: '3.0',
    //   session3Start: '00:00',
    //   session3End: '00:00',
    //   session3Hours: '0.0',
    //   totalHours: '6.0',
    //   remarks:
    //     'Non do excepteur ipsum anim ullamco proident do fugiat laboris do fugiat laboris do fugiat laborisdd.',
    // },
  ];

  constructor(
    private _Activatedroute: ActivatedRoute,
    protected appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestNo = this._Activatedroute.snapshot.paramMap.get('requestNo');
    this.getRestQueryAPI(this.requestNo);
  }

  print() {
    this.logo = true;
    setTimeout(() => {
      window.print();
      this.logo = false;
    }, 500);
  }

  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'FW1F083D57' };
    var getCodeView: any = { requestNo: requestNo };
    //fire api and get response data
    restServices.pbksb_MarineService
      .GetFuelWaterRequestFormStandAloneDetails(this.appService.myApp)(
        getCodeView
      )
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        this.supplyTo = request.fuelWater.supply
          ? request.fuelWater.supply
          : 'N/A';
        this.companyName = request.fuelWater.company.name
          ? request.fuelWater.company.name
          : 'N/A';
        this.requestBy = request.fuelWater.requested_by
          ? request.fuelWater.requested_by
          : 'N/A';
        this.vesselName = request?.fuelWater?.vessel?.name
          ? request.fuelWater.vessel.name
          : 'N/A';
        this.location = request.fuelWater.location.description
          ? request.fuelWater.location.description
          : '';
        this.requestOnBehalf = request?.fuelWater?.request_on_behalf?.name
          ? request.fuelWater.request_on_behalf.name
          : '';
        this.poNumber = request.fuelWater.po_number
          ? request.fuelWater.po_number
          : 'N/A';
        this.bookingDate = request.fuelWater.booking_date
          ? formatDate(request.fuelWater.booking_date, 'dd/MM/yyyy', 'en_us')
          : 'N/A';
        this.remarks = request.fuelWater.remarks
          ? request.fuelWater.remarks
          : '';
        this.status = request.fuelWater.status ? request.fuelWater.status : '';
        this.jobTicket = request.job_ticket ? request.job_ticket : '';
        this.logNo = request.log_number ? request.log_number : '';
        this.remarks = request.fuelWater.remarks
          ? request.fuelWater.remarks
          : '';
        this.fuelwaterId = request.fuelWater.id ? request.fuelWater.id : 'N/A';

        if (request.tank) {
          request.fuelWaterJobDetails.forEach((element) => {
            this.fuelWaterList.push({
              serviceCode: element.service_code ? element.service_code : 'N/A',
              qty: element.operator ? element.operator : 'N/A',
              requestedQty: element.requested_quantity
                ? element.requested_quantity
                : 'N/A',
              qtyIn: element.actual_quantity_in
                ? element.actual_quantity_in
                : 'N/A',
              qtyOut: element.actual_quantity_out
                ? element.actual_quantity_out
                : 'N/A',
              bookingTime: element.booking_time ? element.booking_time : 'N/A',
              session1Start: element.session1_start
                ? element.session1_start
                : '-',
              session1End: element.session1_end ? element.session1_end : '-',
              session1Hours: element.session1_hours
                ? element.session1_hours
                : '-',
              session2Start: element.session2_start
                ? element.session2_start
                : '-',
              session2End: element.session2_end ? element.session2_end : '-',
              session2Hours: element.session2_hours
                ? element.session2_hours
                : '-',
              session3Start: element.session3_start
                ? element.session3_start
                : '-',
              session3End: element.session3_end ? element.session3_end : '-',
              session3Hours: element.session3_hours
                ? element.session3_hours
                : '-',
              totalHours: element.total_hours ? element.total_hours : '0',
              remarks: element.remarks ? element.remarks : '',
            });
          });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  onEndorse() {
    let param = {
      berthFuelWaterID: {
        fuel_water: this.fuelwaterId,
      },
    };

    restServices.pbksb_MarineService
      .EndorsedBerthRequestFuelWaterStandAloneForm(this.appService.myApp)(param)
      .then((result) => {
        let res: any = result;
        let response = JSON.parse(res);
        // console.log(response);
        if (response.status != 'BAD_REQUEST') {
          this.createNotification('success', 'Endorse');
          this.router.navigate([
            '/operation-system/marine-endorse-fuelwater-list',
          ]);
          this.openModal = false;
        } else {
          this.openModal = false;
          this.createNotification('error', 'Endorse');
        }
      })
      .catch((err) => {
        // console.log(err);
        this.openModal = false;
        this.createNotification('error', 'Endorse');
      });
  }

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';

    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `Fuel Water form is successfully ${keywords.toLowerCase()}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `Fuel Water form failed to ${keywords.toLowerCase()}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };
    this.appService.showToaster(successNotif);
  }
}
