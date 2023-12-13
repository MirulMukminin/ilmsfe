import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthForm, DocumentList } from '../interfaces/Marine/marine_interface';
import { GeneralWorks, UnderDeck } from '../interfaces/MHE/mhe_interface';
import { BerthRequestFormService } from '../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-marine-service-request-form',
  templateUrl: './marine-service-request-form.component.html',
  styleUrls: ['./marine-service-request-form.component.scss'],
})
export class MarineServiceRequestFormComponent implements OnInit {
  @ViewChild('inputFile') fileInput: ElementRef;
  @ViewChild('types') types: ElementRef;
  @ViewChild('waste') waste: ElementRef;
  @ViewChild('docsID') docsID: ElementRef;

  @ViewChild('PONum') PONum: ElementRef;
  @ViewChild('eaDate') eaDate: ElementRef;
  @ViewChild('eta') eta: ElementRef;
  @ViewChild('edDate') edDate: ElementRef;
  @ViewChild('etd') etd: ElementRef;
  @ViewChild('agent') agent: ElementRef;
  @ViewChild('vessel') vessel;

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

  serviceForm: BerthForm = {};
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
  serviceFormID = '';
  requestNo: any;
  est_arrival = '';
  est_departure = '';

  invalidVessel = false;
  invalidOnBehalf = false;
  invalidPONum = false;
  // invalidEADate = false;
  invalidEABackdated = false;
  invalidETA = false;
  // invalidEDDate = false;
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
  invalidTonnes: any = [];

  uploadForm: FormGroup;
  // uploadList: FormGroup;
  public displayFile;

  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'xl';

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

  listOfGeneralWorks = [] as GeneralWorks[];
  // for invalid UI
  invalidRemarks: any = [];
  generalWorksInvalid = false;

  listOfUnderDeck = [] as UnderDeck[];
  underDeckInvalid = false;
  underdeckDateTime = '';

  // DropDown Item
  items = [
    // 'MOORING',
    // 'UNMOORING',
    'DISCHARGE',
    'LOADING',
    'INSPECTION',
    'MAINTENANCE',
    'STANDBY',
    'TOUCH AND GO',
    // 'CREW CHANGE',
    'FIREFIGHTER',
    'PNEUMATIC RUBBER FENDER',
    'GANGWAY 6M',
    'GANGWAY 10M',
    'GANGWAY 15M',
    // 'MOB DEMOB',
    // 'LEVY YOKOHAMA FENDERS',
  ];

  itemsUnderdeck: any[] = [
    {
      content: 'Oil Field Equipment',
    },
    {
      content: 'Container',
    },
    {
      content: 'Casing / Tubing',
    },
    {
      content: 'Cement',
    },
    {
      content: 'Bentonite',
    },
    {
      content: 'Barite',
    },
    {
      content: 'OBM',
    },
    {
      content: 'SBM',
    },
    {
      content: 'Brine',
    },
    {
      content: 'Base Oil',
    },
    {
      content: 'Ship to Ship Water',
    },
    {
      content: 'Ship to Ship Fuel',
    },
    {
      content: 'Others Bulk',
    },
  ];

  private currentUrl: string = '';

  invalidEDDate: boolean = false;
  invalidEADate: boolean = false;

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

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.populateTable();
    this.initiateInvalidTonnes();
    this.userInfo();
    this.getTimeDropdown();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        this.isLoading = true;
        this.overlay = true;
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.companyName = initialData.Company;
        this.requestByName = initialData.Fullname;
        this.token = initialData.Token.access_token;
        this.customerCode = initialData.CustomerCode;
        this.getRestServiceAPI(initialData);
      })
      .catch((err) => {
        this.isLoading = false;
        this.overlay = false;
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
    this.isLoading = true;
    this.overlay = true;
    try {
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
            a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase()
              ? 1
              : -1
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
            a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase()
              ? 1
              : -1
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
            a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase()
              ? 1
              : -1
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
            a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase()
              ? 1
              : -1
          );
          this.assignAgentList2 = this.assignAgentArr2;
        });

      // this.sessionList();

      //----------------------------- API if edit ----------------------------------//

      if (this._Activatedroute.snapshot.paramMap.get('RequestNo')) {
        this.requestNo =
          this._Activatedroute.snapshot.paramMap.get('RequestNo');
      }

      // this.RequestNo = this._Activatedroute.snapshot.paramMap.get('requestNum');

      if (this.requestNo) {
        const getCode = { wharfageID: this.requestNo };
        // this.isInitiatedData = true;

        // get request form list
        restServices.pbksb_MarineService
          .GetSRDetailsByWharfageID(this.appService.myApp)(getCode)
          .then((result) => {
            const resArr: any = result;
            const array = JSON.parse(resArr);

            this.serviceFormID = array.wharfage.id;
            this.terminal = array.wharfage.terminal;
            this.serviceForm.vesselName = array.wharfage?.vessel?.name;
            this.serviceForm.requestOnBehalf =
              array.wharfage.request_on_behalf.name.toLowerCase() == 'n/a'
                ? ''
                : array.wharfage.request_on_behalf.name;
            this.serviceForm.requestBy = array.wharfage.request_by;
            this.serviceForm.eaDate = formatDate(
              array.wharfage.arrival_datetime,
              'dd/MM/yyyy',
              'en_US'
            );
            this.serviceForm.eta = formatDate(
              array.wharfage.arrival_datetime,
              'HH:mm',
              'en_US'
            );
            this.serviceForm.edDate = formatDate(
              array.wharfage.departure_datetime,
              'dd/MM/yyyy',
              'en_US'
            );
            this.serviceForm.etd = formatDate(
              array.wharfage.departure_datetime,
              'HH:mm',
              'en_US'
            );
            this.serviceForm.agent = array.wharfage?.agent?.name;
            this.serviceForm.PONum = array.wharfage.po_number;

            this.serviceForm.remarks = array?.wharfage?.remarks ?? '-';
            // this.formID = array.serviceForm.id;
            this.requestNumber = array.wharfage.request_number;
            this.status = array.wharfage.status;

            const generalworkarray = array.general_works;
            const underdeckarray = array.underdeck;

            this.listOfGeneralWorks = [];
            this.listOfUnderDeck = [];

            for (let i = 0; i < generalworkarray.length; i++) {
              this.listOfGeneralWorks.push({
                id: generalworkarray[i].id,
                Item: generalworkarray[i].work_program,
                Remarks: generalworkarray[i].remarks,
                Selected: generalworkarray[i].request,
              });
            }

            for (let i = 0; i < underdeckarray.length; i++) {
              this.listOfUnderDeck.push({
                id: underdeckarray[i].id,
                // Item : underdeckarray[i].scope_work.toLowerCase().replace(/_/g, ' ').replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase()),
                Item: underdeckarray[i].scope_work,
                requestQuantityIn: underdeckarray[i].requestedQuantityIn,
                requestQuantityOut: underdeckarray[i].requestedQuantityOut,
                Selected: underdeckarray[i].request,
              });
            }
          });

        // document list
        restServices.pbksb_MarineService
          .GetWharfageDocs(this.appService.myApp)(getCode)
          .then((result) => {
            const resArr: any = result;
            const array = JSON.parse(resArr);

            this.documentArray = array.wharfageDocs;

            if (array.wharfageDocs.length > 0) {
              this.documentPreview = [];
              this.documentArray.forEach((element) => {
                this.documentPreview.push({
                  id: element.id,
                  idApi: element.file_descriptor.id,
                  docType: element.doc_type,
                  // wasteCode: element.waste_code,
                  docID: element.document_id,
                  uploadBy: element.upload_by,
                  dateTime: element.upload_date,
                  select: false,
                });
              });
            }
          });
      }
    } catch {
      this.isLoading = false;
      this.overlay = false;
    } finally {
      this.isLoading = false;
      this.overlay = false;
    }
  }

  sessionList() {
    if (JSON.parse(sessionStorage.getItem('form'))) {
      var array = JSON.parse(sessionStorage.getItem('form'));
      var serviceArray = JSON.parse(sessionStorage.getItem('serviceForms'));

      this.serviceForm.requestOnBehalf = array.form.request_behalf;
      this.serviceForm.PONum = array.form.po_number;
      this.serviceForm.eaDate = serviceArray.eaDate[0];
      this.serviceForm.eta = serviceArray.eta;
      this.serviceForm.edDate = serviceArray.edDate[0];
      this.serviceForm.etd = serviceArray.etd;
      this.serviceForm.remarks = array.form.remarks;
      this.serviceForm.agent = serviceArray.agent;
    }
  }

  onSelectTerminal(event: any) {
    this.terminal = event.value;
  }

  openModalAddItem() {
    this.stepOneOpenModal = true;
    this.wasteCode = '';
    this.documentID = '';

    // this.waste.nativeElement.value = ' ';
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
        // wasteCode: this.wasteCode ? this.wasteCode : '-',
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
      this.serviceForm.eaDate = formatDate(
        new Date(this.serviceForm.eaDate),
        'dd/MM/yyyy',
        'en_US'
      );
    }
    this.invalidEABackdated = false;
    // this.validateBackdated('eaDate');
    this.validateBooking();
    this.filterTimeArr('eaDate');
  }

  edDateChange() {
    if (this.requestNo) {
      this.serviceForm.edDate = formatDate(
        new Date(this.serviceForm.edDate),
        'dd/MM/yyyy',
        'en_US'
      );
    }
    this.invalidEDBackdated = false;
    // this.validateBackdated('edDate');
    this.validateBooking();
    this.filterTimeArr('edDate');
  }

  validateBooking() {
    this.invalidEaEdDate = false;
    this.invalidEaEdTime = false;
    let departure;
    if (this.serviceForm.eaDate && this.serviceForm.edDate) {
      if (this.requestNo) {
        var dateParts = this.serviceForm.edDate.split('/');
        departure = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      } else {
        departure = new Date(this.serviceForm.edDate);
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
        var dateParts = this.serviceForm.eaDate.split('/');
        arrival = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      } else {
        arrival = new Date(this.serviceForm.eaDate);
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
        if (this.serviceForm.etd && this.serviceForm.eta) {
          if (this.serviceForm.etd < this.serviceForm.eta) {
            this.invalidEaEdTime = true;
          } else if (this.serviceForm.etd == this.serviceForm.eta) {
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
          ? this.serviceForm.edDate.split('/')
          : this.serviceForm.eaDate.split('/');
      singleDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    } else {
      singleDate =
        type == 'edDate'
          ? new Date(this.serviceForm.edDate)
          : new Date(this.serviceForm.eaDate);
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

    if (dateInput < todayDate) {
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

  test(serviceForms: NgForm) {
    let formData = serviceForms.form.value;
    sessionStorage.setItem('serviceForms', JSON.stringify(formData));

    let validate = this.checkValidation();
    this.focusOnInvalid();

    let validateUnderdeck = true;
    let validateGeneralWork = true;

    let invalidTonnesFlag = 0;

    for (let i = 0; i < this.listOfUnderDeck.length; i++) {
      if (this.listOfUnderDeck[i].Selected == true) {
        validateUnderdeck = false;
        if (
          this.listOfUnderDeck[i].requestQuantityIn ||
          this.listOfUnderDeck[i].requestQuantityOut
        ) {
        } else {
          console.log('test in ', this.listOfUnderDeck[i].requestQuantityIn);
          console.log('test out', this.listOfUnderDeck[i].requestQuantityOut);
          invalidTonnesFlag = 1;
          this.validateTonnes(i);
        }
      }
    }

    // if (invalidTonnesFlag == 1) {
    //   validateUnderdeck = true;
    // }

    console.log('invalidTonnes: ', this.invalidTonnes);

    for (let i = 0; i < this.listOfGeneralWorks.length; i++) {
      if (this.listOfGeneralWorks[i].Selected == true) {
        validateGeneralWork = false;
      }
    }

    if (validateUnderdeck == true && validateGeneralWork == true) {
      this.generalWorksInvalid = true;
      this.underDeckInvalid = true;
      console.log(validateUnderdeck == true || validateGeneralWork == true);
    } else if (validateUnderdeck == false || validateGeneralWork == false) {
      console.log(validateUnderdeck == false && validateGeneralWork == false);
      this.generalWorksInvalid = false;
      this.underDeckInvalid = false;
      if (validate && invalidTonnesFlag == 0) {
        this.isInitiatedData = this.requestNo ? true : false;
        let requestBehalf =
          formData.requestOnBehalf == '' || !formData.requestOnBehalf
            ? 'N/A'
            : formData.requestOnBehalf;

        let generalWorksList = [];
        let generalWorksListSubmit = [];
        let underDeckList = [];
        let underDeckListSubmit = [];

        let param = {
          form: {
            formID: '',
            // request_number: this.requestNumber,
            company: this.companyName,
            terminal: this.terminal,
            vesselName: formData.vesselName,
            request_by: this.requestByName,
            request_behalf: requestBehalf,
            po_number: formData.PONum,
            est_arrival: '',
            est_departure: '',
            remarks: formData.remarks,
            assign_agent: formData.agent,
            status: 'INITIATED',

            generalWorksList: generalWorksListSubmit,
            underDeckList: underDeckListSubmit,
          },
        };

        this.clickedSubmit = true;
        if (this.isInitiatedData) {
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
              .DeleteWharfageFormDoc(this.appService.myApp)(param)
              .then((result) => {
                // console.log('delete doc', result);
              });
          }

          param.form['formID'] = this.serviceFormID;
          // param.form['request_number'] = this.requestNumber;
          // param.form['terminal'] = this.terminal;

          param.form.est_arrival =
            formData.eaDate.split('/').reverse().join('-') + ' ' + formData.eta;

          param.form.est_departure =
            formData.edDate.split('/').reverse().join('-') + ' ' + formData.etd;

          this.underdeckDateTime = param.form.est_arrival;

          let generalwork = [
            // 'MOORING',
            // 'UNMOORING',
            'DISCHARGE',
            'LOADING',
            'INSPECTION',
            'MAINTENANCE',
            'STANDBY',
            'TOUCH_AND_GO',
            // 'CREW_CHANGE',
            'FIREFIGHTER',
            'PNEUMATIC_RUBBER_FENDER',
            'GANGWAY_6M',
            'GANGWAY_10M',
            'GANGWAY_15M',
            // 'MOB_DEMOB',
            // 'LEVY_YOKOHAMA_FENDERS',
          ];

          generalwork.forEach((value, index) => {
            let i = this.listOfGeneralWorks.findIndex(
              (element) => element.Item == value
            );
            generalWorksList.push({
              id:
                (typeof this.listOfGeneralWorks[i].id == 'number') == true
                  ? ''
                  : this.listOfGeneralWorks[i].id,
              item: value,
              remarks: this.listOfGeneralWorks[i].Remarks,
              indicator: this.listOfGeneralWorks[i].Selected,
            });
          });

          for (let i = 0; i < generalWorksList.length; i++) {
            // if(generalWorksList[i].indicator == true){
            generalWorksListSubmit.push({
              id: generalWorksList[i].id,
              item: generalWorksList[i].item,
              remarks: generalWorksList[i].remarks,
              indicator: generalWorksList[i].indicator,
            });
            // }
          }

          let underdeck = [
            'oil_field_equipment',
            'container',
            'casing_tubing',
            'cement',
            'bentonite',
            'barite',
            'obm',
            'sbm',
            'brine',
            'base_oil',
            'ship_water',
            'ship_fuel',
            'others_bulk',
          ];

          underdeck.forEach((value, index) => {
            let i = this.listOfUnderDeck.findIndex(
              (e) => e.Item == value.toUpperCase()
            );
            underDeckList.push({
              id:
                (typeof this.listOfUnderDeck[i].id == 'number') == true
                  ? ''
                  : this.listOfUnderDeck[i].id,
              item: value.toUpperCase(),
              requestQuantityIn: this.listOfUnderDeck[i].requestQuantityIn,
              requestQuantityOut: this.listOfUnderDeck[i].requestQuantityOut,
              indicator: this.listOfUnderDeck[i].Selected,
            });
          });

          for (let i = 0; i < underDeckList.length; i++) {
            // if(underDeckList[i].indicator == true){
            underDeckListSubmit.push({
              id: underDeckList[i].id,
              item: underDeckList[i].item,
              requestQuantityIn:
                underDeckList[i].requestQuantityIn !== ''
                  ? underDeckList[i].requestQuantityIn
                  : 0,
              requestQuantityOut:
                underDeckList[i].requestQuantityOut !== ''
                  ? underDeckList[i].requestQuantityOut
                  : 0,
              indicator: underDeckList[i].indicator,
            });
            // }
          }

          console.log(param);
          sessionStorage.setItem('form', JSON.stringify(param));

          // if (this.documentPreview.length == 0) {
          if (this.filesToUpload.length <= 0) {
            this.submitserviceForm(param, 'PostServiceRequestForm').then(() => {
              // console.log('submitStatus', this.submitStatus);
              this.router.navigate([
                '/operation-system/marine-service-request-form-preview',
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

            this.submitserviceForm(param, 'PostServiceRequestForm').then(() => {
              this.filesToUpload.forEach((element, index) => {
                //this is to revoke / clear memory of objectURL
                window.URL.revokeObjectURL(element.docPath);

                if (element.upload) {
                  const file = element.upload[0].file;
                  this.uploadForm.get('fileData').setValue(file);

                  let formData = new FormData();
                  formData.append(
                    'file',
                    this.uploadForm.get('fileData').value
                  );

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
                            formID: this.serviceFormID,
                            document_type: element.docType,
                            document_id: element.docID,
                            fileID: data.id,
                            upload_by: element.uploadBy,
                          },
                        };
                        // console.log(filesUploaded);
                        restServices.pbksb_MarineService
                          .UploadWharfageFormDoc(this.appService.myApp)(
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
                              sessionStorage.setItem(
                                'documentUploadResult',
                                JSON.stringify(result)
                              );
                              this.router.navigate([
                                '/operation-system/marine-service-request-form-preview',
                              ]);

                              // this.currentStep = 1
                              // console.log('success');
                              this.filesToUpload = [];
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
          // }
        } else {
          // console.log('in');

          param.form.est_arrival =
            this.datepipe.transform(formData.eaDate, 'yyyy-MM-dd') +
            ' ' +
            formData.eta;

          param.form.est_departure =
            this.datepipe.transform(formData.edDate, 'yyyy-MM-dd') +
            ' ' +
            formData.etd;

          this.underdeckDateTime = param.form.est_arrival;

          let generalwork = [
            // 'MOORING',
            // 'UNMOORING',
            'DISCHARGE',
            'LOADING',
            'INSPECTION',
            'MAINTENANCE',
            'STANDBY',
            'TOUCH_AND_GO',
            // 'CREW_CHANGE',
            'FIREFIGHTER',
            'PNEUMATIC_RUBBER_FENDER',
            'GANGWAY_6M',
            'GANGWAY_10M',
            'GANGWAY_15M',
            // 'MOB_DEMOB',
            // 'LEVY_YOKOHAMA_FENDERS',
          ];

          generalwork.forEach((value, index) => {
            generalWorksList.push({
              id: '',
              item: value,
              remarks: this.listOfGeneralWorks[index].Remarks,
              indicator: this.listOfGeneralWorks[index].Selected,
            });
          });

          for (let i = 0; i < generalWorksList.length; i++) {
            // if(generalWorksList[i].indicator == true){
            generalWorksListSubmit.push({
              id: '',
              item: generalWorksList[i].item,
              remarks: generalWorksList[i].remarks,
              indicator: generalWorksList[i].indicator,
            });
            // }
          }

          let underdeck = [
            'oil_field_equipment',
            'container',
            'casing_tubing',
            'cement',
            'bentonite',
            'barite',
            'obm',
            'sbm',
            'brine',
            'base_oil',
            'ship_water',
            'ship_fuel',
            'others_bulk',
          ];

          underdeck.forEach((value, index) => {
            underDeckList.push({
              id: '',
              item: value.toUpperCase(),
              requestQuantityIn: this.listOfUnderDeck[index].requestQuantityIn,
              requestQuantityOut:
                this.listOfUnderDeck[index].requestQuantityOut,
              indicator: this.listOfUnderDeck[index].Selected,
            });
          });

          for (let i = 0; i < underDeckList.length; i++) {
            // if(underDeckList[i].indicator == true){
            underDeckListSubmit.push({
              id: '',
              item: underDeckList[i].item,
              requestQuantityIn:
                underDeckList[i].requestQuantityIn !== ''
                  ? underDeckList[i].requestQuantityIn
                  : 0,
              requestQuantityOut:
                underDeckList[i].requestQuantityOut !== ''
                  ? underDeckList[i].requestQuantityOut
                  : 0,
              indicator: underDeckList[i].indicator,
            });
            // }
          }

          console.log(param);
          console.log(this.documentPreview);
          sessionStorage.setItem('form', JSON.stringify(param));

          if (this.documentPreview.length == 0) {
            this.submitserviceForm(param, 'PostServiceRequestForm').then(() => {
              // console.log('submitStatus', this.submitStatus);
              this.router.navigate([
                '/operation-system/marine-service-request-form-preview',
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

            this.submitserviceForm(param, 'PostServiceRequestForm').then(() => {
              console.log(this.serviceFormID);

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
                          formID: this.serviceFormID,
                          document_type: element.docType,
                          document_id: element.docID,
                          fileID: data.id,
                          upload_by: element.uploadBy,
                        },
                      };

                      // console.log(filesUploaded);

                      restServices.pbksb_MarineService
                        .UploadWharfageFormDoc(this.appService.myApp)(
                          filesUploaded
                        )
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
                            this.router.navigate([
                              '/operation-system/marine-service-request-form-preview',
                            ]);

                            this.countFiles = 0;
                            this.filesToUpload = [];
                          }
                        });
                    },
                    (error) => {
                      this.isLoading = false;
                      this.overlay = false;
                      this.modalTimeout = true;
                    }
                  );
              });
            });
          }
          this.filesToUpload = [];
        }
      } else {
        this.focusOnInvalid();
      }
    }

    // console.log(param);
    // } else {
    //   // this.checkValidation();
    //   this.focusOnInvalid();
    // }
  }

  checkValidation() {
    let validate = true;

    if (
      !this.serviceForm.vesselName ||
      this.serviceForm.vesselName.length == 0
    ) {
      this.invalidVessel = true;
      validate = false;
    } else if (this.serviceForm.vesselName) {
      this.invalidVessel = false;
    }

    if (
      !this.serviceForm.PONum ||
      this.serviceForm.PONum.match(/^ *$/) !== null
    ) {
      this.invalidPONum = true;
      validate = false;
    } else if (this.serviceForm.PONum) {
      this.invalidPONum = false;
    }

    if (!this.serviceForm.eaDate) {
      this.invalidEADate = true;
      validate = false;
    } else if (this.serviceForm.eaDate) {
      this.invalidEADate = false;
    }

    if (!this.serviceForm.eta) {
      this.invalidETA = true;
      validate = false;
    } else if (this.serviceForm.eta) {
      this.invalidETA = false;
    }

    if (!this.serviceForm.edDate) {
      this.invalidEDDate = true;
      validate = false;
    } else if (this.serviceForm.edDate) {
      this.invalidEDDate = false;
    }

    if (!this.serviceForm.etd) {
      this.invalidETD = true;
      validate = false;
    } else if (this.serviceForm.etd) {
      this.invalidETD = false;
    }

    if (!this.serviceForm.agent || this.serviceForm.agent.length == 0) {
      this.invalidAgent = true;
      validate = false;
    } else if (this.serviceForm.agent) {
      this.invalidAgent = false;
    }

    return validate;
  }

  focusOnInvalid() {
    if (this.invalidVessel) {
      this.vessel.nativeElement.focus();
    } else if (this.invalidPONum) {
      this.PONum.nativeElement.focus();
    } else if (this.invalidEADate) {
      this.eaDate.nativeElement.focus();
    } else if (this.invalidEDBackdated || this.invalidEaEdDate) {
      this.edDate.nativeElement.focus();
    } else if (this.invalidETD || this.invalidEaEdTime) {
      this.etd.nativeElement.focus();
    } else if (this.invalidAgent) {
      this.agent.nativeElement.focus();
    }
  }

  filterTimeArr(type) {
    let edDate: any, eaDate: any;
    let current = formatDate(new Date(), 'dd/MM/yyyy', 'en_US');

    if (this.serviceForm.edDate) {
      if (this.requestNo) {
        edDate = this.serviceForm.edDate;
      } else {
        edDate = formatDate(this.serviceForm.edDate, 'dd/MM/yyyy', 'en_US');
      }
    }
    if (this.serviceForm.eaDate) {
      if (this.requestNo) {
        eaDate = this.serviceForm.eaDate;
      } else {
        eaDate = formatDate(this.serviceForm.eaDate, 'dd/MM/yyyy', 'en_US');
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

  async submitserviceForm(param, type) {
    this.berthRequestFormService.setFormValue(param);
    sessionStorage.setItem('form', JSON.stringify(param));

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
        console.log(info);

        this.serviceFormID = info.wharfageForm;
        this.requestNo = info.wharfageForm;
        console.log(this.serviceFormID);

        this.berthRequestFormService.setFormID(this.serviceFormID);
        this.berthRequestFormService.setRequestNo(this.requestNo);
        // this.berthRequestFormService.setFormValue(info);
      })
      .catch((err) => {
        this.submitStatus = false;
        // console.log(err);
        // console.log('in');
        this.berthRequestFormService.setFormID(this.serviceFormID);
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

  //general works
  populateTable() {
    this.items.forEach((value) => {
      this.listOfGeneralWorks.push({
        id: Math.floor(Math.random() * 100),
        Item: value,
        Selected: false,
      });
    });

    this.itemsUnderdeck.forEach((value) => {
      this.listOfUnderDeck.push({
        id: Math.floor(Math.random() * 100),
        Item: value.content,
        Selected: false,
      });
    });
    this.getTimeDropdown();
  }

  getRestQueryAPI(requestNo: any) {
    // var getCodeView: any = { requestNo: 'BRF551C91FE' };
    var getCodeView: any = { requestNo: requestNo };

    restServices.pbksb_MarineService
      .GetGeneralWorksFormDetails(this.appService.myApp)(getCodeView)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        if (request['generalWorks'].length > 0) {
          // this.updateStatus = true;
          request['generalWorks'].forEach((value, index) => {
            this.validateData(value);
          });
        }
        // this.onSubmit = this.listOfGeneralWorks.some(
        //   (data) => data.Selected == true
        // );
      });

    // console.log(this.listOfGeneralWorks);

    // get form id if form id from services is null
    this.formID = this.berthRequestFormService.getFormID();
    if (!this.formID || this.formID == '') {
      restServices.pbksb_MarineService
        .GetBerthRequestDetailsByRequestNo(this.appService.myApp)({
          requestNo: this.requestNo,
        })
        .then((result) => {
          const resArr: any = result;
          const array = JSON.parse(resArr);

          this.formID = array.serviceForm.id;
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }

  validateData(value: any) {
    let type = {
      0: 'discharge',
      1: 'loading',
      2: 'inspection',
      3: 'maintenance',
      4: 'standby',
      5: 'touch_and_go',
      // 6: 'mooring',
      // 7: 'unmooring',
      6: 'firefighter',
      7: 'pneumatic_rubber_fender',
      8: 'gangway_6m',
      9: 'gangway_10m',
      10: 'gangway_15m',
      // 13: 'levy',
    };

    if (value.item) {
      let index = this.getKeyByValue(type, value.item.toLowerCase());
      this.listOfGeneralWorks[index].Selected = value.indicator;
      this.listOfGeneralWorks[index].Remarks = value.remarks;

      if (value.id) {
        this.listOfGeneralWorks[index].id = value.id;
        // this.updateStatus = true;
      } else {
        this.listOfGeneralWorks[index].id = '';
      }
    }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  onSelected() {
    let isSelected = false;
    this.listOfGeneralWorks.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;
      } else {
        value.Remarks = '';
        // this.invalidRemarks[i] = false;
      }
    });
    if (isSelected) {
      this.generalWorksInvalid = false;
    }
  }

  onSelectedUnderdeck() {
    let isSelected = false;

    for (let i = 0; i < this.listOfUnderDeck.length; i++) {
      if (this.listOfUnderDeck[i].Selected == true) {
        isSelected = true;
        if (!this.listOfUnderDeck[i].Tonnes) {
          this.listOfUnderDeck[i].Tonnes = '';
        }
      } else {
        this.listOfUnderDeck[i].Tonnes = '';
        this.invalidTonnes[i] = false;
      }
    }

    if (isSelected) {
      this.underDeckInvalid = false;
    }
  }

  validateTable() {
    let isSelected = false;
    this.listOfGeneralWorks.forEach((value, i) => {
      if (value.Selected == true) {
        isSelected = true;

        // if (!value.Remarks) {
        //   this.invalidRemarks[i] = true;
        // } else {
        //   this.invalidRemarks[i] = false;
        // }
      }
    });
    if (isSelected) {
      this.generalWorksInvalid = false;
    } else if (this.test) {
      this.generalWorksInvalid = false;
    } else {
      this.generalWorksInvalid = true;
    }
  }

  convertDate(date: any) {
    // check if date is string or date type
    if (typeof date === 'string') {
      let dateParts: any = date.split('/');
      let newDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
      return formatDate(newDate, 'yyyy-MM-dd', 'en_US');
    } else {
      return formatDate(date, 'yyyy-MM-dd', 'en_US');
    }
  }

  validateTonnes(postIndex) {
    this.listOfUnderDeck.forEach((value, i) => {
      if (i == postIndex) {
        if (
          (!value.requestQuantityIn || +value.requestQuantityIn <= 0) &&
          (!value.requestQuantityOut || +value.requestQuantityOut <= 0)
        ) {
          this.invalidTonnes[i] = true;
        } else {
          this.invalidTonnes[i] = false;
        }
      }
    });
  }

  initiateInvalidTonnes() {
    for (var i = 0; i < this.listOfUnderDeck.length; i++)
      this.invalidTonnes.push(false);
  }
}
