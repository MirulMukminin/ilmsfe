import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import {
  ExternalItem,
  MachineryBerth,
  ManPowerBerth,
  MheForm,
  OtherMachineriesBerth,
  RangeDate,
} from 'src/app/operation-system/interfaces/MHE/mhe_interface';
import { restServices } from 'services';
import { BerthRequestFormService } from 'src/app/operation-system/services/Marine/berth-request-form.service';

@Component({
  selector: 'app-mhe-preview-normal',
  templateUrl: './mhe-preview-normal.component.html',
  styleUrls: ['./mhe-preview-normal.component.scss'],
})
export class MhePreviewNormalComponent implements OnInit {
  @ViewChild('machineryTableElement') machineryTableElement: ElementRef;
  @ViewChild('externalItemTableElement') externalItemTableElement: ElementRef;
  @ViewChild('equipmentTableElement') equipmentTableElement: ElementRef;
  @ViewChild('manPowerTableElement') manPowerTableElement: ElementRef;

  @Input() mheFormID: string;
  @Input() array: any = {};
  @Output() openEdit = new EventEmitter<any>();

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
  invalidRequestOnBehalf = false;
  invalidJobDescription = false;
  invalidPONum = false;
  invalidSingleDate = false;
  invalidRangeDate: any = [];
  rangeInvalidRangeDate: any = [];
  invalidBookingType = false;

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

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  // For numbering input
  step = 1;
  min = 0;
  max = 100;

  // Date type option
  typeOfBooking: any[] = [
    {
      type: 'Daily',
      checked: true,
    },
    {
      type: 'Recurring',
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

  companyName: string;
  requestByName: string;

  updateStatus = false;
  formID: any;
  date = new Date();
  RequestNo = '';
  dateSelect = false;

  constructor(
    private appService: AppService,
    public datepipe: DatePipe,
    private _Activatedroute: ActivatedRoute,
    private berthRequestFormService: BerthRequestFormService
  ) {}

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
        this.requestByName = initialData.Company;

        this.getRestServiceAPI(initialData);

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
          this.requestOnBehalfName.push({
            content: this.requestOnBehalfArr[i].customer_behalf.name,
          });
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

        this.requestOnBehalfList = this.requestOnBehalfName;

        this.sitesList = this.sitesName.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.QuotationIDList = this.QuotationID;
        //console.log(this.itemList);
      })
      .then(() => {
        this.bindData();
      })
      .catch((err) => {
        // console.log("masuk err");
        console.error(err);
      });
  }

  // ------------------------------------ Add Item Start (End) -----------------------------------------------------//

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
  // ------------------------------------ Add Item Row (End) -----------------------------------------------------//

  // ------------------------------------ Remove invalid UI when user enter a value (Start) -----------------------------------------------------//

  dropdownValueChange() {
    if (this.mheForm.requestOnBehalf) {
      this.invalidRequestOnBehalf = false;
    }

    for (let i = 0; i < this.machineryRow.length; i++) {
      if (this.machineryRow[i].Item) {
        this.invalidItemMachinery[i] = false;
      }

      if (this.machineryRow[i].Time) {
        this.invalidTimeMachinery[i] = false;
      }

      if (this.machineryRow[i].Location) {
        this.invalidLocationMachinery[i] = false;
      }
    }

    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (this.manPowerRow[i].Item) {
        this.invalidItemManPower[i] = false;
      }

      if (this.manPowerRow[i].Time) {
        this.invalidTimeManPower[i] = false;
      }

      if (this.manPowerRow[i].Location) {
        this.invalidLocationManPower[i] = false;
      }
    }

    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (this.otherMachineriesRow[i].Item) {
        this.invalidItemOtherMachine[i] = false;
      }

      if (this.otherMachineriesRow[i].Time) {
        this.invalidTimeOtherMachine[i] = false;
      }

      if (this.otherMachineriesRow[i].Location) {
        this.invalidLocationOtherMachine[i] = false;
      }
    }

    for (let i = 0; i < this.externalItemRow.length; i++) {
      if (this.externalItemRow[i].Item) {
        this.invalidItemExternalItem[i] = false;
      }

      if (this.externalItemRow[i].Unit) {
        this.invalidUnitExternalItem[i] = false;
      }

      if (this.externalItemRow[i].Time) {
        this.invalidTimeExternalItem[i] = false;
      }

      if (this.externalItemRow[i].Location) {
        this.invalidLocationExternalItem[i] = false;
      }
    }
  }

  inputValueChange() {
    if (this.mheForm.requestOnBehalf) {
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
      }

      if (this.externalItemRow[i].Unit) {
        this.invalidUnitExternalItem[i] = false;
      }

      if (this.externalItemRow[i].RentPeriod) {
        this.invalidRentPeriodExternalItem[i] = false;
      }
    }
  }
  // ------------------------------------ Remove invalid UI when user enter a value (End) -----------------------------------------------------//

  // ------------------------------------ Focus on Invalid (Start) -----------------------------------------------------//
  focusOnInvalid() {
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
  // ------------------------------------ Focus on Invalid (End) -----------------------------------------------------//

  // ----------------------------------------------------- Check length logic (Start) -----------------------------------------------------

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

  // ----------------------------------------------------- Check length logic (End) -----------------------------------------------------

  // --------------------------------------- Specific crew based on selected item for Manpower (Start) ------------------------------------------------
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

  // --------------------------------------- Specific crew based on selected item for Manpower (End) ------------------------------------------------

  // --------------------------------------- Specific crew based on selected item for machinery (Start) ------------------------------------------------

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
  // --------------------------------------- Specific crew based on selected item for machinery (End) ------------------------------------------------

  // --------------------------------------- Specific value for external item (Start) ------------------------------------------------
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
    this.externalItemRow[index].Quantity = qtyArr;
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
  // --------------------------------------- Specific value for external item (End) ------------------------------------------------

  // ------------------------------------ Add required to table (Start) -----------------------------------------------------

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
  // ------------------------------------ Add required to table (End) -----------------------------------------------------

  // ------------------------------------ Delete row logic (Start) -----------------------------------------------------
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
  }
  // ------------------------------------ Delete row logic (End) -----------------------------------------------------

  // ------------------------------------ Cancel checkbox logic (Start) -----------------------------------------------------
  cancelMethodMachinery() {
    this.machineryRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
  }

  cancelMethodManPower() {
    this.manPowerRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
  }

  cancelMethodOtherMachineries() {
    this.otherMachineriesRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
  }

  cancelMethodExternalItem() {
    this.externalItemRow.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
  }
  // ------------------------------------ Cancel checkbox logic (End) -----------------------------------------------------

  // ------------------------------------  Submitting Form (Start) -----------------------------------------------------
  onSubmit() {
    const data = {
      requestType: this.mheForm.requestType,
      companyName: (this.mheForm.companyName = this.companyName),
      requestBy: (this.mheForm.requestBy = this.requestByName),
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

    if (this.validateTableSelected() && !this.validateRow()) {
      console.log('Table selected');
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
              id: element.id,
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

      if (data.manPower.length > 0) {
        data.manPower.forEach((element) => {
          if (element.Item !== null) {
            manpower.push({
              id: element.id,
              item: element.Item ?? '',
              programme: element.Programme ?? '',
              quantity: element.Quantity ?? 0,
              time: element.Time ?? '',
              estimated_hour: element.EstimatedHours ?? 0,
              location: element.Location ?? '',
              specific_crew:
                element.SpecificCrew.length <= 0 || !element.SpecificCrew[0]
                  ? ''
                  : element.SpecificCrew[0].content,
            });
          }
        });
      }

      if (data.otherMachineries.length > 0) {
        data.otherMachineries.forEach((element) => {
          if (element.Item !== null) {
            otherMachineries.push({
              id: element.id,
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
              id: element.id,
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
      if (data.bookingType === 'Daily') {
        console.log(data.singleDate);

        let booking_date;
        if (data.singleDate != '') {
          if (!this.dateSelect) {
            var dateParts = data.singleDate.split('/');
            booking_date = new Date(
              +dateParts[2],
              +dateParts[1] - 1,
              +dateParts[0]
            );
          } else {
            booking_date = formatDate(data.singleDate, 'yyyy-MM-dd', 'en_US');
          }
        }

        param = {
          form: {
            formID: this.berthRequestFormService.getBerthFormID(),
            mheRequestFormID: this.mheFormID,
            request_behalf: data.requestOnBehalf,
            job_description: data.jobDescription,
            po_number: data.PONum,
            booking_type: data.bookingType.toUpperCase(),
            // booking_date: formatDate(data.singleDate, 'yyyy-MM-dd', 'en_US'),
            booking_date: this.datepipe.transform(booking_date, 'yyyy-MM-dd'),
            remarks: data.remarks ?? '-',
            machinery: machinery,
            manpower: manpower,
            equipment: otherMachineries,
            externalItem: externalItem,
          },
        };
      } else if (data.bookingType === 'Recurring') {
        console.log(data.rangeDate);

        data.rangeDate.forEach((element) => {
          recurringDateRanges.push({
            start_date: formatDate(element.date[0], 'yyyy-MM-dd', 'en_US'),
            end_date: formatDate(element.date[1], 'yyyy-MM-dd', 'en_US'),
          });
        });

        param = {
          form: {
            formID: this.berthRequestFormService.getBerthFormID(),
            mheRequestFormID: this.mheFormID,
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
            recurring_date: recurringDateRanges,
          },
        };
      }

      console.log(param);

      restServices.pbksb_MarineService
        .UpdateBerthMHERequestNormal(this.appService.myApp)(param)
        .then((result) => {
          console.log(result);
          let requestList: any = result;
          let request = JSON.parse(requestList);

          if (!request.status) {
            console.log(request);

            console.log('mhe normal save success');
            this.createNotification('success', 'submitted');
            this.updateStatus = true;
            this.openEdit.emit();
          } else {
            this.createNotification('error', 'submit');
            console.log(request.status, 'mhe normal failed');
          }
        })
        .catch((err) => {
          this.createNotification('error', 'submit');
          console.log(err, 'mhe normal failed');
        });
    } else {
      console.log('No table selected');
      console.log(this.validateTableSelected(), this.validateRow());
    }
  }
  // --------------------------------------- Submitting Form (End) -----------------------------------------------------

  // --------------------------------------- Validation Row (Start) -----------------------------------------------------
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
        if (!this.machineryRow[i].Item) {
          this.invalidItemMachinery[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidItemMachinery[i] = false;
        }

        if (!this.machineryRow[i].Programme) {
          this.invalidProgrammeMachinery[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidProgrammeMachinery[i] = false;
        }

        if (!this.machineryRow[i].Quantity) {
          this.invalidQuantityMachinery[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidQuantityMachinery[i] = false;
        }

        if (!this.machineryRow[i].Time) {
          this.invalidTimeMachinery[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidTimeMachinery[i] = false;
        }

        if (!this.machineryRow[i].EstimatedHours) {
          this.invalidEHMachinery[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidEHMachinery[i] = false;
        }

        if (!this.machineryRow[i].Location) {
          this.invalidLocationMachinery[i] = true;
          rowErr = true;
          console.log('in1');
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
        if (!this.manPowerRow[i].Item) {
          rowErr = true;
          console.log('in1');
          this.invalidItemManPower[i] = true;
        } else {
          this.invalidItemManPower[i] = false;
        }

        if (!this.manPowerRow[i].Programme) {
          rowErr = true;
          console.log('in1');
          this.invalidProgrammeManpower[i] = true;
        } else {
          this.invalidProgrammeManpower[i] = false;
        }

        if (!this.manPowerRow[i].Quantity) {
          rowErr = true;
          console.log('in1');
          this.invalidQuantityManPower[i] = true;
        } else {
          this.invalidQuantityManPower[i] = false;
        }

        if (!this.manPowerRow[i].Time) {
          rowErr = true;
          console.log('in1');
          this.invalidTimeManPower[i] = true;
        } else {
          this.invalidTimeManPower[i] = false;
        }

        if (!this.manPowerRow[i].EstimatedHours) {
          rowErr = true;
          console.log('in1');
          this.invalidEHManPower[i] = true;
        } else {
          this.invalidEHManPower[i] = false;
        }

        if (!this.manPowerRow[i].Location) {
          rowErr = true;
          console.log('in1');
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
        if (!this.otherMachineriesRow[i].Item) {
          rowErr = true;
          console.log('in1');
          this.invalidItemOtherMachine[i] = true;
        } else {
          this.invalidItemOtherMachine[i] = false;
        }

        if (!this.otherMachineriesRow[i].Programme) {
          rowErr = true;
          console.log('in1');
          this.invalidProgrammeEquipment[i] = true;
        } else {
          this.invalidProgrammeEquipment[i] = false;
        }

        if (!this.otherMachineriesRow[i].Quantity) {
          rowErr = true;
          console.log('in1');
          this.invalidQuantityOtherMachine[i] = true;
        } else {
          this.invalidQuantityOtherMachine[i] = false;
        }

        if (!this.otherMachineriesRow[i].Time) {
          rowErr = true;
          console.log('in1');
          this.invalidTimeOtherMachine[i] = true;
        } else {
          this.invalidTimeOtherMachine[i] = false;
        }

        if (!this.otherMachineriesRow[i].EstimatedHours) {
          rowErr = true;
          console.log('in1');
          this.invalidEHOtherMachine[i] = true;
        } else {
          this.invalidEHOtherMachine[i] = false;
        }

        if (!this.otherMachineriesRow[i].Location) {
          rowErr = true;
          console.log('in1');
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
          console.log('in1');
        } else {
          this.invalidQuotationIDExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Item) {
          this.invalidItemExternalItem[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidItemExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].UOM) {
          this.invalidUOMExternalItem[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidUOMExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Quantity) {
          this.invalidQuantityExternalItem[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidQuantityExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].RentPeriod) {
          this.invalidRentPeriodExternalItem[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidRentPeriodExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Unit) {
          this.invalidUnitExternalItem[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidUnitExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Time) {
          this.invalidTimeExternalItem[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidTimeExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Location) {
          this.invalidLocationExternalItem[i] = true;
          rowErr = true;
          console.log('in1');
        } else {
          this.invalidLocationExternalItem[i] = false;
        }
      }
    }

    this.focusOnInvalid();
    return rowErr;
  }
  // --------------------------------------- Validation Row (End) -----------------------------------------------------

  // --------------------------------------- Validation Table (Start) -----------------------------------------------------
  validateTableSelected() {
    if (
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
  // --------------------------------------- Validation Table (End) -----------------------------------------------------

  // --------------------------------------- Validation Zero Value (Start) -----------------------------------------------------
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
  // --------------------------------------- Validation Zero Value (End) -----------------------------------------------------

  bindData() {
    this.mheForm.requestOnBehalf =
      this.array.berthMHERequest[0].request_behalf.name;

    let rangeDate = [];

    if (this.array.berthMHERequestDateRecurrings.length < 1) {
      this.mheForm.singleDate = formatDate(
        this.array.berthMHERequest[0].booking_date,
        'dd/MM/yyyy',
        'en_US'
      );

      console.log(this.mheForm.singleDate);

      this.mheForm.bookingType = 'Daily';
    } else {
      this.array.berthMHERequestDateRecurrings.forEach((element, i) => {
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

    this.mheForm.jobDescription = this.array.berthMHERequest[0].job_description;
    this.mheForm.PONum = this.array.berthMHERequest[0].po_number;
    this.mheForm.remarks = this.array.berthMHERequest[0].remarks;

    if (this.array.machineries.length > 0) {
      for (const element of this.array.machineries) {
        this.machineryRow.push({
          id: element.id,
          Item: element.item.description,
          Programme: element.program,
          Quantity: element.quantity,
          Time: element.time.slice(0, 5),
          EstimatedHours: element.estimated_hour,
          Location: element.location.description,
          SpecificCrew: element.specific_crew?.name ?? '',
          Selected: false,
        });
      }
    }

    if (this.array.manpowers.length > 0) {
      for (const element of this.array.manpowers) {
        this.manPowerRow.push({
          id: element.id,
          Item: element.item.description,
          Programme: element.program,
          Quantity: element.quantity,
          Time: element.time.slice(0, 5),
          EstimatedHours: element.estimated_hour,
          Location: element.location.description,
          SpecificCrew: element.specific_crew?.name ?? '',
          Selected: false,
        });
      }
    }

    if (this.array.equipments.length > 0) {
      for (const element of this.array.equipments) {
        this.otherMachineriesRow.push({
          id: element.id,
          Item: element.item.description,
          Programme: element.program,
          Quantity: element.quantity,
          Time: element.time.slice(0, 5),
          EstimatedHours: element.estimated_hour,
          Location: element.location.description,
          Selected: false,
        });
        console.log(this.otherMachineriesRow);
      }
    }

    if (this.array.externalItems.length > 0) {
      for (const element of this.array.externalItems) {
        this.externalItemRow.push({
          id: element.id,
          quotation: element.quotation.quotation,
          Item: element.quotation.item,
          UOM: element.uom,
          Quantity: element.quantity,
          RentPeriod: element.rent_period,
          Unit: element.unit,
          Time: element.time.slice(0, 5),
          Location: element.location.description,
          Selected: false,
        });
        console.log(this.externalItemRow);
      }
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
