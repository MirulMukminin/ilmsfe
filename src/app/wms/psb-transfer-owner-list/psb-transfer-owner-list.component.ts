import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-psb-transfer-owner-list',
  templateUrl: './psb-transfer-owner-list.component.html',
  styleUrls: ['./psb-transfer-owner-list.component.scss']
})
export class PsbTransferOwnerListComponent implements OnInit {

  switch: string = 'seller-form'

  constructor() { }

  ngOnInit(): void {
  }

  selected(event: any) {
    // console.log(event.name)

    this.switch = event.name
  }

}
