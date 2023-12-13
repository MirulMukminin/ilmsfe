import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AuthService } from 'src/app/auth/auth.service';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-mhe-job-ticket-preview',
  templateUrl: './mhe-job-ticket-preview.component.html',
  styleUrls: ['./mhe-job-ticket-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class MheJobTicketPreviewComponent implements OnInit {
  jobNo: string = '';

  amendNotes = '';
  strJobTicket = '';
  strJRNumber = '';
  strLocation = '';
  strCompanyFirstName = '';
  strCompanyMiddleName = '';
  strCompanyLastName = '';
  strCompanyName = '';
  strRequestNumber = '';
  strRequestType = '';
  strRequestBy = '';
  strRequestDate = '';
  strJobDescription = '';
  strRequestOnBehalf = '';
  strPONumber = '';
  strRefNumber = '';
  strBookingType = '';
  strDateStart = '';
  strDateEnd = '';
  strStatus = '';
  strStatus1 = '';
  strRemark = '';
  strDate = '';

  endorseState = false;
  ammendState = true;

  machineryState = false;
  manPowerState = false;
  equipmentState = false;
  externalItemState = false;

  jobTicketContent: any = {};
  machineRow = [];
  manPowerRow = [];
  otherMachineryRow = [];
  externalItemRow = [];
  jobMmachinery = {};

  rowNo = 0;

  openModal = false;
  openModalAmmend = false;
  vesselList = [];

  userType = '';
  userTypeSub;
  roleSub;
  roles = [];
  endorserArr = [];

  currentUserid = '';

  constructor(
    private _Activatedroute: ActivatedRoute,
    protected appService: AppService,
    private router: Router,
    private auth: AuthService,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.jobNo = this._Activatedroute.snapshot.paramMap.get('jobNo');

    this.userInfo();
    // this.getRestQueryAPI(this.jobNo);
    this.getUserType();
  }
  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        console.log('userInfo', userInfo);
        const initialData = this.appService.populateInitData(userInfo);
        console.log('initialData', initialData);

        this.currentUserid = initialData.UserID;
        console.log('this.currentUserid', this.currentUserid);
        // this.getRestQueryAPI(initialData.Company);
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

  getUserType() {
    this.userTypeSub = this.auth.getUserType();
    console.log('userTypeSub', this.userTypeSub);
    this.userTypeSub.subscribe((val) => {
      if (val) {
        this.userType = JSON.parse(val);
      }
      console.log('userType: ', this.userType);
      this.getRestQueryAPI(this.jobNo);
    });
  }

  open: boolean = false;

  onPrint() {
    window.print();
  }

  getRestQueryAPI(jobNo: string) {
    const getCode: any = { jobticket: jobNo };

    //hardcode jobticket post param
    //const getCode: any = { jobticket: 'CH00000387/001' }
    restServices.pbksb_CustomerService
      .GetMHEJobDetailsByJobTicket(this.appService.myApp)(getCode)
      .then((result) => {
        //this.jobTicketContent = result;
        const resArr: any = result;
        this.jobTicketContent = JSON.parse(resArr);
        //console.log(this.jobTicketContent);

        //show or hide table if data doesnt exist

        if (this.jobTicketContent.manPowerList.length != 0) {
          this.manPowerState = true;
        }
        if (this.jobTicketContent.equipmentList.length != 0) {
          this.equipmentState = true;
        }
        // if (this.jobTicketContent.externalItemList.length != 0) {
        //   this.externalItemState = true;
        // }
        // if (this.jobTicketContent.machineryList.length != 0) {
        //   if (
        //     this.jobTicketContent.job_mhe.job_mhe_service_type == 'MACHINERY'
        //   ) {
        //     this.machineryState = true;
        //   } else if (
        //     this.jobTicketContent.job_mhe.job_mhe_service_type ==
        //     'EXTERNAL_ITEM'
        //   ) {
        //     this.machineryState = true;
        //   }
        // }

        let vessel = [];
        if (this.jobTicketContent.vesselRequestFormList) {
          vessel = this.jobTicketContent.vesselRequestFormList;

          for (let i = 0; i < vessel.length; i++) {
            this.vesselList.push(vessel[i].vessel.name);
          }
        }

        if (this.jobTicketContent.machineryList.length != 0) {
          this.machineryState = true;
        }
        if (this.jobTicketContent.job_mhe.job_ticket) {
          this.strJobTicket = this.jobTicketContent.job_mhe.job_ticket;
        } else {
          this.strJobTicket = 'N/A';
        }
        if (this.jobTicketContent.requestform.requestnumber) {
          this.strJRNumber = this.jobTicketContent.requestform.requestnumber;
        } else {
          this.strJRNumber = 'N/A';
        }
        if (this.jobTicketContent.job_mhe.job.site.description) {
          this.strLocation = this.jobTicketContent.job_mhe.job.site.description;
        } else {
          this.strLocation = 'N/A';
        }
        if (this.jobTicketContent.requestform.customer.full_name) {
          this.strCompanyName =
            this.jobTicketContent.requestform.customer.full_name;
        } else {
          this.strCompanyName = 'N/A';
        }
        if (this.jobTicketContent.requestform.requestnumber) {
          this.strRequestNumber =
            this.jobTicketContent.requestform.requestnumber;
        } else {
          this.strRequestNumber = 'N/A';
        }
        if (this.jobTicketContent.requestform.requestservicetype) {
          this.strRequestType =
            this.jobTicketContent.requestform.requestservicetype;
        } else {
          this.strRequestType = 'N/A';
        }
        if (this.jobTicketContent.requestform.request_by.username.name) {
          this.strRequestBy =
            this.jobTicketContent.requestform.request_by.username.name;
        } else {
          this.strRequestBy = 'N/A';
        }
        if (this.jobTicketContent.requestform.datesubmit) {
          this.strRequestDate = formatDate(
            this.jobTicketContent.requestform.datesubmit,
            'dd/MM/yyyy',
            'en_US'
          );
        } else {
          this.strRequestDate = 'N/A';
        }
        if (this.jobTicketContent.requestform.job_description) {
          this.strJobDescription =
            this.jobTicketContent.requestform.job_description;
        } else {
          this.strJobDescription = 'N/A';
        }
        if (this.jobTicketContent.requestform.request_on_behalf) {
          this.strRequestOnBehalf =
            this.jobTicketContent.requestform.request_on_behalf;
        } else {
          this.strRequestOnBehalf = 'N/A';
        }
        if (this.jobTicketContent.requestform.po_number) {
          this.strPONumber = this.jobTicketContent.requestform.po_number;
        } else {
          this.strPONumber = 'N/A';
        }
        if (this.jobTicketContent.requestform.reference_number) {
          this.strRefNumber =
            this.jobTicketContent.requestform.reference_number;
        } else {
          this.strRefNumber = 'N/A';
        }
        if (this.jobTicketContent.requestform.booking_type) {
          this.strBookingType = this.jobTicketContent.requestform.booking_type;
        } else {
          this.strBookingType = 'N/A';
        }

        if (this.jobTicketContent.requestform.booking_date_start) {
          this.strDateStart = formatDate(
            this.jobTicketContent.requestform.booking_date_start,
            'dd/MM/yyyy',
            'en_US'
          );
        } else {
          this.strDateStart = 'N/A';
        }
        if (this.jobTicketContent.requestform.booking_date_end) {
          this.strDateEnd = formatDate(
            this.jobTicketContent.requestform.booking_date_end,
            'dd/MM/yyyy',
            'en_US'
          );
        } else {
          this.strDateEnd = 'N/A';
        }

        if (this.jobTicketContent.job_mhe.status) {
          this.strStatus = this.jobTicketContent.job_mhe.status;
          console.log('this.strStatus', this.strStatus);

          // if( this.strStatus == 'PENDING_ENDORSEMENT'){
          //   this.strStatus ='Pending Endorsement';
          // }
          if (
            this.strStatus == 'PENDING_ENDORSEMENT' &&
            this.userType == 'ENDORSER'
          ) {
            this.endorseState = true;
          }
          if (this.strStatus == 'ENDORSED' || this.strStatus == 'CANCELLED') {
            console.log('in');
            console.log(this.ammendState);

            this.ammendState = false;
          }
          this.strStatus1 = this.titlecasePipe.transform(
            this.jobTicketContent.job_mhe.status.replace(/_/g, ' ')
          );
          console.log('this.strStatus1', this.strStatus1);
          console.log(this.strStatus1);
          console.log('endorseState: ', this.endorseState);
        } else {
          this.strStatus1 = 'N/A';
        }

        if (this.jobTicketContent.mheEndorserMap?.length > 0) {
          let mheEndorserMap = this.jobTicketContent.mheEndorserMap;
          mheEndorserMap.sort((a, b) => {
            console.log('a.date', a.date);
            console.log('b.date', b.date);
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
          console.log('mheEndorserMap: ', mheEndorserMap);
          mheEndorserMap.forEach((value, index) => {
            let endorsedDate = '';
            let endorsedBy = '';
            if (value.customerUser.username.id === this.currentUserid) {
              this.endorseState = false;
            }
            if (value.date) {
              endorsedDate = formatDate(
                value.date,
                'dd/MM/yyyy HH:mm',
                'en_US'
              );
            }

            if (value.customerUser) {
              endorsedBy = value.customerUser.fullname;
            }

            this.endorserArr.push({
              endorsedDate: endorsedDate,
              endorsedBy: endorsedBy,
            });
          });
        }

        if (this.jobTicketContent.job_mhe.remarks) {
          this.strRemark = this.jobTicketContent.job_mhe.remarks;
        } else {
          this.strRemark = '-';
        }

        if (this.jobTicketContent.job_mhe.dateCompleted) {
          this.strDate = formatDate(
            this.jobTicketContent.job_mhe.dateCompleted,
            'dd/MM/yyyy',
            'en_US'
          );
        } else {
          this.strDate = '-';
        }

        //this.machineRow = this.jobTicketContent.machineryList;
        //console.log(this.machineRow);
        this.jobTicketContent.machineryList.forEach((value) => {
          //console.log(value);
          this.rowNo += 1;
          // let machineID = 'N/A';
          let machineID = this.rowNo;
          let machineItem = 'N/A';
          let machineQuantity = 'N/A';
          let machineSesh1Start = ' - ';
          let machineSesh1End = ' - ';
          let machineSesh1Hours = ' - ';
          let machineSesh2Start = ' - ';
          let machineSesh2End = ' - ';
          let machineSesh2Hours = ' - ';
          let machineSesh3Start = ' - ';
          let machineSesh3End = ' - ';
          let machineSesh3Hours = ' - ';
          let machineSesh4Start = ' - ';
          let machineSesh4End = ' - ';
          let machineSesh4Hours = ' - ';
          let machineTotalHours = 'N/A';
          let machineRemark = ' - ';

          // if (value.num) {
          //   machineID = value.num;
          // }
          if (value.category == 'MACHINE') {
            if (value.machinery_type) {
              if (value.machinery_type.description) {
                machineItem = value.machinery_type.description;
              }
            }
          } else if (value.category == 'OPERATOR') {
            if (value.operator) {
              if (value.operator.position.description) {
                machineItem =
                  value.operator.position.designation_id +
                  ' - ' +
                  value.operator.position.description +
                  ' : ' +
                  value.operator.employee.name;
              }
            } else {
              if (value.machinery_type) {
                if (value.machinery_type.description) {
                  machineItem =
                    value.machinery_type.description + ' - Operator';
                }
              }
            }
          }

          if (value.quantity) {
            machineQuantity = value.quantity;
          }

          if (value.session_time.sess1_start) {
            var start = value.session_time.sess1_start;
            var date = this.toTime(start);
            machineSesh1Start = formatDate(date, 'H:mm', 'en_US');
          }
          if (value.session_time.sess1_end) {
            //machineSesh1End = value.session_time.sess1_end;
            var start = value.session_time.sess1_end;
            var date = this.toTime(start);
            machineSesh1End = formatDate(date, 'H:mm', 'en_US');
          }
          if (
            value.session_time.sess1Hours ||
            value.session_time.sess1Hours == 0
          ) {
            machineSesh1Hours = value.session_time.sess1Hours;
          }
          if (value.session_time.sess2_start) {
            //machineSesh2Start = value.session_time.sess2_start;
            var start = value.session_time.sess2_start;
            var date = this.toTime(start);
            machineSesh2Start = formatDate(date, 'H:mm', 'en_US');
          }
          if (value.session_time.sess2_end) {
            //machineSesh2End = value.session_time.sess2_end;
            var start = value.session_time.sess2_end;
            var date = this.toTime(start);
            machineSesh2End = formatDate(date, 'H:mm', 'en_US');
          }
          if (
            value.session_time.sess2Hours ||
            value.session_time.sess2Hours == 0
          ) {
            machineSesh2Hours = value.session_time.sess2Hours;
          }
          if (value.session_time.sess3_start) {
            //machineSesh3Start = value.session_time.sess3_start;
            var start = value.session_time.sess3_start;
            var date = this.toTime(start);
            machineSesh3Start = formatDate(date, 'H:mm', 'en_US');
          }
          if (value.session_time.sess3_end) {
            //machineSesh3End = value.session_time.sess3_end;
            var start = value.session_time.sess3_end;
            var date = this.toTime(start);
            machineSesh3End = formatDate(date, 'H:mm', 'en_US');
          }
          if (
            value.session_time.sess3Hours ||
            value.session_time.sess3Hours == 0
          ) {
            machineSesh3Hours = value.session_time.sess3Hours;
          }
          if (value.session_time.sess4_start) {
            //machineSesh3Start = value.session_time.sess3_start;
            var start = value.session_time.sess4_start;
            var date = this.toTime(start);
            machineSesh4Start = formatDate(date, 'H:mm', 'en_US');
          }
          if (value.session_time.sess4_end) {
            //machineSesh3End = value.session_time.sess3_end;
            var start = value.session_time.sess4_end;
            var date = this.toTime(start);
            machineSesh4End = formatDate(date, 'H:mm', 'en_US');
          }
          if (
            value.session_time.sess4Hours ||
            value.session_time.sess4Hours == 0
          ) {
            machineSesh4Hours = value.session_time.sess4Hours;
          }
          if (value.session_time.remarks) {
            machineRemark = value.session_time.remarks;
          }
          if (value.session_time.totalhours) {
            machineTotalHours = value.session_time.totalhours;
          }

          this.machineRow.push({
            id: machineID,
            // item: this.jobTicketContent[0].machinery.operator.machine_operate._instanceName,
            item: machineItem,
            quantity: machineQuantity,
            Sesh1Start: machineSesh1Start,
            Sesh1End: machineSesh1End,
            Sesh1Hours: machineSesh1Hours,
            Sesh2Start: machineSesh2Start,
            Sesh2End: machineSesh2End,
            Sesh2Hours: machineSesh2Hours,
            Sesh3Start: machineSesh3Start,
            Sesh3End: machineSesh3End,
            Sesh3Hours: machineSesh3Hours,
            Sesh4Start: machineSesh4Start,
            Sesh4End: machineSesh4End,
            Sesh4Hours: machineSesh4Hours,
            totalHours: machineTotalHours,
            remark: machineRemark,
          });
        });

        this.jobTicketContent.manPowerList.forEach((value) => {
          this.rowNo += 1;
          // let manPowerID = 'N/A';
          let manPowerID = this.rowNo;
          let manPowerItem = 'N/A';
          let manPowerQuantity = 'N/A';
          let manPowerSesh1Start = ' - ';
          let manPowerSesh1End = ' - ';
          let manPowerSesh1Hours = ' - ';
          let manPowerSesh2Start = ' - ';
          let manPowerSesh2End = ' - ';
          let manPowerSesh2Hours = ' - ';
          let manPowerSesh3Start = ' - ';
          let manPowerSesh3End = ' - ';
          let manPowerSesh3Hours = ' - ';
          let manPowerSesh4Start = ' - ';
          let manPowerSesh4End = ' - ';
          let manPowerSesh4Hours = ' - ';
          let manPowerTotalHours = 'N/A';
          let manPowerRemark = ' - ';

          // if (value.num) {
          //   manPowerID = value.num;
          // }

          // add operator
          let operator = [];

          if (value.machinery_position_handling.description) {
            manPowerItem = value.machinery_position_handling.description;
          }

          if (value.job_MHE.job.quantity) {
            manPowerQuantity = value.quantity;
          }

          if (value.session_time) {
            if (value.session_time.sess1_start) {
              //manPowerSesh1Start = value.session_time.sess1_start;
              var start = value.session_time.sess1_start;
              var date = this.toTime(start);
              manPowerSesh1Start = formatDate(date, 'H:mm', 'en_US');
            }
            if (value.session_time.sess1_end) {
              //manPowerSesh1End = value.session_time.sess1_end;
              var start = value.session_time.sess1_end;
              var date = this.toTime(start);
              manPowerSesh1End = formatDate(date, 'H:mm', 'en_US');
            }
            if (
              value.session_time.sess1Hours ||
              value.session_time.sess1Hours == 0
            ) {
              manPowerSesh1Hours = value.session_time.sess1Hours;
            }
            if (value.session_time.sess2_start) {
              //manPowerSesh2Start = value.session_time.sess2_start;
              var start = value.session_time.sess2_start;
              var date = this.toTime(start);
              manPowerSesh2Start = formatDate(date, 'H:mm', 'en_US');
            }
            if (value.session_time.sess2_end) {
              //manPowerSesh2End = value.session_time.sess2_end;
              var start = value.session_time.sess2_end;
              var date = this.toTime(start);
              manPowerSesh2End = formatDate(date, 'H:mm', 'en_US');
            }
            if (
              value.session_time.sess2Hours ||
              value.session_time.sess2Hours == 0
            ) {
              manPowerSesh2Hours = value.session_time.sess2Hours;
            }
            if (value.session_time.sess3_start) {
              //manPowerSesh3Start = value.session_time.sess3_start;
              var start = value.session_time.sess3_start;
              var date = this.toTime(start);
              manPowerSesh3Start = formatDate(date, 'H:mm', 'en_US');
            }
            if (value.session_time.sess3_end) {
              //manPowerSesh3End = value.session_time.sess3_end;
              var start = value.session_time.sess3_end;
              var date = this.toTime(start);
              manPowerSesh3End = formatDate(date, 'H:mm', 'en_US');
            }
            if (
              value.session_time.sess3Hours ||
              value.session_time.sess3Hours == 0
            ) {
              manPowerSesh3Hours = value.session_time.sess3Hours;
            }
            if (value.session_time.sess4_start) {
              //manPowerSesh3Start = value.session_time.sess3_start;
              var start = value.session_time.sess4_start;
              var date = this.toTime(start);
              manPowerSesh4Start = formatDate(date, 'H:mm', 'en_US');
            }
            if (value.session_time.sess4_end) {
              //manPowerSesh3End = value.session_time.sess3_end;
              var start = value.session_time.sess4_end;
              var date = this.toTime(start);
              manPowerSesh4End = formatDate(date, 'H:mm', 'en_US');
            }
            if (
              value.session_time.sess4Hours ||
              value.session_time.sess4Hours == 0
            ) {
              manPowerSesh4Hours = value.session_time.sess4Hours;
            }
          }

          if (value.session_time.remarks) {
            manPowerRemark = value.session_time.remarks;
          }
          if (value.session_time.totalhours) {
            manPowerTotalHours = value.session_time.totalhours;
          }

          // add in operator
          if (manPowerItem != '' || manPowerItem != null) {
            if (manPowerItem != 'Base Operator') {
              // get from operator field
              operator.push(value?.operator?.employee?.name);
            } else {
              this.jobTicketContent?.operatorBoList.forEach((value) => {
                operator.push(value.employee.name);
              });
            }
          }

          this.manPowerRow.push({
            id: manPowerID,
            item: manPowerItem,
            quantity: manPowerQuantity,
            Sesh1Start: manPowerSesh1Start,
            Sesh1End: manPowerSesh1End,
            Sesh1Hours: manPowerSesh1Hours,
            Sesh2Start: manPowerSesh2Start,
            Sesh2End: manPowerSesh2End,
            Sesh2Hours: manPowerSesh2Hours,
            Sesh3Start: manPowerSesh3Start,
            Sesh3End: manPowerSesh3End,
            Sesh3Hours: manPowerSesh3Hours,
            Sesh4Start: manPowerSesh4Start,
            Sesh4End: manPowerSesh4End,
            Sesh4Hours: manPowerSesh4Hours,
            totalHours: manPowerTotalHours,
            remark: manPowerRemark,
            operator: operator,
          });
        });

        this.jobTicketContent.equipmentList.forEach((value) => {
          this.rowNo += 1;
          // let EquipmentID = 'N/A';
          let EquipmentID = this.rowNo;
          let EquipmentItem = 'N/A';
          let EquipmentQuantity = 'N/A';
          let EquipmentSesh1Start = ' - ';
          let EquipmentSesh1End = ' - ';
          let EquipmentSesh1Hours = ' - ';
          let EquipmentSesh2Start = ' - ';
          let EquipmentSesh2End = ' - ';
          let EquipmentSesh2Hours = ' - ';
          let EquipmentSesh3Start = ' - ';
          let EquipmentSesh3End = ' - ';
          let EquipmentSesh3Hours = ' - ';
          let EquipmentSesh4Start = ' - ';
          let EquipmentSesh4End = ' - ';
          let EquipmentSesh4Hours = ' - ';
          let EquipmentTotalHours = 'N/A';
          let EquipmentRemark = ' - ';

          if (value.num) {
            EquipmentID = value.num;
          }
          if (value.machinery_type) {
            if (value.machinery_type.description) {
              EquipmentItem = value.machinery_type.description;
            }
          }

          if (value.quantity) {
            EquipmentQuantity = value.quantity;
          }
          if (value.session_time) {
            if (value.session_time.sess1_start) {
              var start = value.session_time.sess1_start;
              var date = this.toTime(start);
              EquipmentSesh1Start = formatDate(date, 'H:mm', 'en_US');
            }
            if (value.session_time.sess1_end) {
              var start = value.session_time.sess1_end;
              var date = this.toTime(start);
              EquipmentSesh1End = formatDate(date, 'H:mm', 'en_US');
            }
            if (
              value.session_time.sess1Hours ||
              value.session_time.sess1Hours == 0
            ) {
              EquipmentSesh1Hours = value.session_time.sess1Hours;
            }
            if (value.session_time.sess2_start) {
              var start = value.session_time.sess2_start;
              var date = this.toTime(start);
              EquipmentSesh2Start = formatDate(date, 'H:mm', 'en_US');
            }
            if (value.session_time.sess2_end) {
              var start = value.session_time.sess2_end;
              var date = this.toTime(start);
              EquipmentSesh2End = formatDate(date, 'H:mm', 'en_US');
            }
            if (
              value.session_time.sess2Hours ||
              value.session_time.sess2Hours == 0
            ) {
              EquipmentSesh2Hours = value.session_time.sess2Hours;
            }
            if (value.session_time.sess3_start) {
              var start = value.session_time.sess3_start;
              var date = this.toTime(start);
              EquipmentSesh3Start = formatDate(date, 'H:mm', 'en_US');
            }
            if (value.session_time.sess3_end) {
              var start = value.session_time.sess3_end;
              var date = this.toTime(start);
              EquipmentSesh3End = formatDate(date, 'H:mm', 'en_US');
            }
            if (
              value.session_time.sess3Hours ||
              value.session_time.sess3Hours == 0
            ) {
              EquipmentSesh3Hours = value.session_time.sess3Hours;
            }
            if (value.session_time.sess4_start) {
              var start = value.session_time.sess4_start;
              var date = this.toTime(start);
              EquipmentSesh4Start = formatDate(date, 'H:mm', 'en_US');
            }
            if (value.session_time.sess4_end) {
              var start = value.session_time.sess4_end;
              var date = this.toTime(start);
              EquipmentSesh4End = formatDate(date, 'H:mm', 'en_US');
            }
            if (
              value.session_time.sess4Hours ||
              value.session_time.sess4Hours == 0
            ) {
              EquipmentSesh4Hours = value.session_time.sess4Hours;
            }
            if (value.session_time.remarks) {
              EquipmentRemark = value.session_time.remarks;
            }
            if (value.session_time.totalhours) {
              EquipmentTotalHours = value.session_time.totalhours;
            }
          }

          this.otherMachineryRow.push({
            id: EquipmentID,
            item: EquipmentItem,
            quantity: EquipmentQuantity,
            Sesh1Start: EquipmentSesh1Start,
            Sesh1End: EquipmentSesh1End,
            Sesh1Hours: EquipmentSesh1Hours,
            Sesh2Start: EquipmentSesh2Start,
            Sesh2End: EquipmentSesh2End,
            Sesh2Hours: EquipmentSesh2Hours,
            Sesh3Start: EquipmentSesh3Start,
            Sesh3End: EquipmentSesh3End,
            Sesh3Hours: EquipmentSesh3Hours,
            Sesh4Start: EquipmentSesh4Start,
            Sesh4End: EquipmentSesh4End,
            Sesh4Hours: EquipmentSesh4Hours,
            totalHours: EquipmentTotalHours,
            remark: EquipmentRemark,
          });
        });

        this.jobTicketContent.machineryList.forEach((value) => {
          //console.log(value);

          this.rowNo += 1;
          // let machineID = 'N/A';
          let machineID = this.rowNo;
          let machineItem = 'N/A';
          let machineQuantity = 'N/A';
          let machineSesh1Start = ' - ';
          let machineSesh1End = ' - ';
          let machineSesh1Hours = ' - ';
          let machineSesh2Start = ' - ';
          let machineSesh2End = ' - ';
          let machineSesh2Hours = ' - ';
          let machineSesh3Start = ' - ';
          let machineSesh3End = ' - ';
          let machineSesh3Hours = ' - ';
          let machineSesh4Start = ' - ';
          let machineSesh4End = ' - ';
          let machineSesh4Hours = ' - ';
          let machineTotalHours = 'N/A';
          let machineRemark = ' - ';

          // if (value.num) {
          //   machineID = value.num;
          // }
          if (value.category == 'MACHINE') {
            if (value.machinery_type) {
              if (value.machinery_type.description) {
                machineItem = value.machinery_type.description;
              }
            }
          } else if (value.category == 'OPERATOR') {
            if (value.operator) {
              if (value.operator.position.description) {
                machineItem =
                  value.operator.position.designation_id +
                  ' - ' +
                  value.operator.position.description +
                  ' : ' +
                  value.operator.employee.name;
              }
            } else {
              if (value.machinery_type) {
                if (value.machinery_type.description) {
                  machineItem =
                    value.machinery_type.description + ' - Operator';
                }
              }
            }
          }

          if (value.quantity) {
            machineQuantity = value.quantity;
          }

          if (value.session_time.sess1_start) {
            var start = value.session_time.sess1_start;
            var date = this.toTime(start);
            machineSesh1Start = formatDate(date, 'H:mm', 'en_US');
          }
          if (value.session_time.sess1_end) {
            //machineSesh1End = value.session_time.sess1_end;
            var start = value.session_time.sess1_end;
            var date = this.toTime(start);
            machineSesh1End = formatDate(date, 'H:mm', 'en_US');
          }
          if (
            value.session_time.sess1Hours ||
            value.session_time.sess1Hours == 0
          ) {
            machineSesh1Hours = value.session_time.sess1Hours;
          }
          if (value.session_time.sess2_start) {
            //machineSesh2Start = value.session_time.sess2_start;
            var start = value.session_time.sess2_start;
            var date = this.toTime(start);
            machineSesh2Start = formatDate(date, 'H:mm', 'en_US');
          }
          if (value.session_time.sess2_end) {
            //machineSesh2End = value.session_time.sess2_end;
            var start = value.session_time.sess2_end;
            var date = this.toTime(start);
            machineSesh2End = formatDate(date, 'H:mm', 'en_US');
          }
          if (
            value.session_time.sess2Hours ||
            value.session_time.sess2Hours == 0
          ) {
            machineSesh2Hours = value.session_time.sess2Hours;
          }
          if (value.session_time.sess3_start) {
            //machineSesh3Start = value.session_time.sess3_start;
            var start = value.session_time.sess3_start;
            var date = this.toTime(start);
            machineSesh3Start = formatDate(date, 'H:mm', 'en_US');
          }
          if (value.session_time.sess3_end) {
            //machineSesh3End = value.session_time.sess3_end;
            var start = value.session_time.sess3_end;
            var date = this.toTime(start);
            machineSesh3End = formatDate(date, 'H:mm', 'en_US');
          }
          if (
            value.session_time.sess3Hours ||
            value.session_time.sess3Hours == 0
          ) {
            machineSesh3Hours = value.session_time.sess3Hours;
          }
          if (value.session_time.sess4_start) {
            //machineSesh3Start = value.session_time.sess3_start;
            var start = value.session_time.sess4_start;
            var date = this.toTime(start);
            machineSesh4Start = formatDate(date, 'H:mm', 'en_US');
          }
          if (value.session_time.sess4_end) {
            //machineSesh3End = value.session_time.sess3_end;
            var start = value.session_time.sess4_end;
            var date = this.toTime(start);
            machineSesh4End = formatDate(date, 'H:mm', 'en_US');
          }
          if (
            value.session_time.sess4Hours ||
            value.session_time.sess4Hours == 0
          ) {
            machineSesh4Hours = value.session_time.sess4Hours;
          }
          if (value.session_time.remarks) {
            machineRemark = value.session_time.remarks;
          }
          if (value.session_time.totalhours) {
            machineTotalHours = value.session_time.totalhours;
          }

          this.externalItemRow.push({
            id: machineID,
            // item: this.jobTicketContent[0].machinery.operator.machine_operate._instanceName,
            item: machineItem,
            quantity: machineQuantity,
            Sesh1Start: machineSesh1Start,
            Sesh1End: machineSesh1End,
            Sesh1Hours: machineSesh1Hours,
            Sesh2Start: machineSesh2Start,
            Sesh2End: machineSesh2End,
            Sesh2Hours: machineSesh2Hours,
            Sesh3Start: machineSesh3Start,
            Sesh3End: machineSesh3End,
            Sesh3Hours: machineSesh3Hours,
            Sesh4Start: machineSesh4Start,
            Sesh4End: machineSesh4End,
            Sesh4Hours: machineSesh4Hours,
            totalHours: machineTotalHours,
            remark: machineRemark,
          });
        });
      });
  }
  toTime(timeString) {
    var timeTokens = timeString.split(':');
    return new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
  }

  openEndorseModal() {
    this.openModal = true;
  }

  submitEndorse() {
    const data = {
      JobTicket: this.strJobTicket,
    };

    restServices.pbksb_JobMHEService
      .UpdateEndorseJobTicket(this.appService.myApp)(data)
      .then((result) => {
        let requestList: any = result;
        let APIResult = JSON.parse(requestList);

        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
        if (APIResult.success == true) {
          let notiObject = {
            type: 'success',
            title: 'Endorsed',
            subtitle: this.strJobTicket + ' is successfully endorsed',
            time: currentTime,
          };
          this.appService.showToaster(notiObject);
          this.router.navigate([
            '/operation-system/mhe-request-preview-endorse/' +
              this.strRequestNumber,
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
            '/operation-system/mhe-request-preview-endorse/' +
              this.strRequestNumber,
          ]);
        }
      })
      .catch((err) => {
        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
        let errorObject = {
          type: 'error',
          title: 'Cannot Endorse',
          subtitle: 'The request has failed to be endorsed. Please try again',
          time: currentTime,
        };
        this.appService.showToaster(errorObject);
        this.router.navigate([
          '/operation-system/mhe-request-preview-endorse/' +
            this.strRequestNumber,
        ]);
      });
  }

  onblurAmend(event: any) {
    this.amendNotes = event.target.value;
  }

  submitAmmend() {
    const data = {
      jobTicket: this.strJobTicket,
      notes: this.amendNotes,
    };

    console.log(data);

    restServices.pbksb_JobMHEService
      .RequestAmendJobTicket(this.appService.myApp)(data)
      .then((result) => {
        console.log(result);

        let resArr: any = result;
        let info = JSON.parse(resArr);
        let date = new Date();
        if (info.status == 'OK') {
          const successNotif = {
            type: 'success',
            title: 'Amendment submitted',
            subtitle:
              'Job Ticket No.' +
              ' ' +
              this.strJobTicket +
              ' amendment' +
              ' ' +
              'is successfully submitted',
            time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
          };

          this.appService.showToaster(successNotif);
        } else {
          const successNotif = {
            type: 'error',
            title: 'Amendment is not submitted',
            subtitle:
              'Job Ticket No.' +
              ' ' +
              this.strJobTicket +
              ' amendment' +
              ' ' +
              'is not submitted',
            time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
          };

          this.appService.showToaster(successNotif);
        }
      })
      .catch((err) => {
        console.log(err);

        let date = new Date();
        const successNotif = {
          type: 'error',
          title: 'Amendment is not submitted',
          subtitle:
            'Job Ticket No.' +
            ' ' +
            this.strJobTicket +
            ' amendment' +
            ' ' +
            'is not submitted',
          time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
        };

        this.appService.showToaster(successNotif);
      });

    this.openModalAmmend = false;
  }
}
