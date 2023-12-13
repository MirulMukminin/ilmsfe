import { formatDate, Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NotificationService,
  TableHeaderItem,
  TableModel,
} from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-marine-berth-occupancy-docket-details',
  templateUrl: './marine-berth-occupancy-docket-details.component.html',
  styleUrls: ['./marine-berth-occupancy-docket-details.component.scss'],
})
export class MarineBerthOccupancyDocketDetailsComponent implements OnInit {
  paramsBodNo: string = '';

  @ViewChild('wasteCode') wasteCode: ElementRef;
  @ViewChild('docsId') docsId: ElementRef;

  @Input() vesselArrivalModal = new TableModel();
  @Input() berthingModal = new TableModel();
  @Input() workProgramModal = new TableModel();
  @Input() scopeWorkModal = new TableModel();
  @Input() heavyPackageModal = new TableModel();
  @Input() permitModal = new TableModel();
  @Input() documentModal = new TableModel();
  @Input() additionalServicesModal = new TableModel();
  @Input() fuelWaterModal = new TableModel();

  @Input() accept = ['.jpg', '.png', '.pdf'];
  @Input() multiple = false;
  @Input() files = new Set();
  @Input() skeleton = false;
  @Input() sizeUploder = 'normal';

  //var declarations
  searchValue = '';
  company = '';
  bod_number = '';
  request_date = '';
  vessel = '';
  last_location = '';
  next_location = '';
  grt = '';
  loa = '';
  request_number = '';
  agent = '';
  status = '';
  cancelDateTime = '';
  remarks = '';
  admin_remarks = '';
  log_number = '';
  requestByName: any;
  companyName = '';
  dataset = [];
  bod_id = '';

  newWorkProgramList: any;
  newDocumentList: any;
  totalHeavyPackages: number = 0;

  docType: any = [];
  uploadForm: FormGroup;

  stepOneOpenModal = false;
  triggerOneOpenModal = false;

  uploadEvent: any;
  uploadFile = [];
  // docTypeList = [];
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
  timeList = [];
  selectDoctype: String;
  documentID: any;
  waste: any;
  formId: any;
  endorsed_date: any;
  endorsed_by: any;

  doctypeRequest: any;
  isLoading = false;
  overlay = false;
  successUpload: any;
  countFiles = 0;

  uploadDocuments = [];

  invalidDocType = false;
  invalidWasteCode = false;
  invalidDocId = false;
  invalidFileSubmit = false;
  invalidSubmit = false;

  vesselData = {
    alongside: {
      date: '',
      time: '',
      day: '',
    },
    departure: {
      date: '',
      time: '',
      day: '',
    },
  };
  vesselInfo = {};
  berthingData = [];
  workProgram = [];
  scopeOfWork = [];
  additionalServices = [];
  fuelWaterDetails = [];
  heavyPackages = [];
  permitList = [];
  documents = [];
  scopeOfWorkTitle = {};
  openModal = false;
  openRemove = false;
  counterDocList = 0;
  modalTimeout: boolean;
  date = new Date();
  workProgramList: any[] = [];
  openModalAmmend = false;
  amendNotes = '';

  constructor(
    private route: ActivatedRoute,
    protected appService: AppService,
    private router: Router,
    private _location: Location,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    protected notificationService: NotificationService
  ) {}

  ipUrl = this.appService.apiIP;
  token: any;

  ngOnInit(): void {
    this.paramsBodNo = this.route.snapshot.params['bodNo'];

    this.getTimeDropdown();
    this.userInfo();
    this.createTableHeader();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.requestByName = initialData.Fullname;
        this.companyName = initialData.Company;

        this.getRestQueryAPI(initialData.CustomerCode);
        this.token = initialData.Token.access_token;
        // console.log(initialData);
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
    // this.BerthOccupancyDocketList = this.BerthOccupancyDocket;

    var getCodeView: any = { bod_number: this.paramsBodNo };
    //fire api and get response data

    restServices.pbksb_MarineService
      .GetBODDetailsByBODNo(this.appService.myApp)(getCodeView)
      .then((result) => {
        // console.log(result);
        let requestList: any = result;
        let request = JSON.parse(requestList);

        this.company = request[0].company.name;

        // if (this.company == this.companyName) {
        request.forEach((value, index) => {
          this.bodDetailsValidation(value);
        });
        // }

        this.docType = this.docTypeList;
      })
      .then(() => {
        var requestNo = { requestNo: this.request_number };

        // if (this.company == this.companyName) {
        // VESSEL ARRIVAL & DEPARTURE INFORMATION
        restServices.pbksb_MarineService
          .GetVesselArrivalDepartureInformation(this.appService.myApp)(
            requestNo
          )
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              this.validateVesselData(request);
              // console.log('VesselArrivalDepartureInfo', this.vesselData);
            } else {
              // console.log('VesselArrivalDepartureInfo', result);
            }
          })
          .catch((err) => {
            // console.log(err);
          });

        // BERTHING INFORMATION
        restServices.pbksb_MarineService
          .GetBerthingInformation(this.appService.myApp)(requestNo)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              request['berthingInformation'].forEach((element) => {
                this.validateBerthingData(element);
              });
              // console.log('GetBerthingInformation', this.berthingData);
            } else {
              // console.log('GetBerthingInformation', result);
            }
          })
          .catch((err) => {
            // console.log(err);
          });

        // WORK PROGRAM LIST
        restServices.pbksb_MarineService
          .GetBerthWorkProgram(this.appService.myApp)(requestNo)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              request['berthWorkProgram'].forEach((element) => {
                this.validateWorkProgram(element);
              });
              // console.log('GetBerthWorkProgram', this.workProgram);
            } else {
              // console.log('GetBerthWorkProgram', result);
            }
          })
          .catch((err) => {
            // console.log(err);
          });

        // SCOPE OF WORK

        restServices.pbksb_MarineService
          .GetBerthScopeOfWork(this.appService.myApp)(requestNo)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              request['berthScopeWork'].forEach((element) => {
                this.validateScopeOfWork(element);
              });
              // console.log('GetBerthScopeOfWork', this.scopeOfWork);
            } else {
              // console.log('GetBerthScopeOfWork', result);
            }
          })
          .catch((err) => {
            // console.log(err);
          });

        // restServices.pbksb_MarineService
        //   .GetBerthScopeWorkByGroup(this.appService.myApp)(requestNo)
        //   .then((result) => {
        //     let requestList: any = result;
        //     let request = JSON.parse(requestList);

        //     if (!request.status) {
        //       request.forEach((element) => {
        //         this.validateScopeOfWork(element);
        //       });
        // console.log('GetBerthScopeOfWork', this.scopeOfWork);
        //     } else {
        // console.log('GetBerthScopeOfWork', result);
        //     }
        //   })
        //   .catch((err) => {
        // console.log(err)
        // });

        // HEAVY PACKAGES LIST
        restServices.pbksb_MarineService
          .GetBerthHeavyPackages(this.appService.myApp)(requestNo)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              request['berthHeavyPackages'].forEach((element) => {
                this.validateHeavyPackages(element);
              });
              // console.log('GetBerthHeavyPackages', this.heavyPackages);
            } else {
              // console.log('GetBerthHeavyPackages', result);
            }
          })
          .catch((err) => {
            // console.log(err);
          });

        // var requestNo2 = { requestNo: 'BRF2D6A6782' };

        // PERMIT LIST
        this.validatePermitList('');

        // DOCUMENT LIST
        this.getBerthFormDocs();

        // work program request summart
        this.getWorkProgramRequestSummary();

        // Additonal Service
        restServices.pbksb_MarineService
          .GetAdditionalServices(this.appService.myApp)(requestNo)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);

            if (!request.status) {
              request['additionalServices'].forEach((element) => {
                this.validateAdditionalServices(element);
              });
            } else {
              // console.log('GetAdditionalServices', result);
            }
          })
          .catch((err) => {
            // console.log(err);
          });

        // Fuel Water Details
        restServices.pbksb_MarineService
          .GetBerthFuelWaterJobTicketDetails(this.appService.myApp)(requestNo)
          .then((result) => {
            let requestList: any = result;
            let request = JSON.parse(requestList);
            if (!request.status) {
              request['fuelwater_details'].forEach((element) => {
                this.validateFuelWaterDetails(element);
              });
              // console.log('GetBerthHeavyPackages', this.heavyPackages);
            } else {
              // console.log('GetBerthFuelWaterJobTicketDetails', result);
            }
          })
          .catch((err) => {
            // console.log(err);
          });

        // }
      });
  }

  createTableHeader() {
    this.vesselArrivalModal.header = [
      new TableHeaderItem({ data: '' }),
      new TableHeaderItem({ data: 'Date' }),
      new TableHeaderItem({ data: 'Time' }),
      new TableHeaderItem({ data: 'Day' }),
    ];

    this.berthingModal.header = [
      new TableHeaderItem({ data: '' }),
      new TableHeaderItem({ data: '' }),
      new TableHeaderItem({ data: '' }),
      new TableHeaderItem({ data: '' }),
      new TableHeaderItem({ data: 'Date' }),
      new TableHeaderItem({ data: 'Time' }),
      new TableHeaderItem({ data: 'Date' }),
      new TableHeaderItem({ data: 'Time' }),
    ];

    this.workProgramModal.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Work Program' }),
      new TableHeaderItem({ data: 'Request' }),
      new TableHeaderItem({ data: 'Remarks' }),
      new TableHeaderItem({ data: 'Action' }),
    ];

    this.scopeWorkModal.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Scope of Work' }),
      new TableHeaderItem({ data: 'Qty. In' }),
      new TableHeaderItem({ data: 'Qty. Out' }),
      new TableHeaderItem({ data: 'Total' }),
      new TableHeaderItem({ data: 'Unit Price (RM)' }),
      new TableHeaderItem({ data: 'Total Price (RM)' }),
      // new TableHeaderItem({ data: 'UOM' }),
      // new TableHeaderItem({ data: 'Start' }),
      // new TableHeaderItem({ data: 'End' }),
      new TableHeaderItem({ data: 'Remarks' }),
    ];

    this.heavyPackageModal.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Heavy Packages' }),
      new TableHeaderItem({ data: 'Qty' }),
    ];

    this.permitModal.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Item' }),
      new TableHeaderItem({ data: 'Status' }),
    ];

    this.documentModal.header = [
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Doc. Type' }),
      new TableHeaderItem({ data: 'Waste Code' }),
      new TableHeaderItem({ data: 'Doc. ID' }),
      new TableHeaderItem({ data: 'Uploaded By' }),
      new TableHeaderItem({ data: 'Date / Time' }),
      // new TableHeaderItem({ data: 'Transaction Ref. No.' }),
      new TableHeaderItem({ data: 'Action' }),
    ];

    this.additionalServicesModal.header = [
      new TableHeaderItem({ data: 'Services' }),
      new TableHeaderItem({ data: 'Description' }),
      new TableHeaderItem({ data: 'Start Time' }),
      new TableHeaderItem({ data: 'End Time' }),
    ];

    this.fuelWaterModal.header = [
      new TableHeaderItem({ data: 'Request' }),
      new TableHeaderItem({ data: 'No. of Operators' }),
      new TableHeaderItem({ data: 'Request Quantity (L)' }),
      new TableHeaderItem({ data: 'Request Quantity In (L)' }),
      new TableHeaderItem({ data: 'Request Quantity Out (L)' }),
      new TableHeaderItem({ data: 'Full Tank' }),
      new TableHeaderItem({ data: 'Start Time' }),
      new TableHeaderItem({ data: 'End Time' }),
      new TableHeaderItem({ data: 'Total Hours' }),
      new TableHeaderItem({ data: 'Remarks' }),
      new TableHeaderItem({ data: 'Admin Remarks' }),
    ];
  }

  getWorkProgramRequestSummary() {
    this.workProgramList = [];
    // console.log('emit');

    restServices.pbksb_MarineService
      .GetBerthWorkProgramSummary(this.appService.myApp)({
        requestNo: this.request_number,
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
            status: value.status ? value.status : 'N/A',
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
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  validateVesselData(data: any) {
    this.vesselData = {
      alongside: {
        date: data.alongside.date ? data.alongside.date : 'N/A',
        time: data.alongside.time ? data.alongside.time : 'N/A',
        day: data.alongside.day ? data.alongside.day : 'N/A',
      },
      departure: {
        date: data.departure.date ? data.departure.date : 'N/A',
        time: data.departure.time ? data.departure.time : 'N/A',
        day: data.departure.day ? data.departure.day : 'N/A',
      },
    };

    this.vesselInfo = this.vesselData;
  }

  validateBerthingData(data: any) {
    let shiftingTitle = {
      SHIFTING_0: '',
      SHIFTING_1: '1st Shifting',
      SHIFTING_2: '2nd Shifting',
      SHIFTING_3: '3rd Shifting',
    };

    if (data.berth_form.act_arrival) {
      this.berthingData.push({
        title: data.vessel_shifting ? data.vessel_shifting : '',
        berthFrom: data.berth_form.berth_from.code
          ? data.berth_form.berth_from.code
          : '',
        berthTo: data.berth_form.berth_to.code
          ? data.berth_form.berth_to.code
          : '',
        chargeRate: data.charge_rate ? data.charge_rate : '',
        dateAlongside: data.alongside_datetime
          ? formatDate(data.alongside_datetime, 'dd/MM/yyyy', 'en_US')
          : '',
        timeAlongside: data.alongside_datetime
          ? formatDate(data.alongside_datetime, 'HH:mm', 'en_US')
          : '',
        dateDeparture: data.departure_datetime
          ? formatDate(data.departure_datetime, 'dd/MM/yyyy', 'en_US')
          : '',
        timeDeparture: data.departure_datetime
          ? formatDate(data.departure_datetime, 'HH:mm', 'en_US')
          : '',
        sort_ind: data.sort_ind ? data.sort_ind : 0,
      });
    }

    this.berthingData.sort((a, b) => a.sort_ind - b.sort_ind);
    // console.log(this.berthingData);
  }

  validateWorkProgram(data: any) {
    if (data.request) {
      this.workProgram.push({
        workProgram: data.work_program
          ? data.work_program.replaceAll('_', ' ')
          : 'N/A',
        request: data.request ? data.request.toString() : '',
        status: data.status ? data.status : '',
        remarks: data.remarks ? data.remarks : '',
        admin_remarks: data.admin_remarks ? data.admin_remarks : '',
        sort_ind: data.sort_ind ? data.sort_ind : 0,
        isChecked: false,
      });
    }

    // // create new array
    // this.newWorkProgramList = this.workProgram.map((workProgram) => ({
    //   ...workProgram,
    //   isChecked: false,
    // }));

    // this.newWorkProgramList.sort((a, b) => a.sort_ind - b.sort_ind);
    this.workProgram.sort((a, b) => a.sort_ind - b.sort_ind);
  }

  checkStatusVisible() {
    return this.workProgram.some((item) =>
      item.status.toLowerCase().includes('cancel')
    );
  }

  validateAdditionalServices(data) {
    this.additionalServices.push({
      end_time: data.end_time
        ? formatDate(data.end_time, 'dd/MM/yyyy', 'en_us')
        : '',
      start_time: data.start_time
        ? formatDate(data.start_time, 'dd/MM/yyyy', 'en_us')
        : '',
      services: data.service.ifs_object.objectID
        ? data.service.ifs_object.objectID
        : '',
      description: data.service.scope_of_work_item
        ? data.service.scope_of_work_item
        : '',
    });

    // console.log(this.additionalServices);
  }

  validateScopeOfWork(data: any) {
    // if (data.scope_work == 'WATER_T') {
    //   this.scopeOfWorkTitle['WATER_T'] = 'Water (0.001)';
    // } else if (data.scope_work == 'FUEL_T') {
    //   this.scopeOfWorkTitle['FUEL_T'] = 'Fuel (0.00083)';
    // } else {
    //   this.scopeOfWorkTitle[data.scope_work] = data.scope_work.replaceAll(
    //     '_',
    //     ' '
    //   );
    // }

    if (data.indicator) {
      this.scopeOfWork.push({
        scopeOfWork: data.scope_work
          ? this.convertToTitleCase(data.scope_work)
          : 'N/A',
        qtyIn: this.numberWithCommas(data.quantity_in) ?? 0,
        qtyOut: this.numberWithCommas(data.quantity_out) ?? 0,
        total: this.numberWithCommas(data.total) ?? 0,
        unitPrice: data.unit_price ? data.unit_price.toFixed(2) : 0,
        totalPrice: data.total_price ? data.total_price.toFixed(2) : 0,
        startDate: data.start_date
          ? formatDate(data.start_date, 'dd/MM/yyyy HH:mm', 'en_US')
          : 'N/A',
        endDate: data.end_date
          ? formatDate(data.end_date, 'dd/MM/yyyy HH:mm', 'en_US')
          : 'N/A',
        remarks: data.remarks ?? 'N/A',
        admin_remarks: data.admin_remarks ?? 'N/A',
        sort_ind: data.sort_ind ? data.sort_ind : 0,
      });
    }

    // this.scopeOfWork.push({
    //   scopeOfWork: data.group ? data.group.replaceAll('_', ' ') : 'N/A',
    //   qtyIn: data.quantity_in ?? 'N/A',
    //   qtyOut: data.quantity_out ?? 'N/A',
    //   total: data.Total ? data.Total : 'N/A',
    //   // unitPrice: data.Total ? data.Total : 'N/A',
    //   uom: data.UOM ? data.UOM : 'N/A',
    //   // startDate: data.start_date
    //   //   ? formatDate(data.start_date, 'dd/MM/yyyy HH:mm', 'en_US')
    //   //   : 'N/A',
    //   // endDate: data.end_date
    //   //   ? formatDate(data.end_date, 'dd/MM/yyyy HH:mm', 'en_US')
    //   //   : 'N/A',
    //   // remarks: data.remarks ?? 'N/A',
    //   // sort_ind: data.sort_ind ? data.sort_ind : 0,
    // });

    // this.scopeOfWork.sort((a, b) => a.sort_ind - b.sort_ind);
  }

  validateFuelWaterDetails(data) {
    if (!data.berthFuelWaterTank.status.toLowerCase().includes('cancel')) {
      this.fuelWaterDetails.push({
        request: data?.service_code ?? '',
        operators: data?.operators ?? '',
        request_quantity: data?.request_quantity
          ? this.numberWithCommas(data.request_quantity)
          : '',
        quantity_in: data?.actual_quantity_in
          ? this.numberWithCommas(data?.actual_quantity_in)
          : '',
        quantity_out: data?.actual_quantity_out
          ? this.numberWithCommas(data?.actual_quantity_out)
          : '',
        full_tank: data?.full_tank ? 'Yes' : 'No',
        total_hours: data?.total_hours ?? '',
        start_time: data?.session1_start ? data?.session1_start : '',
        end_time:
          data?.session3_end ?? data?.session2_end ?? data?.session1_end ?? '',
        remarks: data?.remarks ?? '',
      });
    }
  }

  validateHeavyPackages(data: any) {
    let heavyPackage: any;
    let sort_ind = 0;
    if (
      data.heavy_packages === '_15_25_TONNES' ||
      data.heavy_packages === 'UP_25_TONNES'
    ) {
      heavyPackage = '15 to 25 tonnes';
      sort_ind = 0;
    } else if (data.heavy_packages === '_25_50_TONNES') {
      heavyPackage = '>25 - 50 tonnes';
      sort_ind = 1;
    } else if (data.heavy_packages === '_50_75_TONNES') {
      heavyPackage = '>50 - 75 tonness';
      sort_ind = 2;
    } else if (data.heavy_packages === 'MORE_75_TONNES') {
      heavyPackage = '>75 tonnes';
      sort_ind = 3;
    }

    this.heavyPackages.push({
      heavyPackage: heavyPackage,
      qty: data.total ? this.numberWithCommas(data.total) : '',
      // sort_ind: data.sort_ind ? data.sort_ind : 0,
      sort_ind: sort_ind ? sort_ind : 0,
    });

    this.totalHeavyPackages += Number(data.total);

    this.heavyPackages.sort((a, b) => a.sort_ind - b.sort_ind);
  }

  validatePermitList(data: any) {
    this.permitList.push(
      {
        item: 'Confined Psace',
        status: 'Yes',
      },
      {
        item: 'Confined Psace',
        status: 'Yes',
      }
    );
  }

  validateFormDocs(data: any) {
    this.documents.push({
      id: data.id ? data.id : 'N/A',
      idApi: data.file_descriptor.id ? data.file_descriptor.id : 'N/A',
      docType: data.doc_type ? data.doc_type : 'N/A',
      wasteCode: data.waste_code ? data.waste_code : '-',
      docId: data.document_id ? data.document_id : '-',
      uploadedBy: data.upload_by ? data.upload_by : 'N/A',
      datetime: data.upload_date
        ? formatDate(data.upload_date, 'dd/MM/yyyy HH:mm', 'en_US')
        : 'N/A',
      transactionRefNo: data.transactionRefNo ? data.transactionRefNo : 'N/A',
      isChecked: false,
      upload: [],
      fromApi: true,
    });
  }

  onCheckedProgram() {
    return this.workProgram.some((item) => item.isChecked == true);
  }

  onCheckedDocument() {
    return this.documents.some((item) => item.isChecked == true);
  }

  cancelSelectProgram() {
    this.workProgram.forEach((item) => {
      if (item.isChecked) {
        item.isChecked = false;
      }
    });
  }

  cancelSelectDocument() {
    this.documents.forEach((item) => {
      if (item.isChecked) {
        item.isChecked = false;
      }
    });
    this.counterDocList = 0;
  }

  // createNewArray() {
  //   this.newDocumentList = this.documents.map((document) => ({
  //     ...document,
  //     isChecked: false,
  //     upload: [],
  //   }));
  // }

  bodDetailsValidation(value: any) {
    this.formId = value.id ? value.id : '-';
    this.company = value.company ? value.company.name : '-';
    this.request_date = value.request_date ? value.request_date : '-';
    this.vessel = value.vessel ? value.vessel.name : '-';
    this.bod_number = value.bod_number ? value.bod_number : '-';
    this.last_location = value.last_location ? value.last_location : '-';
    this.next_location = value.next_location ? value.next_location : '-';
    this.request_number = value.request_number ? value.request_number : '-';
    this.agent = value.agent ? value.agent.name : '-';
    this.status = value.status ? value.status : '-';
    this.remarks = value.remarks ? value.remarks : '-';
    this.admin_remarks = value.admin_remarks ? value.admin_remarks : '-';
    this.log_number = value.log_number ? value.log_number : '-';
    this.grt = value.vessel.grt ? value.vessel.grt : 'N/A';
    this.loa = value.vessel.loa ? value.vessel.loa : 'N/A';
    this.endorsed_date = value.endorsed_date ? value.endorsed_date : '';
    this.endorsed_by = value.endorsed_by ? value.endorsed_by : 'N/A';
    this.bod_id = value.id ? value.id : '';
  }

  checkEndorsed() {
    return this.status.toUpperCase() == 'ENDORSED';
  }

  docListCheckbox(event: any) {
    if (event === true) {
      this.counterDocList++;
    } else if (event == false) {
      this.counterDocList--;
    }
  }

  deleteDocument() {
    // this.documents = this.documents.filter(function (obj) {
    //   return obj.isChecked !== true;
    // });

    this.documents.forEach((ticket) => {
      if (ticket.isChecked == true) {
        const param = {
          form: {
            files: [
              {
                fileID: ticket.id,
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
              this.documents = this.documents.filter(
                (item) => item.isChecked !== ticket.isChecked
              );
              this.counterDocList = 0;
            } else {
              this.openRemove = false;
              this.counterDocList = 0;
              this.notificationService.showToast({
                type: 'error',
                title: 'Delete Error',
                subtitle: 'Document ' + ticket.docId + ' is not deleted.',
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
              subtitle: 'Document ' + ticket.docId + ' is not deleted.',
              target: '.notification-container',
              message: 'message',
              lowContrast: true,
            });
          });
      }
    });

    this.openRemove = false;
  }

  onDropped(event: any) {
    this.uploadEvent = event;
  }

  onblurDoc(event: any) {
    this.documentID = event.target.value;
  }

  onblurWaste(event: any) {
    this.waste = event.target.value;
  }

  onSaveDocumentList() {
    this.validateSubmit();

    if (!this.invalidSubmit) {
      try {
        for (let x of this.uploadEvent) {
          this.uploadFile.push(x);
          // console.log(this.uploadFile);
        }
      } catch (err) {
        console.debug();
      }

      if (!this.waste || this.waste == ' ') {
        this.waste = ' - ';
      }

      let path = (window.URL || window.webkitURL).createObjectURL(
        this.uploadFile[0].file
      );
      // console.log('path', path);

      let upload = {
        id: Math.floor(Math.random() * 10000),
        docType: this.selectDoctype ?? 'N/A',
        wasteCode: this.waste ? this.waste : '-',
        docId: this.documentID ? this.documentID : '-',
        docPath: path,
        uploadedBy: this.requestByName,
        datetime: formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'en_US') ?? 'N/A',
        upload: this.uploadFile,
        transactionRefNo: 'N/A',
        isChecked: false,
      };

      this.uploadDocuments.push(upload);
      this.documents.push(upload);

      this.isLoading = true;
      this.overlay = true;

      // console.log('uploadDocuments', this.uploadDocuments);

      // this.newDocumentList.forEach((i, index, item) => {
      //   if (index === item.length - 1) {
      //     item[index].upload = this.uploadFile;
      //   }
      // });

      this.uploadForm = this.formBuilder.group({
        fileData: [''],
      });

      this.uploadDocuments.forEach((element, index) => {
        const file = element.upload[index].file;
        this.uploadForm.get('fileData').setValue(file);

        let formData = new FormData();
        formData.append('file', this.uploadForm.get('fileData').value);

        // console.log(this.uploadForm);

        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.token,
          }),
        };

        this.http
          .post<any>(this.ipUrl + 'v2/files', formData, httpOptions)
          .subscribe(
            (data) => {
              // console.warn(data.id)
              const filesUploaded = {
                form: {
                  formID: this.formId,
                  document_type: element.docType,
                  waste_code: element.wasteCode,
                  document_id: element.docId,
                  fileID: data.id,
                  upload_by: element.uploadedBy,
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
                  if (this.countFiles === element.upload.length) {
                    this.isLoading = false;
                    this.overlay = false;
                    // this.currentStep = 1
                    // console.log('success');
                    // console.log('documents', this.documents);
                    this.stepOneOpenModal = false;
                    this.docType = [];
                    this.uploadFile = [];
                    this.documents = [];
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
      });
    } else {
      this.stepOneOpenModal = true;
      this.uploadFile = [];
    }
  }

  getData() {
    this.newDocumentList.forEach((item) => {
      this.files.add(item.upload);
      this.uploadEvent = this.files.add(item.upload);
    });
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
  }

  cbChange(item, value) {
    for (var i = 0; i < this.workProgram.length; i++) {
      this.workProgram[i].isChecked = false;
    }
    item.isChecked = value;
  }

  selectedDocType(value) {
    this.selectDoctype = value.item.content;
  }

  backClicked() {
    this._location.back();
  }

  checkPending() {
    return (
      this.status == 'PENDING_ENDORSEMENT' ||
      this.status == 'PENDING_ENDORSEMENT_CANCELLED'
    );
  }

  openModalAddItem() {
    this.stepOneOpenModal = true;
    this.waste = '';
    this.documentID = '';
    this.wasteCode.nativeElement.value = '';
    this.docsId.nativeElement.value = '';
    this.uploadEvent = null;
    this.uploadFile = [];
    this.docType = this.docTypeList;
    this.uploadDocuments = [];
    this.files = new Set();

    this.invalidDocType = false;
    this.invalidDocId = false;
    this.invalidWasteCode = false;
    this.invalidFileSubmit = false;
  }

  validateSubmit() {
    // console.log(this.uploadFile);

    this.invalidDocType = !this.selectDoctype ? true : false;
    // this.invalidDocId = !this.documentID ? true : false;
    // this.invalidWasteCode = !this.waste ? true : false;
    this.invalidFileSubmit = !this.uploadEvent ? true : false;

    if (this.invalidDocType || this.invalidDocId || this.invalidFileSubmit) {
      this.invalidSubmit = true;
    } else {
      this.invalidSubmit = false;
    }
  }

  endorseBod() {
    let param = {
      form: {
        // request_number: this.request_number,
        formID: this.formId,
        status: 'ENDORSED',
      },
    };

    // console.log(param);

    restServices.pbksb_MarineService
      .EndorsedBOD(this.appService.myApp)(param)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        if (request.status != 'BAD_REQUEST') {
          this.createNotificationEndorse('success', 'Endorse');
          this.router.navigate(['/operation-system/marine-endorse-bod-list']);
          this.openModal = false;
        } else {
          this.createNotificationEndorse('error', 'Endorse');
          this.openModal = false;
        }
      })
      .catch((err) => {
        // console.log(err);
        this.openModal = false;
        this.createNotificationEndorse('error', 'Endorse');
      });
  }

  onPrint() {
    this.router.navigate(['operation-system/marine-work-program-details']);
  }

  openEndorseModal() {
    this.openModal = true;
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

  getBerthFormDocs() {
    this.documents = [];
    restServices.pbksb_MarineService
      .GetBerthFormDocs(this.appService.myApp)({
        requestNo: this.request_number,
      })
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        if (!request.status) {
          let newDocsArray = request['berthFormDocs'].sort(
            (a, b) => +new Date(b.upload_date) - +new Date(a.upload_date)
          );
          newDocsArray.forEach((element) => {
            this.validateFormDocs(element);
          });
          // console.log('GetBerthFormDocs', this.documents);
        } else {
          // console.log('GetBerthFormDocs', result);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  createNotificationEndorse(type, keywords) {
    let title = '';
    let subtitle = '';

    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `BOD form is successfully ${keywords.toLowerCase()}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `BOD form failed to ${keywords.toLowerCase()}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };
    this.appService.showToaster(successNotif);
  }

  onblurAmend(event: any) {
    this.amendNotes = event.target.value;
  }

  submitAmmend() {
    let date = new Date();

    restServices.pbksb_MarineService
      .RejectBOD(this.appService.myApp)({
        berthFormID: this.bod_id,
        comment: this.amendNotes,
      })
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);
        // console.log(request);

        const successNotif = {
          type: 'success',
          title: 'Amendment submitted',
          subtitle: 'Amendment' + ' ' + 'is successfully submitted',
          time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
        };

        this.appService.showToaster(successNotif);
        this.status = request.status;
      })
      .catch((err) => {
        // console.log(err);
        const successNotif2 = {
          type: 'error',
          title: 'Amendment is not submitted',
          subtitle: 'Amendment' + ' ' + 'is not submitted',
          time: `${date.getHours()}` + ' : ' + `${date.getMinutes()}`,
        };

        this.appService.showToaster(successNotif2);
      });

    this.amendNotes = '';
    this.openModalAmmend = false;
  }

  convertToTitleCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  addZeroes(num) {
    const dec = num.toString().split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return this.numberWithCommas(Number(num).toFixed(len));
  }
}
