import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthForm, DocumentList } from '../interfaces/Marine/marine_interface';
import { BerthRequestFormService } from '../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-marine-berth-request-form',
  templateUrl: './marine-berth-request-form.component.html',
  styleUrls: ['./marine-berth-request-form.component.scss'],
})
export class MarineBerthRequestFormComponent implements OnInit {
  @ViewChild('inputFile') fileInput: ElementRef;
  @ViewChild('types') types: ElementRef;
  @ViewChild('waste') waste: ElementRef;
  @ViewChild('docsID') docsID: ElementRef;

  @ViewChild('vessel') vessel: ElementRef;
  @ViewChild('requestOnBehalf') requestOnBehalf: ElementRef;
  @ViewChild('PONum') PONum: ElementRef;
  @ViewChild('eaDate') eaDate: ElementRef;
  @ViewChild('eta') eta: ElementRef;
  @ViewChild('edDate') edDate: ElementRef;
  @ViewChild('etd') etd: ElementRef;
  @ViewChild('nextLocation') nextLocation: ElementRef;
  @ViewChild('lastLocation') lastLocation: ElementRef;
  @ViewChild('agent') agent: ElementRef;

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

  berthForm: BerthForm = {};
  documentArray = [];
  documentPreview = [] as DocumentList[];
  documentList = [];

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

  invalidUpload = false;
  invalidDocID = false;
  invalidDocType = false;

  uploadForm: FormGroup;
  // uploadList: FormGroup;
  public displayFile;

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

  currentStep = 0;
  documentType = '';
  wasteCode = '';
  documentID = '';

  counterDocList = 0;
  filesToUpload = [];
  successUpload: any;
  countFiles = 0;
  countView = 0;

  docToDelete = [];

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
  receivedTerminal;

  private currentUrl: string = '';

  constructor(
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

  ngOnInit(): void {
    this.userInfo();
    this.getTimeDropdown();

    this.redirectIfInitiated();
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

  redirectIfInitiated() {
    this.currentUrl = this.berthRequestFormService.getCurrentUrl();

    if (this.currentUrl.includes('marine-berth-request-form/')) {
      this.currentStep = 2;
    }
  }

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
          if (element.full_name) {
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
      // this.isInitiatedData = true;

      // get request form list
      restServices.pbksb_MarineService
        .GetBerthRequestDetailsByRequestNo(this.appService.myApp)(getCode)
        .then((result) => {
          const resArr: any = result;
          const array = JSON.parse(resArr);

          this.berthFormID = array.berthForm.id;
          this.receivedTerminal = array.berthForm.terminal;
          this.terminal =
            array.berthForm.terminal == 'WW' ? 'KSB' : array.berthForm.terminal;
          this.berthForm.vesselName = array.berthForm.vessel.name;
          this.berthForm.requestOnBehalf =
            array.berthForm.request_on_behalf.name.toLowerCase() == 'n/a'
              ? ''
              : array.berthForm.request_on_behalf.name;
          this.berthForm.requestBy = array.berthForm.request_by;
          this.berthForm.eaDate = formatDate(
            array.berthForm.est_arrival,
            'dd/MM/yyyy',
            'en_US'
          );
          this.berthForm.eta = formatDate(
            array.berthForm.est_arrival,
            'HH:mm',
            'en_US'
          );
          this.berthForm.edDate = formatDate(
            array.berthForm.est_departure,
            'dd/MM/yyyy',
            'en_US'
          );
          this.berthForm.etd = formatDate(
            array.berthForm.est_departure,
            'HH:mm',
            'en_US'
          );
          this.berthForm.nextLocation = array.berthForm.next_location;
          this.berthForm.lastLocation = array.berthForm.last_location;
          this.berthForm.agent = array.berthForm?.agent?.name;
          this.berthForm.PONum = array.berthForm.po_number;
          this.berthForm.agent_fuelwater =
            array?.berthForm?.agent_fuelwater?.name;
          // this.berthForm.agent_fuelwater = array.berthForm.agent.name;
          this.berthForm.remarks = array?.berthForm?.remarks ?? '-';
          // this.formID = array.berthForm.id;
          this.requestNumber = array.berthForm.request_number;
          this.status = array.berthForm.status;
        });

      //document list
      restServices.pbksb_MarineService
        .GetBerthFormDocs(this.appService.myApp)(getCode)
        .then((result) => {
          const resArr: any = result;
          const array = JSON.parse(resArr);

          this.documentArray = array.berthFormDocs;

          this.documentPreview = [];
          this.documentArray.forEach((element) => {
            this.documentPreview.push({
              id: element.id,
              idApi: element.file_descriptor.id,
              docType: element.doc_type,
              wasteCode: element.waste_code,
              docID: element.document_id,
              uploadBy: element.upload_by,
              dateTime: element.upload_date,
              select: false,
            });
          });
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
        if (this.countView <= 0) {
          console.log(this.berthForm.eaDate);
          if (Date.parse(this.berthForm.eaDate)) {
            this.berthForm.eaDate = formatDate(
              new Date(this.berthForm.eaDate),
              'dd/MM/yyyy',
              'en_US'
            );
          }

          if (Date.parse(this.berthForm.edDate)) {
            this.berthForm.edDate = formatDate(
              new Date(this.berthForm.edDate),
              'dd/MM/yyyy',
              'en_US'
            );
          }
        }
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

  eaDateChange() {
    if (this.requestNo) {
      this.berthForm.eaDate = formatDate(
        new Date(this.berthForm.eaDate),
        'dd/MM/yyyy',
        'en_US'
      );
    }
    this.invalidEABackdated = false;
    this.validateBackdated('eaDate');
    this.validateBooking();
    this.filterTimeArr('eaDate');
  }

  edDateChange() {
    if (this.requestNo) {
      this.berthForm.edDate = formatDate(
        new Date(this.berthForm.edDate),
        'dd/MM/yyyy',
        'en_US'
      );
    }
    this.invalidEDBackdated = false;
    this.validateBackdated('edDate');
    this.validateBooking();
    this.filterTimeArr('edDate');
  }

  validateBooking() {
    this.invalidEaEdDate = false;
    this.invalidEaEdTime = false;
    let departure;
    if (this.berthForm.eaDate && this.berthForm.edDate) {
      if (this.requestNo) {
        var dateParts = this.berthForm.edDate.split('/');
        departure = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      } else {
        departure = new Date(this.berthForm.edDate);
      }

      let formatEDDate = formatDate(departure, 'yyyy/MM/dd', 'en_US');
      let edDate =
        departure.getFullYear() +
        '/' +
        (departure.getMonth() + 1) +
        '/' +
        ('0' + departure.getDate()).slice(-2);

      // Get arrival date
      let arrival;
      if (this.requestNo) {
        var dateParts = this.berthForm.eaDate.split('/');
        arrival = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      } else {
        arrival = new Date(this.berthForm.eaDate);
      }

      let formatEADate = formatDate(arrival, 'yyyy/MM/dd', 'en_US');
      let eaDate =
        arrival.getFullYear() +
        '/' +
        (arrival.getMonth() + 1) +
        '/' +
        ('0' + arrival.getDate()).slice(-2);

      this.dailyDate = formatEDDate;
      this.currentDate = formatEADate;

      if (new Date(edDate) < new Date(eaDate)) {
        this.invalidEaEdDate = true;
        // console.log('less than today');
      } else if (edDate == eaDate) {
        // console.log(eaDate);
      } else {
        // console.log('more than today');
      }

      // If same date
      if (formatEDDate.valueOf() === formatEADate.valueOf()) {
        if (this.berthForm.etd && this.berthForm.eta) {
          if (this.berthForm.etd < this.berthForm.eta) {
            this.invalidEaEdTime = true;
          } else if (this.berthForm.etd == this.berthForm.eta) {
            this.invalidEaEdTime = true;
          }
        }
      }
    }
    this.focusOnInvalid();
  }

  validateBackdated(type: any) {
    let singleDate;
    if (this.requestNo) {
      var dateParts =
        type == 'edDate'
          ? this.berthForm.edDate.split('/')
          : this.berthForm.eaDate.split('/');
      singleDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    } else {
      singleDate =
        type == 'edDate'
          ? new Date(this.berthForm.edDate)
          : new Date(this.berthForm.eaDate);
    }

    let formatSingleDate = formatDate(singleDate, 'yyyy/MM/dd', 'en_US');
    let dateInput =
      singleDate.getFullYear() +
      '/' +
      (singleDate.getMonth() + 1) +
      '/' +
      ('0' + singleDate.getDate()).slice(-2);

    // Get current date
    let current = new Date();
    let formatCurrent = formatDate(current, 'yyyy/MM/dd', 'en_US');
    let todayDate =
      current.getFullYear() +
      '/' +
      (current.getMonth() + 1) +
      '/' +
      ('0' + current.getDate()).slice(-2);

    // Get current time
    let time = new Date();
    let currentHour = time.getHours();
    // console.warn(currentHour)
    this.dailyDate = formatSingleDate;
    this.currentDate = formatCurrent;

    console.log('dateInput: ', dateInput);
    console.log('todayDate: ', todayDate);
    console.log('result: ', new Date(dateInput) < new Date(todayDate));

    if (new Date(dateInput) < new Date(todayDate)) {
      type == 'edDate'
        ? (this.invalidEDBackdated = true)
        : (this.invalidEABackdated = true);
      // console.log('less than today');
    }

    this.focusOnInvalid();
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
  }

  cancelDocList() {
    this.documentPreview.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterDocList = 0;
  }

  onSubmit(berthOneForm: NgForm) {
    if (
      berthOneForm.valid &&
      !this.invalidEABackdated &&
      !this.invalidEDBackdated &&
      !this.invalidEaEdDate &&
      !this.invalidEaEdTime
    ) {
      this.checkValidation(); // to remove invalud UI
      this.isInitiatedData = this.requestNo ? true : false;
      let requestBehalf =
        this.berthForm.requestOnBehalf == '' || !this.berthForm.requestOnBehalf
          ? 'N/A'
          : this.berthForm.requestOnBehalf;
      console.log('terminal: ', this.terminal);
      let terminal;
      if (this.requestNo) {
        if (this.terminal == 'KSB' && this.receivedTerminal != 'KTSB') {
          terminal = this.receivedTerminal;
        } else {
          terminal = this.terminal;
        }
      } else {
        terminal = this.terminal;
      }
      let param = {
        form: {
          // formID: this.berthFormID,
          // request_number: this.requestNumber,
          company: this.companyName,
          terminal: terminal,
          request_by: this.requestByName,
          vessel_name: this.berthForm.vesselName,
          request_behalf: requestBehalf,
          po_number: this.berthForm.PONum,
          est_arrival: '',
          next_location: this.berthForm.nextLocation,
          est_departure: '',
          last_location: this.berthForm.lastLocation,
          remarks: this.berthForm.remarks,
          assign_agent: this.berthForm.agent,
          fuelwater_agent:
            this.berthForm.agent_fuelwater &&
            this.berthForm.agent_fuelwater != ''
              ? this.berthForm.agent_fuelwater
              : '',
          status: 'INITIATED',
        },
      };
      this.clickedSubmit = true;
      if (this.isInitiatedData) {
        // console.log(this.berthForm.eaDate);

        if (this.docToDelete.length >= 1) {
          let array = [];

          this.docToDelete.forEach((element) => {
            array.push({
              fileID: element.id,
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
              // console.log('delete doc', result);
            });
        }

        param.form['formID'] = this.berthFormID;
        // param.form['request_number'] = this.requestNumber;
        // param.form['terminal'] = this.terminal;

        param.form.est_arrival =
          this.berthForm.eaDate.split('/').reverse().join('-') +
          ' ' +
          this.berthForm.eta;

        param.form.est_departure =
          this.berthForm.edDate.split('/').reverse().join('-') +
          ' ' +
          this.berthForm.etd;

        // if (this.documentPreview.length == 0) {
        if (this.filesToUpload.length <= 0) {
          this.submitBerthForm(param, 'UpdateBerthRequestForm').then(() => {
            // console.log('submitStatus', this.submitStatus);

            if (this.submitStatus) {
              // console.log(this.skipWorkProgram);
              this.skipWorkProgram
                ? (this.currentStep = 2)
                : (this.currentStep = 1);
            }
          });
        } else {
          // this.disableSubmit = true;
          // console.log('submitStatus', this.submitStatus);
          this.isLoading = true;
          this.overlay = true;

          this.uploadForm = this.formBuilder.group({
            fileData: [''],
          });

          this.submitBerthForm(param, 'UpdateBerthRequestForm').then(() => {
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
                          formID: this.berthFormID,
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
                            // this.currentStep = 1
                            // console.log('success');
                            this.filesToUpload = [];
                            if (this.submitStatus) {
                              this.skipWorkProgram
                                ? this.changeStep(2)
                                : this.changeStep(1);
                            }
                            this.countFiles = 0;
                          } else {
                            // console.log('failed upload file');
                          }
                        });
                    },
                    (error) => {
                      // console.log(error);
                      this.isLoading = false;
                      this.overlay = false;
                      this.modalTimeout = true;
                    }
                  );
              }
            });
          });
          // this.filesToUpload = [];
        }
      } else {
        // console.log('in');

        param.form.est_arrival =
          this.datepipe.transform(this.berthForm.eaDate, 'yyyy-MM-dd') +
          ' ' +
          this.berthForm.eta;

        param.form.est_departure =
          this.datepipe.transform(this.berthForm.edDate, 'yyyy-MM-dd') +
          ' ' +
          this.berthForm.etd;

        if (this.documentPreview.length == 0) {
          this.submitBerthForm(param, 'PostBerthRequestForm').then(() => {
            // console.log('submitStatus', this.submitStatus);
            if (this.submitStatus) {
              // console.log(this.skipWorkProgram);
              this.skipWorkProgram
                ? (this.currentStep = 2)
                : (this.currentStep = 1);
            }
          });
        } else {
          // this.disableSubmit = true;
          // console.log('submitStatus', this.submitStatus);
          this.isLoading = true;
          this.overlay = true;

          this.uploadForm = this.formBuilder.group({
            fileData: [''],
          });

          this.submitBerthForm(param, 'PostBerthRequestForm').then(() => {
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
                .subscribe(
                  (data) => {
                    const filesUploaded = {
                      form: {
                        formID: this.berthFormID,
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
                        } else {
                          // console.log('error upload file');
                        }
                        if (this.countFiles === element.upload.length) {
                          this.isLoading = false;
                          this.overlay = false;
                          // this.currentStep = 1
                          // console.log('success');
                          this.countFiles = 0;
                          this.filesToUpload = [];
                          if (this.submitStatus) {
                            // console.log(this.skipWorkProgram);
                            this.skipWorkProgram
                              ? (this.currentStep = 2)
                              : (this.currentStep = 1);
                          }
                        }
                      });
                  },
                  (error) => {
                    // console.log(error);
                    this.isLoading = false;
                    this.overlay = false;
                    this.modalTimeout = true;
                  }
                );
            });
          });
        }
        // this.filesToUpload = [];
      }
      // console.log(param);
    } else {
      this.checkValidation();
      this.focusOnInvalid();
    }
  }

  checkValidation() {
    if (!this.berthForm.vesselName || this.berthForm.vesselName == '') {
      this.invalidVessel = true;
    } else if (this.berthForm.vesselName) {
      this.invalidVessel = false;
    }

    // if (!this.berthForm.requestOnBehalf || this.berthForm.requestOnBehalf == '') {
    //   this.invalidOnBehalf = true;
    // } else if (this.berthForm.requestOnBehalf) {
    //   this.invalidOnBehalf = false;
    // }

    if (!this.berthForm.PONum || this.berthForm.PONum.match(/^ *$/) !== null) {
      this.invalidPONum = true;
    } else if (this.berthForm.PONum) {
      this.invalidPONum = false;
    }

    if (!this.berthForm.eaDate) {
      this.invalidEADate = true;
    } else if (this.berthForm.eaDate) {
      this.invalidEADate = false;
    }

    if (!this.berthForm.eta) {
      this.invalidETA = true;
    } else if (this.berthForm.eta) {
      this.invalidETA = false;
    }

    if (!this.berthForm.edDate) {
      this.invalidEDDate = true;
    } else if (this.berthForm.edDate) {
      this.invalidEDDate = false;
    }

    if (!this.berthForm.etd) {
      this.invalidETD = true;
    } else if (this.berthForm.etd) {
      this.invalidETD = false;
    }

    if (!this.berthForm.nextLocation) {
      this.invalidNextLocation = true;
    } else if (this.berthForm.nextLocation) {
      this.invalidNextLocation = false;
    }

    if (!this.berthForm.lastLocation) {
      this.invalidLastLocation = true;
    } else if (this.berthForm.lastLocation) {
      this.invalidLastLocation = false;
    }

    if (!this.berthForm.agent || this.berthForm.agent == '') {
      this.invalidAgent = true;
    } else if (this.berthForm.agent) {
      this.invalidAgent = false;
    }
  }

  focusOnInvalid() {
    if (this.invalidVessel) {
      this.vessel.nativeElement.focus();
    } else if (this.invalidOnBehalf) {
      this.requestOnBehalf.nativeElement.focus();
    } else if (this.invalidPONum) {
      this.PONum.nativeElement.focus();
    } else if (this.invalidEADate || this.invalidEABackdated) {
      this.eaDate.nativeElement.focus();
    } else if (this.invalidETA) {
      this.eta.nativeElement.focus();
    } else if (
      this.invalidEDDate ||
      this.invalidEDBackdated ||
      this.invalidEaEdDate
    ) {
      this.edDate.nativeElement.focus();
    } else if (this.invalidETD || this.invalidEaEdTime) {
      this.etd.nativeElement.focus();
    } else if (this.invalidNextLocation) {
      this.nextLocation.nativeElement.focus();
    } else if (this.invalidLastLocation) {
      this.lastLocation.nativeElement.focus();
    } else if (this.invalidAgent) {
      this.agent.nativeElement.focus();
    }
  }

  filterTimeArr(type) {
    let edDate: any, eaDate: any;
    let current = formatDate(new Date(), 'dd/MM/yyyy', 'en_US');

    if (this.berthForm.edDate) {
      if (this.requestNo) {
        edDate = this.berthForm.edDate;
      } else {
        edDate = formatDate(this.berthForm.edDate, 'dd/MM/yyyy', 'en_US');
      }
    }
    if (this.berthForm.eaDate) {
      if (this.requestNo) {
        eaDate = this.berthForm.eaDate;
      } else {
        eaDate = formatDate(this.berthForm.eaDate, 'dd/MM/yyyy', 'en_US');
      }
    }

    if (type == 'eaDate') {
      if (eaDate == current && !this.requestNo) {
        // console.log('in', eaDate, current);
        let latestTime = this.datepipe.transform(new Date(), 'HH:mm');
        this.timeEta = this.timeEta.filter((time) => time.content > latestTime);
      } else {
        this.timeEta = this.timeList;
      }
    }

    if (type == 'edDate') {
      if (edDate == current && !this.requestNo) {
        // console.log('in', eaDate, current);
        let latestTime = this.datepipe.transform(new Date(), 'HH:mm');
        this.timeEtd = this.timeEtd.filter((time) => time.content > latestTime);
      } else {
        this.timeEtd = this.timeList;
      }
    }
  }

  async submitBerthForm(param, type) {
    let result = await restServices.pbksb_MarineService[type](
      this.appService.myApp
    )(param)
      .then((result) => {
        const resArr: any = result;
        let info = JSON.parse(resArr);

        if (info.status != 'BAD_REQUEST') {
          this.submitStatus = true;
          // console.log('in');
        } else {
          this.createNotification('submit');
          this.submitStatus = false;
          // console.log('in');
        }

        this.berthFormID = info.berthForm.id;
        this.requestNo = info.berthForm.request_number;

        this.berthRequestFormService.setFormID(this.berthFormID);
        this.berthRequestFormService.setRequestNo(this.requestNo);
        this.berthRequestFormService.setFormValue(info);
      })
      .catch((err) => {
        this.submitStatus = false;
        // console.log(err);
        // console.log('in');
        this.berthRequestFormService.setFormID(this.berthFormID);
        this.berthRequestFormService.setRequestNo(this.requestNo);
        // this.createNotification('submit')
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
}
