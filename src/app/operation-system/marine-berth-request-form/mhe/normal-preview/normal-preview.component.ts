import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-normal-preview',
  templateUrl: './normal-preview.component.html',
  styleUrls: ['./normal-preview.component.scss'],
})
export class NormalPreviewComponent implements OnInit {
  @Input() data: any;

  job_description = '';
  request_behalf = '';
  booking_date = '';
  remarks = '';
  status = '';

  machineryList = [];
  manpowerList = [];
  equipmentList = [];
  externalItemList = [];
  requestNumber = '';
  booking_type = '';

  recurringDate = [];

  constructor() {}

  ngOnInit(): void {
    this.initializeData();
  }
  initializeData() {
    if (this.data.berthMHERequest.length > 0) {
      this.requestNumber = this.data.berthMHERequest[0].request_number ?? 'N/A';
      this.booking_type = this.data.berthMHERequest[0].booking_type ?? 'N/A';
      this.job_description =
        this.data.berthMHERequest[0].job_description ?? 'N/A';
      this.request_behalf =
        this.data.berthMHERequest[0].request_behalf.name ?? 'N/A';

      if (this.booking_type != 'RECURRING') {
        this.booking_date =
          formatDate(
            this.data.berthMHERequest[0].booking_date,
            'dd/MM/yyyy',
            'en_US'
          ) ?? 'N/A';
      } else {
        let sortedDate = this.data.berthMHERequestDateRecurrings.sort(
          (a, b) =>
            this.getTimeTest(a.start_date) - this.getTimeTest(b.start_date)
        );

        console.log(sortedDate);

        sortedDate.forEach((element) => {
          this.recurringDate.push({
            startDate: element.start_date,
            endDate: element.end_date,
          });
        });
      }

      console.log(this.recurringDate);

      this.remarks = this.data.berthMHERequest[0].remarks ?? 'N/A';
      this.status = this.data.berthMHERequest[0].status ?? 'N/A';

      this.data.machineries.forEach((element) => {
        this.machineryList.push({
          item: element.item?.description ?? 'N/A',
          program: element?.program ?? 'N/A',
          qty: element?.quantity ?? 'N/A',
          time: element?.time?.replace(/:[^:]*$/, '') ?? 'N/A',
          estHours: element?.estimated_hour ?? 'N/A',
          location: element?.location?.description ?? 'N/A',
          crew: element?.specific_crew?.name ?? '',
          job_ticket: element?.job_ticket,
          usageHours: element?.usage,
        });
      });

      this.data.manpowers.forEach((element) => {
        this.manpowerList.push({
          item: element?.item?.description ?? 'N/A',
          program: element?.program ?? 'N/A',
          qty: element?.quantity ?? 'N/A',
          time: element?.time?.replace(/:[^:]*$/, '') ?? 'N/A',
          estHours: element?.estimated_hour ?? 'N/A',
          location: element?.location.description ?? 'N/A',
          crew: element?.specific_crew?.name ?? '',
          job_ticket: element?.job_ticket,
          usageHours: element?.usage,
        });
      });

      this.data.equipments.forEach((element) => {
        this.equipmentList.push({
          item: element?.item?.description ?? 'N/A',
          program: element?.program ?? 'N/A',
          qty: element?.quantity ?? 'N/A',
          time: element?.time?.replace(/:[^:]*$/, '') ?? 'N/A',
          estHours: element?.estimated_hour ?? 'N/A',
          location: element?.location?.description ?? 'N/A',
          job_ticket: element?.job_ticket,
          usageHours: element?.usage,
        });
      });

      this.data.externalItems.forEach((element) => {
        this.externalItemList.push({
          id: element?.quotation?.quotation ?? 'N/A',
          item: element?.quotation?.description ?? 'N/A',
          uom: element?.uom ?? 'N/A',
          qty: element?.quantity ?? 'N/A',
          rent_period: element?.rent_period ?? 'N/A',
          unit: element?.unit ?? 'N/A',
          time: element?.time?.replace(/:[^:]*$/, '') ?? 'N/A',
          location: element?.location?.description ?? 'N/A',
          job_ticket: element?.job_ticket,
          usageHours: element?.usage,
        });
      });
    }
  }

  getTimeTest(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
  }
}
