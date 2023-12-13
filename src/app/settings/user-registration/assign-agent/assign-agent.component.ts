import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { restServices } from 'services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-agent',
  templateUrl: './assign-agent.component.html',
  styleUrls: ['./assign-agent.component.scss'],
})
export class AssignAgentComponent implements OnInit {
  items: any[] = [
    {
      content: 'one',
    },
    {
      content: 'two',
    },
    {
      content: 'three',
    },
  ];

  agentName: any[] = [];
  agentList: any = [];

  email = '';
  loginId = '';
  active: boolean;
  phoneNumber = '';
  accountStatus = '';
  currentDate = new Date();

  customerId = '';
  agentUserId = '';
  invalidAgent = false;
  invalidEmail = false;

  constructor(protected appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        // console.log(initialData);
        this.customerId = initialData.CustomerID;

        this.getRestQueryAPI(initialData.CustomerCode);
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

  getRestQueryAPI(customerCode: string) {
    // this.MheEndorsedRequestList = this.MheEndorsedRequest;

    restServices.pbksb_CustomerService
      .ListAgentUser(this.appService.myApp)()
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        this.agentList = request;
        this.agentName = request.map((item) => {
          let name = item.user.name;
          let company = item.company;
          let name_company = '';

          if (company.length > 0) {
            name_company = name + ' - ' + company[0].name;
          } else {
            name_company = name;
          }

          return {
            content: name_company,
          };
        });

        this.agentName.sort((a, b) => {
          if (a.content.toLocaleLowerCase() < b.content.toLocaleLowerCase()) {
            return -1;
          }
        });
      })
      .catch((err) => console.log(err));
  }

  selectedAgent(value: any) {
    this.invalidAgent = false;

    this.agentList.some((item) => {
      let company = '';
      if (item.company.length > 0) {
        company = item.company[0].name;
      }

      if (
        item.user.name == value.item.content ||
        item.user.name + ' - ' + company == value.item.content
      ) {
        this.email = item.user.email;
        this.loginId = item.user.login;
        this.agentUserId = item.user.id;
        this.active = item.user.active;
      }
    });
  }

  selectStatus(data: any) {
    // console.log(status.value);
    this.active = data.value === 'active' ? true : false;
  }

  submitForm() {
    // console.log(this.validateInput());
    // if (this.agentUserId !== '') {
    this.invalidAgent = false;
    let params = {
      customerID: this.customerId,
      agentUserID: this.agentUserId,
      contactNo: this.phoneNumber !== null ? '0' + this.phoneNumber : '',
      email: this.email,
    };

    restServices.pbksb_CustomerService
      .AssignAgent(this.appService.myApp)(params)
      .then((result) => {
        // console.log(result);
        this.router.navigate(['/settings/user-registration']);

        let toasterItems = {
          type: 'success',
          title: 'Assign Agent',
          subtitle: 'Your request has been successfully submitted',
          time: 'OK',
        };

        this.appService.showToaster(toasterItems);
      })
      .catch((err) => {
        let toasterItems = {
          type: 'error',
          title: 'Assign Agent',
          subtitle: 'Assign agent failed!',
          time: 'ERROR',
        };

        this.appService.showToaster(toasterItems);
        console.log(err);
      });
    // this.router.navigate(['/settings/user-registration']);
    // } else {
    //   this.invalidAgent = true;
    // }
  }

  validateInput() {
    let validate = false;

    if (!this.agentUserId) {
      this.invalidAgent = true;
      validate = false;
    } else if (!this.email) {
      this.invalidEmail = true;
      validate = false;
    } else {
      validate = true;
      this.submitForm();
    }

    // return validate
  }
}
