import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sw-inbound-outbound-list',
  templateUrl: './sw-inbound-outbound-list.component.html',
  styleUrls: ['./sw-inbound-outbound-list.component.scss'],
})
export class SwInboundOutboundListComponent implements OnInit {
  switch: string = 'inbound';
  listType: string = '';
  constructor(private _Activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.listType = this._Activatedroute.snapshot.paramMap.get('listType');

    if (this.listType == 'inbound') {
      this.switch = 'inbound';
      document.getElementById('inbound').click();
    } else if (this.listType == 'outbound') {
      this.switch = 'outbound';
      document.getElementById('outbound').click();
    }
  }

  selected(event: any) {
    this.switch = event.name;
  }
}
