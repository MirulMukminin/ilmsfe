import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { DetailBreakdownService } from '../services/MHE/detail-breakdown.service';

@Component({
  selector: 'app-mhe-request-preview-endorse',
  templateUrl: './mhe-request-preview-endorse.component.html',
  styleUrls: ['./mhe-request-preview-endorse.component.scss'],
  providers: [TitleCasePipe],
})
export class MheRequestPreviewEndorseComponent implements OnInit {
  requestNo: string = '';
  jobTicket: string = '';

  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    protected notificationService: NotificationService,
    public datepipe: DatePipe,
    private detailBreakdownService: DetailBreakdownService,
    private titlecasePipe: TitleCasePipe
  ) {}

  open = false;
  viewBooked: boolean = false;
  viewEndorse: boolean = false;
  viewBookedManpower: boolean = false;
  viewEndorseManpower: boolean = false;
  viewDelRequest: boolean = false;
  viewDelRequestConsole: boolean = false;
  viewDelMachinery: boolean = false;
  viewDelMachineryConsole: boolean = false;
  viewDelManpower: boolean = false;
  viewDelEquipment = false;
  disableCancelReq = false;

  disable: any = [];
  disableManpower: any = [];
  disableEquipment: any = [];
  machineryList = [];
  machineryConsoleList = [];
  manPowerList = [];
  equipmentList = [];
  requestForm = [];
  machineryItem = [];
  manPowerItem = [];
  equipmentItem = [];
  machineryConsoleItem = [];
  externalList = [];
  externalItem = [];
  recurringDateItem = [];
  recurringDateList = [];
  vesselList = [];

  requestType = '';
  companyName = '';
  requestBy = '';

  // NORMAL FORM
  requestNum = '';
  jobDesc = '';
  requestOnBehalf = '';
  PONumber = '';
  bookingType = '';
  bookingStartDate = '';
  bookingEndDate = '';
  remarks = '';
  dateSubmit = '';
  status = '';
  cancelDate = '';
  dateFlag = false;
  cancelRequest = false;

  // CONSOLE FORM
  requestNumConsole = '';
  jobDescConsole = '';
  requestOnBehalfConsole = '';
  bookingStartDateConsole = '';
  bookingEndDateConsole = '';
  estHours = '';
  estTrip = '';
  estGoods = '';
  remarksConsole = '';
  dateSubmitConsole = '';
  statusConsole = '';
  cancelDateConsole = '';
  refNo = '';

  mID = '';
  mNumber = 0;
  mItem = '';
  mQuantity = 0;
  mTime = '';
  mEstHours = '';
  mLocation = '';
  mCrew = '';
  mJobTicket = '';
  mUsageHrs = '';
  mStatus = '';
  mSelect = false;

  counterEquipment = 0;
  counterManpower = 0;
  counterMachinery = 0;
  counterMachineryConsole = 0;

  totalPrice = '';
  itemList: any = {};

  isLoading = false;
  overlay = false;
  special = false;

  flagCharge = false;
  flagNoCharge = false;

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        this.special = this.appService.special;
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        // this.companyName = initialData.Company;
        // this.requestBy = initialData.Fullname;
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
    const getCode = { RequestNumber: this.requestNo };
    //  const getCode: any = {RequestNumber: 'CH00000295'}

    restServices.pbksb_CustomerService
      .GetMHERequestFormPreview(this.appService.myApp)(getCode)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        this.requestForm = request.requestform;
        this.requestType = request.requestform.requestservicetype;
        this.companyName = request.requestform?.customer?.full_name;
        this.requestBy = request.requestform?.request_by?.username?.name;

        if (this.requestType == 'NORMAL') {
          this.requestNum = request.requestform.requestnumber;
          this.PONumber = request.requestform.po_number;
          this.status = request.requestform.status.replace(/_/g, ' ');
          this.status = this.titlecasePipe.transform(this.status);
          this.dateSubmit = request.requestform.datesubmit;

          this.bookingType = request.requestform.booking_type;
          this.jobDesc = request.requestform.job_description;
          this.remarks = request.requestform.remark;
          this.cancelDate = request.requestform.cancel_Date;
          this.requestOnBehalf = request.requestform.request_on_behalf;

          this.machineryList = request.machineryList;
          this.manPowerList = request.manPowerList;
          this.equipmentList = request.equipmentList;
          this.externalList = request.externalItemList;
          this.recurringDateList = request.jobMheDateRecurrings;

          let vessel = [];
          if (request.vesselRequestFormList) {
            vessel = request.vesselRequestFormList;

            for (let i = 0; i < vessel.length; i++) {
              this.vesselList.push(vessel[i].vessel.name);
            }
          }

          this.machineryItem = [];
          this.manPowerItem = [];
          this.equipmentItem = [];
          this.externalItem = [];

          if (!request.requestform.remark) {
            this.remarks = '-';
          }

          if (!request.requestform.cancel_Date) {
            this.cancelDate = '-';
          }

          if (
            this.status.toLowerCase().includes('cancel') ||
            this.status.toLowerCase().includes('complete')
          ) {
            this.disableCancelReq = true;
          }

          this.recurringDateItem = [];

          if (this.recurringDateList.length > 0) {
            this.recurringDateList.forEach((value, index) => {
              this.recurringDateItem.push({
                datestart: value.datestart,
                dateend: value.dateend,
              });
            });
          } else {
            this.bookingStartDate = request.requestform.booking_date_start;
            this.bookingEndDate = request.requestform.booking_date_end;
          }

          this.machineryList.forEach((value, index) => {
            this.apiRespValidation(value);
            this.pushDataSet(index);
          });

          this.sortAndCheckbox(this.machineryItem, this.disable);
          this.checkModalAndCancel(this.machineryItem);

          this.manPowerList.forEach((value, index) => {
            this.manPowerItem.push({
              mpID: value.job_MHE.id,
              number: index + 1,
              mpItem: value.machinery_position_handling.description,
              // mpQuantity: value.quantity,
              mpQuantity: 1,
              Time: value.job_MHE.job.date_start,
              estHours: value.estimated_hours,
              mpLocation: value.job_MHE.job.site.description,
              /* mpSpecificCrew: value.operator.employee.name, */
              mpSpecificCrew: 'N/A',
              JobTicket: value.job_MHE.job_ticket
                ? value.job_MHE.job_ticket
                : 'N/A',
              mpUsageHrs: value.session_time.totalhours,
              Status: this.titlecasePipe.transform(
                value.job_MHE.status.replace(/_/g, ' ')
              ),
              charge: false,
              mpSelect: false,
            });
          });

          this.sortAndCheckbox(this.manPowerItem, this.disableManpower);
          this.checkModalAndCancel(this.manPowerItem);

          this.equipmentList.forEach((value, index) => {
            this.equipmentItem.push({
              eqID: value.job_MHE.id,
              number: index + 1,
              item: value.machinery_type.description,
              // quantity: value.quantity,
              quantity: 1,
              Time: value.job_MHE.job.date_start,
              estHours: value.job_MHE.job.estimated_hours,
              location: value.job_MHE.job.site.description,
              JobTicket: value.job_MHE.job_ticket
                ? value.job_MHE.job_ticket
                : 'N/A',
              Status: this.titlecasePipe.transform(
                value.job_MHE.status.replace(/_/g, ' ')
              ),
              charge: false,
              select: false,
            });
          });

          this.sortAndCheckbox(this.equipmentItem, this.disableEquipment);
          this.checkModalAndCancel(this.equipmentItem);

          this.externalList.forEach((value, index) => {
            this.externalItem.push({
              id: value.external_Item.id,
              number: index + 1,
              quotationID: value.external_Item.quotation,
              item: value.external_Item.item,
              uom: value.external_Item.uom,
              quantity: value.external_Item.quantity,
              rentPeriod: value.external_Item.rent_period, //tbc
              unit: value.external_Item.unit,
              Time: value.external_Item.start_time, //tbc
              location: value.job_MHE.job.site.description,
              JobTicket: value.job_MHE.job_ticket
                ? value.job_MHE.job_ticket
                : 'N/A',
              usageHours: value.session_time.totalhours,
              // Status: value.external_Item.status,
              Status: this.titlecasePipe.transform(
                value.job_MHE.status.replace(/_/g, ' ')
              ),
              select: false,
            });
          });

          if (this.externalItem.length > 0) {
            this.externalItem = this.externalItem.sort((a, b) =>
              a.JobTicket.toLocaleLowerCase() > b.JobTicket.toLocaleLowerCase()
                ? 1
                : -1
            );
          }
          // this.checkModalAndCancel(this.externalItem)
        } else {
          this.requestNumConsole = request.requestform.requestnumber;
          this.statusConsole = request.requestform.status.replace(/_/g, ' ');
          this.statusConsole = this.titlecasePipe.transform(this.statusConsole);
          this.dateSubmitConsole = request.requestform.datesubmit;
          this.bookingStartDateConsole = request.requestform.booking_date_start;
          this.bookingEndDateConsole = request.requestform.booking_date_end;
          this.jobDescConsole = request.requestform.job_description;
          this.remarksConsole = request.requestform.remark;
          this.estHours = request.requestform.console_estimatedHour;
          this.estTrip = request.requestform.console_estimatedTrip;
          this.estGoods = request.requestform.console_estimatedQuantity;
          this.cancelDateConsole = request.requestform.cancel_Date;
          this.requestOnBehalfConsole = request.requestform.request_on_behalf;
          this.refNo = request.requestform.reference_number;

          if (!request.requestform.remark) {
            this.remarksConsole = '-';
          }

          if (!request.requestform.reference_number) {
            this.refNo = '-';
          }

          if (!request.requestform.cancel_Date) {
            this.cancelDateConsole = '-';
          }

          this.machineryConsoleList = request.machineryList;
          this.machineryConsoleList.forEach((value, index) => {
            this.machineryConsoleItem.push({
              ID: value.job_MHE.id,
              number: index + 1,
              Item: value.machinery_type.description,
              Quantity: value.quantity,
              Time: value.job_MHE.job.date_start,
              Location: value.job_MHE.job.site.description,
              JobTicket: value.job_MHE.job_ticket
                ? value.job_MHE.job_ticket
                : 'N/A',
              Status: this.titlecasePipe.transform(
                value.job_MHE.status.replace(/_/g, ' ')
              ),
              charge: false,
              Select: false,
            });
          });

          this.sortAndCheckbox(this.machineryConsoleItem, this.disable);
          this.checkModalAndCancel(this.machineryConsoleItem);
        }

        if (
          this.statusConsole.toLowerCase().includes('cancel') ||
          this.statusConsole.toLowerCase().includes('endorse')
        ) {
          this.disableCancelReq = true;
        }

        // this.checkDateJob();
      });

    // --> Get Estimated Price Using GetPageDetailBreakDown API
    const get_code = { RequestNumber: this.requestNo };
    restServices.pbksb_CustomerService
      .GetPageDetailBreakDown(this.appService.myApp)(get_code)
      .then((result_items) => {
        let requestItem: any = result_items;
        let items = JSON.parse(requestItem);
        this.totalPrice = this.addZeroes(items.TotalEstimatedPrice);
        // console.log('endorsed page');
        // this.detailBreakdownService.setItemList(items);

        let i = 0;
        items.items.forEach((element, index) => {
          if (element.subnumber == 1) {
            element.number = i++;
          } else {
            element.number = 0;
          }
          element.price = this.addZeroes(element.price);
        });

        this.itemList = items;
        // console.log(this.itemList);
      });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  addZeroes(num) {
    const dec = num.toString().split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return this.numberWithCommas(Number(num).toFixed(len));
  }

  sortAndCheckbox(array, disable) {
    if (array.length > 0) {
      array.sort((a, b) => {
        if (this.getTimeTest(a.Time) == this.getTimeTest(b.Time)) {
          return a.JobTicket.toLocaleLowerCase() >
            b.JobTicket.toLocaleLowerCase()
            ? 1
            : -1;
        } else {
          return this.getTimeTest(a.Time) - this.getTimeTest(b.Time);
        }
      });
    }

    for (let i = 0; i < array.length; i++) {
      if (
        array[i].Status.toLowerCase().includes('cancel') ||
        array[i].Status.toLowerCase().includes('endorse') ||
        array[i].Status.toLowerCase().includes('complete')
      ) {
        disable[i] = true;
      } else {
        disable[i] = false;
      }
    }
  }

  checkModalAndCancel(array) {
    let date = new Date();
    let todayDate =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      ('0' + date.getDate()).slice(-2);
    let options = { hour12: false };

    // addTwoHourNowTime is add current time with 2 hours
    let addTwoHourNowTime = new Date(
      new Date(date).setHours(date.getHours() + 2)
    );
    let currentHourWithaddTwoHour = addTwoHourNowTime.toLocaleTimeString(
      'en-us',
      options
    );

    for (let i = 0; i < array.length; i++) {
      //get Date and Time from table
      let dateTimeInput = new Date(array[i].Time);
      let dateInput =
        dateTimeInput.getFullYear() +
        '-' +
        (dateTimeInput.getMonth() + 1) +
        '-' +
        ('0' + dateTimeInput.getDate()).slice(-2);
      let timeInput = dateTimeInput.toLocaleTimeString('en-us', options);

      let dateInputWithEstHours = new Date(
        new Date(dateTimeInput).setHours(
          dateTimeInput.getHours() + array[i].estHours
        )
      );
      let timeWithEstHours = dateInputWithEstHours.toLocaleTimeString(
        'en-us',
        options
      );

      // nowTimeCompare to compare time finish with current time
      let nowTime = new Date(new Date(date).setHours(date.getHours()));
      let nowTimeCompare = nowTime.toLocaleTimeString('en-us', options);

      if (dateInput == todayDate) {
        if (
          array[i].Status.toLowerCase().includes('booked') ||
          array[i].Status.toLowerCase().includes('progress') ||
          array[i].Status.toLowerCase().includes('waiting')
        ) {
          if (currentHourWithaddTwoHour >= timeInput) {
            this.dateFlag = true;
            this.cancelRequest = true;
            array[i].charge = true;
          } else if (
            nowTimeCompare >= timeInput &&
            nowTimeCompare <= timeWithEstHours
          ) {
            this.dateFlag = true;
            this.cancelRequest = true;
            array[i].charge = true;
          } else if (timeInput <= nowTimeCompare) {
            this.dateFlag = true;
            this.cancelRequest = true;
            array[i].charge = true;
          } else {
            array[i].charge = false;
          }
        }
      } else if (dateInput < todayDate) {
        if (
          array[i].Status.toLowerCase().includes('booked') ||
          array[i].Status.toLowerCase().includes('progress') ||
          array[i].Status.toLowerCase().includes('waiting')
        ) {
          this.dateFlag = true;
          array[i].charge = true;
        }
      }
    }
  }

  notPending() {
    return this.status.toLowerCase().includes('pending');
  }

  checkLengthMachinery() {
    return this.machineryItem.some((item) => item.Select == true);
  }

  checkLengthMachineryConsole() {
    return this.machineryConsoleItem.some((item) => item.Select == true);
  }

  checkLengthManPower() {
    return this.manPowerItem.some((item) => item.mpSelect == true);
  }

  checkLengthEquipment() {
    return this.equipmentItem.some((item) => item.select == true);
  }

  async deleteJobRequest() {
    this.isLoading = true;
    this.overlay = true;

    if (this.machineryItem.length > 0) {
      await this.deleteJobTicket(this.machineryItem, 'machinery', 'ID');
    }

    if (this.manPowerItem.length > 0) {
      await this.deleteJobTicket(this.manPowerItem, 'manpower', 'mpID');
    }

    if (this.equipmentItem.length > 0) {
      await this.deleteJobTicket(this.equipmentItem, 'equipment', 'eqID');
    }

    const getCodeDelete = { RequestNumber: this.requestNo };
    restServices.pbksb_CustomerService
      .UpdateCancelRequestNumber(this.appService.myApp)(getCodeDelete)
      .then((result) => {
        console.log(result);

        if (result) {
          console.log('success');
        }
      })
      .catch((err) => {
        console.log(err);
        this.open = false;
        this.catchCancelRequest();
      })
      .finally(() => {
        this.open = false;
        this.isLoading = false;
        this.overlay = false;
        this.ngOnInit();
      });
  }

  async deleteJobTicket(object: any, type: any, ticket: any) {
    for (const value of object) {
      let jt = value[ticket];
      const getCodeDelete = { jobMheID: value[ticket] };

      console.log(getCodeDelete);
      const result = await restServices.pbksb_CustomerService
        .UpdateCancelJobTicket(this.appService.myApp)(getCodeDelete)
        .then((result) => {
          let request: any = result;
          let response = JSON.parse(request);
          if (response.success) {
            console.log(result, ` success ${type} `, jt);
            // resolve('success equipment');
          } else {
            console.log(result, ` failed ${type} `, jt);
            this.open = false;
            this.catchCancelJobTicket(jt);
          }
        })
        .catch((err) => {
          console.log(err);
          this.open = false;
          this.catchCancelJobTicket(jt);
        });
    }
  }

  async deleteJobRequestConsole() {
    this.isLoading = true;
    this.overlay = true;

    if (this.machineryConsoleItem.length > 0) {
      await this.deleteJobTicket(
        this.machineryConsoleItem,
        'machinery',
        'JobTicket'
      );
    }

    const getCodeDelete = { RequestNumber: this.requestNo };
    restServices.pbksb_CustomerService
      .UpdateCancelRequestNumber(this.appService.myApp)(getCodeDelete)
      .then((result) => {
        console.log(result);

        if (result) {
          console.log('success');
        }
      })
      .catch((err) => {
        console.log(err);
        this.open = false;
        this.catchCancelRequest();
      })
      .finally(() => {
        this.open = false;
        this.isLoading = false;
        this.overlay = false;
        this.machineryConsoleItem = [];
        this.ngOnInit();
      });
  }

  catchCancelRequest() {
    this.notificationService.showToast({
      type: 'error',
      title: 'Delete Error',
      subtitle: 'Request no. ' + this.requestNo + ' is not cancelled.',
      target: '.notification-container',
      message: 'message',
      lowContrast: true,
    });
  }

  catchCancelJobTicket(jt) {
    this.notificationService.showToast({
      type: 'error',
      title: 'Delete Error',
      subtitle: 'Job Ticket ' + jt + ' is not cancelled.',
      target: '.notification-container',
      message: 'message',
      lowContrast: true,
    });
  }

  deleteJobMachinery() {
    this.machineryItem.forEach((ticket) => {
      if (ticket.Select == true) {
        const getCodeDelete = { jobMheID: ticket.ID };
        console.log(getCodeDelete);
        restServices.pbksb_CustomerService
          .UpdateCancelJobTicket(this.appService.myApp)(getCodeDelete)
          .then((result) => {
            let resArr: any = result;
            let info = JSON.parse(resArr);

            if (info.success !== false) {
              this.counterMachinery = 0;
              this.ngOnInit();
            } else {
              this.open = false;
              this.catchCancelJobTicket(ticket.JobTicket);
            }
          })
          .catch((err) => {
            console.log(err);
            this.open = false;
            this.catchCancelJobTicket(ticket.JobTicket);
          });
        this.open = false;
      }
    });
  }

  deleteJobManPower() {
    this.manPowerItem.forEach((ticket) => {
      if (ticket.mpSelect == true) {
        const getCodeDelete = { jobMheID: ticket.mpID };
        restServices.pbksb_CustomerService
          .UpdateCancelJobTicket(this.appService.myApp)(getCodeDelete)
          .then((result) => {
            let resArr: any = result;
            let info = JSON.parse(resArr);

            if (info.success !== false) {
              this.counterManpower = 0;

              this.ngOnInit();
            } else {
              this.open = false;
              this.catchCancelJobTicket(ticket.JobTicket);
            }
          })
          .catch((err) => {
            console.log(err);
            this.open = false;
            this.catchCancelJobTicket(ticket.JobTicket);
          });
        this.open = false;
      }
    });
  }

  deleteJobEquipment() {
    this.equipmentItem.forEach((ticket) => {
      if (ticket.select == true) {
        const getCodeDelete = { jobMheID: ticket.eqID };
        restServices.pbksb_CustomerService
          .UpdateCancelJobTicket(this.appService.myApp)(getCodeDelete)
          .then((result) => {
            let resArr: any = result;
            let info = JSON.parse(resArr);

            if (info.success !== false) {
              this.counterEquipment = 0;

              this.ngOnInit();
            } else {
              this.open = false;
              this.catchCancelJobTicket(ticket.JobTicket);
            }
          })
          .catch((err) => {
            console.log(err);
            this.open = false;
            this.catchCancelJobTicket(ticket.JobTicket);
          });
        this.open = false;
      }
    });
  }

  deleteJobMachineryConsole() {
    this.machineryConsoleItem.forEach((ticket) => {
      if (ticket.Select == true) {
        const getCodeDelete = { jobMheID: ticket.ID };
        restServices.pbksb_CustomerService
          .UpdateCancelJobTicket(this.appService.myApp)(getCodeDelete)
          .then((result) => {
            let resArr: any = result;
            let info = JSON.parse(resArr);

            if (info.success !== false) {
              this.counterMachineryConsole = 0;

              this.ngOnInit();
            } else {
              this.open = false;
              this.catchCancelJobTicket(ticket.JobTicket);
            }
          })
          .catch((err) => {
            console.log(err);
            this.open = false;
            this.catchCancelJobTicket(ticket.JobTicket);
          });
        this.open = false;
      }
    });
  }

  cancelDelJobMachinery() {
    this.machineryItem.forEach((ticket) => {
      if (ticket.Select) {
        ticket.Select = false;
      }
    });
    this.counterMachinery = 0;
  }
  cancelDelJobMachineryConsole() {
    this.machineryConsoleItem.forEach((ticket) => {
      if (ticket.Select) {
        ticket.Select = false;
      }
    });
    this.counterMachineryConsole = 0;
  }
  cancelDelJobManPower() {
    this.manPowerItem.forEach((ticket) => {
      if (ticket.mpSelect) {
        ticket.mpSelect = false;
      }
    });
    this.counterManpower = 0;
  }

  cancelDelEquipment() {
    this.equipmentItem.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterEquipment = 0;
    this.flagCharge = false;
  }

  openModalMachineryDel() {
    this.open = true;
    this.viewDelMachinery = true;
    this.viewDelRequest = false;
    this.viewDelManpower = false;
    this.viewDelEquipment = false;
  }

  openModalManpowerDel() {
    this.open = true;
    this.viewDelManpower = true;
    this.viewDelRequest = false;
    this.viewDelMachinery = false;
    this.viewDelEquipment = false;
  }

  openModalEquipmentDel() {
    this.open = true;
    this.viewDelManpower = false;
    this.viewDelRequest = false;
    this.viewDelMachinery = false;
    this.viewDelEquipment = true;
  }

  openModalDelRequest() {
    this.open = true;

    if (this.cancelRequest == true) {
      this.flagCharge = true;
    } else {
      this.flagNoCharge = true;
    }

    this.viewDelRequest = true;
    this.viewDelManpower = false;
    this.viewDelMachinery = false;
    this.viewDelEquipment = false;
  }
  openModalDelRequestConsole() {
    this.open = true;
    this.viewDelRequestConsole = true;
    this.viewDelMachineryConsole = false;
  }

  openModalMachineryDelConsole() {
    this.open = true;
    this.viewDelMachineryConsole = true;
    this.viewDelRequestConsole = false;
  }

  closeModal() {
    this.open = false;

    this.cancelDelJobMachinery();
    this.cancelDelJobManPower();
    this.cancelDelJobMachineryConsole();
    this.cancelDelEquipment();

    this.flagNoCharge = false;
    this.flagCharge = false;
  }

  machineryCheckboxChange(event: any, charge) {
    if (event === true) {
      this.counterMachinery++;
      if (event == charge) {
        this.flagCharge = true;
        this.flagNoCharge = false;
      } else {
        this.flagCharge = false;
        this.flagNoCharge = true;
      }
    } else if (event == false) {
      this.counterMachinery--;
      this.flagCharge = false;
      this.flagNoCharge = false;
    }
  }

  machineryConsoleCheckboxChange(event: any, charge) {
    if (event === true) {
      this.counterMachineryConsole++;
      if (event == charge) {
        this.flagCharge = true;
        this.flagNoCharge = false;
      } else {
        this.flagCharge = false;
        this.flagNoCharge = true;
      }
    } else if (event == false) {
      this.counterMachineryConsole--;
      this.flagCharge = false;
      this.flagNoCharge = false;
    }
  }

  manpowerCheckboxChange(event: any, charge) {
    if (event === true) {
      this.counterManpower++;
      if (event == charge) {
        this.flagCharge = true;
        this.flagNoCharge = false;
      } else {
        this.flagCharge = false;
        this.flagNoCharge = true;
      }
    } else if (event == false) {
      this.counterManpower--;
      this.flagCharge = false;
      this.flagNoCharge = false;
    }
  }

  equipmentCheckboxChange(event: any, charge) {
    if (event === true) {
      this.counterEquipment++;
      if (event == charge) {
        this.flagCharge = true;
        this.flagNoCharge = false;
      } else {
        this.flagCharge = false;
        this.flagNoCharge = true;
      }
    } else if (event == false) {
      this.counterEquipment--;
      this.flagCharge = false;
      this.flagNoCharge = false;
    }
  }

  apiRespValidation(value: any) {
    if (value.job_MHE.id) {
      this.mID = value.job_MHE.id;
    } else {
      this.mID = 'N/A';
    }
    if (value.machinery_type.description) {
      this.mItem = value.machinery_type.description;
    } else {
      this.mItem = 'N/A';
    }
    if (value.job_MHE.status) {
      this.mStatus = this.titlecasePipe.transform(
        value.job_MHE.status.replace(/_/g, ' ')
      );
    } else {
      this.mStatus = 'N/A';
    }

    if (value.quantity) {
      this.mQuantity = value.quantity;
    } else {
      this.mQuantity = 0;
    }
    if (value.job_MHE.job.date_start) {
      //api incomplete
      this.mTime = value.job_MHE.job.date_start;
    } else {
      this.mTime = 'N/A';
    }
    if (value.estimated_hours) {
      //api incomplete

      this.mEstHours = value.estimated_hours;
    } else {
      this.mEstHours = 'N/A';
    }
    if (value.job_MHE.job.site.description) {
      this.mLocation = value.job_MHE.job.site.description;
    } else {
      this.mLocation = 'N/A';
    }
    if (value.crew) {
      //api incomplete

      this.mCrew = value.crew;
    } else {
      this.mCrew = 'N/A';
    }
    if (value.job_MHE.job_ticket) {
      this.mJobTicket = value.job_MHE.job_ticket;
    } else {
      this.mJobTicket = 'N/A';
    }
    if (value.session_time.totalhours) {
      this.mUsageHrs = value.session_time.totalhours;
    } else {
      this.mUsageHrs = 'N/A';
    }
  }

  pushDataSet(index: any) {
    this.machineryItem.push({
      ID: this.mID,
      number: index + 1,
      Item: this.mItem,
      // Quantity: this.mQuantity,
      Quantity: 1,
      Time: this.mTime,
      estHours: this.mEstHours,
      Location: this.mLocation,
      SpecificCrew: this.mCrew, //api incomplete
      JobTicket: this.mJobTicket,
      UsageHrs: this.mUsageHrs,
      Status: this.titlecasePipe.transform(this.mStatus.replace(/_/g, ' ')),
      charge: false,
      Select: false,
    });
  }

  getTimeTest(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
  }
}
