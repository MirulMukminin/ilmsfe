import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  constructor(private appService: AppService) {}

  switch: string = 'ID and Password';
  changePassword: boolean = false;

  companyName: string;
  shortName: string;
  ifsID: string;
  address: string;
  postcode: string;
  location: string;
  userLogin: string;
  firstName: string;
  lastName: string;

  ngOnInit(): void {
    this.getGeneralInfo();
  }

  selected(event: any) {
    // console.log(event.name)
    this.switch = event.name;
  }

  getGeneralInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        // console.log(this.appService.jsonToArray(result));
        const resArr = this.appService.jsonToArray(result);
        this.companyName = resArr.customer.full_name;
        this.shortName = resArr.customer.code;
        this.ifsID = resArr.customer.ifs_customer_id;
        this.address = resArr.customer.address;
        this.postcode = resArr.customer.postcode;
        this.location = resArr.customer.location;
        this.userLogin = resArr.username.login;
        this.firstName = resArr.username.firstName;
        this.lastName = resArr.username.lastName;
      })
      .catch((err) => {
        console.error(err);
        let errorObject = {
          type: 'error',
          title: 'Server Error',
          subtitle: 'Server Error. Please try again',
        };
        this.appService.showToaster(errorObject);
        this.appService.terminateSession();
      });
  }
  changePasswordHandler(changePasswordStatus: boolean) {
    this.changePassword = changePasswordStatus;
    // console.log(changePasswordStatus);
  }
  submitPasswordHandler(submitPasswordStatus: boolean) {
    this.changePassword = false;
    if (submitPasswordStatus) {
      this.ngOnInit();
    } else {
      this.ngOnInit();
    }
  }
}
