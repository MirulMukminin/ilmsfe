import { Component, Input, OnInit } from '@angular/core';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() expand: boolean;
  ilmsRestApi = false;
  customer = false;
  mheCustomer = false;
  marineCustomer = false;
  wdCustomer = false;
  propCustomer = false;
  psbCustomer = false;
  cwcyCustomer = false;
  cfsCustomer = false;
  icwCustomer = false;
  swmCustomer = false;
  crewCustomer = false;
  icysCustomer = false;

  isLoading = false;

  constructor(
    private appService: AppService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.isLoading = true;
  }

  getRole() {
    restServices.pbksb_UserILMSService
      .getCustomerUserTypeForCurrentUser(this.appService.myApp)()
      .then((result) => {
        console.log('CustomerUserType: ', result);
        this.authService.setUserType(result);
      });

    restServices.pbksb_UserILMSService
      .getRolesForCurrentUser(this.appService.myApp)()
      .then((result) => {
        this.isLoading = false;
        const ressArr = this.appService.jsonToArray(result);

        ressArr.forEach((element) => {
          // console.log(element);

          if (element == 'ILMS_REST_API') {
            this.ilmsRestApi = true;
          }

          if (element == 'CUSTOMER') {
            this.customer = true;
          }

          if (element == 'mheCustomer') {
            this.mheCustomer = true;
          }

          if (element == 'marineCustomer') {
            this.marineCustomer = true;
          }

          if (element == 'wdCustomer') {
            this.wdCustomer = true;
          }

          if (element == 'propCustomer') {
            this.propCustomer = true;
          }

          if (element == 'psbCustomer') {
            this.psbCustomer = true;
          }

          if (element == 'cwcyCustomer') {
            this.cwcyCustomer = true;
          }

          if (element == 'cfsCustomer') {
            this.cfsCustomer = true;
          }

          if (element == 'icwCustomer') {
            this.icwCustomer = true;
          }

          if (element == 'swmCustomer') {
            this.swmCustomer = true;
          }

          if (element == 'crewCustomer') {
            this.crewCustomer = true;
          }

          if (element == 'icysCustomer') {
            this.icysCustomer = true;
          }
        });

        // this.mheCustomer = true;
        // this.marineCustomer = true;
        // this.wdCustomer = true;
        // this.propCustomer = true;
        // this.psbCustomer = true;
        // this.cwcyCustomer = true;
        // this.cfsCustomer = true;
        // this.icwCustomer = true;
        // this.swmCustomer = true;
        // this.crewCustomer = true;
        // this.icysCustomer = true;

        // console.log(ressArr);
        this.authService.setCurrentRole(ressArr);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
