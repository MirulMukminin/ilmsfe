import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-marine-fuelwater-form-preview',
  templateUrl: './marine-fuelwater-form-preview.component.html',
  styleUrls: ['./marine-fuelwater-form-preview.component.scss'],
})
export class MarineFuelwaterFormPreviewComponent implements OnInit {
  initialData: any;
  requestByName = '';
  requestNo = '';
  supplyTo = '';
  companyName = '';
  requestBy = '';
  vesselName = '';
  requestOnBehalf = '';
  terminal = '';
  poNumber = '';
  bookingDate = '';
  remarks = '';
  status = '';
  jobTicket = '';
  logo = false;
  fuelWaterList = [];
  fuelwaterId = '';
  listOfTank = [];

  openSubmitModal = false;
  openCancel = false;
  updateStatus = false;
  editedStatus = true;

  date = new Date();
  bookedDate = '';
  dateFlag = false;
  flagCharge = false;
  openModal = false;
  jobTicketStatus = [];

  fuelwaterstandaloneData: any;
  openModalAmmend = false;
  amendNotes = '';
  endorsedBy = '';
  endorsedDate = '';

  constructor(
    private _Activatedroute: ActivatedRoute,
    protected appService: AppService,
    private router: Router,
    private berthRequestFormService: BerthRequestFormService
  ) {}

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        this.initialData = this.appService.populateInitData(userInfo);

        if (this._Activatedroute.snapshot.paramMap.get('requestNo')) {
          this.requestNo =
            this._Activatedroute.snapshot.paramMap.get('requestNo');

          restServices.pbksb_MarineService
            .GetFuelWaterRequestFormStandAloneDetails(this.appService.myApp)({
              requestNo: this.requestNo,
            })
            .then((result) => {
              // console.log(result);
              let requestList: any = result;
              let request = JSON.parse(requestList);
              this.jobTicket = request?.job_ticket ? request?.job_ticket : '';
              this.fuelwaterId = request?.fuelWater?.id
                ? request?.fuelWater?.id
                : '';

              this.status = request?.fuelWater?.status
                ? this.convertToTitleCase(request?.fuelWater?.status)
                : '';
              this.status =
                this.status == 'Endorsed Cancelled'
                  ? 'Endorsed (Cancelled)'
                  : this.status;

              this.endorsedBy = request?.fuelWater?.endorsed_by
                ? this.convertToTitleCase(request?.fuelWater?.endorsed_by)
                : '';

              this.endorsedDate = request?.fuelWater?.endorsed_date
                ? formatDate(
                    request?.fuelWater?.endorsed_date,
                    'dd/MM/yyyy',
                    'en_US'
                  )
                : '';

              if (sessionStorage.getItem('fuelwaterstandalone')) {
                this.getDataFromLocalStorage();
                // console.log('fuelwaterId', this.fuelwaterId);
                this.getRestQueryAPI(this.fuelwaterstandaloneData);
              } else {
                this.getRestQueryAPI(request);
                // console.log('fuelwaterId', this.fuelwaterId);
              }
            })
            .then(() => {
              this.checkCancelFormCharge();
            })
            .catch((err) => {
              // console.log(err)
            });
        } else {
          this.getDataFromLocalStorage();
          // console.log('fuelwaterId', this.fuelwaterId);
          this.getRestQueryAPI(this.fuelwaterstandaloneData);
        }
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

  getDataFromLocalStorage() {
    this.editedStatus = false;
    let data = JSON.parse(sessionStorage.getItem('fuelwaterstandalone')).form;
    this.fuelwaterstandaloneData = {
      fuelWater: {
        supply: data.supply,
        request_by_company: {
          name: data.requested_by_company,
        },
        company: {
          name: data.company,
        },
        vessel: {
          name: data.vessel_name,
        },
        requested_by: this.initialData.Fullname,
        terminal: data.terminal,
        po_number: data.po_number,
        booking_date: new Date(data.booking_date),
        remarks: data.remarks,
      },
      tank: [],
    };

    data.berthFuelWaterTanks.forEach((val) => {
      this.listOfTank.push({
        id: Math.floor(Math.random() * 10000),
        full_tank: val.full_tank,
        item: val.tank.toUpperCase(),
        requested_quantity: val.weight != 0 ? val.weight : '',
        booking_time: val.start_time,
        indicator: val.indicator,
      });
    });

    this.fuelwaterstandaloneData.tank = this.listOfTank;
  }

  getRestQueryAPI(request: any) {
    this.supplyTo = request?.fuelWater?.supply
      ? request?.fuelWater?.supply
      : 'N/A';
    // this.companyName = request?.fuelWater?.request_by_company?.name
    //   ? request.fuelWater?.request_by_company?.name
    //   : 'N/A';

    this.companyName = request?.fuelWater?.company?.name
      ? request.fuelWater?.company?.name
      : 'N/A';
    this.requestByName = request?.fuelWater?.requested_by
      ? request?.fuelWater?.requested_by
      : '';
    this.vesselName = request?.fuelWater?.vessel?.name
      ? request.fuelWater.vessel.name
      : '';
    this.terminal = request?.fuelWater?.terminal
      ? request.fuelWater.terminal
      : '';
    this.requestOnBehalf = request?.fuelWater?.request_on_behalf?.name
      ? request.fuelWater.request_on_behalf.name
      : '';
    this.poNumber = request?.fuelWater?.po_number
      ? request?.fuelWater?.po_number
      : '';
    this.bookingDate = request?.fuelWater?.booking_date
      ? formatDate(request?.fuelWater?.booking_date, 'dd/MM/yyyy', 'en_us')
      : '';
    this.remarks = request?.fuelWater?.remarks
      ? request?.fuelWater?.remarks
      : '';
    // this.status = request?.fuelWater?.status
    //   ? this.convertToTitleCase(request?.fuelWater?.status)
    //   : '';
    // this.jobTicket = request?.job_ticket ? request?.job_ticket : '';
    // this.fuelwaterId = request?.fuelWater?.id ? request?.fuelWater?.id : '';
    this.bookedDate = request?.fuelWater?.booking_date
      ? request?.fuelWater?.booking_date
      : '';

    // console.log(request);

    if (request.tank) {
      request.tank.forEach((element) => {
        let inProgress: any;
        if (this.status.toLowerCase().includes('initiated')) {
          inProgress =
            element?.fuel_water_job?.status.toLowerCase().includes('pending') ||
            element?.fuel_water_job?.status
              .toLowerCase()
              .includes('progress') ||
            element?.fuel_water_job?.status.toLowerCase().includes('endorse')
              ? true
              : false;
        } else {
          inProgress =
            element?.status?.toLowerCase().includes('pending') ||
            element?.status?.toLowerCase().includes('progress') ||
            element?.status?.toLowerCase().includes('endorse')
              ? true
              : false;
        }

        if (element.indicator) {
          // console.log(element);

          this.fuelWaterList.push({
            item: element.item ? element.item : '',
            full_tank: element.full_tank ? 'Yes' : 'No',
            bookingTime: !inProgress
              ? element?.booking_time
                ? element?.booking_time
                : ''
              : element?.actual_time
              ? element?.actual_time
              : '',
            weight: !inProgress
              ? element?.requested_quantity
                ? element?.requested_quantity
                : ''
              : element?.actual_quantity_in
              ? element?.actual_quantity_in
              : element?.actual_quantity_out,
            jobTicket: element?.job_ticket ? element?.job_ticket : '',
            status: this.status.toLowerCase().includes('initiated')
              ? element?.status
                ? element?.status
                : ''
              : element?.status
              ? element.status == 'ENDORSED_CANCELLED'
                ? 'Endorsed (Cancelled)'
                : this.convertToTitleCase(element?.status)
              : '',
          });
          this.jobTicketStatus.push(element?.status);
        }
      });
    }
  }

  saveFuelWaterForm() {
    if (!this.updateStatus && !this.requestNo) {
      restServices.pbksb_MarineService
        .PostBerthRequestFuelWaterStandAloneForm(this.appService.myApp)(
          JSON.parse(sessionStorage.getItem('fuelwaterstandalone'))
        )
        .then((result) => {
          let requestList: any = result;
          let request = JSON.parse(requestList);
          if (request.status != 'BAD_REQUEST') {
            // console.log(request);
            // console.log('fuel water save success');
            this.createNotification3('success', 'submitted');
            this.updateStatus = true;
            this.editedStatus = true;

            request.fuelWaterTanks.forEach((data, index) => {
              this.listOfTank[index].id = data.fuelWaterTank_Id;
            });
            this.fuelwaterId = request.fuel_water_id;
            this.requestNo = request.FW_requestNo;
            this.status = 'Initiated';
            sessionStorage.clear();
          } else {
            this.createNotification3('error', 'submit');
            // console.log(request.status, 'fuel water save failed');
          }
        })
        .catch((err) => {
          this.createNotification3('error', 'submit');
          // console.log(err, 'fuel water save failed');
        });
    } else {
      let param = JSON.parse(sessionStorage.getItem('fuelwaterstandalone'));
      param.form['fuel_water'] = this.fuelwaterId;

      restServices.pbksb_MarineService
        .UpdateBerthRequestFuelWaterStandAloneForm(this.appService.myApp)(param)
        .then((result) => {
          // console.log(result);
          let requestList: any = result;
          let request = JSON.parse(requestList);

          if (request.status != 'BAD_REQUEST') {
            // console.log(request);
            // console.log('fuel water update success');
            this.createNotification3('success', 'updated');
            this.updateStatus = true;
            this.editedStatus = true;

            sessionStorage.clear();
          } else {
            this.createNotification3('error', 'update');
            // console.log(request.status, 'fuel water update failed');
          }
        })
        .catch((err) => {
          this.createNotification3('error', 'update');
          // console.log(err, 'fuel water update failed');
        });
    }
  }

  onSubmit() {
    let param = {
      berthFuelWaterID: {
        fuel_water: this.fuelwaterId,
      },
    };

    restServices.pbksb_MarineService
      .SubmitBerthRequestFuelWaterStandAloneForm(this.appService.myApp)(param)
      .then((result) => {
        let res: any = result;
        let response = JSON.parse(res);
        // console.log(response);

        if (response.status != 'BAD_REQUEST') {
          this.createNotification('success', 'Submited', 'submit');
          this.router.navigate([
            '/operation-system/marine-fuel-water-request-list',
          ]);
          this.openSubmitModal = false;
        } else {
          this.createNotification('error', 'Submit', 'submit');
          this.openSubmitModal = false;
        }
      })
      .catch((err) => {
        // console.log(err);
        this.createNotification('error', 'Submit', 'submit');
        this.openSubmitModal = false;
      });
  }

  checkCancelFormCharge() {
    let options = { hour12: false };

    // set and convert today date to yyyy-MM-dd
    let todayDate = new Date();
    let convertTodayDate =
      todayDate.getFullYear() +
      '-' +
      (todayDate.getMonth() + 1) +
      '-' +
      ('0' + todayDate.getDate()).slice(-2);

    // get two hours from current time
    let currentTwoHourTime = new Date(
      new Date(todayDate).setHours(todayDate.getHours() + 2)
    );

    let convertCurrentTwoHourTime = currentTwoHourTime.toLocaleTimeString(
      'en-us',
      options
    );
    // convert to epoch time
    let convertCurrentTwoHourTime2 = Date.parse(
      formatDate(currentTwoHourTime, 'MM/dd/yyyy HH:mm', 'en_us')
    );

    let bookTime: any;

    if (this.fuelWaterList.length > 1) {
      bookTime = this.fuelWaterList.reduce((r, o) => {
        if (o.bookingTime && r.bookingTime) {
          return o.bookingTime < r.bookingTime ? o.bookingTime : r.bookingTime;
        } else {
          return o.bookingTime ? o.bookingTime : r.bookingTime;
        }
      });
    } else {
      bookTime = this.fuelWaterList[0]?.bookingTime;
    }

    // this.fuelWaterList.forEach((data, index) => {
    //   if (!this.fuelWaterList[0]?.bookingTime) {
    //     bookTime = this.fuelWaterList[1]?.bookingTime;
    //   } else if (!this.fuelWaterList[1]?.bookingTime) {
    //     bookTime = this.fuelWaterList[0]?.bookingTime;
    //   } else {
    //     bookTime =
    //       this.fuelWaterList[0]?.bookingTime >
    //       this.fuelWaterList[1]?.bookingTime
    //         ? this.fuelWaterList[1]?.bookingTime
    //         : this.fuelWaterList[0]?.bookingTime;
    //   }
    // });

    let bookDate =
      formatDate(this.bookedDate, 'MM/dd/yyyy', 'en_us') + ' ' + bookTime;
    // set and convert booking date to yyyy-MM-dd
    let bookingDate = new Date(bookDate);
    let convertBookingDate =
      bookingDate.getFullYear() +
      '-' +
      (bookingDate.getMonth() + 1) +
      '-' +
      ('0' + bookingDate.getDate()).slice(-2);

    // get two hours from current time
    let bookingTime = new Date(
      new Date(bookingDate).setHours(bookingDate.getHours())
    );

    let convertBookingTime = bookingTime.toLocaleTimeString('en-us', options);
    // convert to epoch time
    let convertBookingTime2 = Date.parse(bookDate);
    // console.log(
    //   Date.parse(bookDate),
    //   Date.parse(formatDate(currentTwoHourTime, 'MM/dd/yyyy HH:mm', 'en_us'))
    // );

    // console.log(convertTodayDate, convertBookingDate);

    if (convertBookingDate == convertTodayDate) {
      if (convertCurrentTwoHourTime >= convertBookingTime) {
        this.dateFlag = true;
        this.flagCharge = true;
      } else if (convertCurrentTwoHourTime2 >= convertBookingTime2) {
        this.dateFlag = true;
        this.flagCharge = true;
      }
    } else if (convertBookingDate < convertTodayDate) {
      this.dateFlag = true;
      this.flagCharge = true;
    } else if (convertBookingDate > convertTodayDate) {
      if (convertCurrentTwoHourTime2 >= convertBookingTime2) {
        this.dateFlag = true;
        this.flagCharge = true;
      }
    }
  }

  deleteJobRequest() {
    let param = {
      berthFuelWaterID: {
        fuel_water: this.fuelwaterId,
      },
    };

    restServices.pbksb_MarineService
      .CancelBerthRequestFuelWaterStandAloneForm(this.appService.myApp)(param)
      .then((result) => {
        let res: any = result;
        let response = JSON.parse(res);
        // console.log(response);

        if (response.status != 'BAD_REQUEST') {
          this.createNotification('success', 'Cancelled', 'cancel');
          this.router.navigate([
            '/operation-system/marine-fuel-water-request-list',
          ]);
          this.openCancel = false;
        } else {
          this.createNotification('error', 'Cancel', 'cancel');
          this.openCancel = false;
        }
      })
      .catch((err) => {
        // console.log(err);
        this.createNotification('error', 'Cancel', 'cancel');
        this.openCancel = false;
      });
  }

  print() {
    this.logo = true;
    setTimeout(() => {
      window.print();
      this.logo = false;
    }, 500);
  }

  createNotification(type, keywords, status) {
    let title = '';
    let subtitle = '';

    if (status == 'submit') {
      if (type == 'success') {
        title = `Request ${keywords}`;
        subtitle = `Fuel Water form is successfully ${keywords.toLowerCase()}`;
      } else {
        title = `Cannot ${keywords}`;
        subtitle = `Fuel Water form failed to ${keywords.toLowerCase()}. Please try again`;
      }
    } else {
      if (type == 'success') {
        title = `Request ${keywords}`;
        subtitle = `Request is successfully ${keywords.toLowerCase()}`;
      } else {
        title = `Cannot ${keywords}`;
        subtitle = `Request failed to ${keywords.toLowerCase()}. Please try again`;
      }
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };
    this.appService.showToaster(successNotif);
  }

  viewJobTicket() {
    this.berthRequestFormService.setJobTicketPreview(false);
  }

  convertToTitleCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }

  endorseJob() {
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
          this.createNotification2('success', 'Endorse');
          this.router.navigate([
            '/operation-system/marine-endorse-fuelwater-list',
          ]);
          this.openModal = false;
        } else {
          this.openModal = false;
          this.createNotification2('error', 'Endorse');
        }
      })
      .catch((err) => {
        // console.log(err);
        this.openModal = false;
        this.createNotification2('error', 'Endorse');
      });
  }

  createNotification2(type, keywords) {
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

  createNotification3(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `Fuel Water is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `Fuel Water failed to ${keywords}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
  }

  submitAmmend() {
    let date = new Date();

    restServices.pbksb_MarineService
      .RejectFuelWaterStandAloneForm(this.appService.myApp)({
        jobticket: this.fuelwaterId,
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

  onblurAmend(event: any) {
    this.amendNotes = event.target.value;
  }
}
