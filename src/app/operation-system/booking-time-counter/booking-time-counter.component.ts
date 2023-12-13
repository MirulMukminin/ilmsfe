import { Component, OnInit, } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-time-counter',
  templateUrl: './booking-time-counter.component.html',
  styleUrls: ['./booking-time-counter.component.scss']
})
export class BookingTimeCounterComponent implements OnInit {

  //totalSecond: number = 64800; //midnight to 6pm //for testing purposes
  totalSecond: number = 54000; //midnight to 3pm
  secondsLeft: number = 0;
  showTime: string = "";
  hours = 0;
  minutes = 0;
  getDatetime: any;
  currentURL = "";
  marineMheBookingCounterStatus = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentURL = this.router.url;
    if (this.currentURL.indexOf("/operation-system/marine-berth-request-form") > -1) {
      this.marineMheBookingCounterStatus = true;
    }
    
    this.getCurrentDate();
    this.convertTime();
  }

  convertTime() {
    var interval = setInterval(() => {
      var seconds = this.secondsLeft;
      let dayTime = (60 * 60 * 24)
      var day = Math.floor(seconds / dayTime)
      let remainingTime = (seconds - (dayTime * day));
      let hoursTime = (60 * 60);
      this.hours = Math.floor(remainingTime / (hoursTime))
      remainingTime = (remainingTime - (hoursTime * this.hours));
      let minTime = 60;
      this.minutes = Math.floor(remainingTime / minTime)
      remainingTime = (remainingTime - (minTime * this.minutes));
      var second = Math.floor(remainingTime)
      this.secondsLeft--;
      //console.log('Day - '+day+', Hours - '+this.hours+', Minutes - '+this.minutes+', Seconds - '+second);

      this.showTime = this.hours + ' hrs ' + this.minutes + ' mins ' + second + ' secs';

      if (second == 0) {
        this.getCurrentDate();
      }
    }, 1000);
  }

  getCurrentDate() {

    this.getDatetime = new Date();

    var initialDate = new Date();
    var msSinceMidnight = this.getDatetime - initialDate.setHours(0, 0, 0, 0);
    var secondsSinceMidnight = Math.round(msSinceMidnight / 1000);

    //console.log(this.totalSecond);

    this.secondsLeft = this.totalSecond - secondsSinceMidnight;
    if (Math.sign(this.secondsLeft) == -1) {
      this.secondsLeft = 0;
    }


    this.getDatetime = formatDate(this.getDatetime, 'HH:mm EEEE, dd/MM/yyyy', 'en_US')
  }

}
