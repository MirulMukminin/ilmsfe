import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import {
  MaterialRequisition,
  MaterialRequisitionForm,
} from '../interfaces/Marine/marine_interface';
import { BerthRequestFormService } from '../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-marine-material-requisition-form',
  templateUrl: './marine-material-requisition-form.component.html',
  styleUrls: ['./marine-material-requisition-form.component.scss'],
})
export class MarineMaterialRequisitionFormComponent implements OnInit {
  @ViewChild('inputFile') fileInput: ElementRef;
  @ViewChild('types') types: ElementRef;
  @ViewChild('waste') waste: ElementRef;
  @ViewChild('docsID') docsID: ElementRef;

  @ViewChild('vessel') vessel: ElementRef;
  @ViewChild('customer') customer: ElementRef;
  @ViewChild('typeOfService') typeOfService: ElementRef;
  @ViewChild('location') location: ElementRef;

  @Input() files = new Set();
  @Input() buttonType = 'primary';
  @Input() accept = ['.jpg', '.png', '.pdf'];
  @Input() multiple = false;
  @Input() skeleton = false;
  @Input() sizeUploder = 'normal';

  uploadFile = [];
  uploadEvent: any;

  isLoading = false;
  overlay = false;

  berthForms: MaterialRequisitionForm = {};
  documentArray = [];
  // documentPreview = [] as DocumentList[];
  documentPreview = [];
  documentList = [];
  materialRow = [] as MaterialRequisition[];

  @Input() followFocus = true;
  @Input() cacheActive = false;
  @Input() isNavigation = true;
  @Input() type = 'default';

  protected maxSize = 500000;

  stepOneOpenModal = false;
  triggerOneOpenModal = false;
  skipWorkProgram = false;

  open = false;
  companyName = '';
  requestByName = '';

  vesselNameArr: any[] = [];
  vesselNameList: any[] = [];
  assignAgentList: any[] = [];
  assignAgentArr: any[] = [];
  assignAgentList2: any[] = [];
  assignAgentArr2: any[] = [];
  requestOnBehalfList: any[] = [];
  requestOnBehalfArr: any[] = [];
  locationNames: any[] = [];
  locationList: any[] = [
    {
      content: 'KSB_BERTH_1',
    },
    {
      content: 'KSB_BERTH_2',
    },
    {
      content: 'KSB_BERTH_3',
    },
    {
      content: 'KSB_BERTH_4',
    },
    {
      content: 'KSB_BERTH_5',
    },
    {
      content: 'KSB_BERTH_6',
    },
    {
      content: 'KSB_BERTH_7',
    },
    {
      content: 'WEST_WHARF_1',
    },
    {
      content: 'WEST_WHARF_2',
    },
    {
      content: 'WEST_WHARF_3',
    },
    {
      content: 'WEST_WHARF_4',
    },
    {
      content: 'KTSB',
    },
  ];
  underdeckServicesList: any[] = [
    {
      content: 'B_CEMENT',
    },
    {
      content: 'G_CEMENT',
    },
    {
      content: 'BENTONITE',
    },
    {
      content: 'BARITE',
    },
    {
      content: 'OBM',
    },
    {
      content: 'SBM',
    },
    {
      content: 'BRINE',
    },
    {
      content: 'BASE_OIL',
    },
    {
      content: 'OTHERS_BULK',
    },
    // {
    //   content: 'SHIP_FUEL',
    // },
    // {
    //   content: 'SHIP_WATER',
    // },
  ];
  typeOfServicesList: any[] = [
    {
      content: 'LOADING',
    },
    {
      content: 'DISCHARGE',
    },
    {
      content: 'MIXING',
    },
    {
      content: 'CENTRIFUGE',
    },
    {
      content: 'STORAGE',
    },
    {
      content: 'SHEARING',
    },
  ];
  docTypeList: any[] = [
    {
      content: 'K4',
    },
    {
      content: 'K5',
    },
    {
      content: 'DELIVERY_ORDER',
    },
    {
      content: 'OTHER_DOCUMENTS',
    },
  ];
  documentTypeList = [];
  timeList = [];
  timeEta: any;
  timeEtd: any;

  status = 'start';
  berthFormID = '';
  requestNo: any;
  est_arrival = '';
  est_departure = '';

  invalidVessel = false;
  invalidOnBehalf = false;
  invalidPONum = false;
  invalidEADate = false;
  invalidEABackdated = false;
  invalidETA = false;
  invalidEDDate = false;
  invalidEDBackdated = false;
  invalidETD = false;
  invalidEaEdDate = false;
  invalidEaEdTime = false;
  invalidNextLocation = false;
  invalidLastLocation = false;
  invalidAgent = false;

  invalidClient = false;
  invalidCustomer = false;
  invalidLocation = false;
  invalidTypeOfService = false;
  invalidRequestRef = false;
  materialTableInvalid = false;

  invalidUpload = false;
  invalidDocID = false;
  invalidDocType = false;

  uploadForm: FormGroup;
  // uploadList: FormGroup;
  public displayFile;
  noTableSelected = false;
  invalidbackDated: any[] = [];
  invalidbackDatedFromStartDate: any[] = [];
  nextDay: boolean;
  sameDay: boolean;

  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'xl';

  steps = [
    {
      text: 'Step 1',
      state: ['current'],
      optionalText: 'Berth Booking Form',
    },
    {
      text: 'Step 2',
      state: ['incomplete'],
      optionalText: 'Work Program Request',
    },
    {
      text: 'Step 3',
      state: ['incomplete'],
      optionalText: 'Preview & Submit',
    },
  ];

  currentStep = 2;
  documentType = '';
  wasteCode = '';
  documentID = '';

  counterDocList = 0;
  filesToUpload = [];
  successUpload: any;
  countFiles = 0;
  countView = 0;

  docToDelete = [];
  materialToDelete = [];

  isInitiatedData = false;
  dailyDate: any;
  currentDate: any;
  dateFlag = false;
  date = new Date();
  numericCounter: any = 0;
  invalidNumeric = false;
  submitStatus = false;
  terminal: string = 'KSB';
  clickedSubmit = false;

  counterMaterial = 0;
  invalidUnderdeckServices: any = [];
  invalidTankNo: any = [];
  invalidProduct: any = [];
  requiredMaterial: any[] = [];
  invalidBarrelsQty: any = [];
  invalidTonnesQty: any = [];
  invalidStartDate: any = [];
  invalidEndDate: any = [];
  invalidStartTime: any = [];
  invalidEndTime: any = [];
  disableTonnes: any[] = [];
  disableBarrels: any[] = [];

  validateStartDate: any;
  validateEndDate: any;

  step = 1;
  min = 0;
  max = 999999;

  colspan = 2;
  headerStartTime = 'Start Time';
  headerEndTime = 'End Time';

  private currentUrl: string = '';

  constructor(
    private router: Router,
    private appService: AppService,
    private berthRequestFormService: BerthRequestFormService,
    private http: HttpClient,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute
  ) {}

  ipUrl = this.appService.apiIP;
  token: any;
  tokenSubmit: any;

  formID = '';
  requestNumber = '';
  customerCode = '';
  modalTimeout = false;
  allowBackdate = true;

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

        this.companyName = initialData.Company;
        this.requestByName = initialData.Fullname;
        this.token = initialData.Token.access_token;
        this.customerCode = initialData.CustomerCode;
        this.allowBackdate = initialData.AllowBackdate;
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

  // redirectIfInitiated() {
  //   this.currentUrl = this.berthRequestFormService.getCurrentUrl();

  //   if (this.currentUrl.includes('marine-berth-request-form/')) {
  //     this.currentStep = 2;
  //   }
  // }

  async getRestServiceAPI(initData: any) {
    //vessel name
    await restServices.pbksb_MarineService
      .ListVessel(this.appService.myApp)()
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);

        let array = resArr.vessel;

        array.forEach((element) => {
          this.vesselNameArr.push({
            content: element.name,
          });
        });

        this.vesselNameArr = this.vesselNameArr.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.vesselNameList = this.vesselNameArr;
      });

    // request on behalf
    await restServices.pbksb_MarineService
      .ListCustomer(this.appService.myApp)()
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);
        let array = resArr.customer;

        array.forEach((element) => {
          if (element.name) {
            this.requestOnBehalfArr.push({
              content: element.name,
            });
          }
        });

        this.requestOnBehalfArr = this.requestOnBehalfArr.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.requestOnBehalfList = this.requestOnBehalfArr;
      });

    // await restServices.pbksb_MarineService
    // .ListLocation(this.appService.myApp)()
    // .then((result) => {
    //   // console.log(result);
    //   let requestList: any = result;
    //   let request = JSON.parse(requestList);

    //   if (request.status != 'BAD_REQUEST') {
    //     // console.log(request);
    //     request.site.forEach((element) => {
    //       this.locationNames.push({
    //         content: element.description,
    //       });
    //     });
    //   }

    //   this.locationList = this.locationNames.sort((a, b) =>
    //     a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
    //   );
    // });

    // agent 1
    await restServices.pbksb_MarineService
      .getAgentListByCompany(this.appService.myApp)({
        customerCode: this.customerCode,
      })
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);
        let array = resArr.company_list;
        // console.log(result);

        array.forEach((element) => {
          this.assignAgentArr.push({
            content: element.name,
          });
        });

        this.assignAgentArr = this.assignAgentArr.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.assignAgentList = this.assignAgentArr;
      });

    //agent 2
    await restServices.pbksb_MarineService
      .GetAgentCompanies(this.appService.myApp)()
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);
        let array = resArr.agents;
        // console.log(array);

        array.forEach((element) => {
          this.assignAgentArr2.push({
            content: element.name,
          });
        });

        this.assignAgentArr2 = this.assignAgentArr2.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.assignAgentList2 = this.assignAgentArr2;
      });

    //----------------------------- API if edit ----------------------------------//

    if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
      this.requestNo = this._Activatedroute.snapshot.paramMap.get('requestNum');
    }

    // this.RequestNo = this._Activatedroute.snapshot.paramMap.get('requestNum');

    if (this.requestNo) {
      const getCode = { requestNo: this.requestNo };
      this.isInitiatedData = true;
      // get request form list
      restServices.pbksb_MarineService
        .GetBerthMaterialRequisitionDetails(this.appService.myApp)(getCode)
        .then((result) => {
          const resArr: any = result;
          const array = JSON.parse(resArr);

          this.berthFormID = array.berthMaterialRequisition.id;
          this.berthForms.vesselName =
            array.berthMaterialRequisition.vessel.name;
          this.berthForms.request_ref =
            array.berthMaterialRequisition.request_ref;
          this.berthForms.locationName =
            array.berthMaterialRequisition.location;
          this.berthForms.typeOfServices =
            array.berthMaterialRequisition.type_service;
          this.berthForms.customerName =
            array.berthMaterialRequisition.customer_user.name;
          this.berthForms.remarks =
            array?.berthMaterialRequisition?.remarks ?? '-';
          this.requestNumber =
            array.berthMaterialRequisition.material_requisition_no;
          this.status = array.berthMaterialRequisition.status;

          var materialArray = array.materialRequisitionForm;
          var documentArray = array.materialRequisitionDocument;

          if (documentArray.length > 0) {
            documentArray.forEach((element) => {
              this.documentPreview.push({
                idApi: element.id,
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

          if (materialArray.length > 0) {
            materialArray.forEach((element, index) => {
              if (array.berthMaterialRequisition.type_service !== 'STORAGE') {
                this.materialRow.push({
                  id: element.id,
                  underdeck_services: element.underdeck_services,
                  tank_no: element.tank_no,
                  product: element.product,
                  barrels_quantity: element.barrels_quantity,
                  tonnes_quantity: element.tonnesQuantity,
                  start_time: element.start_time.slice(11, 18),
                  // end_time: element.end_time.slice(11, 18),
                  start_date: formatDate(
                    element.start_time.slice(0, 10),
                    'dd/MM/yyyy',
                    'en_US'
                  ),
                  // end_date: formatDate(
                  //   element.end_time.slice(0, 10),
                  //   'dd/MM/yyyy',
                  //   'en_US'
                  // ),
                  Selected: false,
                });
              } else {
                this.materialRow.push({
                  id: element.id,
                  underdeck_services: element.underdeck_services,
                  tank_no: element.tank_no,
                  product: element.product,
                  barrels_quantity: element.barrels_quantity,
                  tonnes_quantity: element.tonnes_quantity,
                  start_date: formatDate(
                    element.start_time,
                    'dd/MM/yyyy',
                    'en_US'
                  ),
                  // end_date: formatDate(element.end_time, 'dd/MM/yyyy', 'en_US'),
                  Selected: false,
                });
              }
            });

            this.materialRow.forEach((elem, i) => {
              if (
                elem.underdeck_services == 'BASE_OIL' ||
                elem.underdeck_services == 'BRINE' ||
                elem.underdeck_services == 'SBM' ||
                elem.underdeck_services == 'OBM' ||
                elem.underdeck_services == 'OTHERS_BULK'
              ) {
                this.disableTonnes[i] = true;
              } else {
                this.disableTonnes[i] = false;
              }

              if (
                elem.underdeck_services == 'BARITE' ||
                elem.underdeck_services == 'B_CEMENT' ||
                elem.underdeck_services == 'G_CEMENT' ||
                elem.underdeck_services == 'BENTONITE'
              ) {
                this.disableBarrels[i] = true;
              } else {
                this.disableBarrels[i] = false;
              }
            });
          }
        });
    }
  }

  changeStep(step: any) {
    this.currentStep = step;
    this.clickedSubmit = false;
    this.skipWorkProgram = false;
    if (step == 0) {
      if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
        this.requestNo =
          this._Activatedroute.snapshot.paramMap.get('requestNum');
      } else {
        this.requestNo = this.berthRequestFormService.getrequestNo();

        this.countView++;
      }
    }
    // console.log(step);
    this.userInfo();
  }
  stepChangedHandler(step: number) {
    this.currentStep = step;
    this.userInfo();
    this.clickedSubmit = false;
    // console.log(step);
  }

  onSelectTerminal(event: any) {
    this.terminal = event.value;
  }

  openModalAddItem() {
    this.stepOneOpenModal = true;
    this.wasteCode = '';
    this.documentID = '';

    this.waste.nativeElement.value = ' ';
    this.docsID.nativeElement.value = ' ';
    this.documentTypeList = this.docTypeList;

    this.uploadEvent = null;
    this.uploadFile = [];
    this.documentList = [];
    this.files = new Set();
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
        wasteCode: this.wasteCode ? this.wasteCode : '-',
        docID: this.documentID ? this.documentID : '-',
        docPath: path,
        uploadBy: this.requestByName,
        dateTime: dateTime,
        upload: this.uploadFile,
        select: false,
      };

      this.filesToUpload.push(file);

      this.documentPreview.push(file);

      // console.log(this.documentPreview);

      //  this.fileInput.nativeElement.value = '';

      this.stepOneOpenModal = false;
      this.documentTypeList = [];
      this.documentType = '';
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
          // console.log(response);

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
          this.createNotification('file', filename);
        }
      );
  }

  cancelModal() {
    this.stepOneOpenModal = false;
    this.invalidDocType = false;
    this.invalidDocID = false;
    this.invalidUpload = false;
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
      this.timeList.push({
        content: time[i],
      });
    }

    this.timeEtd = this.timeList;
    this.timeEta = this.timeList;
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
        if (ticket.idApi) {
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

    console.log(this.docToDelete);
  }

  cancelDocList() {
    this.documentPreview.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterDocList = 0;
  }

  onSubmit(berthFormss: NgForm) {
    this.checkValidation();
    this.focusOnInvalid();

    if (this.materialRow.length < 1) {
      this.noTableSelected = true;
      this.materialTableInvalid = true;
    } else if (this.materialRow.length > 0) {
      this.noTableSelected = false;
      this.materialTableInvalid = false;

      let flagUnderdeckService = true;
      let flagTankNo = true;
      let flagProduct = true;
      let flagBarrels = true;
      let flagTonnes = true;
      let flagStartDate = true;
      let flagEndDate = true;
      let flagStartTime = true;
      let flagEndTime = true;

      // Material row validation
      for (let i = 0; i < this.materialRow.length; i++) {
        if (
          !this.materialRow[i].underdeck_services ||
          this.materialRow[i].underdeck_services.length == 0
        ) {
          this.invalidUnderdeckServices[i] = true;
          flagUnderdeckService = true;
        } else {
          this.invalidUnderdeckServices[i] = false;
          flagUnderdeckService = false;
        }

        // if (
        //   !this.materialRow[i].tank_no ||
        //   this.materialRow[i].tank_no == undefined ||
        //   this.materialRow[i].tank_no == null
        // ) {
        //   this.invalidTankNo[i] = true;
        //   flagTankNo = true;
        // } else {
        //   this.invalidTankNo[i] = false;
        //   flagTankNo = false;
        // }

        // if (
        //   !this.materialRow[i].product ||
        //   this.materialRow[i].product == undefined ||
        //   this.materialRow[i].product == null
        // ) {
        //   this.invalidProduct[i] = true;
        //   flagProduct = true;
        // } else {
        //   this.invalidProduct[i] = false;
        //   flagProduct = false;
        // }

        if (
          this.materialRow[i].barrels_quantity == undefined ||
          this.materialRow[i].barrels_quantity == null ||
          this.materialRow[i].barrels_quantity < 0
        ) {
          this.invalidBarrelsQty[i] = true;
          flagBarrels = true;
        } else {
          this.invalidBarrelsQty[i] = false;
          flagBarrels = false;
        }

        if (
          this.materialRow[i].tonnes_quantity == undefined ||
          this.materialRow[i].tonnes_quantity == null ||
          this.materialRow[i].tonnes_quantity < 0
        ) {
          this.invalidTonnesQty[i] = true;
          flagTonnes = true;
        } else {
          this.invalidTonnesQty[i] = false;
          flagTonnes = false;
        }

        if (
          !this.materialRow[i].start_date ||
          this.materialRow[i].start_date == undefined ||
          this.materialRow[i].start_date == null
        ) {
          this.invalidStartDate[i] = true;
          flagStartDate = true;
        } else {
          this.invalidStartDate[i] = false;
          flagStartDate = false;
        }

        // if(!this.materialRow[i].end_date ||  this.materialRow[i].end_date == undefined || this.materialRow[i].end_date == null){
        //   this.invalidEndDate[i] = true;
        //   flagEndDate = true;
        // }
        // else{
        //   this.invalidEndDate[i] = false;
        //   flagEndDate = false;
        // }

        if (berthFormss.form.value.typeOfServices !== 'STORAGE') {
          if (
            !this.materialRow[i].start_time ||
            this.materialRow[i].start_time == undefined ||
            this.materialRow[i].start_time == null ||
            this.materialRow[i].start_time.length < 5
          ) {
            this.invalidStartTime[i] = true;
            flagStartTime = true;
          } else {
            this.invalidStartTime[i] = false;
            flagStartTime = false;
          }

          // if(!this.materialRow[i].end_time ||  this.materialRow[i].end_time == undefined || this.materialRow[i].end_time == null || this.materialRow[i].end_time.length < 5){
          //   this.invalidEndTime[i] = true;
          //   flagEndTime = true;
          // }
          // else{
          //   this.invalidEndTime[i] = false;
          //   flagEndTime = false;
          // }
        } else {
          flagStartTime = false;
          // flagEndTime = false;
        }
      }
      // end of Material row validation

      // if(flagUnderdeckService == false && flagTankNo == false &&
      //   flagProduct == false && flagBarrels == false &&
      //   flagTonnes == false && flagStartDate == false &&
      //   flagEndDate == false && flagTankNo == false &&
      //   flagTankNo == false && flagStartTime == false &&
      //   flagEndTime == false){
      if (
        flagUnderdeckService == false &&
        flagBarrels == false &&
        flagTonnes == false &&
        flagStartDate == false &&
        flagStartTime == false
      ) {
        if (berthFormss.valid) {
          let materialReqRow = [];
          let uploadDocument = [];

          if (this.isInitiatedData) {
            if (this.materialToDelete.length >= 1) {
              this.materialToDelete.forEach((element) => {
                materialReqRow.push({
                  id: element.id,
                });
              });
            }

            this.materialRow.forEach((element, index) => {
              let start: any;
              // let end : any ;
              if (typeof element.start_date === 'string') {
                const [day, month, year] = element.start_date.split('/');
                const result = [year, month, day].join('-');

                start = result + ' ' + element.start_time;
              } else {
                start =
                  this.datepipe.transform(element.start_date, 'yyyy-MM-dd') +
                  ' ' +
                  element.start_time;
              }

              // if (typeof element.end_date === 'string' ){
              //   const [day, month, year] = element.end_date.split('/');
              //   const result = [year, month, day].join('-');
              //   end = result + ' ' + element.end_time
              // }
              // else{
              //   end = this.datepipe.transform(element.end_date, 'yyyy-MM-dd') + ' ' + element.end_time
              // }

              materialReqRow.push({
                id: (typeof element.id == 'number') == true ? '' : element.id,
                underdeck_services: element.underdeck_services,
                tank_no: element.tank_no,
                product: element.product,
                barrels_quantity: element.barrels_quantity,
                // tonnes_quantity: element.tonnes_quantity,
                tonnesQuantity: element.tonnes_quantity,
                start_time: start,
                // end_time : end
              });
            });
          } else {
            this.materialRow.forEach((element) => {
              let startTime = '';
              // let endTime = "";

              if (element.start_time == '') {
                startTime = '00:00';
              } else {
                startTime = element.start_time;
              }

              // if(element.end_time == ""){
              //   endTime = "00:00";
              // }
              // else{
              //   endTime = element.end_time;
              // }

              materialReqRow.push({
                id: '',
                underdeck_services: element.underdeck_services,
                tank_no: element.tank_no,
                product: element.product,
                barrels_quantity: element.barrels_quantity,
                // tonnes_quantity: element.tonnes_quantity,
                tonnesQuantity: element.tonnes_quantity,
                start_time:
                  this.datepipe.transform(element.start_date, 'yyyy-MM-dd') +
                  ' ' +
                  startTime,
                // end_time: this.datepipe.transform(element.end_date, 'yyyy-MM-dd') + ' ' + endTime,
              });
            });
          }

          let formData = berthFormss.form.value;

          let request_ref =
            formData.request_ref == '' || !formData.request_ref
              ? '-'
              : formData.request_ref;

          let remarks =
            formData.remarks == '' || !formData.remarks
              ? '-'
              : formData.remarks;

          let param = {
            form: {
              formID: '',
              request_ref: request_ref,
              client: this.companyName,
              customer_user: formData.customerName,
              location: formData.locationName,
              vessel: formData.vesselName,
              remarks: remarks,
              request_by_company: this.companyName,
              type_service: formData.typeOfServices,
              status: 'INITIATED',

              materialRequisitionUnderdeckForms: materialReqRow,
              fileForms: uploadDocument,
            },
          };

          this.clickedSubmit = true;
          if (this.isInitiatedData) {
            if (this.docToDelete.length >= 1) {
              this.docToDelete.forEach((element) => {
                uploadDocument.push({
                  formID: element.idApi,
                });
              });
            }

            param.form['formID'] = this.berthFormID;
            if (this.filesToUpload.length <= 0) {
              console.log(param);
              this.submitBerthForm(
                param,
                'UpdateBerthMaterialRequisition'
              ).then(() => {
                // console.log('submitStatus', this.submitStatus);
                this.router.navigate([
                  '/operation-system/marine-material-requisition-form-preview',
                ]);
              });
            } else {
              this.isLoading = true;
              this.overlay = true;

              this.uploadForm = this.formBuilder.group({
                fileData: [''],
              });

              this.filesToUpload.forEach((element, index) => {
                //this is to revoke / clear memory of objectURL
                window.URL.revokeObjectURL(element.docPath);

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
                  .subscribe((data) => {
                    const filesUploaded = {
                      formID: '',
                      document_type: element.docType,
                      waste_code: element.wasteCode,
                      document_id: element.docID,
                      fileID: data.id,
                      upload_by: element.uploadBy,
                    };

                    uploadDocument.push(filesUploaded);
                    this.countFiles++;
                    if (this.filesToUpload.length == uploadDocument.length) {
                      this.submitMaterialForm(param);
                    }
                  });
              });
            }
          } else {
            // console.log('in');

            if (this.documentPreview.length == 0) {
              this.submitBerthForm(
                param,
                'UpdateBerthMaterialRequisition'
              ).then(() => {
                // console.log('submitStatus', this.submitStatus);
                this.router.navigate([
                  '/operation-system/marine-material-requisition-form-preview',
                ]);
              });
            } else {
              // this.disableSubmit = true;
              // console.log('submitStatus', this.submitStatus);
              this.isLoading = true;
              this.overlay = true;

              this.uploadForm = this.formBuilder.group({
                fileData: [''],
              });

              this.documentPreview.forEach((element, index) => {
                //this is to revoke / clear memory of objectURL
                window.URL.revokeObjectURL(element.docPath);

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
                  .subscribe((data) => {
                    const filesUploaded = {
                      formID: '',
                      document_type: element.docType,
                      waste_code: element.wasteCode,
                      document_id: element.docID,
                      fileID: data.id,
                      upload_by: element.uploadBy,
                    };

                    uploadDocument.push(filesUploaded);
                    this.countFiles++;
                    if (this.documentPreview.length == uploadDocument.length) {
                      this.submitMaterialForm(param);
                    }
                  });
              });
            }
            // this.filesToUpload = [];
          }
        } else {
          this.checkValidation();
          this.focusOnInvalid();
        }
      } else {
        console.log('INVALID');
      }
    }
  }

  submitMaterialForm(param) {
    this.submitBerthForm(param, 'UpdateBerthMaterialRequisition').then(
      (result) => {
        this.router.navigate([
          '/operation-system/marine-material-requisition-form-preview',
        ]);
      }
    );
  }

  checkValidation() {
    if (!this.berthForms.customerName || this.berthForms.customerName == '') {
      this.invalidCustomer = true;
    } else if (this.berthForms.customerName) {
      this.invalidCustomer = false;
    }

    if (!this.berthForms.locationName || this.berthForms.locationName == '') {
      this.invalidLocation = true;
    } else if (this.berthForms.locationName) {
      this.invalidLocation = false;
    }

    if (!this.berthForms.vesselName || this.berthForms.vesselName == '') {
      this.invalidVessel = true;
    } else if (this.berthForms.vesselName) {
      this.invalidVessel = false;
    }

    if (
      !this.berthForms.typeOfServices ||
      this.berthForms.typeOfServices == ''
    ) {
      this.invalidTypeOfService = true;
    } else if (this.berthForms.typeOfServices) {
      this.invalidTypeOfService = false;
    }
  }

  focusOnInvalid() {
    if (this.invalidCustomer) {
      this.customer.nativeElement.focus();
    } else if (this.invalidLocation) {
      this.location.nativeElement.focus();
    } else if (this.invalidVessel) {
      this.vessel.nativeElement.focus();
    } else if (this.invalidTypeOfService) {
      this.typeOfService.nativeElement.focus();
    }
  }

  async submitBerthForm(param, type) {
    this.berthRequestFormService.setFormValue(param);
    let result = await restServices.pbksb_MarineService[type](
      this.appService.myApp
    )(param)
      .then((result) => {
        const resArr: any = result;
        let info = JSON.parse(resArr);
        console.log(info);

        if (info.status != 'BAD_REQUEST') {
          this.submitStatus = true;
          // console.log('in');
        } else {
          this.createNotification('submit');
          this.submitStatus = false;
          // console.log('in');
        }

        this.berthFormID = info.berthMaterialRequisition.id;
        this.requestNo = info.berthMaterialRequisition.material_requisition_no;

        this.berthRequestFormService.setFormID(this.berthFormID);
        this.berthRequestFormService.setRequestNo(this.requestNo);
        // this.berthRequestFormService.setFormValue(info);
      })
      .catch((err) => {
        this.submitStatus = false;
        // console.log(err);
        // console.log('in');
        this.berthRequestFormService.setFormID(this.berthFormID);
        this.berthRequestFormService.setRequestNo(this.requestNo);
        this.createNotification('submit');
      });
    return result;
  }

  logout() {
    this.modalTimeout = false;
    this.appService.terminateSession();
  }

  createNotification(type: any, filename?: any) {
    if (type == 'file') {
      const successNotif = {
        type: 'error',
        title: 'Session Timeout',
        subtitle: `Failed to download ${filename} file. Please relogin again to download the file`,
        time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
      };

      this.appService.showToaster(successNotif);
    } else if (type == 'submit') {
      const successNotif = {
        type: 'error',
        title: 'Submit Error',
        subtitle: `Failed to submit Berth Booking Form. Please try again`,
        time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
      };

      this.appService.showToaster(successNotif);
    }
  }

  numericCount(value) {
    this.numericCounter = value.length;
    if (this.numericCounter == 100) {
      this.invalidNumeric = true;
    } else {
      this.invalidNumeric = false;
    }
  }

  checkLengthMaterial() {
    if (this.materialRow) {
      return this.materialRow.some((item) => item.Selected == true);
    }
  }

  deleteMaterial() {
    for (let i = 0; i < this.materialRow.length; i++) {
      // this.invalidItemOtherMachine[i] = false;
      // this.invalidQuantityOtherMachine[i] = false;
      // this.invalidTimeOtherMachine[i] = false;
      // this.invalidEHOtherMachine[i] = false;
      // this.invalidLocationOtherMachine[i] = false;
    }

    this.materialRow.forEach((ticket) => {
      if (ticket.Selected) {
        if (typeof ticket.id === 'string') {
          this.materialToDelete.push(ticket);
        }

        this.materialRow = this.materialRow.filter(
          (item) => item.Selected !== ticket.Selected
        );
      }
    });
    this.counterMaterial = 0;
  }

  cancelMethodMaterial() {
    this.materialRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
    this.counterMaterial = 0;
  }

  public addMaterialRow(): void {
    this.materialRow.push({
      id: Math.floor(Math.random() * 100),
      underdeck_services: '',
      tank_no: '',
      product: '',
      barrels_quantity: 0,
      tonnes_quantity: 0,
      start_time: '',
      end_time: '',
      start_date: '',
      end_date: '',
      Selected: false,
    });

    for (let i = 0; i < this.materialRow.length; i++) {
      this.invalidbackDated[i] = false;
      this.invalidStartDate[i] = false;
      this.invalidEndDate[i] = false;
      this.invalidbackDatedFromStartDate[i] = false;
    }
  }

  checkServices(index: number) {
    if (
      this.materialRow[index].underdeck_services == 'BASE_OIL' ||
      this.materialRow[index].underdeck_services == 'BRINE' ||
      this.materialRow[index].underdeck_services == 'SBM' ||
      this.materialRow[index].underdeck_services == 'OBM'
    ) {
      this.disableTonnes[index] = true;
    } else {
      this.disableTonnes[index] = false;
    }

    if (
      this.materialRow[index].underdeck_services == 'BARITE' ||
      this.materialRow[index].underdeck_services == 'B_CEMENT' ||
      this.materialRow[index].underdeck_services == 'G_CEMENT' ||
      this.materialRow[index].underdeck_services == 'BENTONITE'
    ) {
      this.disableBarrels[index] = true;
    } else {
      this.disableBarrels[index] = false;
    }
  }

  inputValueChange(item, index) {
    if (item == undefined || item == null) {
      this.materialRow[index].barrels_quantity = 0;
    }
  }

  inputValueChangeTonnes(item, index) {
    if (item == undefined || item == null) {
      this.materialRow[index].tonnes_quantity = 0;
    }
  }

  dateValueChange(event: any) {
    console.log("allow backdate", this.allowBackdate)
    if (!this.allowBackdate) {
      this.materialRow.forEach((elem, i) => {
        let dateTimeInput = new Date(elem.start_date);
        let dateInput =
          dateTimeInput.getFullYear() +
          '/' +
          (dateTimeInput.getMonth() + 1) +
          '/' +
          ('0' + dateTimeInput.getDate()).slice(-2);
        let todayDateTime = new Date();
        let todayDate =
          todayDateTime.getFullYear() +
          '/' +
          (todayDateTime.getMonth() + 1) +
          '/' +
          ('0' + todayDateTime.getDate()).slice(-2);

        // Get input date
        let dateToString = elem.start_date.toString();
        let singleDate = new Date(dateToString);
        let formatSingleDate = this.datepipe.transform(
          singleDate,
          'dd-MM-yyyy'
        );

        let current = new Date();
        let formatCurrent = this.datepipe.transform(current, 'dd-MM-yyyy');

        this.dailyDate = dateInput;
        this.currentDate = todayDate;

        if (dateInput < todayDate) {
          this.invalidbackDated[i] = true;
        } else {
          this.invalidbackDated[i] = false;
        }

        if (elem.end_date) {
          let dateTimeInput = new Date(elem.end_date);
          let dateInput =
            dateTimeInput.getFullYear() +
            '/' +
            (dateTimeInput.getMonth() + 1) +
            '/' +
            ('0' + dateTimeInput.getDate()).slice(-2);

          let startdateTimeInput = new Date(elem.start_date);
          let startdateInput =
            startdateTimeInput.getFullYear() +
            '/' +
            (startdateTimeInput.getMonth() + 1) +
            '/' +
            ('0' + startdateTimeInput.getDate()).slice(-2);

          this.dailyDate = dateInput;

          if (dateInput < startdateInput) {
            this.invalidbackDatedFromStartDate[i] = true;
          } else {
            this.invalidbackDatedFromStartDate[i] = false;
          }
        }
      });
    }
  }

  dateEndValueChange(event: any) {
    this.materialRow.forEach((elem, i) => {
      let dateTimeInput = new Date(elem.end_date);
      let dateInput =
        dateTimeInput.getFullYear() +
        '/' +
        (dateTimeInput.getMonth() + 1) +
        '/' +
        ('0' + dateTimeInput.getDate()).slice(-2);

      let startdateTimeInput = new Date(elem.start_date);
      let startdateInput =
        startdateTimeInput.getFullYear() +
        '/' +
        (startdateTimeInput.getMonth() + 1) +
        '/' +
        ('0' + startdateTimeInput.getDate()).slice(-2);

      this.dailyDate = dateInput;

      this.validateStartDate = dateInput;
      this.validateEndDate = startdateInput;

      if (dateInput < startdateInput) {
        this.invalidbackDatedFromStartDate[i] = true;
      } else {
        this.invalidbackDatedFromStartDate[i] = false;
      }
    });
  }

  timePickerChangeStart(event: any, indexArr) {
    let value = event.target.value;
    if (value.length > 2 && value[2] !== ':') {
      value = value.substring(0, 2) + ':' + value.slice(2);
    }

    this.materialRow.forEach((element, index) => {
      if (index == indexArr) {
        element.start_time = value;
      }
    });

    if (value.length > 4) {
      var strlastTwo = value.charAt(value.length - 2);
      if (
        strlastTwo == '6' ||
        strlastTwo == '7' ||
        strlastTwo == '8' ||
        strlastTwo == '9'
      ) {
        value = value.substring(0, value.length - 2) + '00';
        this.materialRow.forEach((element, index) => {
          if (index == indexArr) {
            element.start_time = value;
          }
        });
      }
    }
  }

  timePickerChangeEnd(event: any, indexArr) {
    let value = event.target.value;
    if (value.length > 2 && value[2] !== ':') {
      value = value.substring(0, 2) + ':' + value.slice(2);
    }

    this.materialRow.forEach((element, index) => {
      if (index == indexArr) {
        element.end_time = value;
      }
      if (this.validateStartDate == this.validateEndDate) {
        let end = element.end_time.replace(/:/g, '');
        let start = element.start_time.replace(/:/g, '');

        if (Number(end) < Number(start)) {
          this.invalidEndTime[index] = true;
        } else {
          this.invalidEndTime[index] = false;
        }
      }
    });

    if (value.length > 4) {
      var strlastTwo = value.charAt(value.length - 2);
      if (
        strlastTwo == '6' ||
        strlastTwo == '7' ||
        strlastTwo == '8' ||
        strlastTwo == '9'
      ) {
        value = value.substring(0, value.length - 2) + '00';
        this.materialRow.forEach((element, index) => {
          if (index == indexArr) {
            element.end_time = value;
          }
        });
      }
    }
  }

  materialCheckboxChange(event: any) {
    if (event === true) {
      this.counterMaterial++;
    } else if (event == false) {
      this.counterMaterial--;
    }
  }

  servicesDependency(event: any) {
    if (event.item.content == 'STORAGE') {
      this.colspan = 1;
      this.headerStartTime = 'Start Date';
      this.headerEndTime = 'End Date';
      this.underdeckServicesList = [];
      this.underdeckServicesList = [
        {
          content: 'BASE_OIL',
        },
      ];
    } else {
      this.colspan = 2;
      this.headerStartTime = 'Start Time';
      this.headerEndTime = 'End Time';
      this.underdeckServicesList = [];
      this.underdeckServicesList = [
        {
          content: 'B_CEMENT',
        },
        {
          content: 'G_CEMENT',
        },
        {
          content: 'BENTONITE',
        },
        {
          content: 'BARITE',
        },
        {
          content: 'OBM',
        },
        {
          content: 'SBM',
        },
        {
          content: 'BRINE',
        },
        {
          content: 'BASE_OIL',
        },
        {
          content: 'OTHERS_BULK',
        },
      ];
    }
  }
}
