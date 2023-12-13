import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import {
  MachineryConsole,
  MheForm,
} from 'src/app/operation-system/interfaces/MHE/mhe_interface';
import { BerthRequestFormService } from 'src/app/operation-system/services/Marine/berth-request-form.service';
import { restServices } from 'services';

@Component({
  selector: 'app-mhe-preview-console',
  templateUrl: './mhe-preview-console.component.html',
  styleUrls: ['./mhe-preview-console.component.scss'],
})
export class MhePreviewConsoleComponent implements OnInit {
  @Input() array: any = {};
  @Input() mheFormID: string;
  @Output() openEdit = new EventEmitter<any>();

  mheForm: MheForm = {};
  description: string =
    'Please add required services in the table below. To Remove, select the check box and press remove button in the console';
  machineryTableInvalid: boolean = false;

  timeArr = [];
  location = [];
  sitesArr: any[] = [];
  sitesName: any[] = [];
  sitesList: any[] = [];

  locationMachinery = '';
  timeMachinery = '';
  dailyDate: any;
  machineryConsoleListDischarge: MachineryConsole[] = [
    {
      id: 1,
      Selected: false,
      Item: 'Forklift 03T',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
    {
      id: 2,
      Selected: false,
      Item: 'Prime Mover',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
    {
      id: 3,
      Selected: false,
      Item: 'Road Sweeper CF 60',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
  ];

  machineryConsoleListLoading: MachineryConsole[] = [
    {
      id: 1,
      Selected: false,
      Item: 'Forklift 03T',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
    {
      id: 2,
      Selected: false,
      Item: 'Prime Mover',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
    {
      id: 3,
      Selected: false,
      Item: 'Road Sweeper CF 60',
      Quantity: 1,
      Time: this.timeMachinery,
      Location: this.locationMachinery,
    },
  ];

  //for invalid UI
  invalidTimeMachinery: any = [];
  invalidLocationMachinery: any = [];
  invalidLoadingTimeMachinery: any = [];
  invalidLoadingLocationMachinery: any = [];
  requiredTime: any = [];
  requiredLocation: any = [];
  disable: any = [];
  consoleTableInvalid = false;

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  // For numbering input
  step = 1;
  min = 0;
  max = 2;
  maxGood = 6;
  value = 0;

  dateString = '';
  selectDate = '';
  userDate = new Date();
  current = new Date();
  currentDate = formatDate(this.current, 'dd/MM/yyyy', 'en_US');

  dateFlag: boolean;
  open = false;

  updateStatus = false;
  formID: any;
  date = new Date();
  RequestNo: string;
  dateSelect = false;
  selectedArrayLoading = [];
  selectedArrayDischarge = [];

  constructor(
    private router: Router,
    private appService: AppService,
    private berthRequestFormService: BerthRequestFormService,
    public datepipe: DatePipe,
    private _Activatedroute: ActivatedRoute
  ) {
    this.mheForm.requestType = 'Console';
  }

  ngOnInit(): void {
    this.userInfo();
    this.getTimeDropdown();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.getRestServiceAPI(initialData);
        console.log(this.mheFormID);

        // console.log(initialData);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  getRestServiceAPI(initData: any) {
    const getCode: any = {
      userID: initData.UserID,
      CustomerCode: initData.CustomerCode,
    };

    restServices.pbksb_CustomerService
      .getRequestFrom(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const cust = JSON.parse(resArr);

        console.log(cust);

        this.sitesArr = cust.sites;

        //LOCATION
        for (let i = 0; i < this.sitesArr.length; i++) {
          if (this.sitesArr[i].description) {
            this.sitesName.push({
              content: this.sitesArr[i].description,
            });
          }
        }

        this.location = this.sitesName.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
      })
      .then(() => {
        this.getData(this.RequestNo);
      });
  }

  getData(requestNo: any) {
    // requestNo = 'BRF551C91FE';

    // console.log(array);

    if (this.array.berthMHERequest.length > 0) {
      // console.log('in');
      this.updateStatus = true;

      this.mheForm.requestOnBehalf =
        this.array.berthMHERequest[0].request_behalf.name;

      this.mheForm.jobDescription =
        this.array.berthMHERequest[0].job_description;

      this.mheForm.singleDate = formatDate(
        this.array.berthMHERequest[0].booking_date,
        'dd/MM/yyyy',
        'en_US'
      );

      this.mheForm.estDuration =
        this.array.berthMHERequest[0].estimated_duration;
      this.mheForm.estTrip = this.array.berthMHERequest[0].estimated_trip;
      this.mheForm.estGoods = this.array.berthMHERequest[0].estimated_quantity;
      this.mheForm.remarks = this.array.berthMHERequest[0].remarks;
      this.mheForm.refNo = this.array.berthMHERequest[0].reference_number;

      // console.log(this.machineryConsoleListLoading);

      this.array.machineries.forEach((element) => {
        if (element.program == 'DISCHARGE') {
          this.machineryConsoleListDischarge.forEach((data) => {
            if (element.item.description == data.Item.toUpperCase()) {
              (data.id = element.id),
                (data.Location = element.location.description);
              data.Time = element.time.slice(0, 5);
              data.Selected = true;
              this.selectedArrayDischarge.push(data.id);
            }
          });
        } else if (element.program == 'LOADING') {
          this.machineryConsoleListLoading.forEach((data) => {
            if (element.item.description == data.Item.toUpperCase()) {
              (data.id = element.id),
                (data.Location = element.location.description);
              data.Time = element.time.slice(0, 5);
              data.Selected = true;
              this.selectedArrayLoading.push(data.id);
            }
          });

          console.log(this.selectedArrayLoading);
        }
      });
    }
  }

  onSave() {
    this.validateTable();

    let dischargeConsole = [];
    let loadingConsole = [];

    this.machineryConsoleListDischarge.forEach((element, index) => {
      if (element.Selected) {
        dischargeConsole.push({
          id: element.id,
          // item: element.Item.toUpperCase(),
          quantity: element.Quantity,
          time: element.Time,
          location: element.Location,
        });
      }
    });

    this.machineryConsoleListLoading.forEach((element, index) => {
      if (element.Selected) {
        loadingConsole.push({
          id: element.id,
          // item: element.Item.toUpperCase(),
          quantity: element.Quantity,
          time: element.Time,
          location: element.Location,
        });
      }
    });

    let booking_date;
    if (this.updateStatus && !this.dateSelect) {
      var dateParts = this.mheForm.singleDate.split('/');
      booking_date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    } else {
      booking_date = this.mheForm.singleDate;
    }

    let param = {
      form: {
        formID: this.berthRequestFormService.getBerthFormID(),
        mheRequestFormID: this.mheFormID,
        request_behalf: this.mheForm.requestOnBehalf,
        job_description: this.mheForm.jobDescription,
        booking_date: this.datepipe.transform(booking_date, 'yyyy-MM-dd'),
        estimated_duration: this.mheForm.estDuration,
        estimated_trip: this.mheForm.estTrip,
        estimated_quantity_goods: this.mheForm.estGoods,
        remarks: this.mheForm.remarks ?? '',
        reference_number: this.mheForm.refNo ?? '',
        discharge: dischargeConsole,
        loading: loadingConsole,
      },
    };

    console.log(param);
    let invalidTimeMachinery = this.invalidTimeMachinery.includes(true);
    let invalidLocationMachinery = this.invalidLocationMachinery.includes(true);
    let invalidLoadingTimeMachinery =
      this.invalidLoadingTimeMachinery.includes(true);
    let invalidLoadingLocationMachinery =
      this.invalidLoadingLocationMachinery.includes(true);

    if (
      !this.consoleTableInvalid &&
      !invalidTimeMachinery &&
      !invalidLocationMachinery &&
      !invalidLoadingTimeMachinery &&
      !invalidLoadingLocationMachinery
    ) {
      restServices.pbksb_MarineService
        .UpdateBerthMHERequestConsole(this.appService.myApp)(param)
        .then((result) => {
          console.log(result);
          let requestList: any = result;
          let request = JSON.parse(requestList);

          if (!request.status) {
            // console.log(request);

            console.log('mhe console save success');
            this.createNotification('success', 'submitted');
            this.updateStatus = true;
            this.openEdit.emit();
          } else {
            console.log(request.status, 'mhe console failed');
            this.createNotification('error', 'submit');
          }
        })
        .catch((err) => {
          console.log(err, 'mhe console failed');
          this.createNotification('error', 'submit');
        });
    }
  }

  validateTable() {
    let isSelected = false;
    this.machineryConsoleListDischarge.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;

        if (!value.Time) {
          this.invalidTimeMachinery[i] = true;
        } else {
          this.invalidTimeMachinery[i] = false;
        }
        if (!value.Location) {
          this.invalidLocationMachinery[i] = true;
        } else {
          this.invalidLocationMachinery[i] = false;
        }
      }
    });
    this.machineryConsoleListLoading.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;

        if (!value.Time) {
          this.invalidLoadingTimeMachinery[i] = true;
        } else {
          this.invalidLoadingTimeMachinery[i] = false;
        }
        if (!value.Location) {
          this.invalidLoadingLocationMachinery[i] = true;
        } else {
          this.invalidLoadingLocationMachinery[i] = false;
        }
      }
    });
    if (isSelected) {
      this.consoleTableInvalid = false;
    } else {
      this.consoleTableInvalid = true;
    }
  }

  onSelected(tableType: any) {
    let isSelected = false;
    if (tableType == 'loading') {
      this.machineryConsoleListLoading.forEach((value, i) => {
        if (value.Selected == true) {
          isSelected = true;
        } else {
          value.Time = '';
          value.Location = '';
          this.invalidLoadingTimeMachinery[i] = false;
          this.invalidLoadingLocationMachinery[i] = false;
        }
      });
    } else if (tableType == 'discharge') {
      this.machineryConsoleListDischarge.forEach((value, i) => {
        if (value.Selected == true) {
          isSelected = true;
        } else {
          value.Time = '';
          value.Location = '';
          this.invalidTimeMachinery[i] = false;
          this.invalidLocationMachinery[i] = false;
        }
      });
    }

    if (isSelected) {
      this.consoleTableInvalid = false;
    }
  }

  inputValueChange() {
    this.machineryConsoleListDischarge.forEach((value, i) => {
      if (value.Selected == true) {
        if (value.Time) {
          this.invalidTimeMachinery[i] = false;
        }
        if (value.Location) {
          this.invalidLocationMachinery[i] = false;
        }
      }
    });

    this.machineryConsoleListLoading.forEach((value, i) => {
      if (value.Selected == true) {
        if (value.Time) {
          this.invalidLoadingTimeMachinery[i] = false;
        }
        if (value.Location) {
          this.invalidLoadingLocationMachinery[i] = false;
        }
      }
    });
  }

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `MHE Console is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `The request failed to ${keywords}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      // subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
  }

  getTimeDropdown() {
    const interval = 60; // 1 Hour interval
    const time = [];
    let startT = 0;
    for (let i = 0; startT < 24 * 60; i++) {
      const hh = Math.floor(startT / 60);
      const mm = startT % 60;
      time[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2);
      startT += interval;
    }

    for (let i = 0; i < time.length; i++) {
      this.timeArr.push({
        content: time[i],
      });
    }
  }
}
