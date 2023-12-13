import { OtherMachineriesBerth } from './../../../interfaces/MHE/mhe_interface';
import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import {
  ExternalItem,
  MachineryBerth,
  ManPowerBerth,
  MheForm,
  RangeDate,
} from 'src/app/operation-system/interfaces/MHE/mhe_interface';
import { NgForm } from '@angular/forms';
import { BerthRequestFormService } from 'src/app/operation-system/services/Marine/berth-request-form.service';
import { ActivatedRoute } from '@angular/router';
import { FolderDetailsReferenceDirective } from '@carbon/icons-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-berth-normal',
  templateUrl: './berth-normal.component.html',
  styleUrls: ['./berth-normal.component.scss'],
})
export class BerthNormalComponent implements OnInit, OnDestroy {
  @Output() stepChanged2: EventEmitter<number> = new EventEmitter();

  @ViewChild('requestOnBehalfElement') requestOnBehalfElement: ElementRef;
  @ViewChild('jobDescriptionElement') jobDescriptionElement: ElementRef;
  @ViewChild('PoNumberElement') PoNumberElement: ElementRef;
  @ViewChild('singleDateElement') singleDateElement: ElementRef;
  @ViewChild('rangeDateElement') rangeDateElement: ElementRef;
  @ViewChild('machineryTableElement') machineryTableElement: ElementRef;
  @ViewChild('externalItemTableElement') externalItemTableElement: ElementRef;
  @ViewChild('equipmentTableElement') equipmentTableElement: ElementRef;
  @ViewChild('manPowerTableElement') manPowerTableElement: ElementRef;
  @Input() poNumber: string;
  @Output() invalidWorkProgram = new EventEmitter<any>();

  currentStep = 1;
  mheForm: MheForm = {};
  falseState = false;
  timeArr = [];

  requestOnBehalfList: any[] = [];
  requestOnBehalfArr: any[] = [];
  requestOnBehalfName: any[] = [];
  requiredMachinery: any[] = [];
  requiredManPower: any[] = [];
  requiredOtherMachineries: any[] = [];
  requiredExternalItem: any[] = [];

  dateFlag: boolean;
  dateErr: boolean;
  // rowErr: boolean = false;
  open = false;
  backDatedDate = false;
  invalidbackDated = false;
  dailyDate: any;
  currentDate: any;
  rangeDateFirstIndex = '';

  disabled: any[] = [];
  MPdisabled: any[] = [];
  externalDisbaled: any[] = [];

  // for invalid UI
  invalidProgram = false;
  invalidRequestOnBehalf = false;
  invalidJobDescription = false;
  invalidPONum = false;
  invalidSingleDate = false;
  invalidRangeDate: any = [];
  rangeInvalidRangeDate: any = [];

  invalidItemMachinery: any = [];
  invalidProgrammeMachinery: any = [];
  invalidQuantityMachinery: any = [];
  invalidTimeMachinery: any = [];
  invalidEHMachinery: any = [];
  invalidLocationMachinery: any = [];

  invalidItemManPower: any = [];
  invalidProgrammeManpower: any = [];
  invalidQuantityManPower: any = [];
  invalidTimeManPower: any = [];
  invalidEHManPower: any = [];
  invalidLocationManPower: any = [];

  invalidItemOtherMachine: any = [];
  invalidProgrammeEquipment: any = [];
  invalidQuantityOtherMachine: any = [];
  invalidTimeOtherMachine: any = [];
  invalidEHOtherMachine: any = [];
  invalidLocationOtherMachine: any = [];

  invalidQuotationIDExternalItem: any[] = [];
  invalidItemExternalItem: any = [];
  invalidUOMExternalItem: any = [];
  invalidQuantityExternalItem: any = [];
  invalidRentPeriodExternalItem: any = [];
  invalidUnitExternalItem: any = [];
  invalidTimeExternalItem: any = [];
  invalidLocationExternalItem: any = [];

  invalidSpecificCrewMachinery: any = [];
  invalidSpecificCrewManpower: any = [];

  description =
    'Please add required services in the table below. To Remove, select the check box and press remove button in the console';

  // new Array to push new object for machinery
  machineryRow = [] as MachineryBerth[];
  manPowerRow = [] as ManPowerBerth[];
  rangeDateRow = [] as RangeDate[];
  otherMachineriesRow = [] as OtherMachineriesBerth[];
  externalItemRow = [] as ExternalItem[];

  sitesArr: any[] = [];
  sitesName: any[] = [];
  sitesList: any[] = [];

  machineArr: any[] = [];
  machineItem: any[] = [];
  itemList: any[] = [];
  machineDesc: any[] = [];

  machineSpecificCrewName = [];
  machineSpecificCrewList = [];

  externalItemDesc = [];
  externalItemDescList = [];

  manPowerArr: any[] = [];
  manPowerItem: any[] = [];
  manPoweritemList: any[] = [];

  manPowerSpecificCrew: any[] = [];
  manPowerSpecificCrewList: any[] = [];

  equipmentArr: any[] = [];
  equipmentItem: any[] = [];
  equipmentItemList: any[] = [];

  external_itemsArr: any[] = [];
  QuotationID: any[] = [];
  QuotationIDList: any[] = [];

  externalItem: any[] = [];
  externalItemList: any[] = [];

  machineryTableInvalid = false;
  manPowerTableInvalid = false;
  otherMachineriesTableInvalid = false;
  externalItemTableInvalid = false;

  invalidbackDateds = [];
  rangeDateWarning = [];
  dateWarning = [];

  noTableSelected = false;

  mheFormID = '';

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  // For numbering input
  step = 1;
  min = 0;
  max = 100;

  maxQuantity: any = [];

  // Date type option
  typeOfBooking: any[] = [
    {
      type: 'Daily',
      checked: true,
    },
    {
      type: 'Recurring',
    },
    {
      type: 'Contract',
    },
  ];

  programme: any[] = [
    {
      content: 'Discharge',
      value: 'DISCHARGE',
    },
    {
      content: 'Loading',
      value: 'LOADING',
    },
    {
      content: 'Discharge & Loading',
      value: 'DISCHARGE_LOADING',
    },
  ];

  updateStatus = false;
  postStatus = false;
  formID: any;
  date = new Date();
  RequestNo = '';
  dateSelect = false;
  special = false;

  counterMachinery = 0;
  counterManpower = 0;
  counterEquipment = 0;
  counterExternal = 0;

  subscription!: Subscription;

  constructor(
    private appService: AppService,
    private berthRequestFormService: BerthRequestFormService,
    public datepipe: DatePipe,
    private _Activatedroute: ActivatedRoute
  ) {
    this.mheForm.requestType = 'Normal';
    this.mheForm.bookingType = 'Daily';
  }

  ngOnInit(): void {
    this.userInfo();
    // Generate the first object in the array as soon the user go to normal form
    // this.addMachineryRow();
    // this.addManPowerRow();
    // this.addOtherMachineriesRow();
    // this.addExternalItemRow();
    this.addRangeDate();
    this.getTimeDropdown();
    this.getRequestNo();
    this.mheForm.PONum = this.poNumber;

    this.subscription =
      this.berthRequestFormService.workProgramChanged.subscribe(
        (value: any) => {
          this.mheForm.workProgram = value;
          console.log('workProgram', this.mheForm.workProgram);
        }
      );
  }

  getRequestNo() {
    if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
      this.RequestNo = this._Activatedroute.snapshot.paramMap.get('requestNum');
    } else if (this.berthRequestFormService.getrequestNo()) {
      this.RequestNo = this.berthRequestFormService.getrequestNo();
      // this.updateStatus = false;
    }
  }

  changeStep(step: any) {
    this.currentStep = step;
    this.stepChanged2.emit(this.currentStep);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.mheForm.companyName = initialData.Company;
        this.mheForm.requestBy = initialData.Fullname;
        this.special = this.appService.special;

        this.getRestServiceAPI(initialData);

        // console.log(initialData);
      })

      .catch((err) => {
        console.error(err);
        
        let errorObject = {
          type: 'error',
          title: 'Server Error',
          subtitle:
            'Server Error. Please try again'
        };
        this.appService.showToaster(errorObject);
        this.appService.terminateSession();
      });
  }

  getRestServiceAPI(initData: any) {
    const getCode: any = {
      userID: initData.UserID,
      CustomerCode: initData.CustomerCode,
    };
    // console.log(initData);
    restServices.pbksb_CustomerService
      .getRequestFrom(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const cust = JSON.parse(resArr);

        //console.log(cust);

        this.machineArr = cust.machinery;
        this.manPowerArr = cust.manpower;
        this.requestOnBehalfArr = cust.CustomerOnBehalf;
        this.sitesArr = cust.sites;
        this.equipmentArr = cust.equipment;
        this.external_itemsArr = cust.external_items;

        for (let i = 0; i < this.machineArr.length; i++) {
          if (this.machineArr[i].Description) {
            this.machineItem.push({
              content: this.machineArr[i].Description,
            });
          }
        }

        for (let i = 0; i < this.equipmentArr.length; i++) {
          if (this.equipmentArr[i].Description) {
            this.equipmentItem.push({
              content: this.equipmentArr[i].Description,
            });
          }
        }

        for (let i = 0; i < this.manPowerArr.length; i++) {
          if (this.manPowerArr[i].Item) {
            this.manPowerItem.push({
              content: this.manPowerArr[i].Item,
            });
          }

          this.manPowerSpecificCrew.push({
            content: this.manPowerArr[i].SpecificCrew,
          });
        }

        for (let i = 0; i < this.external_itemsArr.length; i++) {
          if (this.external_itemsArr[i].quotation) {
            this.QuotationID.push({
              content: this.external_itemsArr[i].quotation,
            });
          }

          if (this.external_itemsArr[i].Item) {
            this.externalItem.push({
              // content: this.external_itemsArr[i].description,
              content: this.external_itemsArr[i].Item,
            });
          }
        }

        for (let i = 0; i < this.requestOnBehalfArr.length; i++) {
          if (this.requestOnBehalfArr[i].name) {
            this.requestOnBehalfName.push({
              content: this.requestOnBehalfArr[i].name,
            });
          }
        }

        for (let i = 0; i < this.sitesArr.length; i++) {
          if (this.sitesArr[i].description) {
            this.sitesName.push({
              content: this.sitesArr[i].description,
            });
          }
        }

        this.itemList = this.machineItem.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.equipmentItemList = this.equipmentItem.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.manPoweritemList = this.manPowerItem.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.externalItemList = this.externalItem.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.manPowerSpecificCrewList = this.manPowerSpecificCrew;

        this.requestOnBehalfList = this.requestOnBehalfName.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        this.sitesList = this.sitesName.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.QuotationIDList = this.QuotationID;
        //console.log(this.itemList);
      })
      .then(() => {
        // this.RequestNo = 'BRF1BA74E9E';
        // this.RequestNo = 'BRF00A3ADF6';

        this.getRequestFormDetails();
      })
      .catch((err) => {
        // console.log("masuk err");
        console.error(err);
      });
  }

  getRequestFormDetails() {
    restServices.pbksb_MarineService
      .GetMHERequestFormDetails(this.appService.myApp)({
        requestNo: this.RequestNo,
      })
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);
        // console.log(array);

        if (array.berthMHERequest.length > 0) {
          this.mheFormID = array.berthMHERequest[0].id;
          this.bindData(array);
          this.updateStatus = true;
        } else {
          this.addMachineryRow();
          this.addManPowerRow();
          this.addOtherMachineriesRow();
          this.addExternalItemRow();
        }
      });
  }

  onChange(event: any) {
    console.log(this.mheForm.bookingType);
    this.mheForm.bookingType = event.value;
    console.log(this.mheForm.bookingType);

    // Reset value everytime the radio button for the date option is change
    this.invalidSingleDate = false;
    this.invalidRangeDate = [];
    this.invalidbackDateds = [];
    this.rangeInvalidRangeDate = [];

    if (this.mheForm.bookingType !== 'Daily') {
      this.mheForm.singleDate = '';
      this.dateFlag = false;
    }
    if (this.mheForm.bookingType !== 'Recurring') {
      this.rangeDateRow = [
        {
          id: Math.floor(Math.random() * 100),
          date: '',
        },
      ];
      this.dateErr = false;
    }
  }

  // ------------------------------------ Remove invalid UI when user enter a value -----------------------------------------------------//

  dropdownValueChange() {
    for (let i = 0; i < this.machineryRow.length; i++) {
      if (this.machineryRow[i].Item && this.machineryRow[i].Item.length > 0) {
        this.invalidItemMachinery[i] = false;
      }

      if (this.machineryRow[i].Time) {
        this.invalidTimeMachinery[i] = false;
      }

      if (
        this.machineryRow[i].Location &&
        this.machineryRow[i].Location.length > 0
      ) {
        this.invalidLocationMachinery[i] = false;
      }
    }

    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (this.manPowerRow[i].Item && this.manPowerRow[i].Item.length > 0) {
        this.invalidItemManPower[i] = false;
      }

      if (this.manPowerRow[i].Time) {
        this.invalidTimeManPower[i] = false;
      }

      if (
        this.manPowerRow[i].Location &&
        this.manPowerRow[i].Location.length > 0
      ) {
        this.invalidLocationManPower[i] = false;
      }
    }

    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (
        this.otherMachineriesRow[i].Item &&
        this.otherMachineriesRow[i].Item.length > 0
      ) {
        this.invalidItemOtherMachine[i] = false;
      }

      if (this.otherMachineriesRow[i].Time) {
        this.invalidTimeOtherMachine[i] = false;
      }

      if (
        this.otherMachineriesRow[i].Location &&
        this.otherMachineriesRow[i].Location.length > 0
      ) {
        this.invalidLocationOtherMachine[i] = false;
      }
    }

    for (let i = 0; i < this.externalItemRow.length; i++) {
      if (this.externalItemRow[i].quotation) {
        this.invalidQuotationIDExternalItem[i] = false;
      }

      if (this.externalItemRow[i].Unit) {
        this.invalidUnitExternalItem[i] = false;
      }

      if (this.externalItemRow[i].Time) {
        this.invalidTimeExternalItem[i] = false;
      }

      if (
        this.externalItemRow[i].Location &&
        this.externalItemRow[i].Location.length > 0
      ) {
        this.invalidLocationExternalItem[i] = false;
      }
    }
  }

  inputValueChange() {
    if (
      this.mheForm.requestOnBehalf &&
      this.mheForm.requestOnBehalf.length > 0
    ) {
      this.invalidRequestOnBehalf = false;
    }
    if (this.mheForm.jobDescription) {
      this.invalidJobDescription = false;
    }

    if (this.mheForm.PONum) {
      this.invalidPONum = false;
    }

    for (let i = 0; i < this.machineryRow.length; i++) {
      if (this.machineryRow[i].Programme) {
        this.invalidProgrammeMachinery[i] = false;
      }

      if (this.machineryRow[i].Quantity) {
        this.invalidQuantityMachinery[i] = false;
      }

      if (this.machineryRow[i].EstimatedHours) {
        this.invalidEHMachinery[i] = false;
      }
    }

    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (this.manPowerRow[i].Quantity) {
        this.invalidQuantityManPower[i] = false;
      }

      if (this.manPowerRow[i].EstimatedHours) {
        this.invalidEHManPower[i] = false;
      }
      if (this.manPowerRow[i].Programme) {
        this.invalidProgrammeManpower[i] = false;
      }
    }

    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (this.otherMachineriesRow[i].Quantity) {
        this.invalidQuantityOtherMachine[i] = false;
      }

      if (this.otherMachineriesRow[i].EstimatedHours) {
        this.invalidEHOtherMachine[i] = false;
      }
      if (this.otherMachineriesRow[i].Programme) {
        this.invalidProgrammeEquipment[i] = false;
      }
    }

    for (let i = 0; i < this.externalItemRow.length; i++) {
      if (this.externalItemRow[i].Item) {
        this.invalidItemExternalItem[i] = false;
      }

      if (this.externalItemRow[i].UOM) {
        this.invalidUOMExternalItem[i] = false;
      }

      if (this.externalItemRow[i].Quantity) {
        this.invalidQuantityExternalItem[i] = false;

        if (
          this.externalItemRow[i].Quantity > this.maxQuantity[i] ||
          this.externalItemRow[i].Quantity === 0
        ) {
          this.invalidQuantityExternalItem[i] = true;
          this.requiredExternalItem[i] = true;
        }
      }

      if (this.externalItemRow[i].Unit) {
        this.invalidUnitExternalItem[i] = false;
      }

      if (this.externalItemRow[i].RentPeriod) {
        this.invalidRentPeriodExternalItem[i] = false;

        if (
          this.externalItemRow[i].RentPeriod > 10 ||
          this.externalItemRow[i].RentPeriod === 0
        ) {
          this.invalidRentPeriodExternalItem[i] = true;
          this.requiredExternalItem[i] = true;
        }
      }
    }
  }
  // ------------------------------------ Remove invalid UI when user enter a value -----------------------------------------------------//

  dateValueChange(event: any) {
    this.dateSelect = true;
    this.validateBookingDate(false);
    this.datePickerWarning();
  }
  // Process of the adding new array
  public addMachineryRow(): void {
    this.machineryRow.push({
      id: Math.floor(Math.random() * 100),
      Item: '',
      Programme: '',
      Quantity: 0,
      Time: '',
      EstimatedHours: 0,
      Location: '',
      SpecificCrew: [],
      Selected: false,
    });
  }

  public addManPowerRow(): void {
    this.manPowerRow.push({
      id: Math.floor(Math.random() * 100),
      Item: '',
      Programme: '',
      Quantity: 0,
      Time: '',
      EstimatedHours: 0,
      Location: '',
      SpecificCrew: [],
      Selected: false,
    });
  }

  public addOtherMachineriesRow(): void {
    this.otherMachineriesRow.push({
      id: Math.floor(Math.random() * 100),
      Item: '',
      Programme: '',
      Quantity: 0,
      Time: '',
      EstimatedHours: 0,
      Location: '',
      Selected: false,
    });
  }

  public addExternalItemRow(): void {
    this.externalItemRow.push({
      id: Math.floor(Math.random() * 100),
      quotation: '',
      Item: '',
      UOM: '',
      Quantity: 0,
      RentPeriod: 0,
      Unit: '',
      Time: '',
      Location: '',
      Selected: false,
    });
  }
  public addRangeDate(): void {
    this.rangeDateRow.push({
      id: Math.floor(Math.random() * 100),
      date: '',
    });
  }
  deleteRangeDate(index: number): void {
    this.rangeDateRow.forEach((value, i) => {
      if (i == index) {
        this.invalidRangeDate[value.id] = false;
        this.invalidbackDateds[value.id] = false;
        this.rangeInvalidRangeDate[value.id] = false;

        this.datePickerWarning();
      }
    });

    this.rangeDateRow.splice(index, 1);
  }
  templateFunction() {
    this.machineryRow.forEach((value) => {
      console.log(value.Programme);
    });
    this.manPowerRow.forEach((value) => {
      console.log(value.Programme);
    });
    this.otherMachineriesRow.forEach((value) => {
      console.log(value.Programme);
    });
  }

  validateBookingDate(status) {
    if (this.mheForm.bookingType === 'Daily') {
      if (this.mheForm.singleDate) {
        this.invalidSingleDate = false;
        this.backDatedDate = false;
        this.invalidbackDated = false;
        this.dateFlag = false;

        let singleDate: any;
        if (this.updateStatus && !this.dateSelect) {
          console.log(this.mheForm.singleDate);
          var dateParts = this.mheForm.singleDate.split('/');
          singleDate = new Date(
            +dateParts[2],
            +dateParts[1] - 1,
            +dateParts[0]
          );
        } else {
          console.log(this.mheForm.singleDate);
          singleDate = new Date(this.mheForm.singleDate);
        }
        this.mheForm.singleDate = singleDate;
        console.log(singleDate);
        // Get input date
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
          this.backDatedDate = true;
          this.invalidbackDated = true;
          if (!status) {
            this.timeArr = [];
            this.getTimeDropdown();
          }
          console.log('less than today');
        } else if (dateInput == todayDate) {
          this.backDatedDate = true;
          this.invalidbackDated = true;
          console.log(todayDate);
          if (!status) {
            this.filterTimeArr();
          }
        } else {
          console.log('more than today');
          if (!status) {
            this.timeArr = [];
            this.getTimeDropdown();
          }
          // if time between 12 am - 3 pm
          if (currentHour >= 0 && currentHour < 15) {
            this.dateFlag = false;
          } else {
            let tmrwDate = formatDate(
              current.setDate(current.getDate() + 1),
              'yyyy/MM/dd',
              'en_US'
            );
            if (formatSingleDate == tmrwDate) {
              this.dateFlag = true;
              this.backDatedDate = true;
              this.invalidbackDated = true;
            }
          }
        }
      } else {
        this.invalidSingleDate = true;
      }
    } else if (this.mheForm.bookingType === 'Recurring') {
      // console.log(this.rangeDateRow);

      this.multipleDateRangeOverlaps();

      this.rangeDateRow.forEach((elem, i) => {
        if (elem.date[0] && elem.date[1]) {
          this.invalidRangeDate[elem.id] = false;
          console.log(this.invalidRangeDate);
        } else {
          this.invalidRangeDate[elem.id] = true;
          console.log(this.invalidRangeDate);
          console.log('here');
        }

        // Today's date
        let current = new Date();
        current.setHours(0, 0, 0, 0);

        let firstDate: any;
        let secondDate: any;

        if (elem.date[1]) {
          firstDate = new Date(elem.date[0]);
          secondDate = new Date(elem.date[1]);

          if (firstDate > current && secondDate > current) {
            this.dateErr = false;
            // console.log('both that is greater')
            this.invalidbackDateds[elem.id] = false;
          } else if (firstDate < current && secondDate > current) {
            this.dateErr = true;
            // console.log('first date is less and second date is greater')
            this.invalidbackDateds[elem.id] = true;
          } else if (firstDate < current && secondDate < current) {
            this.dateErr = true;
            this.invalidbackDateds[elem.id] = true;
            // console.log('both date is less')
          } else if (
            firstDate < current &&
            secondDate.valueOf() === current.valueOf()
          ) {
            this.invalidbackDateds[elem.id] = true;
            this.dateErr = true;
            // console.log('First date is less and second date is equal')
          } else {
            this.invalidbackDateds[elem.id] = false;
            this.dateErr = false;
            // console.log('else')
          }

          this.rangeDateFirstIndex = formatDate(
            firstDate,
            'dd/MM/yyyy',
            'en_US'
          );
        }
      });
    }
    this.focusOnInvalid();
  }

  // ------------------------------------ Recurring Date Overlap Validation (Start) -----------------------------------------------------//

  dateRangeOverlaps(a_start, a_end, b_start, b_end, idA, idB) {
    if (a_start <= b_start && b_start <= a_end) {
      this.rangeInvalidRangeDate[idB] = true;
      console.log('in1'); // b starts in a
    }
    if (a_start <= b_end && b_end <= a_end) {
      console.log('in2');
      this.rangeInvalidRangeDate[idB] = true; // b ends in a
    }
    if (b_start <= a_start && a_end <= b_end) {
      console.log('in3');
      this.rangeInvalidRangeDate[idB] = true; // a in b
    }
    if (b_start > a_end && b_end > a_end) {
      console.log('in4');
      this.rangeInvalidRangeDate[idB] = false;
    }
    if (a_start > b_end && a_end > b_end) {
      console.log('in5');
      this.rangeInvalidRangeDate[idB] = false;
    }

    return false;
  }

  multipleDateRangeOverlaps() {
    let i = 0,
      j = 0;

    if (this.rangeDateRow != null && this.rangeDateRow.length > 1)
      for (i = 0; i < this.rangeDateRow.length - 1; i += 1) {
        for (j = i + 1; j < this.rangeDateRow.length; j += 1) {
          if (
            this.dateRangeOverlaps(
              new Date(this.rangeDateRow[i].date[0]),
              new Date(this.rangeDateRow[i].date[1]),
              new Date(this.rangeDateRow[j].date[0]),
              new Date(this.rangeDateRow[j].date[1]),
              this.rangeDateRow[i].id,
              this.rangeDateRow[j].id
            )
          )
            return true;
        }
      }
    return false;
  }

  datePickerWarning() {
    this.rangeDateRow.forEach((element) => {
      if (this.invalidbackDateds[element.id]) {
        this.dateWarning[element.id] = true;
        this.rangeDateWarning[element.id] = true;
      } else if (this.invalidRangeDate[element.id]) {
        this.dateWarning[element.id] = true;
        this.rangeDateWarning[element.id] = true;
      } else if (this.rangeInvalidRangeDate[element.id]) {
        this.dateWarning[element.id] = true;
        this.rangeDateWarning[element.id] = true;
      } else {
        this.dateWarning[element.id] = false;
        this.rangeDateWarning[element.id] = false;
      }
    });
  }

  // ------------------------------------ Recurring Date Overlap Validation (End) -----------------------------------------------------//

  validateForm() {
    if (!this.mheForm.workProgram || this.mheForm.workProgram.length < 0) {
      this.invalidWorkProgram.emit(true);
      this.invalidProgram = true;
    } else {
      this.invalidProgram = false;
      this.invalidWorkProgram.emit(false);
    }

    this.invalidRequestOnBehalf =
      this.mheForm.requestOnBehalf && this.mheForm.requestOnBehalf.length > 0
        ? false
        : true;

    if (this.mheForm.jobDescription) {
      this.invalidJobDescription = false;
    } else {
      this.invalidJobDescription = true;
    }
    if (this.mheForm.PONum) {
      this.invalidPONum = false;
    } else {
      this.invalidPONum = true;
    }
  }

  focusOnInvalid() {
    if (this.invalidRequestOnBehalf) {
      this.requestOnBehalfElement.nativeElement.focus();
    } else if (this.invalidJobDescription) {
      this.jobDescriptionElement.nativeElement.focus();
      this.jobDescriptionElement.nativeElement.select();
    } else if (this.invalidPONum) {
      this.PoNumberElement.nativeElement.focus();
      this.PoNumberElement.nativeElement.select();
    } else {
      let rangeDateIsError = false;
      if (this.mheForm.bookingType === 'Daily') {
        if (this.invalidSingleDate) {
          this.singleDateElement.nativeElement.focus();
        } else if (this.invalidbackDated) {
          this.singleDateElement.nativeElement.focus();
        }
      } else if (this.mheForm.bookingType === 'Recurring') {
        this.rangeDateRow.forEach((value, i) => {
          if (this.invalidRangeDate[value.id]) {
            rangeDateIsError = true;
            this.rangeDateElement.nativeElement.focus();
          }
          if (this.rangeInvalidRangeDate[value.id]) {
            rangeDateIsError = true;
            this.rangeDateElement.nativeElement.focus();
          }

          if (this.invalidbackDateds[value.id]) {
            rangeDateIsError = true;
            this.rangeDateElement.nativeElement.focus();
          }
        });
      }
      if (
        !this.invalidSingleDate &&
        !this.invalidbackDated &&
        !rangeDateIsError
      ) {
        for (let i = 0; i < this.machineryRow.length; i++) {
          if (
            this.invalidItemMachinery[i] == true ||
            this.invalidProgrammeMachinery[i] == true ||
            this.invalidQuantityMachinery[i] == true ||
            this.invalidTimeMachinery[i] == true ||
            this.invalidEHMachinery[i] == true ||
            this.invalidLocationMachinery[i] == true
            // this.invalidSpecificCrewMachinery[i] == true
          ) {
            this.machineryTableElement.nativeElement.focus();
          }
        }
        for (let i = 0; i < this.manPowerRow.length; i++) {
          if (
            this.invalidItemManPower[i] == true ||
            this.invalidProgrammeManpower[i] == true ||
            this.invalidQuantityManPower[i] == true ||
            this.invalidTimeManPower[i] == true ||
            this.invalidEHManPower[i] == true ||
            this.invalidLocationManPower[i] == true
            // this.invalidSpecificCrewManpower[i] == true
          ) {
            this.manPowerTableElement.nativeElement.focus();
          }
        }
        for (let i = 0; i < this.otherMachineriesRow.length; i++) {
          if (
            this.invalidItemOtherMachine[i] == true ||
            this.invalidProgrammeEquipment[i] == true ||
            this.invalidQuantityOtherMachine[i] == true ||
            this.invalidTimeOtherMachine[i] == true ||
            this.invalidEHOtherMachine[i] == true ||
            this.invalidLocationOtherMachine[i] == true
          ) {
            this.equipmentTableElement.nativeElement.focus();
          }
        }
        for (let i = 0; i < this.externalItemRow.length; i++) {
          if (
            this.invalidQuotationIDExternalItem[i] == true ||
            this.invalidItemExternalItem[i] == true ||
            this.invalidUOMExternalItem[i] == true ||
            this.invalidQuantityExternalItem[i] == true ||
            this.invalidRentPeriodExternalItem[i] == true ||
            this.invalidUnitExternalItem[i] == true ||
            this.invalidTimeExternalItem[i] == true ||
            this.invalidLocationExternalItem[i] == true
          ) {
            this.externalItemTableElement.nativeElement.focus();
          }
        }
      }
    }
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

  filterTimeArr() {
    let current = new Date();
    let latestTime = this.datepipe.transform(current, 'HH:mm');

    this.timeArr = this.timeArr.filter((time) => time.content > latestTime);
  }

  // --------------------------------------- Specific crew based on selected item for Manpower ------------------------------------------------
  MPspecificCrewValue(postIndex: number, event: any) {
    let arr = [];
    arr.push(event.item);

    this.manPowerRow[postIndex].SpecificCrew = arr;
  }

  MPspecificCrewDependency(item: string, id: number) {
    this.manPowerSpecificCrew = [];

    let findManPowerArr: any = this.manPowerArr.find(
      (elem) => elem.Item === item
    );
    let arr = [];
    arr.push(findManPowerArr);
    let secArr = arr[0].SpecificCrew;

    for (let i = 0; i < secArr.length; i++) {
      this.manPowerSpecificCrew.push({
        content: secArr[i].name,
        _entityName: secArr[i]._entityName,
        id: secArr[i].id,
        manpowercode: secArr[i].manpowercode,
        version: secArr[i].version,
      });
    }

    this.manPowerSpecificCrewList[id] = this.manPowerSpecificCrew;

    if (this.manPowerSpecificCrewList[id].length > 0) {
      this.MPdisabled[id] = false;
    } else {
      this.MPdisabled[id] = true;
    }
  }

  // --------------------------------------- Specific crew based on selected item for machinery ------------------------------------------------

  specificCrewValue(postIndex: number, event: any) {
    // console.log(event.item)
    let arr = [];
    arr.push(event.item);

    this.machineryRow[postIndex].SpecificCrew = arr;
  }

  specificCrewDependency(item: string, id: number) {
    this.machineSpecificCrewName = [];

    let findMachineArr: any = this.machineArr.find(
      (elem) => elem.Description === item
    );
    let arr = [];
    arr.push(findMachineArr);
    let secArr = arr[0].SpecificCrew;

    for (let i = 0; i < secArr.length; i++) {
      this.machineSpecificCrewName.push({
        content: secArr[i].name,
        _entityName: secArr[i]._entityName,
        id: secArr[i].id,
        manpowercode: secArr[i].manpowercode,
        version: secArr[i].version,
      });
    }

    this.machineSpecificCrewList[id] = this.machineSpecificCrewName;

    if (this.machineSpecificCrewList[id].length > 0) {
      this.disabled[id] = false;
    } else {
      this.disabled[id] = true;
    }
  }

  // --------------------------------------- Specific value for external item ------------------------------------------------

  specificItem(quotation: string, id: number, index: number) {
    this.externalItemDesc = [];

    let findExternalArr: any = this.external_itemsArr.find(
      (elem) => elem.quotation === quotation
    );

    let arr = [];
    arr.push(findExternalArr);

    // let descArr = arr[0].description;
    let descArr = arr[0].Item;
    let uomArr = arr[0].UOM;
    let qtyArr = arr[0].Quantity;
    let unitArr = arr[0].Unit;

    this.externalItemRow[index].UOM = uomArr;
    // this.externalItemRow[index].Quantity = qtyArr;
    this.maxQuantity[index] = qtyArr;
    this.externalItemRow[index].Unit = unitArr;
    this.externalItemRow[index].Item = descArr;

    console.log(descArr);
    this.externalItemDesc.push({
      content: descArr,
    });

    this.externalItemDescList[id] = this.externalItemDesc;

    if (this.externalItemDescList[id].length > 0) {
      this.externalDisbaled[id] = false;
    } else {
      this.externalDisbaled[id] = true;
    }
  }

  // ------------------------------------ Add required to table -----------------------------------------------------

  addRequired(index: number) {
    for (let i = 0; i < this.machineryRow.length; i++) {
      if (this.machineryRow[i].Item) {
        this.requiredMachinery[i] = true;

        this.noTableSelected = false;
        this.machineryTableInvalid = false;
        this.manPowerTableInvalid = false;
        this.otherMachineriesTableInvalid = false;
        this.externalItemTableInvalid = false;
      } else {
        this.requiredMachinery[i] = false;
      }
    }

    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (this.manPowerRow[i].Item) {
        this.requiredManPower[i] = true;

        this.noTableSelected = false;
        this.machineryTableInvalid = false;
        this.manPowerTableInvalid = false;
        this.otherMachineriesTableInvalid = false;
        this.externalItemTableInvalid = false;
      } else {
        this.requiredManPower[i] = false;
      }
    }

    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (this.otherMachineriesRow[i].Item) {
        this.requiredOtherMachineries[i] = true;

        this.noTableSelected = false;
        this.machineryTableInvalid = false;
        this.manPowerTableInvalid = false;
        this.otherMachineriesTableInvalid = false;
        this.externalItemTableInvalid = false;
      } else {
        this.requiredOtherMachineries[i] = false;
      }
    }

    for (let i = 0; i < this.externalItemRow.length; i++) {
      if (this.externalItemRow[i].quotation) {
        this.requiredExternalItem[i] = true;

        this.noTableSelected = false;
        this.machineryTableInvalid = false;
        this.manPowerTableInvalid = false;
        this.otherMachineriesTableInvalid = false;
        this.externalItemTableInvalid = false;
      } else {
        this.requiredExternalItem[i] = false;
      }
    }
  }
  // ----------------------------------------------------- Check length logic -----------------------------------------------------
  // Check if array still has checkbox == true
  checkLengthMachinery() {
    return this.machineryRow.some((item) => item.Selected == true);
  }

  checkLengthManPower() {
    return this.manPowerRow.some((item) => item.Selected == true);
  }

  checkLengthOtherMachineries() {
    return this.otherMachineriesRow.some((item) => item.Selected == true);
  }

  checkLengthExternalItem() {
    return this.externalItemRow.some((item) => item.Selected == true);
  }

  // ----------------------------------------------------- Check select checkbox -----------------------------------------------------
  checkboxChange(type: any, event: any) {
    let counter = {
      machinery: 'counterMachinery',
      manpower: 'counterManpower',
      equipment: 'counterEquipment',
      externalItem: 'counterExternal',
    };

    if (event === true) {
      this[counter[type]]++;
    } else if (event == false) {
      this[counter[type]]++;
    }
  }
  // ----------------------------------------------------- Delete row logic -----------------------------------------------------
  deleteMachinery() {
    for (let i = 0; i < this.machineryRow.length; i++) {
      this.invalidItemMachinery[i] = false;
      this.invalidQuantityMachinery[i] = false;
      this.invalidTimeMachinery[i] = false;
      this.invalidEHMachinery[i] = false;
      this.invalidLocationMachinery[i] = false;
      this.invalidProgrammeMachinery[i] = false;
    }

    this.machineryRow.forEach((ticket) => {
      if (ticket.Selected) {
        this.machineryRow = this.machineryRow.filter(
          (item) => item.Selected !== ticket.Selected
        );
      }
    });

    this.counterMachinery = 0;
  }

  deleteManPower() {
    for (let i = 0; i < this.manPowerRow.length; i++) {
      this.invalidItemManPower[i] = false;
      this.invalidQuantityManPower[i] = false;
      this.invalidTimeManPower[i] = false;
      this.invalidEHManPower[i] = false;
      this.invalidLocationManPower[i] = false;
    }

    this.manPowerRow.forEach((ticket) => {
      if (ticket.Selected) {
        this.manPowerRow = this.manPowerRow.filter(
          (item) => item.Selected !== ticket.Selected
        );
      }
    });

    this.counterManpower = 0;
  }

  deleteOtherMachineries() {
    for (let i = 0; i < this.manPowerRow.length; i++) {
      this.invalidItemOtherMachine[i] = false;
      this.invalidQuantityOtherMachine[i] = false;
      this.invalidTimeOtherMachine[i] = false;
      this.invalidEHOtherMachine[i] = false;
      this.invalidLocationOtherMachine[i] = false;
    }

    this.otherMachineriesRow.forEach((ticket) => {
      if (ticket.Selected) {
        this.otherMachineriesRow = this.otherMachineriesRow.filter(
          (item) => item.Selected !== ticket.Selected
        );
      }
    });
    this.counterEquipment = 0;
  }

  deleteExternalItem() {
    for (let i = 0; i < this.externalItemRow.length; i++) {
      this.invalidQuotationIDExternalItem[i] = false;
      this.invalidItemExternalItem[i] = false;
      this.invalidUOMExternalItem[i] = false;
      this.invalidQuantityExternalItem[i] = false;
      this.invalidRentPeriodExternalItem[i] = false;
      this.invalidUnitExternalItem[i] = false;
      this.invalidTimeExternalItem[i] = false;
      this.invalidLocationExternalItem[i] = false;
    }

    this.externalItemRow.forEach((ticket) => {
      if (ticket.Selected) {
        this.externalItemRow = this.externalItemRow.filter(
          (item) => item.Selected !== ticket.Selected
        );
      }
    });
    this.counterExternal = 0;
  }
  // ----------------------------------------------------- Cancel checkbox logic -----------------------------------------------------
  cancelMethodMachinery() {
    this.machineryRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
    this.counterMachinery = 0;
  }

  cancelMethodManPower() {
    this.manPowerRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
    this.counterManpower = 0;
  }

  cancelMethodOtherMachineries() {
    this.otherMachineriesRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
    this.counterEquipment = 0;
  }

  cancelMethodExternalItem() {
    this.externalItemRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
    this.counterExternal = 0;
  }

  // ----------------------------------------------------- Submitting Form -----------------------------------------------------
  onSubmit(normalForm: NgForm) {
    console.log('onsubmit');
    console.log(normalForm);
    console.log(normalForm.invalid);
    this.validateForm();
    this.validateBookingDate(true);
    console.log(this.mheFormID);

    if (normalForm.valid && !this.invalidProgram) {
      const data = {
        requestType: this.mheForm.requestType,
        companyName: this.mheForm.companyName,
        requestBy: this.mheForm.requestBy,
        requestOnBehalf: this.mheForm.requestOnBehalf,
        jobDescription: this.mheForm.jobDescription,
        PONum: this.mheForm.PONum,
        bookingType: this.mheForm.bookingType,
        singleDate: this.mheForm.singleDate,
        rangeDate: this.rangeDateRow,
        remarks: this.mheForm.remarks,
        machinery: this.machineryRow,
        manPower: this.manPowerRow,
        otherMachineries: this.otherMachineriesRow,
        externalItem: this.externalItemRow,
      };

      console.log(data);

      let param: any;
      let machinery = [];
      let manpower = [];
      let otherMachineries = [];
      let externalItem = [];
      let recurringDateRanges = [];

      // --------------- Create new array to match API mapping (START) --------------------------

      if (data.machinery.length > 0) {
        data.machinery.forEach((element, index) => {
          if (element.Item !== null) {
            machinery.push({
              item: element.Item ?? '',
              programme: element.Programme ?? '',
              quantity: element.Quantity ?? 0,
              time: element.Time ?? '',
              estimated_hour: element.EstimatedHours ?? 0,
              location: element.Location ?? '',
              specific_crew:
                element.SpecificCrew.length <= 0 ||
                element.SpecificCrew[0] == null ||
                !element.SpecificCrew[0]
                  ? ''
                  : element.SpecificCrew[0].content,
            });
          }
        });
      }

      if (data.manPower.length > 0) {
        data.manPower.forEach((element) => {
          if (element.Item !== null) {
            manpower.push({
              item: element.Item ?? '',
              programme: element.Programme ?? '',
              quantity: element.Quantity ?? 0,
              time: element.Time ?? '',
              estimated_hour: element.EstimatedHours ?? 0,
              location: element.Location ?? '',
              specific_crew:
                element.SpecificCrew.length <= 0 ||
                element.SpecificCrew[0] == null
                  ? ''
                  : element.SpecificCrew[0].content,
            });
          }
        });
      }

      if (data.otherMachineries.length > 0) {
        data.otherMachineries.forEach((element) => {
          if (element.Item !== null && element.Item !== '') {
            otherMachineries.push({
              item: element.Item ?? '',
              programme: element.Programme ?? '',
              quantity: element.Quantity ?? 0,
              time: element.Time ?? '',
              estimated_hour: element.EstimatedHours ?? 0,
              location: element.Location ?? '',
            });
          }
        });
      }

      if (data.externalItem.length > 0) {
        data.externalItem.forEach((element) => {
          if (element.Item !== '' && element.Item !== null) {
            externalItem.push({
              quotation_id: element.quotation ?? '',
              item: element.Item ?? '',
              UOM: element.UOM ?? '',
              quantity: +element.Quantity ?? 0,
              rent_period: element.RentPeriod ? +element.RentPeriod : 0,
              unit: element.Unit === '' ? 0 : +element.Unit,
              time: element.Time ?? '',
              location: element.Location ?? '',
            });
          }
        });
      }

      // --------------- Create new array to match API mapping (END) --------------------------
      param = {
        form: {
          formID: this.berthRequestFormService.getFormID(),
          request_behalf: data.requestOnBehalf,
          job_description: data.jobDescription,
          po_number: data.PONum,
          booking_type: data.bookingType.toUpperCase(),
          // booking_date: data.singleDate,
          remarks: data.remarks ?? '',
          machinery: machinery,
          manpower: manpower,
          equipment: otherMachineries,
          externalItem: externalItem,
        },
      };

      if (data.bookingType === 'Daily') {
        let booking_date;
        if (data.singleDate != '') {
          booking_date = formatDate(data.singleDate, 'yyyy-MM-dd', 'en_US');
        }
        param.form['booking_date'] = booking_date;
      } else if (data.bookingType === 'Recurring') {
        console.log(data.rangeDate);

        data.rangeDate.forEach((element) => {
          recurringDateRanges.push({
            start_date: formatDate(element.date[0], 'yyyy-MM-dd', 'en_US'),
            end_date: formatDate(element.date[1], 'yyyy-MM-dd', 'en_US'),
          });
        });

        param.form['recurring_date'] = recurringDateRanges;
      }

      if (this.mheFormID == '') {
        console.log('post');
        if (this.validateTableSelected() && !this.validateRow()) {
          console.log('Table selected');
          console.log(param);

          restServices.pbksb_MarineService
            .PostBerthMHERequestNormal(this.appService.myApp)(param)
            .then((result) => {
              console.log(result);
              let requestList: any = result;
              let request = JSON.parse(requestList);

              if (!request.status) {
                console.log(request);

                console.log('mhe normal save success');
                this.createNotification('success', 'submitted');
                this.updateStatus = true;
                this.postStatus = true;
                this.getRequestFormDetails();
              } else {
                this.createNotification('error', 'submit');
                console.log(request.status, 'mhe normal failed');
              }
            })
            .catch((err) => {
              this.createNotification('error', 'submit');
              console.log(err, 'mhe normal failed');
            });
          this.dateSelect = false;
        } else {
          console.log('No table selected');
          console.log(this.validateTableSelected(), this.validateRow());
        }
      } else {
        console.log('update');
        param.form['mheRequestFormID'] = this.mheFormID;

        if (this.validateTableSelected() && !this.validateRow()) {
          if (data.machinery.length > 0) {
            console.log(data.machinery);
            data.machinery.forEach((element, index) => {
              if (element.Item !== null) {
                isNaN(element.id)
                  ? (machinery[index]['id'] = element.id)
                  : (machinery[index]['id'] = '');
              }
            });
          }

          if (data.manPower.length > 0) {
            data.manPower.forEach((element, index) => {
              if (element.Item !== null) {
                isNaN(element.id)
                  ? (manpower[index]['id'] = element.id)
                  : (manpower[index]['id'] = '');
              }
            });
          }

          if (data.otherMachineries.length > 0) {
            data.otherMachineries.forEach((element, index) => {
              if (element.Item !== null) {
                isNaN(element.id)
                  ? (otherMachineries[index]['id'] = element.id)
                  : (otherMachineries[index]['id'] = '');
              }
            });
          }

          if (data.externalItem.length > 0) {
            data.externalItem.forEach((element, index) => {
              if (element.Item !== '' && element.Item !== null) {
                isNaN(element.id)
                  ? (externalItem[index]['id'] = element.id)
                  : (externalItem[index]['id'] = '');
              }
            });
          }

          console.log(param);

          restServices.pbksb_MarineService
            .UpdateBerthMHERequestNormal(this.appService.myApp)(param)
            .then((result) => {
              // console.log(result);
              let requestList: any = result;
              let request = JSON.parse(requestList);

              if (!request.status) {
                console.log(request);

                console.log('mhe normal update success');
                this.createNotification('success', 'updated');
                this.updateStatus = true;
                this.postStatus = true;
                this.getRequestFormDetails();
                this.dateSelect = false;
              } else {
                this.createNotification('error', 'update');
                console.log(this.mheForm.singleDate);
                console.log(request.status, 'mhe normal failed');
                this.dateSelect = true;
              }
            })
            .catch((err) => {
              this.createNotification('error', 'update');
              console.log(this.mheForm.singleDate);
              console.log(err, 'mhe normal update failed');
              this.dateSelect = true;
            });
        } else {
          console.log('No table selected');
          this.dateSelect = true;
          console.log(this.validateTableSelected(), this.validateRow());
        }
      }
    } else if (normalForm.invalid) {
      this.validateTableSelected();

      if (
        !this.mheForm.requestOnBehalf ||
        this.mheForm.requestOnBehalf.length == 0
      ) {
        this.invalidRequestOnBehalf = true;
      } else {
        this.invalidRequestOnBehalf = false;
      }

      if (!this.mheForm.jobDescription) {
        this.invalidJobDescription = true;
      } else if (this.mheForm.jobDescription) {
        this.invalidJobDescription = false;
      }

      if (!this.mheForm.PONum) {
        this.invalidPONum = true;
      } else if (this.mheForm.PONum) {
        this.invalidPONum = false;
      }

      if (!this.mheForm.singleDate) {
        this.invalidSingleDate = true;
      } else if (this.mheForm.singleDate) {
        this.invalidSingleDate = false;
      }

      // if (!this.mheForm.rangeDate){
      //   this.invalidRangeDate = true;
      // }else if (this.mheForm.rangeDate){
      //   this.invalidRangeDate = false;
      // }

      if (this.mheForm.bookingType == 'Recurring') {
        this.rangeDateRow.forEach((element) => {
          if (element.date[0] && element.date[1]) {
            this.invalidRangeDate[element.id] = false;
          } else {
            this.invalidRangeDate[element.id] = true;
            console.log('here');
          }
        });

        // for (let i = 0; i < this.rangeDateRow.length; i++) {
        //   if (!this.rangeDateRow[i].date) {
        //     this.invalidRangeDate[] = true;
        //     console.log('here');
        //   } else {
        //     this.invalidRangeDate[i] = false;
        //   }
        // }
      }

      this.validateRow();
      this.datePickerWarning();
    }
  }

  validateRow() {
    let rowErr = false;
    // Machinery row validation
    for (let i = 0; i < this.machineryRow.length; i++) {
      if (
        this.machineryRow[i].Item ||
        this.machineryRow[i].Programme ||
        this.machineryRow[i].Quantity ||
        this.machineryRow[i].Time ||
        this.machineryRow[i].EstimatedHours ||
        this.machineryRow[i].Location
      ) {
        if (
          !this.machineryRow[i].Item ||
          this.machineryRow[i].Item.length <= 0
        ) {
          this.invalidItemMachinery[i] = true;
          rowErr = true;
        } else {
          this.invalidItemMachinery[i] = false;
        }

        if (!this.machineryRow[i].Programme) {
          this.invalidProgrammeMachinery[i] = true;
          rowErr = true;
        } else {
          this.invalidProgrammeMachinery[i] = false;
        }

        if (!this.machineryRow[i].Quantity) {
          this.invalidQuantityMachinery[i] = true;
          rowErr = true;
        } else {
          this.invalidQuantityMachinery[i] = false;
        }

        if (!this.machineryRow[i].Time) {
          this.invalidTimeMachinery[i] = true;
          rowErr = true;
        } else {
          this.invalidTimeMachinery[i] = false;
        }

        if (!this.machineryRow[i].EstimatedHours) {
          this.invalidEHMachinery[i] = true;
          rowErr = true;
        } else {
          this.invalidEHMachinery[i] = false;
        }

        if (
          !this.machineryRow[i].Location ||
          this.machineryRow[i].Location.length <= 0
        ) {
          this.invalidLocationMachinery[i] = true;
          rowErr = true;
        } else {
          this.invalidLocationMachinery[i] = false;
        }
      }
    }

    // Man Power row validation
    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (
        this.manPowerRow[i].Item ||
        this.manPowerRow[i].Programme ||
        this.manPowerRow[i].Quantity ||
        this.manPowerRow[i].Time ||
        this.manPowerRow[i].EstimatedHours ||
        this.manPowerRow[i].Location
      ) {
        if (!this.manPowerRow[i].Item || this.manPowerRow[i].Item.length <= 0) {
          rowErr = true;
          this.invalidItemManPower[i] = true;
        } else {
          this.invalidItemManPower[i] = false;
        }

        if (!this.manPowerRow[i].Programme) {
          rowErr = true;
          this.invalidProgrammeManpower[i] = true;
        } else {
          this.invalidProgrammeManpower[i] = false;
        }

        if (!this.manPowerRow[i].Quantity) {
          rowErr = true;
          this.invalidQuantityManPower[i] = true;
        } else {
          this.invalidQuantityManPower[i] = false;
        }

        if (!this.manPowerRow[i].Time) {
          rowErr = true;
          this.invalidTimeManPower[i] = true;
        } else {
          this.invalidTimeManPower[i] = false;
        }

        if (!this.manPowerRow[i].EstimatedHours) {
          rowErr = true;
          this.invalidEHManPower[i] = true;
        } else {
          this.invalidEHManPower[i] = false;
        }

        if (
          !this.manPowerRow[i].Location ||
          this.manPowerRow[i].Location.length <= 0
        ) {
          rowErr = true;
          this.invalidLocationManPower[i] = true;
        } else {
          this.invalidLocationManPower[i] = false;
        }
      }
    }

    // Other Machineries validation
    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (
        this.otherMachineriesRow[i].Item ||
        this.otherMachineriesRow[i].Programme ||
        this.otherMachineriesRow[i].Quantity ||
        this.otherMachineriesRow[i].Time ||
        this.otherMachineriesRow[i].EstimatedHours ||
        this.otherMachineriesRow[i].Location
      ) {
        if (
          !this.otherMachineriesRow[i].Item ||
          this.otherMachineriesRow[i].Item.length <= 0
        ) {
          rowErr = true;
          this.invalidItemOtherMachine[i] = true;
        } else {
          this.invalidItemOtherMachine[i] = false;
        }

        if (!this.otherMachineriesRow[i].Programme) {
          rowErr = true;
          this.invalidProgrammeEquipment[i] = true;
        } else {
          this.invalidProgrammeEquipment[i] = false;
        }

        if (!this.otherMachineriesRow[i].Quantity) {
          rowErr = true;
          this.invalidQuantityOtherMachine[i] = true;
        } else {
          this.invalidQuantityOtherMachine[i] = false;
        }

        if (!this.otherMachineriesRow[i].Time) {
          rowErr = true;
          this.invalidTimeOtherMachine[i] = true;
        } else {
          this.invalidTimeOtherMachine[i] = false;
        }

        if (!this.otherMachineriesRow[i].EstimatedHours) {
          rowErr = true;
          this.invalidEHOtherMachine[i] = true;
        } else {
          this.invalidEHOtherMachine[i] = false;
        }

        if (
          !this.otherMachineriesRow[i].Location ||
          this.otherMachineriesRow[i].Location.length <= 0
        ) {
          rowErr = true;
          this.invalidLocationOtherMachine[i] = true;
        } else {
          this.invalidLocationOtherMachine[i] = false;
        }
      }
    }

    // External Item Validation
    for (let i = 0; i < this.externalItemRow.length; i++) {
      if (
        this.externalItemRow[i].quotation ||
        this.externalItemRow[i].Item ||
        this.externalItemRow[i].UOM ||
        this.externalItemRow[i].Quantity ||
        this.externalItemRow[i].RentPeriod ||
        this.externalItemRow[i].Unit ||
        this.externalItemRow[i].Time ||
        this.externalItemRow[i].Location
      ) {
        if (!this.externalItemRow[i].quotation) {
          this.invalidQuotationIDExternalItem[i] = true;
          rowErr = true;
        } else {
          this.invalidQuotationIDExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Item) {
          this.invalidItemExternalItem[i] = true;
          rowErr = true;
        } else {
          this.invalidItemExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].UOM) {
          this.invalidUOMExternalItem[i] = true;
          rowErr = true;
        } else {
          this.invalidUOMExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Quantity) {
          this.invalidQuantityExternalItem[i] = true;
          rowErr = true;
        } else {
          this.invalidQuantityExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].RentPeriod) {
          this.invalidRentPeriodExternalItem[i] = true;
          rowErr = true;
        } else {
          this.invalidRentPeriodExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Unit) {
          this.invalidUnitExternalItem[i] = true;
          rowErr = true;
        } else {
          this.invalidUnitExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Time) {
          this.invalidTimeExternalItem[i] = true;
          rowErr = true;
        } else {
          this.invalidTimeExternalItem[i] = false;
        }

        if (
          !this.externalItemRow[i].Location ||
          this.externalItemRow[i].Location.length <= 0
        ) {
          this.invalidLocationExternalItem[i] = true;
          rowErr = true;
        } else {
          this.invalidLocationExternalItem[i] = false;
        }
      }
    }

    this.focusOnInvalid();
    return rowErr;
  }

  validateTableSelected() {
    if (
      this.mheForm.bookingType == 'Daily' &&
      this.dailyDate < this.currentDate
    ) {
      this.backDatedDate = true;
      this.invalidbackDated = true;
      console.log('in1', this.dailyDate, this.currentDate);
    } else if (
      this.mheForm.bookingType == 'Daily' &&
      this.dailyDate == this.currentDate
    ) {
      this.backDatedDate = true;
      this.invalidbackDated = true;
      console.log('in1.1', this.dailyDate, this.currentDate);
    } else if (
      this.invalidbackDateds.includes(true) ||
      this.invalidRangeDate.includes(true) ||
      this.rangeInvalidRangeDate.includes(true)
    ) {
      console.log(this.invalidbackDateds);
      console.log(this.invalidRangeDate);
      console.log(this.rangeInvalidRangeDate);
      console.log('in2');
      this.focusOnInvalid();
    } else if (
      this.machineryRow.length >= 1 &&
      this.manPowerRow.length >= 1 &&
      this.otherMachineriesRow.length >= 1 &&
      this.externalItemRow.length >= 1 &&
      this.machineryRow[0].Item == null &&
      this.manPowerRow[0].Item == null &&
      this.otherMachineriesRow[0].Item == null &&
      this.externalItemRow[0].quotation == null
    ) {
      // console.warn('Please select one of the table')
      this.noTableSelected = true;
      this.machineryTableInvalid = true;
      this.manPowerTableInvalid = true;
      this.otherMachineriesTableInvalid = true;
      this.externalItemTableInvalid = true;
      console.log('in3');
    } else if (
      this.machineryRow.length < 1 &&
      this.manPowerRow.length < 1 &&
      this.otherMachineriesRow.length < 1 &&
      this.externalItemRow.length < 1
    ) {
      this.noTableSelected = true;
      this.machineryTableInvalid = true;
      this.manPowerTableInvalid = true;
      this.otherMachineriesTableInvalid = true;
      this.externalItemTableInvalid = true;
      console.log('in4');
    } else if (
      this.machineryRow.length >= 1 &&
      this.machineryRow[0].Item == null &&
      this.manPowerRow.length < 1 &&
      this.otherMachineriesRow.length < 1 &&
      this.externalItemRow.length < 1
    ) {
      this.noTableSelected = true;
      this.machineryTableInvalid = true;
      this.manPowerTableInvalid = true;
      this.otherMachineriesTableInvalid = true;
      this.externalItemTableInvalid = true;
      console.log('in5');
    } else if (
      this.machineryRow.length < 1 &&
      this.manPowerRow.length >= 1 &&
      this.manPowerRow[0].Item == null &&
      this.otherMachineriesRow.length < 1 &&
      this.externalItemRow.length < 1
    ) {
      this.noTableSelected = true;
      this.machineryTableInvalid = true;
      this.manPowerTableInvalid = true;
      this.otherMachineriesTableInvalid = true;
      this.externalItemTableInvalid = true;
      console.log('in6');
    } else if (
      this.machineryRow.length < 1 &&
      this.manPowerRow.length < 1 &&
      this.otherMachineriesRow.length >= 1 &&
      this.otherMachineriesRow[0].Item == null &&
      this.externalItemRow.length < 1
    ) {
      this.noTableSelected = true;
      this.machineryTableInvalid = true;
      this.manPowerTableInvalid = true;
      this.otherMachineriesTableInvalid = true;
      this.externalItemTableInvalid = true;
      console.log('in7');
    } else if (
      this.machineryRow.length < 1 &&
      this.manPowerRow.length < 1 &&
      this.otherMachineriesRow.length < 1 &&
      this.externalItemRow.length >= 1 &&
      this.externalItemRow[0].quotation == null
    ) {
      this.noTableSelected = true;
      this.machineryTableInvalid = true;
      this.manPowerTableInvalid = true;
      this.otherMachineriesTableInvalid = true;
      this.externalItemTableInvalid = true;
      console.log('in8');
    } else if (this.validateZeroValEH()) {
      console.log('in9');
    } else {
      console.log('in10');
      return true;
    }
  }

  validateZeroValEH() {
    let flag = false;

    for (let i = 0; i < this.machineryRow.length; i++) {
      if (!this.machineryRow[i].EstimatedHours && this.machineryRow[i].Time) {
        this.invalidEHMachinery[i] = true;
        flag = true;
      } else {
        this.invalidEHMachinery[i] = false;
      }
    }

    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (!this.manPowerRow[i].EstimatedHours && this.manPowerRow[i].Time) {
        this.invalidEHManPower[i] = true;
        flag = true;
      } else {
        this.invalidEHManPower[i] = false;
      }
    }

    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (
        !this.otherMachineriesRow[i].EstimatedHours &&
        this.otherMachineriesRow[i].Time
      ) {
        this.invalidEHOtherMachine[i] = true;
        flag = true;
      } else {
        this.invalidEHOtherMachine[i] = false;
      }
    }

    return flag;
  }

  bindData(data) {
    this.mheForm.requestOnBehalf = data.berthMHERequest[0].request_behalf.name;

    let rangeDate = [];

    if (data.berthMHERequestDateRecurrings.length < 1) {
      this.mheForm.singleDate = formatDate(
        data.berthMHERequest[0].booking_date,
        'dd/MM/yyyy',
        'en_US'
      );

      this.mheForm.bookingType = 'Daily';
    } else {
      data.berthMHERequestDateRecurrings.forEach((element, i) => {
        // var start_date = element.start_date.split('/');
        // var end_date = element.end_date.split('/');
        rangeDate.push({
          id: i,
          date: [
            // formatDate(element.start_date, 'dd/MM/yyyy', 'en_US'),
            // formatDate(element.end_date, 'dd/MM/yyyy', 'en_US'),
            new Date(element.start_date),
            new Date(element.end_date),
          ],
        });
        console.log(rangeDate);
      });

      this.rangeDateRow = rangeDate;
      this.mheForm.bookingType = 'Recurring';
    }

    this.mheForm.jobDescription = data.berthMHERequest[0].job_description;
    this.mheForm.PONum = this.poNumber;
    this.mheForm.remarks = data.berthMHERequest[0].remarks;
    console.log(data.machineries);

    if (data.machineries.length > 0) {
      data.machineries.forEach((element, index) => {
        if (!this.postStatus) {
          this.machineryRow.push({
            id: element.id,
            Item: element.item.description,
            Programme: element.program,
            Quantity: element.quantity,
            Time: element?.time?.slice(0, 5),
            EstimatedHours: element.estimated_hour,
            Location: element.location.description,
            SpecificCrew: element.specific_crew?.name ?? '',
            Selected: false,
          });
        } else {
          this.machineryRow[index]['id'] = element.id;
        }
      });
    }

    if (data.manpowers.length > 0) {
      data.manpowers.forEach((element, index) => {
        if (!this.postStatus) {
          this.manPowerRow.push({
            id: element.id,
            Item: element.item.description,
            Programme: element.program,
            Quantity: element.quantity,
            Time: element?.time?.slice(0, 5),
            EstimatedHours: element.estimated_hour,
            Location: element.location.description,
            SpecificCrew: element.specific_crew?.name ?? '',
            Selected: false,
          });
        } else {
          this.manPowerRow[index]['id'] = element.id;
        }
      });
    }

    if (data.equipments.length > 0) {
      data.equipments.forEach((element, index) => {
        if (!this.postStatus) {
          this.otherMachineriesRow.push({
            id: element.id,
            Item: element.item.description,
            Programme: element.program,
            Quantity: element.quantity,
            Time: element?.time?.slice(0, 5) ?? 'N/A',
            EstimatedHours: element.estimated_hour,
            Location: element.location.description,
            Selected: false,
          });
        } else {
          this.otherMachineriesRow[index]['id'] = element.id;
        }
      });
    }

    if (data.externalItems.length > 0) {
      data.externalItems.forEach((element, index) => {
        if (!this.postStatus) {
          this.externalItemRow.push({
            id: element.id,
            quotation: element.quotation.quotation,
            Item: element.quotation.item,
            UOM: element.uom,
            Quantity: element.quantity,
            RentPeriod: element.rent_period,
            Unit: element.unit,
            Time: element?.time?.slice(0, 5),
            Location: element?.location?.description ?? 'N/A',
            Selected: false,
          });
        } else {
          this.externalItemRow[index]['id'] = element.id;
        }
      });
    }
  }

  createNotification(type, keywords) {
    let title = '';
    let subtitle = '';
    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `MHE Normal is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `MHE Normal failed to ${keywords}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
  }
}
