import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeaderItem, TableModel } from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-mhe-endorse-request-details',
  templateUrl: './mhe-endorse-request-details.component.html',
  styleUrls: ['./mhe-endorse-request-details.component.scss'],
})
export class MheEndorseRequestDetailsComponent implements OnInit {
  @Input() topHeader = new TableModel();
  @Input() bottomHeader = new TableModel();
  paramsRequestNo: string = '';

  requestnumber = '';
  requestType = '';
  companyName = '';
  requestBy = '';
  job_description = '';
  requestOnBehalf = '';
  po_number = '';
  bookingType = '';

  bookingDate = '';
  remarks = '';
  dateSubmit = '';
  status = '';
  cancelDate = 'N/A'; //N/A
  logo = false;

  // Job Ticket Variable
  MheEndorsedRequestDetails: any;
  mheSessionTimes: any = [];
  jobMHEList: any = [];
  machineryList: any = [];
  manpowerList: any = [];
  equipmentList: any = [];
  itemList: any = [];
  sampleList: any = [];
  vesselList = [];

  jobTicketItem = '';

  constructor(
    private route: ActivatedRoute,
    protected appService: AppService
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params: Params) => {
    //   this.paramsRequestNo = params['requestNo'];
    //   // console.log(params['requestNo']);
    // });

    this.paramsRequestNo = this.route.snapshot.params['requestNo'];

    this.createTableHeader();
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        // this.companyName = initialData.Company;
        // this.requestBy = initialData.Fullname;

        this.getRestQueryAPI(initialData.CustomerCode);
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

  getRestQueryAPI(customerCode: string) {
    // this.MheEndorsedRequestList = this.MheEndorsedRequest;

    var getCodeView: any = {
      RequestNumber: this.paramsRequestNo,
    };

    //fire api and get response data
    restServices.pbksb_CustomerService
      .GetMHEEndorsedRequestDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        this.companyName = request.requestform?.customer?.full_name;
        this.requestBy = request.requestform?.request_by?.fullname;

        this.requestnumber = request.requestform.requestnumber ?? 'N/A';
        this.requestType = request.requestform.requestservicetype ?? 'N/A';
        this.bookingType = request.requestform.booking_type ?? 'N/A';
        this.bookingDate = request.requestform.booking_date_start ?? 'N/A';
        this.dateSubmit = request.requestform.datesubmit ?? 'N/A';
        this.status = request.requestform.status ?? 'N/A';
        this.po_number = request.requestform.po_number ?? 'N/A';
        this.remarks = request.requestform.remark ?? '-';
        this.job_description = request.requestform.job_description ?? 'N/A';
        this.requestOnBehalf = request.requestform.request_on_behalf ?? 'N/A';

        let vessel = [];
        if (request.vesselRequestFormList) {
          vessel = request.vesselRequestFormList;

          for (let i = 0; i < vessel.length; i++) {
            this.vesselList.push(vessel[i].vessel.name);
          }
        }

        this.mheSessionTimes = request.mheSessionTimes;
        // console.log('mheSessionTimes', this.mheSessionTimes);

        this.mheSessionTimes.sort((a, b) => {
          return a.job_MHE.running_number - b.job_MHE.running_number;
        });

        this.mheSessionTimes.forEach((value, index) => {
          if (value.job_MHE.job_mhe_service_type == 'MACHINERY') {
            if (
              value.job_MHE.machinery &&
              value.job_MHE.status != 'CANCELLED'
            ) {
              // Machinery List

              if (value.job_MHE.machinery.length > 1) {
                this.pushCompareData(
                  value.job_MHE,
                  value.job_MHE.machinery,
                  value.job_MHE.job_mhe_service_type,
                  'machinery'
                );
              } else {
                this.pushData(
                  value.job_MHE,
                  value.job_MHE.machinery,
                  value.job_MHE.job_mhe_service_type,
                  'machinery'
                );
              }

              // if (value.job_MHE.manpower.length > 0) {
              //   this.pushData(
              //     value.job_MHE,
              //     value.job_MHE.manpower,
              //     value.job_MHE.job_mhe_service_type,
              //     'manpower'
              //   );
              // }
            }
          } else if (value.job_MHE.job_mhe_service_type == 'MANPOWER') {
            if (value.job_MHE.manpower && value.job_MHE.status != 'CANCELLED') {
              // Manpower List
              // console.log(value.job_MHE.job_ticket);

              if (value.job_MHE.manpower.length > 1) {
                this.pushCompareData(
                  value.job_MHE,
                  value.job_MHE.manpower,
                  value.job_MHE.job_mhe_service_type,
                  'manpower'
                );
              } else {
                this.pushData(
                  value.job_MHE,
                  value.job_MHE.manpower,
                  value.job_MHE.job_mhe_service_type,
                  'manpower'
                );
              }
            }
          } else if (value.job_MHE.job_mhe_service_type == 'EQUIPMENT') {
            if (
              value.job_MHE.machinery &&
              value.job_MHE.status != 'CANCELLED'
            ) {
              // Equipment List

              if (value.job_MHE.machinery.length > 1) {
                this.pushCompareData(
                  value.job_MHE,
                  value.job_MHE.machinery,
                  value.job_MHE.job_mhe_service_type,
                  'machinery'
                );
              } else {
                this.pushData(
                  value.job_MHE,
                  value.job_MHE.machinery,
                  value.job_MHE.job_mhe_service_type,
                  'machinery'
                );
              }
            }
          } else {
            this.itemList = [];
          }
        });

        // console.log('jobMHEList', this.jobMHEList);
        // console.log('itemList', this.itemList);
        // console.log('machineryList', this.machineryList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createTableHeader() {
    this.bottomHeader.header = [
      new TableHeaderItem({ data: 'ID' }),
      new TableHeaderItem({ data: 'Item' }),
      new TableHeaderItem({ data: 'Unit' }),
      new TableHeaderItem({ data: 'Start' }),
      new TableHeaderItem({ data: 'End' }),
      new TableHeaderItem({ data: 'Hours' }),
      new TableHeaderItem({ data: 'Start' }),
      new TableHeaderItem({ data: 'End' }),
      new TableHeaderItem({ data: 'Hours' }),
      new TableHeaderItem({ data: 'Start' }),
      new TableHeaderItem({ data: 'End' }),
      new TableHeaderItem({ data: 'Hours' }),
      new TableHeaderItem({ data: 'Start' }),
      new TableHeaderItem({ data: 'End' }),
      new TableHeaderItem({ data: 'Hours' }),
      new TableHeaderItem({ data: 'Total Hours' }),
      new TableHeaderItem({ data: 'Remarks' }),
      new TableHeaderItem({ data: 'Endorsed By' }),
    ];

    // console.log(this.bottomHeader.header[0].data);
  }

  print() {
    this.logo = true;
    setTimeout(() => {
      window.print();
      this.logo = false;
    }, 500);
  }

  pushData(value: any, data: any, serviceType: string, type: string) {
    let desc_type;
    if (type == 'machinery') {
      desc_type = 'machinery_type';
    } else if (type == 'manpower') {
      desc_type = 'manpower_type';
    } else {
      desc_type = 'machinery_type';
    }
    let endorsedByArray = [];
    console.log('value===');
    let i = 0;
    value.endorserMap.forEach((map) => {
      console.log(map.date);
      let edate = formatDate(map.date, 'dd/MM/yyyy HH:mm', 'en_US');

      console.log(edate);
      console.log(map.customerUser.username.login);
      endorsedByArray[i] = map.customerUser.username.login + ' - ' + edate;
      i++;
    });
    // console.log(value.endorserMap)
    data.forEach((type) => {
      this.itemList.push({
        id: value.job_ticket ?? 'N/A',
        serviceType: serviceType,
        description:
          desc_type in type
            ? type[desc_type].description
            : type['operator']?.position?.description ?? 'N/A',
        sess1_start: type.session_time.sess1_start ?? '-',
        sess1_end: type.session_time.sess1_end ?? '-',
        sess1Hours: type.session_time.sess1Hours
          ? type.session_time.sess1Hours
          : '-',
        sess2_start: type.session_time.sess2_start ?? '-',
        sess2_end: type.session_time.sess2_end ?? '-',
        sess2Hours: type.session_time.sess2Hours
          ? type.session_time.sess2Hours
          : '-',
        sess3_start: type.session_time.sess3_start ?? '-',
        sess3_end: type.session_time.sess3_end ?? '-',
        sess3Hours: type.session_time.sess3Hours
          ? type.session_time.sess3Hours
          : '-',
        sess4_start: type.session_time.sess4_start ?? '-',
        sess4_end: type.session_time.sess4_end ?? '-',
        sess4Hours: type.session_time.sess4Hours
          ? type.session_time.sess3Hours
          : '-',
        totalhours: type?.session_time?.totalhours
          ? type.session_time.totalhours
          : '-',
        quantity: type.quantity ?? 'N/A',
        remarks: value.remarks ?? '-',
        endorsedby: endorsedByArray,
        // endorsedby:value.endorserMap[0].customerUser.username.login +' - '+value.endorserMap[0].date?? 'N/A',
        // endorseddate: value.endorserMap[0].date ?? 'N/A',
      });
      console.log('Item List===');
      console.log(this.itemList[0].endorsedby);
    });
  }

  pushCompareData(value: any, data: any, serviceType: string, type: string) {
    let desc_type;
    if (type == 'machinery') {
      desc_type = 'machinery_type';
    } else if (type == 'manpower') {
      desc_type = 'manpower_type';
    } else {
      desc_type = 'machinery_type';
    }
    const max = data.reduce(function (prev, current) {
      return prev.version > current.version ? prev : current;
    });
    this.itemList.push({
      id: value.job_ticket ?? 'N/A',
      serviceType: serviceType,
      description:
        desc_type in max
          ? max[desc_type].description
          : max['operator']?.position?.description ?? 'N/A',
      sess1_start: max.session_time.sess1_start ?? '-',
      sess1_end: max.session_time.sess1_end ?? '-',
      sess1Hours: max.session_time.sess1Hours
        ? max.session_time.sess1Hours
        : '-',
      sess2_start: max.session_time.sess2_start ?? '-',
      sess2_end: max.session_time.sess2_end ?? '-',
      sess2Hours: max.session_time.sess2Hours
        ? max.session_time.sess2Hours
        : '-',
      sess3_start: max.session_time.sess3_start ?? '-',
      sess3_end: max.session_time.sess3_end ?? '-',
      sess3Hours: max.session_time.sess3Hours
        ? max.session_time.sess3Hours
        : '-',
      sess4_start: max.session_time.sess4_start ?? '-',
      sess4_end: max.session_time.sess4_end ?? '-',
      sess4Hours: max.session_time.sess4Hours
        ? max.session_time.sess4Hours
        : '-',
      totalhours: max?.session_time?.totalhours
        ? max.session_time.totalhours
        : '-',

      quantity: max.quantity ?? 'N/A',
      remarks: value.remarks ?? '-',
      endorsedby: value.endorsedby ?? 'N/A',
      endorseddate: value.endorsedTime ?? 'N/A',
    });
  }
}
