import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-psb-inventory-list',
  templateUrl: './psb-inventory-list.component.html',
  styleUrls: ['./psb-inventory-list.component.scss']
})
export class PsbInventoryListComponent implements OnInit {

  constructor() {}

  switch: string = "InventoryTransaction";
  selected(event: any) {
    this.switch = event.name
  }

  ngOnInit(): void {}

}
