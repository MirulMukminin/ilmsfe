import { formatDate, TitleCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthForm } from '../interfaces/Marine/marine_interface';
import { BerthRequestFormService } from '../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-marine-material-requisition-form-preview',
  templateUrl: './marine-material-requisition-form-preview.component.html',
  styleUrls: ['./marine-material-requisition-form-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class MarineMaterialRequisitionFormPreviewComponent implements OnInit {
  @ViewChild('inputFile') fileInput: ElementRef;
  @ViewChild('types') types: ElementRef;
  @ViewChild('waste') waste: ElementRef;
  @ViewChild('docsID') docsID: ElementRef;

  companyName: string = '';
  requestByName: string = '';

  @Output() edit = new EventEmitter();

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

  addNewDocPreview = false;
  openModal = false;
  generalWorksList = [];
  documentPreview = [];
  documentList = [];
  vesselNameArr: any[] = [];
  vesselNameList: any[] = [];
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
  timeList = [];
  amendNotes = '';
  openEndorse = false;
  openReject = false;

  est_arrival = '';
  est_departure = '';

  uploadFile = [];
  uploadEvent: any;
  documentType = '';
  wasteCode = '';
  documentID = '';
  counterDocList = 0;
  filesToUpload = [];
  successUpload: any;
  countFiles = 0;

  RequestNo = '';
  terminal = '';
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
  company = '';
  createdBy = '';
  createTs = '';

  open = false;

  documentArray: any[] = [];
  workProgramList: any = [];
  remarks: any;

  underdeckList = [];

  requestType = '';
  MHERequestFormDetails = '';
  formID = '';
  berthRequestNo = '';
  isLoading = false;
  overlay = false;
  uploadForm: FormGroup;

  invalidUpload = false;
  invalidDocID = false;
  invalidDocType = false;
  docToDelete = [];
  modalTimeout: boolean;
  agent_fuelwater = '';
  date = new Date();

  berthForm: BerthForm = {};
  requestRef = '';
  location = '';
  typeOfServices = '';
  materialList = [];

  constructor(
    private berthRequestFormService: BerthRequestFormService,
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private titlecasePipe: TitleCasePipe
  ) {}

  ipUrl = this.appService.apiIP;
  token: any;

  ngOnInit(): void {
    this.userInfo();
  }

  changeStep(step: number) {
    this.edit.emit(step);
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.companyName = initialData.Company;
        this.requestByName = initialData.Fullname;
        this.token = initialData.Token.access_token;

        if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
          this.RequestNo =
            this._Activatedroute.snapshot.paramMap.get('requestNum');
          this.getRestServiceAPI(this.RequestNo);
        } else {
          this.formID = this.berthRequestFormService.getFormID();
          this.RequestNo = this.berthRequestFormService.getrequestNo();
          this.getRestServiceAPI(this.RequestNo);
          this.berthForm = this.berthRequestFormService.getFormValue();

          // this.requestRef = this.berthForm['form'].request_ref;
          // this.vessel = this.berthForm['form'].vessel;
          // this.requestOnBehalf = this.berthForm['form'].customer_user;
          // this.location = this.berthForm['form'].location;
          // this.typeOfServices = this.berthForm['form'].type_service;
          // this.status = this.berthForm['form'].status;
          // this.remarks = this.berthForm['form'].remarks;
          // this.materialList = this.berthForm['form'].materialRequisitionUnderdeckForms;

          // this.documentArray.forEach((element) => {
          //   this.documentPreview.push({
          //     fileId: element.id,
          //     id: element.file_descriptor.id,
          //     docType: element.doc_type,
          //     wasteCode: element.waste_code,
          //     docID: element.document_id,
          //     uploadBy: element.upload_by,
          //     dateTime: element.upload_date,
          //     fromApi: true,
          //     select: false,
          //   });
          // });
        }
        // else if (this.berthRequestFormService.getrequestNo()) {
        //   this.RequestNo = this.berthRequestFormService.getrequestNo();
        //   this.getRestServiceAPI(this.RequestNo);
        // }

        // this.getRestServiceAPI(initialData);
      })
      .catch((err) => {
        console.error(err);

        let errorObject = {
          type: 'error',
          title: 'Server Error',
          subtitle: 'Server Error. Please try again',
        };
        this.appService.showToaster(errorObject);
        // this.appService.terminateSession();
      });
  }

  async getRestServiceAPI(requestNo: any) {
    // this.RequestNo = this._Activatedroute.snapshot.paramMap.get('requestNum');

    const getCode = { requestNo: requestNo };

    // get request form list
    await restServices.pbksb_MarineService
      .GetBerthMaterialRequisitionDetails(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);

        var materialArray = array.materialRequisitionForm;
        var documentArray = array.materialRequisitionDocument;
        this.formID = array.berthMaterialRequisition.id;
        this.requestRef = array.berthMaterialRequisition.request_ref;
        this.requestOnBehalf =
          array.berthMaterialRequisition.customer_user.name.toLowerCase() ==
          'n/a'
            ? ''
            : array.berthMaterialRequisition.customer_user.name;
        this.location = array.berthMaterialRequisition.location;
        this.vessel = array.berthMaterialRequisition.vessel.name;
        this.remarks = array.berthMaterialRequisition.remarks ?? '-';
        this.typeOfServices = array.berthMaterialRequisition.type_service;
        this.status = array.berthMaterialRequisition.status;
        this.status = this.titlecasePipe.transform(
          this.status.replace(/_/g, ' ')
        );

        materialArray.forEach((element) => {
          this.materialList.push({
            underdeck_services: element.underdeck_services,
            tank_no: element.tank_no,
            product: element.product,
            barrels_quantity: element.barrels_quantity,
            tonnes_quantity: element.tonnesQuantity,
            start_time:
              array.berthMaterialRequisition.type_service == 'STORAGE'
                ? formatDate(element.start_time, 'dd/MM/yyyy', 'en_us')
                : formatDate(element.start_time, 'dd/MM/yyyy HH:mm', 'en_us'),
            // end_time : array.berthMaterialRequisition.type_service == "STORAGE" ? formatDate(element.end_time, 'dd/MM/yyyy', 'en_us') : formatDate(element.end_time, 'dd/MM/yyyy HH:mm', 'en_us')
          });
        });

        if (documentArray.length > 0) {
          documentArray.forEach((element) => {
            this.documentPreview.push({
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
        }
      });

    this.documentTypeList = this.docTypeList;
  }

  openModalAddItem() {
    this.addNewDocPreview = true;
    this.wasteCode = '';
    this.documentID = '';
    this.waste.nativeElement.value = ' ';
    this.docsID.nativeElement.value = ' ';
    this.documentTypeList = this.docTypeList;

    this.uploadEvent = null;
    this.uploadFile = [];
    this.documentList = [];
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

          // this.documentPreview.forEach(item => {
          //     item.upload = this.uploadFile
          // })
        }
      } catch (err) {
        console.debug();
      }

      if (!this.wasteCode || this.wasteCode == ' ') {
        this.wasteCode = ' - ';
      }

      let path = (window.URL || window.webkitURL).createObjectURL(
        this.uploadFile[0].file
      );

      let date = new Date();
      let dateTime = date.toString();

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
      this.documentPreview.push(file);
      this.filesToUpload.push(file);

      // console.log(this.documentPreview);

      //  this.fileInput.nativeElement.value = '';

      this.addNewDocPreview = false;
      this.documentTypeList = [];
      this.files = new Set();
    }
  }

  docListCheckbox(event: any) {
    if (event === true) {
      this.counterDocList++;
    } else if (event == false) {
      this.counterDocList--;
    }
  }

  checkLengthDocList() {
    return this.documentPreview.some((item) => item.select == true);
  }

  deleteDocList() {
    this.documentPreview.forEach((ticket) => {
      if (ticket.select) {
        if (ticket.fromApi) {
          this.docToDelete.push(ticket);
        }
        this.documentPreview = this.documentPreview.filter(
          (item) => item.select !== ticket.select
        );
        this.filesToUpload = this.filesToUpload.filter(
          (item) => item.select !== ticket.select
        );
      }
      this.counterDocList = 0;
    });

    // console.log(this.docToDelete);
    // console.log(this.filesToUpload);
  }

  cancelDocList() {
    this.documentPreview.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterDocList = 0;
  }

  submitForm() {
    if (this.docToDelete.length >= 1) {
      let array = [];

      this.docToDelete.forEach((element) => {
        array.push({
          fileID: element.fileId,
        });
      });

      const param = {
        form: {
          files: array,
        },
      };

      restServices.pbksb_MarineService
        .DeleteBerthFormDoc(this.appService.myApp)(param)
        .then((result) => {
          // console.log(result);
        });
    }

    let param = {
      form: {
        formID: this.formID,
        status: 'BOOKED',
      },
    };
    // console.log(param);

    if (this.filesToUpload.length <= 0) {
      restServices.pbksb_MarineService
        .UpdateBerthMaterialRequisition(this.appService.myApp)(param)
        .then((result) => {
          // console.log(result);
          let requestList: any = result;
          let request = JSON.parse(requestList);

          if (!request.status) {
            // console.log('Berth Request form success');
            this.open = false;
            this.createNotification2('success');
            this.router.navigate([
              '/operation-system/marine-material-requisition-list',
            ]);
            // console.log('in');
          } else {
            // console.log(request.status, 'Berth Request form failed');
            this.createNotification2('error');
          }
        })
        .catch((err) => {
          this.createNotification2('error');
          // console.log(err);
          this.open = false;
        });
    } else {
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
                restServices.pbksb_MarineService
                  .UpdateBerthMaterialRequisition(this.appService.myApp)(param)
                  .then((result) => {
                    // console.log(result);
                    let requestList: any = result;
                    let request = JSON.parse(requestList);

                    if (!request.status) {
                      // console.log('Berth Request form success');
                      // console.log('in');
                      this.isLoading = true;
                      this.overlay = true;

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
                        .UploadBerthFormDoc(this.appService.myApp)(
                          filesUploaded
                        )
                        .then((result) => {
                          this.successUpload = result;
                          if (this.successUpload) {
                            this.countFiles++;
                          }
                          // console.log(this.countFiles, element.upload);
                          if (this.countFiles === element.upload.length) {
                            this.isLoading = false;
                            this.overlay = false;
                            // console.log('success');

                            this.countFiles = 0;
                            this.filesToUpload = [];
                            this.open = false;
                            this.createNotification2('success');
                            this.router.navigate([
                              '/operation-system/marine-berth-request-list',
                            ]);
                          }
                        });
                    } else {
                      this.createNotification2('error');
                      // console.log(request.status, 'Berth Request form failed');
                    }
                  })
                  .catch((err) => {
                    this.createNotification2('error');
                    // console.log(err);
                    this.open = false;
                  });
              },
              (error) => {
                // console.log(error);
                this.createNotification2('error');
                this.files = new Set();
                this.open = false;
                this.isLoading = false;
                this.overlay = false;
                this.modalTimeout = true;
              }
            );
        }
      });
    }
  }

  openFile(docPath: any) {
    window.open(docPath, '_blank');
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

  createNotification2(type) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request Submitted`;
      subtitle = `Material Requisition Form is successfully submitted`;
    } else {
      title = `Cannot Submit`;
      subtitle = `Material Requisition Form failed to submit. Please try again`;
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

  createNotification3(type) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request Endorsed`;
      subtitle = `Material Requisition Form is successfully endorsed`;
    } else {
      title = `Cannot Endorse`;
      subtitle = `Material Requisition Form failed to endorse. Please try again`;
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

  createNotification4(type) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request Amended`;
      subtitle = `Material Requisition Form is successfully rejected`;
    } else {
      title = `Cannot Amend`;
      subtitle = `Material Requisition Form is failed to reject. Please try again. Please try again`;
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

  //general works
  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'BRF34883583' };
    var getCodeView: any = { requestNo: requestNo };
    //fire api and get response data

    restServices.pbksb_MarineService
      .GetGeneralWorksFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        request['generalWorks'].forEach((value, index) => {
          this.validateData(value);
        });
      })
      .then(() => {
        this.generalWorksList = this.generalWorksList.sort(
          (a, b) => a.sort_ind - b.sort_ind
        );
      });
  }

  validateData(value: any) {
    if (value.indicator === true) {
      this.generalWorksList.push({
        item: value.item ? this.formatItemValue(value.item) : 'N/A',
        remarks: value.remarks ? value.remarks : '',
        sort_ind: value.sort_ind ? value.sort_ind : '',
      });
    }
  }

  formatItemValue(value: any) {
    if (value == 'FIREFIGHTER') {
      return 'Fire Fighter';
    } else {
      return value.replace(/_/g, ' ');
    }
  }

  endorseRequest() {
    let param = {
      form: {
        formID: this.formID,
        status: 'ENDORSED',
      },
    };

    restServices.pbksb_MarineService
      .UpdateBerthMaterialRequisition(this.appService.myApp)(param)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        this.open = false;
        this.createNotification3('success');
        this.router.navigate([
          '/operation-system/marine-material-requisition-list',
        ]);
      })
      .catch((err) => {
        this.createNotification3('error');
        // console.log(err);
        this.open = false;
      });
  }

  onblurAmend(event: any) {
    this.amendNotes = event.target.value;
  }

  rejectRequest() {
    let param = {
      form: {
        formID: this.formID,
        status: 'PENDING_AMENDMENT',
        reject_reason: this.amendNotes,
      },
    };

    restServices.pbksb_MarineService
      .UpdateBerthMaterialRequisition(this.appService.myApp)(param)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);
        this.createNotification4('success');
        this.router.navigate([
          '/operation-system/marine-material-requisition-list',
        ]);
      })
      .catch((err) => {
        this.createNotification4('error');
        // console.log(err);
        this.open = false;
      });
  }
}
