import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-console-preview',
  templateUrl: './console-preview.component.html',
  styleUrls: ['./console-preview.component.scss'],
})
export class ConsolePreviewComponent implements OnInit {
  @Input() data: any;

  job_description = '';
  request_behalf = '';
  booking_date = '';
  remarks = '';
  status = '';

  machineryList = [];
  requestNumber: any;

  constructor() {}

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    if (this.data.berthMHERequest.length > 0) {
      this.requestNumber = this.data.berthMHERequest[0].request_number ?? 'N/A';
      this.job_description =
        this.data.berthMHERequest[0].job_description ?? 'N/A';
      this.request_behalf =
        this.data.berthMHERequest[0].request_behalf.name ?? 'N/A';
      this.booking_date =
        formatDate(
          this.data.berthMHERequest[0].booking_date,
          'dd/MM/yyyy',
          'en_US'
        ) ?? 'N/A';
      this.remarks = this.data.berthMHERequest[0].remarks ?? 'N/A';
      this.status = this.data.berthMHERequest[0].status ?? 'N/A';

      this.data.machineries.forEach((element) => {
        this.machineryList.push({
          item: element.item.description ?? 'N/A',
          program: element.program ?? 'N/A',
          qty: element.quantity ?? 'N/A',
          time: element.time.replace(/:[^:]*$/, '') ?? 'N/A',
          estHours: element.estimated_hour ?? 'N/A',
          location: element.location.description ?? 'N/A',
          crew: '',
          job_ticket: element.job_ticket,
          usageHours: element.usage,
        });
      });
    }
  }
}
