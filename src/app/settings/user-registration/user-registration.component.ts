import { formatDate } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ButtonType,
  PaginationModel,
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  // @Input() model = new PaginationModel();
  @Input() disabled = false;
  @Input() pageInputDisabled = false;
  @Input() pagesUnknown = false;
  @Input() showPageInput = true;

  //overwrite default itemsPerPageOptions
  itemsPerPageOptions = [10, 20, 30, 40, 50, 60];
  paginationTableItemTemplate: any;

  flip: boolean = true;
  offset: object = {
    x: 0,
    y: 48,
  };

  @Input() APmodel = new TableModel();
  @Input() agentModel = new TableModel();

  @Input() sortable = false;
  @Input() skeleton = false;

  @Input() get totalDataLength() {
    return this.APmodel.totalDataLength;
  }
  set totalDataLength(value) {
    this.APmodel.totalDataLength = value;
  }

  @Input() ibmButton: ButtonType = 'primary';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';

  switch: string = 'authorizedPerson';

  customerId = '';
  login = '';
  name = '';
  email = '';
  contact_Number = '';
  assign_Date = '';
  active = '';
  dataset_agent = [];
  rowId = '';

  checkedRows: any = [];
  rowCheckStatus = false;

  item = [
    {
      logInID: 'fatin_ep',
      name: 'Nur Fatin Najmi Bt Mat Lazin',
      email: 'nurfatin@epicgroup.com.my',
      pNumber: '0194189042',
      role: 'Endorser',
    },
    {
      logInID: 'izzah_ep',
      name: 'Nurul Izzah Bt Zainul Abidin',
      email: 'nurul.izzah@epicgroup.com.my',
      pNumber: '0154896357',
      role: 'Endorser',
    },
    {
      logInID: 'aziz_ep',
      name: 'Abdul Aziz B Che Mat',
      email: 'aziz@easternpacific.com.my',
      pNumber: '01748529635',
      role: 'Endorser & Requester',
    },
  ];

  item_agent = [
    // {
    //   logInID: 'A01916',
    //   name: 'ABC Agency Sdn Bhd',
    //   email: 'XXX@email.com',
    //   pNumber: '0194189042',
    //   reg_date: '21/06/2021',
    //   acc_status: 'Active',
    //   inactive_date: ''
    // },
    // {
    //   logInID: 'A00209',
    //   name: 'Agent1 Sdn Bhd',
    //   email: 'XXX@email.com',
    //   pNumber: '01748529635',
    //   reg_date: '21/06/2021',
    //   acc_status: 'Active',
    //   inactive_date: ''
    // },
    // {
    //   logInID: 'A00211',
    //   name: 'Agent2 Sdn Bhd',
    //   email: 'XXX@email.com',
    //   pNumber: '0154896357',
    //   reg_date: '21/06/2021',
    //   acc_status: 'Inactive',
    //   inactive_date: '30/5/2021'
    // },
  ];

  constructor(
    protected appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild('customTableItemTemplate', { static: false })
  protected customTableItemTemplate: TemplateRef<any>;

  ngOnInit(): void {
    this.userInfo();
    // this.model.pageLength = 10;
    // this.model.totalDataLength = this.item.length;
    // this.selectPage(1);

    this.APmodel.header = [
      new TableHeaderItem({ data: 'Login ID' }),
      new TableHeaderItem({ data: 'Name' }),
      new TableHeaderItem({ data: 'Email' }),
      new TableHeaderItem({ data: 'Phone Number' }),
      new TableHeaderItem({ data: 'Role' }),
      new TableHeaderItem({ data: 'Action' }),
    ];
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
    let params = { customerID: this.customerId };
    restServices.pbksb_CustomerService
      .ListAgentByCustomer(this.appService.myApp)(params)
      .then((result) => {
        let request: any = result;
        let requestList = JSON.parse(request);
        this.item_agent = requestList.agent;

        // default sorting result by date starting from latest
        this.item_agent.sort((a, b) => {
          return (
            this.getTimeTest(b.registration_date) -
            this.getTimeTest(a.registration_date)
          );
        });

        this.dataset_agent = [];
        this.item_agent.forEach((value, index) => {
          this.apiAgentValidation(value);
          this.pushAgentDataSet(index);
        });

        this.startAgentPagination();

        this.agentModel.header = [
          new TableHeaderItem({ data: 'Login ID', sortable: false }),
          new TableHeaderItem({ data: 'Name', sortable: false }),
          new TableHeaderItem({ data: 'Email', sortable: false }),
          new TableHeaderItem({ data: 'Phone Number', sortable: false }),
          new TableHeaderItem({ data: 'Assign. Date', sortable: false }),
          new TableHeaderItem({ data: 'Acc. Status', sortable: false }),
          // new TableHeaderItem({ data: 'Inactive Date' }),
          new TableHeaderItem({ data: 'Action', sortable: false }),
        ];
      })
      .catch((err) => console.log(err));
  }

  // ---- start functions used in pagination ---- //
  selectAgentPage(page) {
    this.getAgentPage(page).then((data: Array<Array<any>>) => {
      // set the data and update page
      this.agentModel.data = this.prepareAgentData(data);
      this.agentModel.currentPage = page;
    });
  }

  getAgentPage(page: number) {
    const fullPage = [];
    for (
      let i = (page - 1) * this.agentModel.pageLength;
      i < page * this.agentModel.pageLength &&
      i < this.agentModel.totalDataLength;
      i++
    ) {
      fullPage.push([
        this.dataset_agent[i].login,
        this.dataset_agent[i].name,
        this.dataset_agent[i].email,
        this.dataset_agent[i].contact_Number,
        this.dataset_agent[i].assign_Date,
        this.dataset_agent[i].active,
        this.dataset_agent[i].action,
      ]);
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(fullPage), 150);
    });
  }

  protected prepareAgentData(data: Array<Array<any>>) {
    // create new data from the service data
    let newData = [];
    data.forEach((dataRow, idx) => {
      let row = [];
      dataRow.forEach((dataElement, index) => {
        if (index == 6) {
          row.push(
            new TableItem({
              data: { id: dataElement, value: false },
              title: dataElement,
              template: this.customTableItemTemplate,
            })
          );
        } else {
          row.push(new TableItem({ data: dataElement }));
        }
      });
      newData.push(row);
    });
    return newData;
  }
  // ---- end functions used in pagination ---- //

  //start pagination
  startAgentPagination() {
    this.agentModel.data = [[]];
    this.agentModel.currentPage = 1;
    this.agentModel.pageLength = 10;

    this.agentModel.totalDataLength = this.dataset_agent.length;
    this.selectAgentPage(this.agentModel.currentPage);
  }

  pushAgentDataSet(index: any) {
    this.dataset_agent.push({
      login: this.login,
      name: this.name,
      email: this.email,
      contact_Number: this.contact_Number,
      assign_Date: this.assign_Date,
      active: this.active,
      action: this.rowId,
    });
  }

  apiAgentValidation(value: any) {
    if (value.username && value.username.login) {
      this.login = value.username.login;
    } else {
      this.login = 'N/A';
    }
    if (value.name) {
      this.name = value.name;
    } else {
      this.name = 'N/A';
    }
    if (value.email) {
      this.email = value.email;
    } else {
      this.email = 'N/A';
    }
    if (
      value.contact_Number == '0null' ||
      !value.contact_Number ||
      value.contact_Number == '0'
    ) {
      this.contact_Number = '-';
    } else if (value.contact_Number) {
      this.contact_Number = value.contact_Number;
    }
    if (value.registration_date) {
      this.assign_Date = formatDate(
        value.registration_date,
        'dd/MM/yyyy',
        'en_US'
      );
    } else {
      this.assign_Date = 'N/A';
    }
    if (value.username.active) {
      this.active = value.username.active === true ? 'Active' : 'Inactive';
    } else {
      this.active = 'N/A';
    }
    if (value.id) {
      this.rowId = value.id;
    } else {
      this.rowId = 'N/A';
    }
  }

  selected(event: any) {
    // console.log(event.name);

    this.switch = event.name;
  }

  // getPage(page: number) {
  // 	const line = line => [`Item ${line}:1!`, { name: "Item", surname: `${line}:2` }];

  // 	const fullPage = [];

  // 	for (let i = (page - 1) * this.APmodel.pageLength; i < page * this.APmodel.pageLength && i < this.APmodel.totalDataLength; i++) {
  // 		fullPage.push(line(i + 1));
  // 	}

  // 	return new Promise(resolve => {
  // 		setTimeout(() => resolve(fullPage), 150);
  // 	});
  // }

  selectPage(page: number) {
    // this.getPage(page).then((data: Array<Array<any>>) => {
    // 	// set the data and update page
    // 	this.APmodel.currentPage = page;
    // });
    // console.log(page);
  }

  addUser() {
    this.router.navigateByUrl('settings/user-registration/add-user');
  }

  assignAgent() {
    this.router.navigateByUrl('settings/user-registration/assign-agent');
  }

  getTimeTest(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
  }

  // editUser() {
  //   this.router.navigateByUrl('settings/user-registration/edit-user')
  // }

  onCheckedChange(event: any, id: string) {
    if (event) {
      this.checkedRows.push({
        rowID: id,
      });
    } else {
      this.checkedRows.forEach((element, idx) => {
        if (element.rowID == id) {
          this.checkedRows.splice(idx, 1);
        }
      });
    }

    // console.log(this.checkedRows.length);

    if (this.checkedRows.length > 0) {
      this.rowCheckStatus = true;
    } else {
      this.rowCheckStatus = false;
    }
  }

  unassignAgent() {
    this.checkedRows.forEach((element) => {
      let param = { agentID: element.rowID };
      restServices.pbksb_CustomerService
        .UnassignAgent(this.appService.myApp)(param)
        .then((result) => {
          // console.log(result);
          this.rowCheckStatus = false;
          this.ngOnInit();
        });
    });

    this.checkedRows = [];
  }

  cancelCheckStatus() {
    this.agentModel.data.forEach((ticket, index) => {
      ticket[6].data.select = false;
    });

    this.rowCheckStatus = false;
    this.checkedRows = [];
  }
}
