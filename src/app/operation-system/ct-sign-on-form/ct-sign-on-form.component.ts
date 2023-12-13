import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';
import { read, utils } from 'xlsx';

interface CrewTransferItem {
  crewName: string;
  crewIcPassport: string;
  crewPassportExpiry: string | Date;
  crewNationality: string;
  crewCompany: string;
  destination: string;
  crewMobileNumber: string;
  crewNameInvalid: boolean;
  crewIcPassportInvalid: boolean;
  crewIcPassportInvalidText: string;
  crewNationalityInvalid: boolean;
  crewCompanyInvalid: boolean;
  destinationInvalid: boolean;
  crewMobileNumberInvalid: boolean;
  crewMobileNumberInvalidText: string;
  crewPassportExpiryInvalid: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-ct-sign-on-form',
  templateUrl: './ct-sign-on-form.component.html',
  styleUrls: ['./ct-sign-on-form.component.scss'],
})
export class CtSignOnFormComponent implements OnInit {
  isLoading: boolean = false;
  overlay: boolean = false;
  roles;
  isAgent: boolean = false;

  companyName: string = '';
  requestBy: string = '';
  portOfOrigin: string = '';
  agent: string = '';
  agentCompany = '';
  date;
  time;
  vesselName: string = '';
  poNumber: string;
  itemList: CrewTransferItem[] = [];
  crewTransferItem = [];

  companyArray = [];
  companySelect = [];
  companyList = [];
  agentCompanyArray = [];
  agentCompanySelect = [];
  agentCompanyList = [];
  nationalityArray = [];
  nationalitySelect = [];
  // nationalityList = [{ content: 'Singapore' }, { content: 'Malaysia' }];
  nationalityList = [];
  timeList = [
    { content: '00:00' },
    { content: '01:00' },
    { content: '02:00' },
    { content: '03:00' },
    { content: '04:00' },
    { content: '05:00' },
    { content: '06:00' },
    { content: '07:00' },
    { content: '08:00' },
    { content: '09:00' },
    { content: '10:00' },
    { content: '11:00' },
    { content: '12:00' },
    { content: '13:00' },
    { content: '14:00' },
    { content: '15:00' },
    { content: '16:00' },
    { content: '17:00' },
    { content: '18:00' },
    { content: '19:00' },
    { content: '20:00' },
    { content: '21:00' },
    { content: '22:00' },
    { content: '23:00' },
  ];

  dateInvalid: boolean = false;
  dateInvalidText: string = '';
  timeInvalid: boolean = false;
  timeInvalidText: string = '';
  vesselNameInvalid: boolean = false;
  agentCompanyInvalid: boolean = false;
  poNumberInvalid: boolean = false;

  isEdit: boolean = false;
  requestNo: string = '';
  status: string = '';
  formData;

  open: boolean = false;
  uploadOpen: boolean = false;

  @ViewChild('hiddenfileinput') hiddenfileinput;

  previousURL;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.overlay = true;
    this.checkUserRole();
    this.userInfo();
    this.addRow();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;
        this.portOfOrigin = userInfo?.portOfOrigin;
        this.agent = this.isAgent ? userInfo?.username?.name : '';

        let orderNo = this.activatedRoute.snapshot.paramMap.get('formNo');
        if (orderNo !== null) {
          this.isEdit = true;
          let params = { requestNo: orderNo };
          this.getExistingData(orderNo);
          // this.formDataPromise =
          //   restServices.pbksb_CommonWarehouseCommonYardService
          //     .getStorageRequestByRequestNo(this.appService.myApp)(params)
          //     .then((result) => {
          //       let resArr: any = result;
          //       let gsRequest = this.appService.jsonToArray(resArr);
          //       this.formData = gsRequest;

          //       this.requestNo = this.formData.requestNo;
          //       this.status = this.formData.status;
          //     });
        } else {
          this.isEdit = false;
        }
        this.getRestServiceApi();
      })
      .catch((err) => {
        this.isLoading = false;
        this.overlay = false;
        console.error(err);
        // this.appService.terminateSession();
      });
  }

  getRestServiceApi() {
    let nationalityPromise;
    let agentCustomerPromise;
    let companyPromise;
    nationalityPromise = restServices.pbksb_CustomerService
      .getAllNationalities(this.appService.myApp)()
      .then((result) => {
        const nationalityArray: any = result;
        const nationalityDropdown = JSON.parse(nationalityArray);
        this.nationalityArray = nationalityDropdown;
        for (let i = 0; i < this.nationalityArray.length; i++) {
          this.nationalitySelect.push({
            content: this.nationalityArray[i].countryName,
          });
        }
        this.nationalityList = this.nationalitySelect;
      });

    if (this.isAgent) {
      agentCustomerPromise = restServices.pbksb_AgentService
        .getAgentCustomers(this.appService.myApp)({ name: this.agent })
        .then((result) => {
          const agentCompanyArray: any = result;
          const agentCompanyDropdown = JSON.parse(agentCompanyArray);
          this.agentCompanyArray = agentCompanyDropdown;
          for (let i = 0; i < this.agentCompanyArray.length; i++) {
            this.agentCompanySelect.push({
              content: this.agentCompanyArray[i],
            });
          }
          this.agentCompanyList = this.agentCompanySelect;
        });
    }

    // companyPromise = restServices.pbksb_JobMHEService
    //   .getAllCustomer(this.appService.myApp)()
    //   .then((result: any) => {
    //     const companyArray: any = result;
    //     const companyDropdown = JSON.parse(companyArray);
    //     this.companyArray = companyDropdown;
    //     for (let i = 0; i < this.companyArray.length; i++) {
    //       this.companySelect.push({
    //         content: this.companyArray[i].name,
    //       });
    //     }
    //     this.companyList = this.companySelect;
    //   });

    Promise.all([
      nationalityPromise,
      agentCustomerPromise,
      // companyPromise,
    ]).then(() => {
      if (this.isEdit) {
        this.populateData();
      }
      this.isLoading = false;
      this.overlay = false;
    });
  }

  getExistingData(requestNo) {
    restServices.pbksb_CrewTransferService
      .getCrewTransferRequestByRequestNumber(this.appService.myApp)({
        requestNumber: requestNo,
      })
      .then((result) => {
        let resArr: any = result;
        let requestData = this.appService.jsonToArray(resArr);
        this.formData = requestData;

        this.requestNo = this.formData.requestNumber;
        this.status = this.formData.requestStatus;
      });
  }

  populateData() {
    this.date = formatDate(this.formData?.requestDate, 'dd/MM/Y', 'en-US');
    this.time = formatDate(this.formData?.requestDate, 'HH:mm', 'en-US');
    this.vesselName = this.formData?.vessel;
    this.poNumber = this.formData?.poNumber ?? '-';
    this.portOfOrigin = this.formData?.portOfOrigin;
    this.agentCompany = this.formData?.company;

    if (this.formData.crewTransferItem) {
      this.itemList = [];
      this.formData.crewTransferItem.forEach((item) => {
        this.itemList.push({
          crewCompany: item.crewCompany,
          crewIcPassport: item.crewIcPassport,
          crewMobileNumber: item.crewMobileNumber,
          crewName: item.crewName ? item.crewName : '-',
          crewNationality: item.crewNationality,
          crewPassportExpiry: item.crewPassportExpiry
            ? formatDate(item.crewPassportExpiry, 'dd/MM/Y', 'en-US')
            : null,
          destination: item.destination,
          crewNameInvalid: false,
          crewIcPassportInvalid: false,
          crewNationalityInvalid: false,
          crewCompanyInvalid: false,
          destinationInvalid: false,
          crewMobileNumberInvalid: false,
          selected: false,
          crewPassportExpiryInvalid: false,
          crewIcPassportInvalidText: '',
          crewMobileNumberInvalidText: '',
        });
      });
    }
  }

  checkUserRole() {
    this.auth.getCurrentRole().subscribe((role: Array<String>) => {
      this.roles = role;
    });
    if (this.roles.includes('PBKSB Agent')) {
      this.isAgent = true;
    } else {
      this.isAgent = false;
    }
  }

  checkSelected(): boolean {
    return this.itemList.some((item) => item.selected === true);
  }

  addRow() {
    this.itemList.push({
      crewName: '',
      crewIcPassport: '',
      crewPassportExpiry: '',
      crewNationality: '',
      crewCompany: '',
      destination: '',
      crewMobileNumber: '',
      crewNameInvalid: false,
      crewIcPassportInvalid: false,
      crewNationalityInvalid: false,
      crewCompanyInvalid: false,
      destinationInvalid: false,
      crewMobileNumberInvalid: false,
      selected: false,
      crewPassportExpiryInvalid: false,
      crewIcPassportInvalidText: '',
      crewMobileNumberInvalidText: '',
    });
  }

  deleteRow() {
    this.itemList = this.itemList.filter((item) => item.selected !== true);
  }

  onCancel() {
    this.itemList.forEach((rowDetail) => {
      if (rowDetail.selected) {
        rowDetail.selected = false;
      }
    });
  }

  dateChange(event) {
    console.log('date selected: ', event);
    if (this.date) {
      let check = this.checkDateBeforeToday(this.date[0]);
      if (check) {
        this.dateInvalid = true;
        this.dateInvalidText =
          "Please select today's date or after today's date";
      } else {
        this.dateInvalid = false;
        this.dateInvalidText = '';
      }
    }
  }

  passportDateChange(index) {
    console.log('selected index: ', index);
    let targetDate = this.itemList[index].crewPassportExpiry[0];
    if (targetDate) {
      let check = this.checkDateBeforeToday(targetDate);
      console.log(check);
      if (check) {
        this.itemList[index].crewPassportExpiryInvalid = true;
      } else {
        this.itemList[index].crewPassportExpiryInvalid = false;
      }
    }
  }

  checkDateBeforeToday(date) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('today: ', today);
    console.log('date: ', date);

    if (date < today) {
      console.log('date < today');
      return true;
    } else {
      console.log('date > today');
      return false;
    }
  }

  inputValueChange(event) {
    if (this.time || this.time?.length > 0) {
      this.timeInvalid = false;
      this.timeInvalidText = '';
    }

    if (this.vesselName) {
      this.vesselNameInvalid = false;
    }

    if (this.poNumber) {
      this.poNumberInvalid = false;
    }

    this.itemList.forEach((item) => {
      if (item.crewName) {
        item.crewNameInvalid = false;
      }

      if (item.crewIcPassport) {
        item.crewIcPassportInvalid = false;
      }

      if (item.crewNationality?.length > 0) {
        item.crewNationalityInvalid = false;
      }

      if (item.crewCompany?.length > 0) {
        item.crewCompanyInvalid = false;
      }

      if (item.destination) {
        item.destinationInvalid = false;
      }

      if (item.crewMobileNumber) {
        item.crewMobileNumberInvalid = false;
      }
    });
  }

  submitClick() {
    this.open = false;
    if (this.validation()) {
      this.open = true;
    } else {
      console.log('Error!');
    }
  }

  validation() {
    let validate = true;

    if (!this.date) {
      this.dateInvalid = true;
      this.dateInvalidText = 'Required';
      validate = false;
    }

    if (!this.time || this.time.length == 0) {
      this.timeInvalid = true;
      this.timeInvalidText = 'Required';
      validate = false;
    }

    if (!this.vesselName) {
      this.vesselNameInvalid = true;
      validate = false;
    }

    if (!this.poNumber) {
      this.poNumberInvalid = true;
      validate = false;
    }

    this.itemList.forEach((item) => {
      if (!item.crewName) {
        item.crewNameInvalid = true;
        validate = false;
      }

      if (!item.crewIcPassport) {
        item.crewIcPassportInvalid = true;
        item.crewIcPassportInvalidText = 'Required';
        validate = false;
      } else if (!this.isAplphanumeric(item.crewIcPassport)) {
        item.crewIcPassportInvalid = true;
        item.crewIcPassportInvalidText = 'Alphanumeric Only';
        validate = false;
      }

      if (!item.crewNationality || item.crewNationality.length == 0) {
        item.crewNationalityInvalid = true;
        validate = false;
      }

      if (!item.crewCompany || item.crewCompany.length == 0) {
        item.crewCompanyInvalid = true;
        validate = false;
      }

      if (!item.destination) {
        item.destinationInvalid = true;
        validate = false;
      }

      if (!item.crewMobileNumber) {
        item.crewMobileNumberInvalid = true;
        item.crewMobileNumberInvalidText = 'Required';
        validate = false;
      } else if (!this.isNumeric(item.crewMobileNumber)) {
        item.crewMobileNumberInvalid = true;
        item.crewMobileNumberInvalidText = 'Numbers Only';
        validate = false;
      }
    });

    if (this.dateInvalid) {
      validate = false;
    }

    let isExpiryInvalid = this.itemList.some(
      (item) => item.crewPassportExpiryInvalid == true
    );
    if (isExpiryInvalid) {
      validate = false;
    }

    return validate;
  }

  onSubmit(form) {
    let startdate;
    this.open = false;
    if (this.validation()) {
      // this.isLoading = true;
      // this.overlay = true;
      this.checkDate();
      const sDate = formatDate(this.date, 'M/d/yyyy', 'en_us');
      startdate = new Date(sDate + ' ' + this.time).getTime().toString();
      this.populateCrewTransferItem();

      let submitData = {
        requestForm: {
          requestNumber: this.isEdit ? this.requestNo : undefined,
          agent: this.agent,
          requestType: 'SIGN_ON',
          portOfOrigin: this.portOfOrigin,
          vesselName: this.vesselName,
          requestDate: startdate,
          company: this.isAgent ? this.agentCompany : this.companyName,
          poNumber: this.poNumber,
          crewTransferItem: this.crewTransferItem,
        },
      };

      console.log('submitData: ', submitData);
      if (!this.isEdit) {
        restServices.pbksb_CrewTransferService
          .createCrewTransferSignOnRequest(this.appService.myApp)(submitData)
          .then((result) => {
            this.isLoading = false;
            this.overlay = false;
            let returnObj = this.appService.jsonToArray(result);

            let currDate = new Date();
            if (returnObj.success) {
              this.router
                .navigate(['/operation-system/ct-sign-on-list'])
                .then(() => {
                  this.appService.showToaster({
                    type: 'success',
                    title: 'Request Submitted',
                    subtitle:
                      'Form No. ' +
                      returnObj.requestNo +
                      ' is successfully submitted.',
                    time: formatDate(currDate, 'HH:mm', 'en-US'),
                  });
                });
            } else {
              let errorMsg = returnObj.errorMessage.split(':');
              this.appService.showToaster({
                type: 'error',
                title: 'Cannot Submit',
                subtitle: errorMsg.length > 1 ? errorMsg[1] : errorMsg[0],
                // 'The request has failed to be submitted. Please try again',
                time: formatDate(currDate, 'HH:mm', 'en-US'),
              });
            }
          });
      } else {
        // Edit request API
        restServices.pbksb_CrewTransferService
          .updateCrewTransferSignOnRequest(this.appService.myApp)(submitData)
          .then((result) => {
            this.isLoading = false;
            this.overlay = false;
            let returnObj = this.appService.jsonToArray(result);

            let currDate = new Date();
            if (returnObj.success) {
              this.router
                .navigate(['/operation-system/ct-sign-on-list'])
                .then(() => {
                  this.appService.showToaster({
                    type: 'success',
                    title: 'Request Edited',
                    subtitle:
                      'Form No. ' +
                      returnObj.requestNo +
                      ' is successfully edited.',
                    time: formatDate(currDate, 'HH:mm', 'en-US'),
                  });
                });
            } else {
              let errorMsg = returnObj.errorMessage.split(':');
              this.appService.showToaster({
                type: 'error',
                title: 'Cannot Submit',
                subtitle: errorMsg.length > 1 ? errorMsg[1] : errorMsg[0],
                // 'The request has failed to be submitted. Please try again',
                time: formatDate(currDate, 'HH:mm', 'en-US'),
              });
            }
          });
      }
    }
  }

  checkDate() {
    if (this.date && this.date.toString().includes('/')) {
      let dateArr = this.date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      this.date = new Date(d);
    }
  }

  populateCrewTransferItem() {
    this.crewTransferItem = this.itemList.map(
      ({
        crewNameInvalid,
        crewIcPassportInvalid,
        crewCompanyInvalid,
        destinationInvalid,
        crewNationalityInvalid,
        crewMobileNumberInvalid,
        crewPassportExpiryInvalid,
        selected,
        ...rest
      }) => rest
    );
    this.expiryDateToLong();
    console.log(this.crewTransferItem);
  }

  checkDateFormat(date) {
    if (date && date.toString().includes('/')) {
      let dateArr = date.toString().split('/');
      const d = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      return new Date(d);
    }
    return date;
  }

  expiryDateToLong() {
    this.crewTransferItem.forEach((item) => {
      if (item.crewPassportExpiry) {
        item.crewPassportExpiry = this.checkDateFormat(item.crewPassportExpiry);
        const sDate = formatDate(item.crewPassportExpiry, 'M/d/yyyy', 'en_us');
        item.crewPassportExpiry = new Date(sDate).getTime().toString();
      } else {
        item.crewPassportExpiry = null;
      }
    });
  }

  fileChangeListener($event) {
    this.isLoading = true;
    this.overlay = true;
    try {
      const files = $event.target.files;
      console.log($event.target);
      if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
          var data = event.target.result;
          console.log(data);
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;

          if (sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {
              raw: false,
              dateNF: 'm/d/yy',
            });
            console.log(rows);
            if (rows.length > 0) {
              this.itemList = [];
              rows.forEach((item) => {
                this.itemList.push({
                  crewCompany: item['Company'],
                  crewName: item['Name'],
                  crewIcPassport: item['IC/Passport'],
                  crewPassportExpiry:
                    this.convertExcelDateToDatePicker(
                      item['Passport Expiry Date']
                    ) ?? null,
                  crewNationality: item['Nationality'],
                  destination: item['Destination'],
                  crewMobileNumber: item['Mobile No.'],
                  crewNameInvalid: false,
                  crewIcPassportInvalid: false,
                  crewNationalityInvalid: false,
                  crewCompanyInvalid: false,
                  destinationInvalid: false,
                  crewMobileNumberInvalid: false,
                  crewPassportExpiryInvalid: false,
                  selected: false,
                  crewIcPassportInvalidText: '',
                  crewMobileNumberInvalidText: '',
                });
              });
              $event.target.value = null;
              this.isLoading = false;
              this.overlay = false;
              console.log('itemList: ', this.itemList);
            }
          }
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (e) {
      this.isLoading = false;
      this.overlay = false;
      console.error(e);
    } finally {
    }
  }

  convertExcelDateToDatePicker(date) {
    if (date != null) {
      try {
        return formatDate(date, 'dd/MM/Y', 'en-US');
      } catch {
        try {
          return formatDate(
            new Date(this.checkDateFormat(date)),
            'dd/MM/Y',
            'en-US'
          );
        } catch {
          return null;
        }
      }
    }
  }

  uploadFile(hiddenfileinput) {
    this.uploadOpen = false;
    hiddenfileinput.nativeElement.click();
  }

  downloadExcelTemplate() {
    const link = document.createElement('a');
    link.setAttribute('target', '_self');
    link.setAttribute(
      'href',
      './assets/documents/Crew_Departure_Manifest_Template.csv'
    );
    link.setAttribute('download', `Crew_Departure_Manifest_Template.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  redirectToPrevious() {
    // this.previousURL = this.requestFormService.getPreviousUrl();
    // this.router.navigate([this.previousURL]);
    // if (this.isEdit) {
    //   this.router.navigate([
    //     '/operation-system/ct-sign-on-view/',
    //     this.requestNo,
    //   ]);
    // } else {
    //   this.router.navigate(['/operation-system/ct-sign-on-list']);
    // }
    history.back();
  }

  isAplphanumeric(value) {
    return /^[a-z0-9]+$/i.test(value);
  }

  isNumeric(value) {
    return /^[0-9]+$/i.test(value);
  }
}
