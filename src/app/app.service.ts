import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CubaApp } from '@cuba-platform/rest';
import { NotificationService } from 'carbon-components-angular';
import { LocalStorageService } from 'ngx-webstorage';
import { restServices } from 'services';
import { environment } from 'src/environments/environment';

//for local json file
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private notification: NotificationService,
    private http: HttpClient
  ) {}

  //for local json
  private defaultUrl = 'http://localhost:3000/propertyRental';

  fetchJsonData(customUrlSegment?: string): Observable<any[]> {
    return this.http.get<any[]>(this.defaultUrl);
  }

  apiIP = environment.url;
  // clientID = "pbksb-yLeUiveT";
  // clientSecret = "46a105d7f34a6cafbe1cebc7a8c90df393187303374f95547f92a83c5dac33f6";
  private clientID = 'pbksb-1bFTTqak';
  private clientSecret =
    'b7901bcd5d1cf3d6750536b790da677875eff7f84661eed066c3f48cf1b69ff6';

  myApp = new CubaApp('mrsvc', this.apiIP, this.clientID, this.clientSecret);

  passObj: any;
  passOutBoundObj: any;

  special = false;

  jsonToArray(jsonObject: any) {
    const resArr = JSON.parse(jsonObject);

    return resArr;
  }

  populateInitData(userData: any) {
    const userInfo = {
      Username: userData.username.login,
      UserID: userData.username.id,
      CustomerCode: userData.customer.code,
      CustomerID: userData.customer.id,
      Company: userData.customer.name,
      Fullname: userData.fullname,
      AllowBackdate: userData.customer.allowBackdate,
      Token: this.getSession().Token,
    };

    return userInfo;
  }

  private getSession() {
    const username = this.storage.retrieve('username');
    const access_token = this.storage.retrieve('token');

    const sessionData = {
      Username: username,
      Token: access_token,
    };

    return sessionData;
  }

  getUserInfo() {
    const username = this.getSession().Username;
    const param: any = { Username: username };

    return restServices.pbksb_CustomerService.GetILMSUserInfo(this.myApp)(
      param
    );
  }

  terminateSession() {
    this.myApp.logout();
    this.storage.clear('token');
    this.storage.clear('username');
    this.storage.clear('key');
    this.storage.clear('remember');
    sessionStorage.clear();
    // this.router.navigate(['/']);
    console.log('referrer URL: ', document.referrer);
    window.location.href = document.referrer;
  }

  showToaster(notiObj: any) {
    this.notification.showToast({
      type: notiObj.type,
      title: notiObj.title,
      subtitle: notiObj.subtitle,
      caption: notiObj.time,
      target: '.notification-container',
      message: 'message',
      duration: 10000,
      lowContrast: true,
    });
  }

  getSpecificCrew(initData: any) {
    // console.log(initData)
    const custID: any = { customerID: initData };

    return restServices.pbksb_CustomerService.IsSpecialRequestCrew(this.myApp)(
      custID
    );
  }

  resultSpecificCrew(result: boolean) {
    this.special = result;
  }

  getValueOutboundForm() {
    return this.passOutBoundObj;
  }
}
