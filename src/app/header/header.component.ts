import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('rotated => default', animate('150ms ease-in-out')),
      transition('default => rotated', animate('150ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostBinding('class.bx--header') headerClass = true;

  active: boolean = true;
  hasHamburger: boolean = true;
  // displayDropDown = true
  // state: string = 'default';
  username: string;
  listFlag: boolean = false;
  time;
  timeInterval;
  isActive: boolean = false;

  constructor(
    protected notificationService: NotificationService,
    private appService: AppService,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.expandOnSize();
  }

  @HostListener('document:click', ['$event'])
  collapseRightSideNav(event) {
    if (!event.target.closest('.userBtn')) {
      if (this.isActive) {
        this.isActive = false;
      }
    }
  }

  ngOnInit(): void {
    this.userInfo();
    this.liveClock();
    this.expandOnSize();
  }

  liveClock() {
    this.timeInterval = setInterval(() => {
      this.time = new Date();
      // console.log(this.time);
    }, 1000);
  }

  // toggleDisplay() {
  //   this.displayDropDown = !this.displayDropDown
  //   this.state = this.state === 'default' ? 'rotated' : 'default';
  // }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.username = userInfo.username.name;
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  showToast() {
    this.notificationService.showToast({
      type: 'info',
      title: 'Sample toast',
      subtitle: 'Sample subtitle message',
      caption: 'Sample caption',
      target: '.notification-container',
      message: 'message',
    });
  }

  logout() {
    this.appService.terminateSession();
  }

  userBtnAction() {
    if (this.listFlag) {
      this.listFlag = false;
      this.isActive = false;
    } else {
      this.listFlag = true;
      this.isActive = true;
    }
  }

  expandOnSize() {
    if (window.innerWidth <= 1055) {
      this.active = false;
    } else {
      this.active = true;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }
}
