import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sw-twg-form',
  templateUrl: './sw-twg-form.component.html',
  styleUrls: ['./sw-twg-form.component.scss'],
})
export class SwTwgFormComponent implements OnInit {
  @ViewChild('factoryAddressRef') factoryAddressRef;
  @ViewChild('telNoRef') telNoRef;
  @ViewChild('faxNoRef') faxNoRef;
  @ViewChild('appointedCompRef') appointedCompRef;
  @ViewChild('compAddressRef') compAddressRef;
  @ViewChild('licenseNoRef') licenseNoRef;
  @ViewChildren('qtyRef') qtyRef: QueryList<any>;
  //Upload config
  @Input() files = new Set();
  @Input() buttonType = 'primary';
  @Input() accept = ['.jpg', '.png', '.pdf'];
  @Input() multiple = true;
  @Input() skeleton = false;
  @Input() sizeUploder = 'normal';
  @Input() disabled = false;

  // Upload var
  fileToUpload = [];
  uploadEvent: any;
  ipUrl = this.appService.apiIP;
  token: any;
  uploadForm;
  filesUploadedDetails = [];

  //modal
  modalOpen: boolean = false;

  // initial Data
  companyName: string;
  requestBy: string;
  formNo: string;
  status: string;

  //2way data binding
  address: string;
  telNo: string;
  faxNo: string;
  appointedCompany: string;
  appCompAddress: string;
  licenseNo: string;
  uploadDoc = [];

  retrievedFormNo = '';

  isEdit = false;

  // get data (from JSON)
  wasteCodeList = [];

  // for displaying in the UI adding "selected"
  wasteCodeSelection = [];

  // those waste code selected.
  wasteCodeSelected = [];

  // if the form saved
  isSaved: boolean = false;

  // Invalid
  invalidAddress: boolean = false;
  invalidTelNo: boolean = false;
  invalidFaxNo: boolean = false;
  invalidAppCompany: boolean = false;
  invalidAppCompAddress: boolean = false;
  invalidLicenseNo: boolean = false;

  open: boolean = false;

  showNoti: boolean = false;
  notiCutoffCollection = {
    type: 'error',
    title: 'TWG File Required',
    message: 'Plese Upload The Signed TWG Form here.',
    showClose: false,
    lowContrast: true,
  };

  isLoading: boolean = false;
  overlay: boolean = false;

  constructor(
    private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userInfo();
    // this.wasteCodeMapping();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;
        this.token = initialData.Token.access_token;
        this.getRestServiceApi();
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

  getRestServiceApi() {
    this.retrievedFormNo = this._Activatedroute.snapshot.paramMap.get('formNo');

    if (this.retrievedFormNo) {
      var apiParam: any = { formNo: this.retrievedFormNo };
      restServices.pbksb_ScheduledWasteService
        .getTwgRequestsByFormNo(this.appService.myApp)(apiParam)
        .then((result) => {
          this.isEdit = true;
          const resArr: any = result;
          const previewDetailsAPI = JSON.parse(resArr);

          this.companyName = previewDetailsAPI.customer.name;
          this.requestBy = previewDetailsAPI.requestBy.fullname;
          this.formNo = previewDetailsAPI.formNo;
          this.address = previewDetailsAPI.factoryAddress;
          this.telNo = previewDetailsAPI.phoneNo;
          this.faxNo = previewDetailsAPI.faxNo;
          this.appointedCompany = previewDetailsAPI.appointedCompany;
          this.appCompAddress = previewDetailsAPI.appCompanyAddress;
          this.licenseNo = previewDetailsAPI.licenseNo;
          this.status = previewDetailsAPI.status;
          previewDetailsAPI.twgWasteList.forEach((value) => {
            this.wasteCodeSelected.push({
              wasteCode: value.wasteCode.wasteCode,
              description: value.wasteCode.description,
              quantity: value.quantity.toString(),
            });
          });
          previewDetailsAPI.uploadedFile.forEach((value) => {
            this.uploadDoc.push({
              file_ID: value.fileId,
              file_name: value.fileName,
            });
            this.filesUploadedDetails.push({
              fileID: value.fileId,
              fileName: value.fileName,
            });
          });
          if (this.status === 'INITIATE') {
            this.isSaved = true;
          }
        });
    }

    restServices.pbksb_ScheduledWasteService
      .getAllWasteCodeList(this.appService.myApp)()
      .then((result) => {
        let test = this.appService.jsonToArray(result);
        let test2 = test.map(({ wasteCode, description }) => ({
          wasteCode,
          description,
          selected: false,
        }));
        test2.sort((a, b) =>
          a['wasteCode'].localeCompare(b['wasteCode'], 'en', { numeric: true })
        );
        this.wasteCodeSelection = test2.slice();
      });
  }

  getRestServiceAPI(initData: any) {
    //get waste code list
    restServices.pbksb_ScheduledWasteService
      .getAllWasteCodeList(this.appService.myApp)()
      .then((result) => {
        const resArr: any = result;
        const wasteCodeListAPI = JSON.parse(resArr);
        // console.log(wasteCodeListAPI);
        this.wasteCodeSelection = wasteCodeListAPI.map((item) => ({
          ...item,
          selected: false,
        }));
      });
  }
  wasteCodeMapping() {
    this.wasteCodeSelection = this.wasteCodeList.map((item) => ({
      ...item,
      selected: false,
    }));
  }

  addToTWGForm() {
    if (this.wasteCodeSelected.length > 0) {
      let addNew = this.wasteCodeSelection.filter((item) => {
        return item.selected === true;
      });
      let result = addNew
        .filter(
          (o1) =>
            !this.wasteCodeSelected.some((o2) => o1.wasteCode === o2.wasteCode)
        )
        .map((item) => ({
          ...item,
          quantity: '',
          selected: false,
          invalidQty: false,
        }));
      result.forEach((item) => {
        this.wasteCodeSelected.push(item);
      });
    } else {
      this.wasteCodeSelected = [];
      this.wasteCodeSelected = this.wasteCodeSelection
        .filter((item) => {
          return item.selected === true;
        })
        .map((item) => ({
          ...item,
          quantity: '',
          selected: false,
          invalidQty: false,
        }));
    }

    // this.wasteCodeSelection.forEach((item) => {
    //   if (item.selected) {
    //     this.wasteCodeSelected.push(item);
    //   }
    // });
    this.modalOpen = false;
  }

  // refer to the checkbox in the modal
  onSelectWC(event, postIndex) {
    if (event.checked) {
      this.wasteCodeSelection[postIndex].selected = true;
    } else {
      this.wasteCodeSelection[postIndex].selected = false;
    }
  }

  // refer to the checkbox in the table
  onSelect(event, index) {
    if (event.checked) {
      this.wasteCodeSelected[index].selected = true;
    } else {
      this.wasteCodeSelected[index].selected = false;
    }
  }

  // check for selected in the type-of-waste table
  checkSelected() {
    return this.wasteCodeSelected.some((item) => {
      return item.selected === true;
    });
  }

  cancelSelected() {
    this.wasteCodeSelected.forEach((item) => {
      if (item.selected) {
        item.selected = false;
      }
    });
  }

  deleteSelected() {
    this.wasteCodeSelected.forEach((row, i) => {
      if (row.selected) {
        this.wasteCodeSelected = this.wasteCodeSelected.filter(
          (item) => item.selected !== row.selected
        );
      }
    });
  }

  openModal() {
    // let result = this.wasteCodeSelection.filter((item) => {
    //   return !this.wasteCodeSelected.some((item2) => {
    //     return item.code === item2.code;
    //   });
    // });
    this.wasteCodeSelection.forEach((item) => {
      if (
        this.wasteCodeSelected.some((item2) => {
          return item.wasteCode === item2.wasteCode;
        })
      ) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    this.modalOpen = true;
  }

  onDropped(event) {
    this.uploadEvent = event;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.overlay = true;
    // save and preview form
    if (this.validation()) {
      // =====Upload File=====
      try {
        for (let x of this.uploadEvent) {
          this.fileToUpload.push(x);
        }
      } catch (err) {
        console.debug();
      }
      this.uploadForm = this.formBuilder.group({
        fileData: [''],
      });

      let count = 0;
      if (this.fileToUpload.length > 0) {
        this.fileToUpload.forEach((files) => {
          const file = files.file;

          this.uploadForm.get('fileData').setValue(file);
          // console.log(this.uploadForm.get('fileData').value);
          let formData = new FormData();
          formData.append('file', this.uploadForm.get('fileData').value);

          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + this.token,
            }),
          };
          this.http
            .post<any>(this.ipUrl + 'v2/files', formData, httpOptions)
            .subscribe((data) => {
              let fileData = {
                fileID: data.id,
                fileName: data.name,
              };
              this.filesUploadedDetails.push(fileData);

              count++;
              if (count === this.fileToUpload.length) {
                let twgWasteList = this.wasteCodeSelected.map(
                  ({ invalidQty, selected, description, ...rest }) => rest
                );
                let submitData = {
                  form: {
                    companyName: this.companyName,
                    requestBy: this.requestBy,
                    factoryAddress: this.address,
                    phoneNo: this.telNo,
                    faxNo: this.faxNo,
                    appointedCompany: this.appointedCompany,
                    appCompanyAddress: this.appCompAddress,
                    licenseNo: this.licenseNo,
                    twgWasteListForm: twgWasteList,
                    uploadFiles: this.filesUploadedDetails,
                  },
                };
                if (!this.isEdit) {
                  restServices.pbksb_ScheduledWasteService
                    .createTwgForm(this.appService.myApp)(submitData)
                    .then((result) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let returnObj = this.appService.jsonToArray(result);
                      if (returnObj.success) {
                        let currDate = new Date();
                        this.appService.showToaster({
                          type: 'success',
                          title: 'Request Saved',
                          subtitle:
                            'TWG No. ' +
                            returnObj.requestNo +
                            ' is successfully saved.',
                          time: formatDate(currDate, 'HH:mm', 'en-US'),
                        });
                        this.router.navigate([
                          '/operation-system/sw-twg-print/' +
                            returnObj.requestNo,
                        ]);
                      } else {
                        let currDate = new Date();
                        this.appService.showToaster({
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be saved. Please try again',
                          time: formatDate(currDate, 'HH:mm', 'en-US'),
                        });
                      }
                    });
                } else {
                  // console.log('Edit Mode');
                  let data = {
                    form: {
                      formNo: this.formNo,
                      factoryAddress: this.address,
                      phoneNo: this.telNo,
                      faxNo: this.faxNo,
                      appointedCompany: this.appointedCompany,
                      appCompanyAddress: this.appCompAddress,
                      licenseNo: this.licenseNo,
                      twgWasteListForm: twgWasteList,
                      uploadFiles: this.filesUploadedDetails,
                    },
                  };
                  restServices.pbksb_ScheduledWasteService
                    .editTwgForm(this.appService.myApp)(data)
                    .then((result) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let returnObj = this.appService.jsonToArray(result);
                      if (returnObj.success) {
                        let currDate = new Date();
                        this.appService.showToaster({
                          type: 'success',
                          title: 'Request Edited',
                          subtitle:
                            'TWG No. ' +
                            returnObj.requestNo +
                            ' is successfully edited.',
                          time: formatDate(currDate, 'HH:mm', 'en-US'),
                        });
                        this.router.navigate([
                          '/operation-system/sw-twg-print/' +
                            returnObj.requestNo,
                        ]);
                      } else {
                        let currDate = new Date();
                        this.appService.showToaster({
                          type: 'error',
                          title: 'Cannot Edit',
                          subtitle:
                            'The request has failed to be edited. Please try again',
                          time: formatDate(currDate, 'HH:mm', 'en-US'),
                        });
                      }
                    });
                }
              }
            });
        });
      } else {
        // create TWG form without uploading file
        let twgWasteList = this.wasteCodeSelected.map(
          ({ invalidQty, selected, description, ...rest }) => rest
        );
        let submitData = {
          form: {
            companyName: this.companyName,
            requestBy: this.requestBy,
            factoryAddress: this.address,
            phoneNo: this.telNo,
            faxNo: this.faxNo,
            appointedCompany: this.appointedCompany,
            appCompanyAddress: this.appCompAddress,
            licenseNo: this.licenseNo,
            twgWasteListForm: twgWasteList,
          },
        };
        if (!this.isEdit) {
          restServices.pbksb_ScheduledWasteService
            .createTwgForm(this.appService.myApp)(submitData)
            .then((result) => {
              this.isLoading = false;
              this.overlay = false;
              let returnObj = this.appService.jsonToArray(result);
              if (returnObj.success) {
                let currDate = new Date();
                this.appService.showToaster({
                  type: 'success',
                  title: 'Request Saved',
                  subtitle:
                    'TWG No. ' +
                    returnObj.requestNo +
                    ' is successfully saved.',
                  time: formatDate(currDate, 'HH:mm', 'en-US'),
                });
                this.router.navigate([
                  '/operation-system/sw-twg-print/' + returnObj.requestNo,
                ]);
              } else {
                let currDate = new Date();
                this.appService.showToaster({
                  type: 'error',
                  title: 'Cannot Save',
                  subtitle:
                    'The request has failed to be saved. Please try again',
                  time: formatDate(currDate, 'HH:mm', 'en-US'),
                });
              }
            });
        } else {
          let data = {
            form: {
              formNo: this.formNo,
              factoryAddress: this.address,
              phoneNo: this.telNo,
              faxNo: this.faxNo,
              appointedCompany: this.appointedCompany,
              appCompanyAddress: this.appCompAddress,
              licenseNo: this.licenseNo,
              twgWasteListForm: twgWasteList,
              uploadFiles: this.filesUploadedDetails,
            },
          };
          restServices.pbksb_ScheduledWasteService
            .editTwgForm(this.appService.myApp)(data)
            .then((result) => {
              this.isLoading = false;
              this.overlay = false;
              let returnObj = this.appService.jsonToArray(result);
              if (returnObj.success) {
                let currDate = new Date();
                this.appService.showToaster({
                  type: 'success',
                  title: 'Request Edited',
                  subtitle:
                    'TWG No. ' +
                    returnObj.requestNo +
                    ' is successfully edited.',
                  time: formatDate(currDate, 'HH:mm', 'en-US'),
                });
                this.router.navigate([
                  '/operation-system/sw-twg-print/' + returnObj.requestNo,
                ]);
              } else {
                let currDate = new Date();
                this.appService.showToaster({
                  type: 'error',
                  title: 'Cannot Edit',
                  subtitle:
                    'The request has failed to be edited. Please try again',
                  time: formatDate(currDate, 'HH:mm', 'en-US'),
                });
              }
            });
        }
      }
    } else {
      this.isLoading = false;
      this.overlay = false;
    }
  }

  submitTWG() {
    // let twgWasteList = this.wasteCodeSelected.map(
    //   ({ invalidQty, selected, description, ...rest }) => rest
    // );
    // let submitData = {
    //   form: {
    //     formNo: this.formNo,
    //     factoryAddress: this.address,
    //     phoneNo: this.telNo,
    //     faxNo: this.faxNo,
    //     appointedCompany: this.appointedCompany,
    //     appCompanyAddress: this.appCompAddress,
    //     licenseNo: this.licenseNo,
    //     twgWasteListForm: twgWasteList,
    //     uploadFiles: this.filesUploadedDetails,
    //   },
    // };
    this.open = false;
    this.isLoading = true;
    this.overlay = true;
    if (this.validation()) {
      try {
        for (let x of this.uploadEvent) {
          this.fileToUpload.push(x);
        }
      } catch (err) {
        console.debug();
      }
      this.uploadForm = this.formBuilder.group({
        fileData: [''],
      });

      let count = 0;
      if (this.fileToUpload.length > 0) {
        this.showNoti = false;
        this.fileToUpload.forEach((files) => {
          const file = files.file;

          this.uploadForm.get('fileData').setValue(file);
          let formData = new FormData();
          formData.append('file', this.uploadForm.get('fileData').value);

          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + this.token,
            }),
          };
          this.http
            .post<any>(this.ipUrl + 'v2/files', formData, httpOptions)
            .subscribe((data) => {
              let fileData = {
                fileID: data.id,
                fileName: data.name,
              };
              this.filesUploadedDetails.push(fileData);

              count++;
              if (count === this.fileToUpload.length) {
                let twgWasteList = this.wasteCodeSelected.map(
                  ({ invalidQty, selected, description, ...rest }) => rest
                );
                let submitData = {
                  form: {
                    formNo: this.formNo,
                    factoryAddress: this.address,
                    phoneNo: this.telNo,
                    faxNo: this.faxNo,
                    appointedCompany: this.appointedCompany,
                    appCompanyAddress: this.appCompAddress,
                    licenseNo: this.licenseNo,
                    twgWasteListForm: twgWasteList,
                    uploadFiles: this.filesUploadedDetails,
                  },
                };
                restServices.pbksb_ScheduledWasteService
                  .submitTwgForm(this.appService.myApp)(submitData)
                  .then((result) => {
                    this.isLoading = false;
                    this.overlay = false;
                    let returnObj = this.appService.jsonToArray(result);
                    if (returnObj.success) {
                      let currDate = new Date();
                      this.appService.showToaster({
                        type: 'success',
                        title: 'Request Submitted',
                        subtitle:
                          'TWG No. ' +
                          returnObj.requestNo +
                          ' is successfully submitted.',
                        time: formatDate(currDate, 'HH:mm', 'en-US'),
                      });
                      this.router.navigate([
                        '/operation-system/sw-twg-view/' + this.formNo,
                      ]);
                    } else {
                      let currDate = new Date();
                      this.appService.showToaster({
                        type: 'error',
                        title: 'Cannot Submit',
                        subtitle:
                          'The request has failed to be submitted. Please try again',
                        time: formatDate(currDate, 'HH:mm', 'en-US'),
                      });
                    }
                  });
              }
            });
        });
      } else {
        this.isLoading = false;
        this.overlay = false;
        this.showNoti = true;
      }
    }
  }

  validation() {
    let validate = true;
    if (!this.address) {
      this.invalidAddress = true;
      validate = false;
    }

    if (!this.telNo) {
      this.invalidTelNo = true;
      validate = false;
    }

    if (!this.faxNo) {
      this.invalidFaxNo = true;
      validate = false;
    }

    if (!this.appointedCompany) {
      this.invalidAppCompany = true;
      validate = false;
    }

    if (!this.appCompAddress) {
      this.invalidAppCompAddress = true;
      validate = false;
    }

    if (!this.licenseNo) {
      this.invalidLicenseNo = true;
      validate = false;
    }

    this.wasteCodeSelected.forEach((item) => {
      if (!item.quantity) {
        item.invalidQty = true;
        validate = false;
      }
    });

    this.focusOnInvalid();
    return validate;
  }

  focusOnInvalid() {
    if (this.invalidAddress) {
      this.factoryAddressRef.nativeElement.focus();
    } else if (this.invalidTelNo) {
      this.telNoRef.nativeElement.focus();
    } else if (this.invalidFaxNo) {
      this.faxNoRef.nativeElement.focus();
    } else if (this.invalidAppCompany) {
      this.appointedCompRef.nativeElement.focus();
    } else if (this.invalidAppCompAddress) {
      this.compAddressRef.nativeElement.focus();
    } else if (this.invalidLicenseNo) {
      this.licenseNoRef.nativeElement.focus();
    } else if (
      this.wasteCodeSelected.some((item) => {
        return item.invalidQty;
      })
    ) {
      let i = 0;
      for (let item of this.qtyRef) {
        if (this.wasteCodeSelected[i].invalidQty) {
          item.nativeElement.focus();
          return false;
        }
        i++;
      }
    }
  }

  inputValueChange(event) {
    if (this.address) {
      this.invalidAddress = false;
    }

    if (this.telNo) {
      this.invalidTelNo = false;
    }

    if (this.faxNo) {
      this.invalidFaxNo = false;
    }

    if (this.appointedCompany) {
      this.invalidAppCompany = false;
    }

    if (this.appCompAddress) {
      this.invalidAppCompAddress = false;
    }

    if (this.licenseNo) {
      this.invalidLicenseNo = false;
    }

    this.wasteCodeSelected.forEach((item) => {
      if (item.quantity) {
        item.invalidQty = false;
      }
    });
  }
}
