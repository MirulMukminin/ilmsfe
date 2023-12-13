import { Component, Input, OnInit } from '@angular/core';
import { TableHeaderItem, TableModel } from 'carbon-components-angular';
import { formatDate, Location } from '@angular/common';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-marine-work-program-details',
  templateUrl: './marine-work-program-details.component.html',
  styleUrls: ['./marine-work-program-details.component.scss'],
})
export class MarineWorkProgramDetailsComponent implements OnInit {
  @Input() workProgram = new TableModel();

  ticket_number = '';
  company = '';
  location = '';
  booking_date = '';
  cancel_datetime = '';
  remarks = '';
  date = '';

  workProgramDetail = [
    {
      service_code: '',
      vessel: '',
      loa: '',
      bo: '',
      start: '',
      end: '',
    },
  ];

  constructor(private _location: Location, protected appService: AppService) {}

  ngOnInit(): void {
    let jobTicket = 'JT100021';

    this.workProgram.header = [
      new TableHeaderItem({ data: 'No' }),
      new TableHeaderItem({ data: 'Service Code' }),
      new TableHeaderItem({ data: 'Vessel' }),
      new TableHeaderItem({ data: 'LOA (M)' }),
      new TableHeaderItem({ data: 'BO' }),
      new TableHeaderItem({ data: 'Start' }),
      new TableHeaderItem({ data: 'End' }),
    ];

    restServices.pbksb_MarineService
      .GetWorkProgramCancellationPreview(this.appService.myApp)({
        jobTicket: jobTicket,
      })
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        if (!request.status) {
          // console.log(request);

          let formatBookingDate: any,
            formatCancelDate: any,
            formatStartTime: any,
            formatEndTime: any;

          if (request.booking_date) {
            formatBookingDate = this.dateFormatted(request.booking_date);
          }
          if (request.cancelled_datetime) {
            formatCancelDate = this.dateFormatted(request.cancelled_datetime);
          }

          if (request.start_time) {
            formatStartTime = this.dateFormatted(request.start_time);
          }

          if (request.end_time) {
            formatEndTime = this.dateFormatted(request.end_time);
          }

          this.ticket_number = request?.job_ticket ?? 'N/A';
          this.company = request?.company ?? 'N/A';
          this.location = request?.location ?? 'N/A';
          this.booking_date = request.booking_date
            ? formatDate(formatBookingDate, 'dd/MM/yyyy', 'en_US')
            : 'N/A';
          this.cancel_datetime = request.cancelled_datetime
            ? formatDate(formatCancelDate, 'dd/MM/yyyy HH:mm:ss', 'en_US')
            : 'N/A';
          this.remarks = request?.remarks ?? 'N/A';
          this.date = request?.Date;

          this.workProgramDetail[0].service_code =
            request?.service_code ?? 'N/A';
          this.workProgramDetail[0].vessel = request?.vessel ?? 'N/A';
          this.workProgramDetail[0].loa = request?.loa ?? 'N/A';
          this.workProgramDetail[0].bo = request?.bo ?? 'N/A';
          this.workProgramDetail[0].start = request.start_time
            ? formatDate(formatStartTime, 'HH:mm', 'en_US')
            : 'N/A';
          this.workProgramDetail[0].end = request.end_time
            ? formatDate(formatEndTime, 'HH:mm', 'en_US')
            : 'N/A';
        } else {
          console.log('GetWorkProgramCancellationPreview', result);
        }
      })
      .catch((err) => console.log(err));
  }

  onPrint() {
    window.print();
  }

  backClicked() {
    this._location.back();
  }

  dateFormatted(date) {
    return [date.slice(0, 10), date.slice(24, 29), date.slice(11, 20)].join(
      ' '
    );
  }
}
