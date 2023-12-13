import { formatDate, TitleCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { Subscription } from 'rxjs';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import {
  BerthForm,
  DocumentForm,
  DocumentList,
} from '../interfaces/Marine/marine_interface';
import { BerthRequestFormService } from '../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-marine-berth-request-list-preview',
  templateUrl: './marine-berth-request-list-preview.component.html',
  styleUrls: ['./marine-berth-request-list-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class MarineBerthRequestListPreviewComponent
  implements OnInit, OnDestroy
{
  @ViewChild('inputFile') fileInput: ElementRef;
  @ViewChild('types') types: ElementRef;
  @ViewChild('waste') waste: ElementRef;
  @ViewChild('docsID') docsID: ElementRef;

  @Input() files = new Set();
  @Input() buttonType = 'primary';
  @Input() accept = ['.jpg', '.png', '.pdf'];
  @Input() multiple = false;
  @Input() skeleton = false;
  @Input() sizeUploder = 'normal';
  @Input() disabled = false;

  @Input() followFocus = true;
  @Input() cacheActive = false;
  @Input() isNavigation = true;
  @Input() type = 'default';

  berthForm: BerthForm = {};
  documentPreview = [] as DocumentList[];
  documentAddList = [] as DocumentForm[];

  addNewDocPreview = false;
  openModal = false;

  invalidUpload = false;
  invalidDocID = false;
  invalidDocType = false;

  documentType = '';
  wasteCode = '';
  documentID = '';

  RequestNo: string = '';
  data: any = '';

  companyName: string = '';
  requestByName: string = '';

  terminal = '';
  actualTerminal = '';
  vessel = '';
  requestBy = '';
  requestOnBehalf = '';
  poNumber = '';
  eaDate = '';
  edDate = '';
  lastLocation = '';
  nextLocation = '';
  agent = '';
  status = '';
  cancelDate = '';
  remarks = '';

  documentArray: any[] = [];
  documentList: any[] = [];
  counterDocList = 0;
  workProgramList: any[] = [];

  // docTypeList: any[] = [];
  docTypeList: any[] = [
    {
      content: 'K4',
    },
    {
      content: 'K5',
    },
    {
      content: 'Delivery Order',
    },
    {
      content: 'Other Documents',
    },
  ];
  documentTypeList = [];

  uploadFile = [];
  uploadEvent: any;

  open = false;
  openRemove = false;

  isLoading = false;
  overlay = false;
  uploadForm: FormGroup;
  filesToUpload = [];
  successUpload: any;
  countFiles = 0;
  formID = '';
  formStatus: any;
  modalTimeout: boolean;
  date = new Date();
  dateFlag = false;
  flagCharge = false;
  formChargeSubs!: Subscription;
  formChargeStatus: any;
  company = '';
  createdBy = '';
  createTs = '';

  isAgent: boolean = false;

  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private berthRequestFormService: BerthRequestFormService,
    protected notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private titlecasePipe: TitleCasePipe
  ) {}

  ipUrl = this.appService.apiIP;
  token: any;

  ngOnInit(): void {
    window.scroll(0, 0);
    this.userInfo();

    this.formChargeSubs =
      this.berthRequestFormService.formChargeChanged.subscribe((value: any) => {
        this.formChargeStatus = value;
        // console.log('formChargeStatus', this.formChargeStatus);

        this.checkCancelFormCharge();
      });
  }

  ngOnDestroy(): void {
    this.formChargeSubs.unsubscribe();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.company = initialData.Company;
        this.requestByName = initialData.Fullname;
        this.token = initialData.Token.access_token;
        this.getRestServiceAPI(initialData);
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

  async getRestServiceAPI(initData: any) {
    // get request no
    this.RequestNo = this._Activatedroute.snapshot.paramMap.get('RequestNo');
    const getCode: any = { requestNo: this.RequestNo };

    // get request form list
    await restServices.pbksb_MarineService
      .GetBerthRequestDetailsByRequestNo(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);

        this.companyName = array.berthForm?.company?.name;
        // if (this.company == this.companyName) {
        this.berthRequestFormService.setBerthFormID(array.berthForm.id);
        this.formID = array.berthForm.id;
        this.terminal = array.berthForm.terminal;
        this.terminal =
          this.terminal == 'KSB' || this.terminal == 'WW'
            ? 'KSB/WW'
            : this.terminal;
        this.actualTerminal = array.berthForm.terminal;
        this.vessel = array.berthForm.vessel.name;
        this.requestOnBehalf =
          array.berthForm.request_on_behalf.name.toLowerCase() == 'n/a'
            ? ''
            : array.berthForm.request_on_behalf.name;
        this.requestBy = array.berthForm.request_by;
        this.eaDate = array.berthForm.est_arrival;
        this.edDate = array.berthForm.est_departure;
        this.nextLocation = array.berthForm.next_location;
        this.lastLocation = array.berthForm.last_location;
        this.agent = array.berthForm?.agent?.name;
        this.status = array.berthForm.status.replace(/_/g, ' ');
        this.status = this.titlecasePipe.transform(this.status);
        this.poNumber = array.berthForm.po_number;
        this.cancelDate = array.berthForm.update_cancelled_datetime;
        this.remarks = array?.berthForm?.remarks ?? '-';
        this.createdBy = array?.berthForm?.createdBy ?? '-';
        this.createTs = array?.berthForm?.createTs
          ? formatDate(array?.berthForm?.createTs, 'dd/MM/yyyy HH:mm', 'en_us')
          : '-';

        if (array.berthForm.status) {
          this.formStatus = array.berthForm.status;
        }
        this.berthRequestFormService.setBerthFormStatus(this.formStatus);
        this.berthRequestFormService.setEaDate(this.eaDate);
        this.checkIfIsAgent();
        this.checkCancelFormCharge();

        //get Work Program Request Summary api
        this.getWorkProgramRequestSummary();
        // } else {
        //   this.status = 'init'
        // }
      });

    //get Document List api
    this.getBerthFormDocs();

    //document type
    // restServices.pbksb_MarineService
    //   .GetDocumentType(this.appService.myApp)()
    //   .then((result) => {
    //     const resArr = this.appService.jsonToArray(result);
    //     resArr.forEach((element) => {
    //       this.docTypeList.push({
    //         content: element,
    //       });
    //     });

    //     this.documentTypeList = this.docTypeList;
    //   });

    this.documentTypeList = this.docTypeList;
  }

  openModalAddItem() {
    this.wasteCode = '';
    this.documentID = '';
    this.waste.nativeElement.value = ' ';
    this.docsID.nativeElement.value = ' ';
    this.documentTypeList = this.docTypeList;
    this.uploadEvent = null;
    this.uploadFile = [];
    // this.documentList = [];
    this.addNewDocPreview = true;
  }

  onDropped(event: any) {
    this.uploadEvent = event;
  }

  selectDoc(event: any) {
    this.documentType = event.item.content;
  }

  onblurWaste(event: any) {
    this.wasteCode = event.target.value;
  }

  onblurDoc(event: any) {
    this.documentID = event.target.value;
  }

  onSaveDocumentList() {
    //validation

    if (!this.documentType) {
      this.invalidDocType = true;
    } else if (this.documentType) {
      this.invalidDocType = false;
    }

    // if (!this.documentID || this.documentID == ' ') {
    //   this.invalidDocID = true;
    // } else if (this.documentID) {
    //   this.invalidDocID = false;
    // }

    if (!this.uploadEvent) {
      this.invalidUpload = true;
    } else if (
      this.uploadEvent &&
      // this.documentID &&
      // this.documentID !== ' ' &&
      this.documentType
    ) {
      this.invalidUpload = false;

      try {
        for (let x of this.uploadEvent) {
          this.uploadFile.push(x);
          // console.log(this.uploadFile);
        }
      } catch (err) {
        console.debug();
      }

      if (!this.wasteCode || this.wasteCode == ' ') {
        this.wasteCode = ' - ';
      }

      let date = new Date();
      let dateTime = date.toString();

      let path = (window.URL || window.webkitURL).createObjectURL(
        this.uploadFile[0].file
      );
      // console.log('path', path);

      let file = {
        id: Math.floor(Math.random() * 10000),
        docType: this.documentType,
        wasteCode: this.wasteCode,
        docID: this.documentID ? this.documentID : '-',
        docPath: path,
        uploadBy: this.requestByName,
        dateTime: dateTime,
        upload: this.uploadFile,
        select: false,
      };

      // this.documentList.push(file);
      this.filesToUpload.push(file);

      // console.log(this.documentList);

      //  this.fileInput.nativeElement.value = '';

      this.isLoading = true;
      this.overlay = true;

      this.uploadForm = this.formBuilder.group({
        fileData: [''],
      });

      this.filesToUpload.forEach((element, index) => {
        //this is to revoke / clear memory of objectURL
        window.URL.revokeObjectURL(element.docPath);

        if (element.upload) {
          const file = element.upload[0].file;
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
            .subscribe(
              (data) => {
                const filesUploaded = {
                  form: {
                    formID: this.formID,
                    document_type: element.docType,
                    waste_code: element.wasteCode,
                    document_id: element.docID,
                    fileID: data.id,
                    upload_by: element.uploadBy,
                  },
                };
                // console.log(filesUploaded);
                restServices.pbksb_MarineService
                  .UploadBerthFormDoc(this.appService.myApp)(filesUploaded)
                  .then((result) => {
                    this.successUpload = result;
                    if (this.successUpload) {
                      this.countFiles++;
                    }
                    // console.log(this.countFiles, element.upload);
                    if (this.countFiles === element.upload.length) {
                      this.isLoading = false;
                      this.overlay = false;
                      // console.log('success upload files');

                      this.countFiles = 0;
                      this.filesToUpload = [];
                      this.addNewDocPreview = false;
                      this.documentList = [];
                      this.files = new Set();
                      this.getBerthFormDocs();
                      // this.ngOnInit();
                    }
                  });
              },
              (error) => {
                // console.log(error);
                this.files = new Set();
                this.isLoading = false;
                this.overlay = false;
                this.modalTimeout = true;
              }
            );
        }
      });

      this.addNewDocPreview = false;
      this.documentTypeList = [];
      this.documentType = '';
    }
  }

  openFile(docPath: any) {
    window.open(docPath, '_blank');
  }

  cancelModal() {
    this.addNewDocPreview = false;
    this.invalidDocType = false;
    this.invalidDocID = false;
    this.invalidUpload = false;
  }

  checkLengthDocList() {
    return this.documentList.some((item) => item.select == true);
  }

  deleteDocList() {
    this.documentList.forEach((ticket) => {
      if (ticket.select) {
        if (ticket.fromApi) {
          const param = {
            form: {
              files: [
                {
                  fileID: ticket.fileId,
                },
              ],
            },
          };
          restServices.pbksb_MarineService
            .DeleteBerthFormDoc(this.appService.myApp)(param)
            .then((result) => {
              // console.log(result);

              let request: any = result;
              let response = JSON.parse(request);
              if (response.status == 'OK') {
                this.documentList = this.documentList.filter(
                  (item) => item.select !== ticket.select
                );
              } else {
                this.openRemove = false;
                this.notificationService.showToast({
                  type: 'error',
                  title: 'Delete Error',
                  subtitle: 'Document ' + ticket.docID + ' is not deleted.',
                  target: '.notification-container',
                  message: 'message',
                  lowContrast: true,
                });
              }
            })
            .catch((err) => {
              // console.log(err);
              this.openRemove = false;
              this.notificationService.showToast({
                type: 'error',
                title: 'Delete Error',
                subtitle: 'Document ' + ticket.docID + ' is not deleted.',
                target: '.notification-container',
                message: 'message',
                lowContrast: true,
              });
            });
        } else {
          this.documentList = this.documentList.filter(
            (item) => item.select !== ticket.select
          );
          this.filesToUpload = this.filesToUpload.filter(
            (item) => item.select !== ticket.select
          );
        }
      }
      this.counterDocList = 0;
    });

    this.openRemove = false;
  }

  cancelDocList() {
    this.documentList.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterDocList = 0;
  }

  docListCheckbox(event: any) {
    if (event === true) {
      this.counterDocList++;
    } else if (event == false) {
      this.counterDocList--;
    }
  }

  onSubmit(berthForm: NgForm) {}

  deleteJobRequest() {
    this.open = false;

    this.isLoading = true;
    this.overlay = true;

    const getCodeDelete = {
      form: {
        formID: this.berthRequestFormService.getBerthFormID(),
      },
    };

    restServices.pbksb_MarineService
      .CancelBerthRequestForm(this.appService.myApp)(getCodeDelete)
      .then((result) => {
        const resArr: any = result;
        const CancelBerthRequestFormResult = JSON.parse(resArr);
        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');

        if (CancelBerthRequestFormResult.berthForm.status == 'CANCELLED') {
          this.isLoading = false;
          this.overlay = false;
          this.workProgramList = [];
          this.documentList = [];
          let notiObject = {
            type: 'success',
            title: 'Cancelled',
            subtitle:
              'Request number ' + this.RequestNo + ' is successfully cancelled',
            time: currentTime,
          };
          this.appService.showToaster(notiObject);
          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        } else {
          this.isLoading = false;
          this.overlay = false;
          this.workProgramList = [];
          this.documentList = [];
          let errorObject = {
            type: 'error',
            title: 'Cancel failed',
            subtitle:
              'The request has failed to be cancelled. Please try again',
            time: currentTime,
          };
          this.appService.showToaster(errorObject);

          let currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            });
        }
      })
      .catch((err) => {
        // console.log(err);
        this.catchCancelRequest();
      });

    // setTimeout(() => {
    //   this.isLoading = false;
    //   this.overlay = false;
    //   this.workProgramList = [];
    //   this.documentList = [];
    //   this.ngOnInit();
    // }, 2000);
  }

  catchCancelRequest() {
    this.notificationService.showToast({
      type: 'error',
      title: 'Delete Error',
      subtitle: 'Request no. ' + this.RequestNo + ' is not cancelled.',
      target: '.notification-container',
      message: 'message',
      lowContrast: true,
    });
  }

  downloadFiles(fileID: string, filename: string): void {
    const baseUrl = this.ipUrl + 'v2/files/' + fileID;
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.token
    );

    // console.log(headers);

    this.http
      .get(baseUrl, { headers, responseType: 'blob' as 'json' })
      .subscribe(
        (response: any) => {
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.setAttribute('target', '_self');
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          if (fileID) downloadLink.setAttribute('download', filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          downloadLink.remove();
        },
        (error: any) => {
          // console.log('failed download', error);
          this.createNotification(filename);
        }
      );
  }

  logout() {
    this.modalTimeout = false;
    this.appService.terminateSession();
  }

  createNotification(filename: any) {
    const successNotif = {
      type: 'error',
      title: 'Session Timeout',
      subtitle: `Failed to download ${filename} file. Please relogin again to download the file`,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
  }

  getBerthFormDocs() {
    this.documentList = [];
    restServices.pbksb_MarineService
      .GetBerthFormDocs(this.appService.myApp)({ requestNo: this.RequestNo })
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);
        this.documentArray = array.berthFormDocs;

        // if (this.company == this.companyName) {
        this.documentArray.forEach((element) => {
          this.documentList.push({
            fileId: element.id,
            id: element.file_descriptor.id,
            docType: element.doc_type,
            wasteCode: element.waste_code,
            docID: element.document_id,
            uploadBy: element.upload_by,
            dateTime: element.upload_date,
            fromApi: true,
            select: false,
          });
        });
        // } else {
        //   this.status = 'init'
        // }
      });
  }

  getWorkProgramRequestSummary() {
    this.workProgramList = [];
    // console.log('emit');

    restServices.pbksb_MarineService
      .GetBerthWorkProgramSummary(this.appService.myApp)({
        requestNo: this.RequestNo,
      })
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);

        array.WorkProgram_Summary = array.WorkProgram_Summary.sort((a, b) =>
          a.sort_ind > b.sort_ind ? 1 : -1
        );

        let workProgram = {
          WORK_PERMIT: 'Work with Permit',
          UNDERDECK: 'Underdeck',
          FUEL_WATER: 'Fuel Water',
          DISCHARGE: 'Discharge',
          GENERAL_WORKS: 'General Works',
          LOADING: 'Loading',
          DISCHARGE_LOADING: 'Discharge & Loading',
        };

        // console.log(this.berthRequestNo);
        // console.log(array.WorkProgram_Summary);

        array.WorkProgram_Summary.forEach((value, index) => {
          this.workProgramList.push({
            workProgram: workProgram[value.work_program],
            requestNo: value.request_number,
            date: value.date ? value.date : '',
            time: value.time ? value.time.slice(0, 5) : '',
            status: value.status
              ? this.titlecasePipe.transform(value.status.replace(/_/g, ' '))
              : 'N/A',
            updateCancel: value.update_cancelled_by
              ? value.update_cancelled_by
              : '',
            dateTime: value.update_cancelled_by
              ? value.update_cancelled_datetime
                ? formatDate(
                    value.update_cancelled_datetime,
                    'dd/MM/yyyy HH:mm',
                    'en_US'
                  )
                : ''
              : '',
          });
        });
      });
    // .catch((err) => console.log(err));
  }

  checkCancelFormCharge() {
    let options = { hour12: false };

    // set and convert today date to yyyy-MM-dd
    let todayDate = new Date();
    let convertTodayDate =
      todayDate.getFullYear() +
      '-' +
      (todayDate.getMonth() + 1) +
      '-' +
      ('0' + todayDate.getDate()).slice(-2);

    // get two hours from current time
    let currentTwoHourTime = new Date(
      new Date(todayDate).setHours(todayDate.getHours() + 2)
    );

    let convertCurrentTwoHourTime = currentTwoHourTime.toLocaleTimeString(
      'en-us',
      options
    );
    // convert to epoch time
    let convertCurrentTwoHourTime2 = Date.parse(
      formatDate(currentTwoHourTime, 'MM/dd/yyyy HH:mm', 'en_us')
    );

    // set and convert booking date to yyyy-MM-dd
    let bookingDate = new Date(this.eaDate);
    let convertBookingDate =
      bookingDate.getFullYear() +
      '-' +
      (bookingDate.getMonth() + 1) +
      '-' +
      ('0' + bookingDate.getDate()).slice(-2);

    // get two hours from current time
    let bookingTime = new Date(
      new Date(bookingDate).setHours(bookingDate.getHours())
    );

    let convertBookingTime = bookingTime.toLocaleTimeString('en-us', options);
    // convert to epoch time
    let convertBookingTime2 = Date.parse(this.eaDate);
    // console.log(Date.parse(this.eaDate) , Date.parse(formatDate(currentTwoHourTime, 'MM/dd/yyyy HH:mm', 'en_us')));

    if (
      this.formChargeStatus.fuelWaterCancel ||
      this.formChargeStatus.generalWorksCancel
    ) {
      if (convertBookingDate == convertTodayDate) {
        if (convertCurrentTwoHourTime >= convertBookingTime) {
          this.dateFlag = true;
          this.flagCharge = true;
          // console.log(convertTodayDate,convertBookingDate);
        } else if (convertCurrentTwoHourTime2 >= convertBookingTime2) {
          this.dateFlag = true;
          this.flagCharge = true;
          // console.log(convertTodayDate,convertBookingDate);
        }
      } else if (convertBookingDate < convertTodayDate) {
        this.dateFlag = true;
        this.flagCharge = true;
        // console.log(convertTodayDate,convertBookingDate);
      } else if (convertBookingDate > convertTodayDate) {
        if (convertCurrentTwoHourTime2 >= convertBookingTime2) {
          this.dateFlag = true;
          this.flagCharge = true;
          // console.log(convertTodayDate,convertBookingDate);
        }
      }
    } else if (
      !this.formChargeStatus.fuelWaterCancel &&
      !this.formChargeStatus.generalWorksCancel
    ) {
      // if (convertTodayDate == convertBookingDate) {
      //   if (convertCurrentTwoHourTime >= convertBookingTime) {
      //     this.flagCharge = true;
      //   }
      // } else if (convertBookingDate < convertTodayDate) {
      //   this.flagCharge = true;
      // }
      // // this.flagCharge = false;
      // this.dateFlag = false;
      // if(this.formChargeStatus.fuelWater || this.formChargeStatus.generalWorks){
      //   // this.dateFlag = true
      // }
    }

    this.berthRequestFormService.setFlagCharge(this.flagCharge);
  }

  checkIfIsAgent() {
    console.log(this.company);
    console.log(this.companyName);
    console.log(this.agent);

    if (this.agent == this.company && this.companyName != this.agent) {
      this.isAgent = true;
    } else {
      this.isAgent = false;
    }
    console.log('isAgent: ', this.isAgent);
  }
}
