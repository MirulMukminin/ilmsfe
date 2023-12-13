import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {

  notificationList=[];
  constructor(@Inject("agentNotificationList") public agentNotificationList,) {
    this.notificationList=agentNotificationList;
   }

  ngOnInit(): void {

    console.log(this.notificationList);

  }

  open = false




}
