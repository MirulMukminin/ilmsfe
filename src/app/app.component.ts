import { Component, HostListener } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ILMS';

  showHead: boolean = false;
  sessionInterval: any;
  open: boolean = false;
  sessionDuration: number;
  bufferTime: number = 60; //second
  noticeTimeOut: any;

  constructor(
    private router: Router,
    private appService: AppService,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadLoginPage();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.moveResetSession();
  }

  moveResetSession() {
    if (this.sessionInterval) {
      clearInterval(this.sessionInterval);
      this.initSessionTimeOutNotice();
    }
  }

  secToMiliSec(sec: number) {
    return sec * 1000;
  }

  initSessionTimeOutNotice() {
    this.sessionInterval = setInterval(() => {
      this.idle();
    }, this.secToMiliSec(this.sessionDuration) - this.secToMiliSec(this.bufferTime));
  }

  idle() {
    this.open = true;
    clearInterval(this.sessionInterval);
    this.noticeTimeOut = this.sessionTimeout(this.bufferTime);
  }

  sessionTimeout(timeout: number) {
    return setTimeout(() => {
      this.appService.terminateSession();
      this.open = false;
      clearTimeout(this.noticeTimeOut);
    }, timeout * 1000);
  }

  logout() {
    this.open = false;
    this.appService.terminateSession();
    this.ngOnInit();
  }

  loadLoginPage() {
    var Base64 = {
      _keyStr:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      decode: function (input) {
        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }
        output = Base64._utf8_decode(output);
        return output;
      },
      _utf8_decode: function (utftext) {
        var string = '';
        var i = 0;
        var c = 0;
        var c2;
        var c3;
        while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(
              ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
            );
            i += 3;
          }
        }
        return string;
      },
    };

    this.router.events.forEach((event) => {
      setTimeout(() => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/') {
            this.showHead = false;
          } else if (event['url'].includes('wp_u')) {
            var queryparams = event['url'].split('?')[1];
            var params = queryparams.split('&');
            var pair = null,
              data = [];
            params.forEach(function (d) {
              pair = d.split('=');
              data.push({ key: pair[0], value: pair[1] });
            });
            // this.auth({username: data[0].value, password: data[1].value});
            this.auth({
              username: Base64.decode(decodeURIComponent(data[0].value)),
              password: Base64.decode(decodeURIComponent(data[1].value)),
            });
          } else {
            this.showHead = true;
            this.userInfo();
          }
        }
      }, 100);
    });
    // }
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.appService
          .getSpecificCrew(initialData.CustomerID)
          .then((result) => {
            const resArr: any = result;
            const customerID = JSON.parse(resArr);
            this.appService.resultSpecificCrew(customerID);
          });

        this.sessionDuration = initialData.Token.expires_in;
        this.initSessionTimeOutNotice();
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  public login(
    login: string,
    password: string
  ): Promise<{ access_token: string }> {
    return this.appService.myApp.login(login, password);
  }

  public showPassword: boolean;

  public auth(formData: any) {
    this.login(formData.username, formData.password).then((result) => {
      // console.log(result['expires_in']);

      this.storage.clear('token');
      this.storage.clear('username');
      this.storage.store('token', result);
      // this.storage.store('token', 'DummyToken');
      this.storage.store('username', formData.username);
      // this.appService.sessionTimeout(result['expires_in']);
      this.router.navigate(['dashboard']);
    });
  }
}
