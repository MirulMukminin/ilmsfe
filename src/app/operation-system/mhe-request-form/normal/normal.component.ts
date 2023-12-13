import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import {
  DetailBreakdown,
  ExternalItem,
  Machinery,
  MachineryContract,
  ManPower,
  MheForm,
  OtherMachineries,
  RangeDate,
  Vessel,
} from '../../interfaces/MHE/mhe_interface';
import { DetailBreakdownService } from '../../services/MHE/detail-breakdown.service';
import { RequestFormService } from '../../services/MHE/request-form.service';

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.scss'],
})
export class NormalComponent implements OnInit {
  @ViewChild('requestOnBehalfFocus') requestOnBehalfFocus: ElementRef;
  @ViewChild('jobDescFocus') jobDescFocus: ElementRef;
  @ViewChild('poNumberFocus') poNumberFocus: ElementRef;
  @ViewChild('bookingDateFocus') bookingDateFocus: ElementRef;
  @ViewChild('machineryFocus') machineryFocus: ElementRef;
  @ViewChild('manpowerFocus') manpowerFocus: ElementRef;
  @ViewChild('othermachineryFocus') othermachineryFocus: ElementRef;
  @ViewChild('externalFocus') externalFocus: ElementRef;
  @ViewChild('contractNoFocus') contractNoFocus: ElementRef;
  @ViewChild('vessel') vessel;

  // @Input() detailBreakdownList: any = {};
  detailBreakdownList: DetailBreakdown = {};
  totalEstimatedPrice = '';

  requiredMachinery: any[] = [];
  requiredManPower: any[] = [];
  requiredOtherMachineries: any[] = [];
  requiredExternalItem: any[] = [];

  backDatedDate = false;
  invalidbackDated = false;

  invalidbackDateds = [];
  rangeDateWarning = [];
  dateWarning = [];
  rangeInvalidRangeDate: any = [];

  todayDateTime = new Date();
  todayDate: any;
  dailyDate: any;
  currentDate: any;

  disabled: any[] = [];
  MPdisabled: any[] = [];

  rangeDateFirstIndex = '';

  dateFlag: boolean;
  nextDay: boolean;
  sameDay: boolean;
  dateErr: boolean;
  status = 'BOOKED';

  timeArr = [];
  open = false;

  // From parent component (mhe-request-form component)
  @Input() requestByName: string;
  @Input() companyName: string;

  requestOnBehalfArr: any[] = [];
  requestOnBehalfName: any[] = [];
  requestOnBehalfList: any[] = [];

  sitesArr: any[] = [];
  sitesName: any[] = [];
  sitesList: any[] = [];

  machineArr: any[] = [];
  machineItem: any[] = [];
  itemList: any[] = [];
  equipmentItemList: any[] = [];

  machineArrDesc: any[] = [];
  boActivitiesList: any[] = [];
  machineDescItem: any[] = [];
  equipmentArrDesc: any[] = [];
  equipmentDescItem: any[] = [];
  descItemList: any[] = [];
  descItemEQList: any[] = [];

  contractArr: any[] = [];
  contractItem: any[] = [];
  contractList: any[] = [];

  machineSpecificCrewName = [];
  machineSpecificCrewList = [];

  manPowerArr: any[] = [];
  manPowerItem: any[] = [];
  manPoweritemList: any[] = [];

  manPowerSpecificCrew: any[] = [];
  manPowerSpecificCrewList: any[] = [];

  // new Array to push new object for machinery
  machineryRow = [] as Machinery[];
  manPowerRow = [] as ManPower[];
  rangeDateRow = [] as RangeDate[];
  otherMachineriesRow = [] as OtherMachineries[];
  externalItemRow = [] as ExternalItem[];
  specificCrew = [];
  MPspecificCrew = [];
  machineryContractRow = [] as MachineryContract[];
  vesselName = [] as Vessel[];

  mheForm: MheForm = {};

  // for invalid UI
  invalidRequestOnBehalf = false;
  invalidJobDescription = false;
  invalidPONum = false;
  invalidSingleDate = false;
  invalidRangeDate: any = [];
  invalidBookingType = false;
  invalidRangeSameDay: any = [];

  invalidItemMachinery: any = [];
  invalidQuantityMachinery: any = [];
  invalidTimeMachinery: any = [];
  invalidEHMachinery: any = [];
  invalidLocationMachinery: any = [];
  invalidSpecificCrew: any = [];
  invalidMPSpecificCrew: any = [];

  invalidItemManPower: any = [];
  invalidQuantityManPower: any = [];
  invalidTimeManPower: any = [];
  invalidEHManPower: any = [];
  invalidLocationManPower: any = [];

  invalidItemOtherMachine: any = [];
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

  invalidContractNo = false;

  machineryTableInvalid = false;
  manPowerTableInvalid = false;
  otherMachineriesTableInvalid = false;
  externalItemTableInvalid = false;

  noTableSelected = false;

  counterMachinery = 0;
  counterManpower = 0;
  counterEquipment = 0;
  counterExternal = 0;

  flagNoTable = false;

  // For numbering input
  step = 1;
  min = 0;
  max = 100;
  maxQty = [];

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  // For one job ticket description
  description =
    'Please add required services in the table below. To Remove, select the check box and press remove button in the console';

  // External Item
  QuotationArr: any[] = [];
  QuotationID: any[] = [];
  QuotationList: any[] = [];

  vesselNameArr: any[] = [];
  vesselNameList: any[] = [];
  vesselCode = [];
  vesselArr = [];

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

  special = false;
  numericRemarks: any = 0;
  invalidNumericRemarks = false;
  numericJobDesc: any = 0;
  invalidNumericJobDesc = false;

  isLoading: boolean = false;
  overlay: boolean = false;
  promise1;
  promise2;
  promise3;

  constructor(
    private router: Router,
    private requestFormService: RequestFormService,
    private appService: AppService,
    public datepipe: DatePipe,
    private detailBreakdownService: DetailBreakdownService
  ) {
    this.mheForm.requestType = 'Normal';
    this.mheForm.bookingType = 'Daily';
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.overlay = true;
    this.todayDate =
      this.todayDateTime.getFullYear() +
      '/' +
      (this.todayDateTime.getMonth() + 1) +
      '/' +
      this.todayDateTime.getDate();

    this.getTimeDropdown();
    this.userInfo();

    // Promise.all([this.promise1, this.promise2]).then(() => {
    //   // Getting the previous url
    //   if (
    //     this.requestFormService.getPreviousUrl() ===
    //       '/operation-system/mhe-request-preview' &&
    //     this.requestFormService.getRequestType() === 'Normal'
    //   ) {
    //     setTimeout(() => {
    //       this.getData();
    //       if (this.mheForm.remarks !== undefined) {
    //         this.numericCount('remarks', this.mheForm.remarks);
    //       }
    //       this.numericCount('jobDesc', this.mheForm.jobDescription);
    //     }, 10000);
    //   } else {
    //     // Generate the first object in the array as soon the user go to normal form
    //     // this.addMachineryRow();
    //     // this.addManPowerRow();
    //     // this.addOtherMachineriesRow();
    //     // this.addExternalItemRow();
    //     this.addRangeDate();
    //   }
    // });
  }

  dateValueChange(event: any) {
    // Get current date

    // console.warn(currentHour)

    if (this.mheForm.bookingType === 'Daily') {
      this.invalidSingleDate = false;
      this.backDatedDate = false;
      this.invalidbackDated = false;

      let dateTimeInput = new Date(this.mheForm.singleDate);
      //  let dateInput = this.datepipe.transform(dateTimeInput, 'yyyy/MM/dd')
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
      let dateToString = this.mheForm.singleDate.toString();
      let singleDate = new Date(dateToString);
      let formatSingleDate = this.datepipe.transform(singleDate, 'dd-MM-yyyy');

      let current = new Date();
      let formatCurrent = this.datepipe.transform(current, 'dd-MM-yyyy');

      // Get current time
      let currentHour = current.getHours();

      this.dailyDate = dateInput;
      this.currentDate = todayDate;

      if (dateInput < todayDate) {
        this.backDatedDate = true;
        this.invalidbackDated = true;
        this.timeArr = [];
        this.getTimeDropdown();
      } else if (dateInput == todayDate) {
        this.filterTimeArr();
      } else {
        this.timeArr = [];
        this.getTimeDropdown();
      }

      let formatCurrentPlusDay = current.setDate(current.getDate() + 1);
      let formatCurrentPlusDayOne = new Date(formatCurrentPlusDay);
      let newformatCurrentPlusDayOne = this.datepipe.transform(
        formatCurrentPlusDayOne,
        'dd-MM-yyyy'
      );

      if (formatSingleDate.valueOf() === formatCurrent.valueOf()) {
        this.sameDay = true;
        this.nextDay = false;
        this.dateFlag = true;
        this.status = 'WAITING_LIST';
      } else if (
        newformatCurrentPlusDayOne === formatSingleDate &&
        currentHour >= 15 &&
        currentHour <= 24
      ) {
        this.nextDay = true;
        this.sameDay = false;
        this.dateFlag = true;
        this.status = 'WAITING_LIST';
      } else {
        this.nextDay = false;
        this.sameDay = false;
        this.dateFlag = false;
        this.status = 'BOOKED';
      }
    } else if (this.mheForm.bookingType === 'Recurring') {
      for (let i = 0; i < this.rangeDateRow.length; i++) {
        if (this.rangeDateRow[i].date) {
          this.invalidRangeDate[i] = false;
        }
      }

      this.rangeDateRow.forEach((elem, i) => {
        let current = new Date();
        let newCurrent = new Date();

        let formatCurrentPlusDay = newCurrent.setDate(newCurrent.getDate() + 1);
        let formatCurrentPlusDayOne = new Date(formatCurrentPlusDay);
        let newformatCurrentPlusDayOne = this.datepipe.transform(
          formatCurrentPlusDayOne,
          'dd-MM-yyyy'
        );

        current.setHours(0, 0, 0, 0);

        let firstDate: any;
        let secondDate: any;

        if (elem.date[1]) {
          firstDate = new Date(elem.date[0]);
          secondDate = new Date(elem.date[1]);

          let compareFirstDate = this.datepipe.transform(
            firstDate,
            'dd-MM-yyyy'
          );

          if (firstDate > current && secondDate > current) {
            this.dateErr = false;
            this.invalidbackDateds[i] = false;
          } else if (firstDate < current && secondDate > current) {
            this.dateErr = true;
            this.invalidbackDateds[i] = true;
          } else if (firstDate < current && secondDate < current) {
            this.invalidbackDateds[i] = true;
            this.dateErr = true;
          } else if (
            firstDate < current &&
            secondDate.valueOf() === current.valueOf()
          ) {
            this.dateErr = true;
            this.invalidbackDateds[i] = true;
          } else {
            this.dateErr = false;
            this.invalidbackDateds[i] = false;
          }

          let currentHour = newCurrent.getHours();

          if (firstDate.valueOf() == current.valueOf()) {
            //error tak boleh book if same day
            this.sameDay = false;
            this.nextDay = false;
            this.dateFlag = false;
            // this.status = "WAITING_LIST"
            this.invalidRangeSameDay[i] = true;
          }
          // else if(compareFirstDate == newformatCurrentPlusDayOne && currentHour >= 15 && currentHour <= 24){
          //       this.nextDay = true
          //       this.sameDay = false
          //       this.dateFlag = true;
          //       this.status = "WAITING_LIST"
          //       this.invalidRangeSameDay[i] = false;
          //     }
          else if (
            compareFirstDate == newformatCurrentPlusDayOne &&
            currentHour >= 15 &&
            currentHour <= 24
          ) {
            this.sameDay = false;
            this.nextDay = false;
            this.dateFlag = false;
            this.invalidRangeSameDay[i] = true;
          } else {
            this.nextDay = false;
            this.sameDay = false;
            this.dateFlag = false;
            this.status = 'BOOKED';
            this.invalidRangeSameDay[i] = false;
          }

          this.rangeDateFirstIndex = this.datepipe.transform(
            firstDate,
            'dd/MM/yyyy'
          );
        }
      });

      this.multipleDateRangeOverlaps();
      this.datePickerWarning();
    }
  }

  // ----------------------------------------------------- Time dropdown -----------------------------------------------------

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

  // ----------------------------------------------------- Fetch API -----------------------------------------------------

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        this.special = this.appService.special;

        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.getRestServiceAPI(initialData);
        this.contract(initialData);

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

  getRestServiceAPI(initData: any) {
    const getCode: any = {
      userID: initData.UserID,
      CustomerCode: initData.CustomerCode,
    };

    // console.log(initData);
    this.promise1 = restServices.pbksb_CustomerService
      .getRequestFrom(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const cust = JSON.parse(resArr);

        this.machineArrDesc = cust.machinery;
        this.manPowerArr = cust.manpower;

        this.sitesArr = cust.sites;
        this.requestOnBehalfArr = cust.CustomerOnBehalf;

        this.equipmentArrDesc = cust.equipment;
        this.QuotationArr = cust.external_items;

        for (let i = 0; i < this.machineArrDesc.length; i++) {
          if (this.machineArrDesc[i].Description) {
            this.machineDescItem.push({
              content: this.machineArrDesc[i].Description,
            });
          }
        }

        for (let i = 0; i < cust.boActivities.length; i++) {
          if (this.machineArrDesc[i].Description) {
            this.boActivitiesList.push({
              content: cust.boActivities[i].description,
            });
          }
        }

        for (let i = 0; i < this.equipmentArrDesc.length; i++) {
          this.equipmentDescItem.push({
            content: this.equipmentArrDesc[i].Description,
          });
        }

        for (let i = 0; i < this.manPowerArr.length; i++) {
          this.manPowerItem.push({
            content: this.manPowerArr[i].Item,
          });
        }

        for (let i = 0; i < this.requestOnBehalfArr.length; i++) {
          if (this.requestOnBehalfArr[i].name) {
            this.requestOnBehalfName.push({
              content: this.requestOnBehalfArr[i].name,
            });
          }
        }

        for (let i = 0; i < this.sitesArr.length; i++) {
          this.sitesName.push({
            content: this.sitesArr[i].description,
          });
        }

        for (let i = 0; i < this.QuotationArr.length; i++) {
          this.QuotationID.push({
            content: this.QuotationArr[i].quotation,
          });
        }

        this.QuotationList = this.QuotationID;
        this.itemList = this.machineDescItem.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.equipmentItemList = this.equipmentDescItem.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.manPoweritemList = this.manPowerItem.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        // this.manPowerSpecificCrewList = this.manPowerSpecificCrew;
        this.requestOnBehalfList = this.requestOnBehalfName.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.sitesList = this.sitesName.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        if (
          this.requestFormService.getPreviousUrl() ===
            '/operation-system/mhe-request-preview' &&
          this.requestFormService.getRequestType() === 'Normal'
        ) {
          this.getData();
          if (this.mheForm.remarks !== undefined) {
            this.numericCount('remarks', this.mheForm.remarks);
          }
          this.numericCount('jobDesc', this.mheForm.jobDescription);
        } else {
          // Generate the first object in the array as soon the user go to normal form
          // this.addMachineryRow();
          // this.addManPowerRow();
          // this.addOtherMachineriesRow();
          // this.addExternalItemRow();
          this.addRangeDate();
        }
        this.isLoading = false;
        this.overlay = false;
      })
      .catch((err) => {
        // console.log("masuk err");
        this.isLoading = false;
        this.overlay = false;
        console.error(err);
      });

    //vessel name
    this.promise2 = restServices.pbksb_MarineService
      .ListVessel(this.appService.myApp)()
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);

        this.vesselArr = resArr.vessel;

        this.vesselArr.forEach((element) => {
          this.vesselNameArr.push({
            content: element.name,
          });
        });

        this.vesselNameArr = this.vesselNameArr.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        this.vesselNameList = this.vesselNameArr;
      });
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
        idManpower: id,
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
    // console.log(postIndex)
    // console.log(this.machineryRow[postIndex].SpecificCrew)

    // --------------------- Latest Code -------------------
    // this.machineryRow[index].SpecificCrew = []

    // let machineItem = this.machineryRow[index].Item

    // let findMachineArr: any = this.machineArr.find(elem => elem.Item === machineItem)
    // let arr = []
    // arr.push(findMachineArr)
    // let secArr = []
    // secArr = arr[0].SpecificCrew

    // this.machineryRow[index].SpecificCrew = secArr
  }

  specificCrewDependency(description: string, id: number, index: number) {
    this.machineSpecificCrewName = [];

    let findMachineArr: any = this.machineArrDesc.find(
      (elem) => elem.Description === description
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
        idMachinery: id,
      });
    }

    this.machineSpecificCrewList[id] = this.machineSpecificCrewName;

    if (this.machineSpecificCrewList[id].length > 0) {
      this.disabled[id] = false;
    } else {
      this.disabled[id] = true;
    }

    let desc = arr[0].Item;

    this.machineryRow[index].Item = desc;
  }

  descriptionItem(description: string, index: number) {
    let findEquipmentArr: any = this.equipmentArrDesc.find(
      (elem) => elem.Description === description
    );

    let arr = [];
    arr.push(findEquipmentArr);

    let desc = arr[0].Item;

    this.otherMachineriesRow[index].Item = desc;
  }

  itemExternalDependency(quotation: string, id: any, index: any) {
    let findExternalArr: any = this.QuotationArr.find(
      (elem) => elem.quotation == quotation
    );

    let arr = [];
    arr.push(findExternalArr);

    this.externalItemRow[index].Item = arr[0].Item;
    this.externalItemRow[index].UOM = arr[0].UOM;
    this.externalItemRow[index].Unit = arr[0].Unit;
    // this.externalItemRow[index].Quantity = arr[0].Quantity
    this.maxQty[index] = arr[0].Quantity;
  }

  // ----------------------------------------------------- Get data when user click edit -----------------------------------------------------

  // Get data from the service located in services > MHE > requestFrom
  getData() {
    // console.log(JSON.stringify(this.requestFormService.getFormValue()));
    this.mheForm = this.requestFormService.getFormValue();
    console.log(this.mheForm);
    // this.machineryRow = this.mheForm.machinery!;
    // this.manPowerRow = this.mheForm.manPower!;
    this.otherMachineriesRow = this.mheForm.otherMachineries!;
    this.externalItemRow = this.mheForm.externalItem!;
    this.rangeDateRow = this.mheForm.rangeDate!;

    // this.mheForm.contractNo = JSON.parse(sessionStorage.getItem('contractNo'));
    this.machineryContractRow = JSON.parse(
      sessionStorage.getItem('machineryContract')
    );

    this.sameDay = JSON.parse(sessionStorage.getItem('sameDay'));
    this.nextDay = JSON.parse(sessionStorage.getItem('nextDay'));
    this.dateFlag = JSON.parse(sessionStorage.getItem('dateFlag'));
    this.status = JSON.parse(sessionStorage.getItem('status'));
    var storeMachinery = JSON.parse(sessionStorage.getItem('machineryRow'));
    var storeManpower = JSON.parse(sessionStorage.getItem('manPowerRow'));

    if (this.mheForm.bookingType === 'Daily') {
      let code = JSON.parse(sessionStorage.getItem('vesselCode'));

      if (code.length > 0) {
        let array = JSON.parse(sessionStorage.getItem('vesselName'));
        let newArray = [];

        for (let i = 0; i < array.length; i++) {
          newArray.push(array[i].content);
        }

        let vesselNew = [];
        for (let i = 0; i < this.vesselNameList.length; i++) {
          vesselNew.push(this.vesselNameList[i].content);
        }

        for (let i = 0; i < newArray.length; i++) {
          let selected = vesselNew.find((element) => element === newArray[i]);

          let findIndex = vesselNew.findIndex(
            (element) => element === newArray[i]
          );

          this.vessel._items[findIndex].selected = true;
        }

        this.vesselCode = JSON.parse(sessionStorage.getItem('vesselCode'));
      }
    }

    if (storeManpower) {
      let manpowerArr = [];
      manpowerArr = storeManpower;

      manpowerArr.forEach((element) => {
        if (element.item !== null) {
          this.manPowerRow.push(element);
        }
      });

      for (let i = 0; i < this.manPowerRow.length; i++) {
        this.MPspecificCrew.push(this.manPowerRow[i].SpecificCrew);
      }

      this.manPowerRow.forEach((element, id) => {
        if (element.SpecificCrew.length > 0) {
          let findSpecificCrew: any = this.MPspecificCrew.find(
            (elem, index) => {
              if (elem.length !== 0) {
                return elem[0].idManpower == element.id;
              }
            }
          );

          // let arr = []
          // arr.push(findSpecificCrew)
          this.manPowerSpecificCrewList[element.id] = findSpecificCrew;
        } else {
          this.MPdisabled[element.id] = true;
        }
      });
    }

    if (storeMachinery) {
      this.machineryRow = storeMachinery;

      for (let i = 0; i < this.machineryRow.length; i++) {
        this.specificCrew.push(this.machineryRow[i].SpecificCrew);
      }

      this.machineryRow.forEach((element, id) => {
        if (element.SpecificCrew.length > 0) {
          let findSpecificCrew: any = this.specificCrew.find((elem, index) => {
            if (elem.length !== 0) {
              return elem[0].idMachinery == element.id;
            }
          });

          // console.log(findSpecificCrew)
          // let arr = []
          // arr.push(findSpecificCrew)

          this.machineSpecificCrewList[element.id] = findSpecificCrew;
        } else {
          this.disabled[element.id] = true;
        }
      });
    }

    let date = new Date(this.mheForm.singleDate);
    let dateFromEdit =
      date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

    if (dateFromEdit == this.todayDate) {
      this.filterTimeArr();
    }
  }

  // ----------------------------------------------------- Onchange radio button -----------------------------------------------------

  onChange(event: any) {
    this.mheForm.bookingType = event.value;

    // Reset value everytime the radio button for the date option is change
    this.invalidSingleDate = false;

    if (this.rangeDateRow) {
      this.rangeDateRow.forEach((value, i) => {
        this.invalidRangeDate[i] = false;
        this.invalidbackDateds[i] = false;
        this.rangeInvalidRangeDate[i] = false;
        this.invalidRangeSameDay[i] = false;
        this.datePickerWarning();
      });
    }
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

  // ----------------------------------------------------- Add row logic -----------------------------------------------------
  // Process of the adding new array
  public addMachineryRow(): void {
    this.machineryRow.push({
      id: Math.floor(Math.random() * 100),
      Description: '',
      Item: '',
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
      Description: '',
      Item: '',
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

  // ----------------------------------------------------- Check length logic -----------------------------------------------------
  // Check if array still has checkbox == true
  checkLengthMachinery() {
    return this.machineryRow.some((item) => item.Selected == true);
  }

  checkLengthManPower() {
    return this.manPowerRow.some((item) => item.Selected == true);
  }

  checkLengthOtherMachineries() {
    if (this.otherMachineriesRow) {
      return this.otherMachineriesRow.some((item) => item.Selected == true);
    }
  }

  checkLengthExternalItem() {
    return this.externalItemRow.some((item) => item.Selected == true);
  }

  // ----------------------------------------------------- Delete row logic -----------------------------------------------------
  deleteMachinery() {
    for (let i = 0; i < this.machineryRow.length; i++) {
      this.invalidItemMachinery[i] = false;
      this.invalidQuantityMachinery[i] = false;
      this.invalidTimeMachinery[i] = false;
      this.invalidEHMachinery[i] = false;
      this.invalidLocationMachinery[i] = false;
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
    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
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

  deleteRangeDate(index: number): void {
    this.rangeDateRow.forEach((value, i) => {
      if (i == index) {
        this.invalidRangeDate[i] = false;
        this.invalidbackDateds[i] = false;
        this.rangeInvalidRangeDate[i] = false;
        this.invalidRangeSameDay[i] = false;

        this.datePickerWarning();
      }
    });

    this.rangeDateRow.splice(index, 1);
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

  // ----------------------------------------------------- Check select checkbox -----------------------------------------------------

  machineryCheckboxChange(event: any) {
    if (event === true) {
      this.counterMachinery++;
    } else if (event == false) {
      this.counterMachinery--;
    }
  }

  manpowerCheckboxChange(event: any) {
    if (event === true) {
      this.counterManpower++;
    } else if (event == false) {
      this.counterManpower--;
    }
  }

  equipmentCheckboxChange(event: any) {
    if (event === true) {
      this.counterEquipment++;
    } else if (event == false) {
      this.counterEquipment--;
    }
  }

  externalCheckboxChange(event: any) {
    if (event === true) {
      this.counterExternal++;
    } else if (event == false) {
      this.counterExternal--;
    }
  }

  selectVessel(event) {
    this.mheForm.vesselName = event;

    let findVesselName: any;
    this.vesselCode = [];

    for (let i = 0; i < this.mheForm.vesselName.length; i++) {
      findVesselName = this.vesselArr.find(
        (elem) => elem.name === this.mheForm.vesselName[i].content
      );
      this.vesselCode.push({
        vesselCode: findVesselName.code,
      });
    }
  }

  // ----------------------------------------------------- Submitting Form -----------------------------------------------------

  onSubmit(normalForm: NgForm) {
    if (normalForm.valid) {
      let data: any;

      if (this.mheForm.bookingType !== 'Contract') {
        data = {
          requestType: this.mheForm.requestType,
          companyName: (this.mheForm.companyName = this.companyName),
          requestBy: (this.mheForm.requestBy = this.requestByName),
          requestOnBehalf: this.mheForm.requestOnBehalf,
          jobDescription: this.mheForm.jobDescription,
          PONum: this.mheForm.PONum,
          bookingType: this.mheForm.bookingType,
          singleDate: this.mheForm.singleDate,
          rangeDate: this.rangeDateRow,
          remarks: this.mheForm.remarks ?? '-',
          machinery: this.machineryRow.filter((i) => i.Description !== null),
          manPower: this.manPowerRow.filter((i) => i.Item !== null),
          otherMachineries: this.otherMachineriesRow.filter(
            (i) => i.Description !== null
          ),
          externalItem: this.externalItemRow.filter(
            (i) => i.quotation !== null
          ),
          vesselName: this.mheForm.vesselName,
        };
        console.log(data);
        // console.log(this.invalidRangeDate);
      } else {
        data = {
          requestType: this.mheForm.requestType,
          companyName: (this.mheForm.companyName = this.companyName),
          requestBy: (this.mheForm.requestBy = this.requestByName),
          requestOnBehalf: this.mheForm.requestOnBehalf,
          PONum: this.mheForm.PONum,
          bookingType: this.mheForm.bookingType,
          startDate: this.mheForm.startDate,
          endDate: this.mheForm.endDate,
          remarks: this.mheForm.remarks ?? '-',
          machineryContract: this.machineryContractRow,
          contractNo: this.mheForm.contractNo,
        };
        // console.log(data)
      }

      if (this.mheForm.bookingType == 'Daily') {
        if (this.dailyDate < this.currentDate) {
          this.backDatedDate = true;
          this.invalidbackDated = true;
          this.focusOnInvalid();
        } else if (
          !this.mheForm.singleDate ||
          this.mheForm.singleDate.length == 0
        ) {
          this.invalidSingleDate = true;
          this.focusOnInvalid();
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
        } else if (this.validateZeroValEH()) {
        } else if (this.validation()) {
        } else if (
          this.machineryRow.every((i) => i.Description == null) &&
          this.manPowerRow.every((i) => i.Item == null) &&
          this.otherMachineriesRow.every((i) => i.Description == null) &&
          this.externalItemRow.every((i) => i.quotation == null)
        ) {
          this.noTableSelected = true;
          this.machineryTableInvalid = true;
          this.manPowerTableInvalid = true;
          this.otherMachineriesTableInvalid = true;
          this.externalItemTableInvalid = true;
          this.focusOnInvalid();
        } else {
          let param = {
            fs: {
              machinery: this.machineryRow.filter(
                (i) => i.Description !== null
              ),
              manpower: this.manPowerRow.filter((i) => i.Item !== null),
              equipment: this.otherMachineriesRow.filter(
                (i) => i.Description !== null
              ),
              external_items: this.externalItemRow.filter(
                (i) => i.Item !== null
              ),
            },
          };

          console.log(param);

          sessionStorage.clear();

          restServices.pbksb_CustomerService
            .GetPageDetailBreakDownEstimation(this.appService.myApp)(param)
            .then((result) => {
              let resArr: any = result;
              let info = JSON.parse(resArr);

              this.detailBreakdownList = info.items;

              this.totalEstimatedPrice = info.TotalEstimatedPrice;
            })
            .then(() => {
              const items = this.detailBreakdownList;
              this.detailBreakdownService.setItemList(items);
              this.detailBreakdownService.setTotal(this.totalEstimatedPrice);

              if (this.detailBreakdownService.setItemList(items) !== null) {
                this.requestFormService.setFormValue(data);
                sessionStorage.setItem('status', JSON.stringify(this.status));
                sessionStorage.setItem(
                  'dateFlag',
                  JSON.stringify(this.dateFlag)
                );
                sessionStorage.setItem('nextDay', JSON.stringify(this.nextDay));
                sessionStorage.setItem('sameDay', JSON.stringify(this.sameDay));
                sessionStorage.setItem(
                  'machineryRow',
                  JSON.stringify(this.machineryRow)
                );
                sessionStorage.setItem(
                  'manPowerRow',
                  JSON.stringify(this.manPowerRow)
                );
                sessionStorage.setItem(
                  'vesselName',
                  JSON.stringify(this.mheForm.vesselName)
                );
                sessionStorage.setItem(
                  'vesselCode',
                  JSON.stringify(this.vesselCode)
                );
                this.router.navigate(['/operation-system/mhe-request-preview']);
              }
            });
        }
      } else if (this.mheForm.bookingType == 'Recurring') {
        if (
          this.invalidbackDateds.includes(true) ||
          this.invalidRangeDate.includes(true) ||
          this.rangeInvalidRangeDate.includes(true) ||
          this.invalidRangeSameDay.includes(true)
        ) {
          this.focusOnInvalid();
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
        } else if (this.validateZeroValEH()) {
        } else if (this.validation()) {
        } else if (
          this.machineryRow.every((i) => i.Description == null) &&
          this.manPowerRow.every((i) => i.Item == null) &&
          this.otherMachineriesRow.every((i) => i.Description == null) &&
          this.externalItemRow.every((i) => i.quotation == null)
        ) {
          this.noTableSelected = true;
          this.machineryTableInvalid = true;
          this.manPowerTableInvalid = true;
          this.otherMachineriesTableInvalid = true;
          this.externalItemTableInvalid = true;
          this.focusOnInvalid();
        } else {
          let param = {
            fs: {
              machinery: this.machineryRow.filter(
                (i) => i.Description !== null
              ),
              manpower: this.manPowerRow.filter((i) => i.Item !== null),
              equipment: this.otherMachineriesRow.filter(
                (i) => i.Description !== null
              ),
              external_items: this.externalItemRow.filter(
                (i) => i.Item !== null
              ),
            },
          };

          console.log(param);

          sessionStorage.clear();

          restServices.pbksb_CustomerService
            .GetPageDetailBreakDownEstimation(this.appService.myApp)(param)
            .then((result) => {
              let resArr: any = result;
              let info = JSON.parse(resArr);

              this.detailBreakdownList = info.items;

              this.totalEstimatedPrice = info.TotalEstimatedPrice;
            })
            .then(() => {
              const items = this.detailBreakdownList;
              this.detailBreakdownService.setItemList(items);
              this.detailBreakdownService.setTotal(this.totalEstimatedPrice);

              if (this.detailBreakdownService.setItemList(items) !== null) {
                this.requestFormService.setFormValue(data);
                sessionStorage.setItem('status', JSON.stringify(this.status));
                sessionStorage.setItem(
                  'dateFlag',
                  JSON.stringify(this.dateFlag)
                );
                sessionStorage.setItem('nextDay', JSON.stringify(this.nextDay));
                sessionStorage.setItem('sameDay', JSON.stringify(this.sameDay));
                sessionStorage.setItem(
                  'machineryRow',
                  JSON.stringify(this.machineryRow)
                );
                sessionStorage.setItem(
                  'manPowerRow',
                  JSON.stringify(this.manPowerRow)
                );
                sessionStorage.setItem(
                  'vesselName',
                  JSON.stringify(this.mheForm.vesselName)
                );
                sessionStorage.setItem(
                  'vesselCode',
                  JSON.stringify(this.vesselCode)
                );
                this.router.navigate(['/operation-system/mhe-request-preview']);
              }
            });
        }
      } else {
        if (!this.mheForm.contractNo) {
          this.invalidContractNo = true;
        } else if (this.mheForm.contractNo) {
          this.invalidContractNo = false;
        }

        if (this.invalidContractNo) {
          this.contractNoFocus.nativeElement.focus();
        }

        if (
          this.mheForm.contractNo &&
          this.mheForm.requestOnBehalf &&
          this.mheForm.PONum
        ) {
          let param = {
            fs: {
              machinery: this.machineryContractRow.filter(
                (i) => i.Item !== null
              ),
              manpower: [],
              equipment: [],
              external_items: this.externalItemRow.filter(
                (i) => i.Item !== null
              ),
            },
          };

          restServices.pbksb_CustomerService
            .GetPageDetailBreakDownEstimation(this.appService.myApp)(param)
            .then((result) => {
              let resArr: any = result;
              let info = JSON.parse(resArr);

              this.detailBreakdownList = info.items;

              this.totalEstimatedPrice = info.TotalEstimatedPrice;
            })
            .then(() => {
              const items = this.detailBreakdownList;
              this.detailBreakdownService.setItemList(items);
              this.detailBreakdownService.setTotal(this.totalEstimatedPrice);

              sessionStorage.clear();
              sessionStorage.setItem(
                'machineryContract',
                JSON.stringify(this.machineryContractRow)
              );

              this.requestFormService.setFormValue(data);
              this.router.navigate(['/operation-system/mhe-request-preview']);
            });
        }
      }
    } else if (normalForm.invalid) {
      if (
        !this.mheForm.requestOnBehalf ||
        this.mheForm.requestOnBehalf.length == 0
      ) {
        this.invalidRequestOnBehalf = true;
      } else if (this.mheForm.requestOnBehalf) {
        this.invalidRequestOnBehalf = false;
      }

      if (this.mheForm.bookingType !== 'Contract') {
        if (!this.mheForm.jobDescription) {
          this.invalidJobDescription = true;
        } else if (this.mheForm.jobDescription) {
          this.invalidJobDescription = false;
        }

        if (!this.mheForm.singleDate) {
          this.invalidSingleDate = true;
        } else if (this.mheForm.singleDate) {
          this.invalidSingleDate = false;
        }
      }

      if (!this.mheForm.PONum) {
        this.invalidPONum = true;
      } else if (this.mheForm.PONum) {
        this.invalidPONum = false;
      }

      if (this.mheForm.bookingType == 'Contract') {
        if (!this.mheForm.contractNo) {
          this.invalidContractNo = true;
        } else if (this.mheForm.contractNo) {
          this.invalidContractNo = false;
        }

        if (this.invalidContractNo) {
          this.contractNoFocus.nativeElement.focus();
        }
      }

      this.validation();
      this.focusOnInvalid();
    }
  }

  // ------------------------------------ Table validation -----------------------------------------------------//

  validation() {
    let flag = false;
    let machineryFlag = [];
    let manpowerFlag = [];
    let equipmentFlag = [];
    let externalFlag = [];

    if (this.mheForm.bookingType === 'Daily') {
      if (!this.mheForm.singleDate || this.mheForm.singleDate.length == 0) {
        this.invalidSingleDate = true;
        flag = true;
      }
    }

    if (this.mheForm.bookingType === 'Recurring') {
      for (let i = 0; i < this.rangeDateRow.length; i++) {
        if (!this.rangeDateRow[i].date) {
          this.invalidRangeDate[i] = true;
          flag = true;
        } else {
          this.invalidRangeDate[i] = false;
        }

        if (!this.rangeDateRow[i].date[1]) {
          this.invalidRangeDate[i] = true;
          flag = true;
        } else {
          this.invalidRangeDate[i] = false;
        }
      }
    }

    // Machinery row validation
    for (let i = 0; i < this.machineryRow.length; i++) {
      if (
        this.machineryRow[i].Description ||
        this.machineryRow[i].Quantity ||
        this.machineryRow[i].Time ||
        this.machineryRow[i].EstimatedHours ||
        this.machineryRow[i].Location
      ) {
        if (
          !this.machineryRow[i].Description ||
          this.machineryRow[i].Description.length == 0
        ) {
          this.invalidItemMachinery[i] = true;
          flag = true;
        } else {
          this.invalidItemMachinery[i] = false;
        }

        if (
          !this.machineryRow[i].Quantity ||
          this.machineryRow[i].Quantity <= 0
        ) {
          this.invalidQuantityMachinery[i] = true;
          flag = true;
        } else {
          this.invalidQuantityMachinery[i] = false;
        }

        if (!this.machineryRow[i].Time) {
          this.invalidTimeMachinery[i] = true;
          flag = true;
        } else {
          this.invalidTimeMachinery[i] = false;
        }

        if (
          !this.machineryRow[i].EstimatedHours ||
          this.machineryRow[i].EstimatedHours <= 0
        ) {
          this.invalidEHMachinery[i] = true;
          flag = true;
        } else {
          this.invalidEHMachinery[i] = false;
        }

        if (
          !this.machineryRow[i].Location ||
          this.machineryRow[i].Location.length == 0
        ) {
          this.invalidLocationMachinery[i] = true;
          flag = true;
        } else {
          this.invalidLocationMachinery[i] = false;
        }
      } else if (
        this.machineryRow.every((element) => element.Description === null) &&
        this.machineryRow.every((element) => element.Quantity === 0) &&
        this.machineryRow.every((element) => element.Time === null) &&
        this.machineryRow.every((element) => element.EstimatedHours === 0) &&
        this.machineryRow.every((element) => element.Location === null)
      ) {
        machineryFlag[i] = true;
      }
    }

    // Man Power row validation
    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (
        this.manPowerRow[i].Item ||
        this.manPowerRow[i].Quantity ||
        this.manPowerRow[i].Time ||
        this.manPowerRow[i].EstimatedHours ||
        this.manPowerRow[i].Location
      ) {
        if (!this.manPowerRow[i].Item) {
          this.invalidItemManPower[i] = true;
          flag = true;
        } else {
          this.invalidItemManPower[i] = false;
        }

        if (
          !this.manPowerRow[i].Quantity ||
          this.manPowerRow[i].Quantity <= 0
        ) {
          this.invalidQuantityManPower[i] = true;
          flag = true;
        } else {
          this.invalidQuantityManPower[i] = false;
        }

        if (!this.manPowerRow[i].Time) {
          this.invalidTimeManPower[i] = true;
          flag = true;
        } else {
          this.invalidTimeManPower[i] = false;
        }

        if (
          !this.manPowerRow[i].EstimatedHours ||
          this.manPowerRow[i].EstimatedHours <= 0
        ) {
          this.invalidEHManPower[i] = true;
          flag = true;
        } else {
          this.invalidEHManPower[i] = false;
        }

        if (
          !this.manPowerRow[i].Location ||
          this.manPowerRow[i].Location.length == 0
        ) {
          flag = true;
          this.invalidLocationManPower[i] = true;
        } else {
          this.invalidLocationManPower[i] = false;
        }
      } else if (
        this.manPowerRow.every((element) => element.Item === null) &&
        this.manPowerRow.every((element) => element.Quantity === 0) &&
        this.manPowerRow.every((element) => element.Time === null) &&
        this.manPowerRow.every((element) => element.EstimatedHours === 0) &&
        this.manPowerRow.every((element) => element.Location === null)
      ) {
        manpowerFlag[i] = true;
      }
    }

    // Other Machineries validation
    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (
        this.otherMachineriesRow[i].Description ||
        this.otherMachineriesRow[i].Quantity ||
        this.otherMachineriesRow[i].Time ||
        this.otherMachineriesRow[i].EstimatedHours ||
        this.otherMachineriesRow[i].Location
      ) {
        if (!this.otherMachineriesRow[i].Description) {
          flag = true;
          this.invalidItemOtherMachine[i] = true;
        } else {
          this.invalidItemOtherMachine[i] = false;
        }

        if (
          !this.otherMachineriesRow[i].Quantity ||
          this.otherMachineriesRow[i].Quantity <= 0
        ) {
          this.invalidQuantityOtherMachine[i] = true;
          flag = true;
        } else {
          this.invalidQuantityOtherMachine[i] = false;
        }

        if (!this.otherMachineriesRow[i].Time) {
          this.invalidTimeOtherMachine[i] = true;
          flag = true;
        } else {
          this.invalidTimeOtherMachine[i] = false;
        }

        if (
          !this.otherMachineriesRow[i].EstimatedHours ||
          this.otherMachineriesRow[i].EstimatedHours <= 0
        ) {
          this.invalidEHOtherMachine[i] = true;
          flag = true;
        } else {
          this.invalidEHOtherMachine[i] = false;
        }

        if (
          !this.otherMachineriesRow[i].Location ||
          this.otherMachineriesRow[i].Location.length == 0
        ) {
          this.invalidLocationOtherMachine[i] = true;
          flag = true;
        } else {
          this.invalidLocationOtherMachine[i] = false;
        }
      } else if (
        this.otherMachineriesRow.every(
          (element) => element.Description === null
        ) &&
        this.otherMachineriesRow.every((element) => element.Quantity === 0) &&
        this.otherMachineriesRow.every((element) => element.Time === null) &&
        this.otherMachineriesRow.every(
          (element) => element.EstimatedHours === 0
        ) &&
        this.otherMachineriesRow.every((element) => element.Location === null)
      ) {
        equipmentFlag[i] = true;
      }
    }

    // External Item Validation
    for (let i = 0; i < this.externalItemRow.length; i++) {
      if (
        this.externalItemRow[i].quotation ||
        this.externalItemRow[i].Quantity ||
        this.externalItemRow[i].RentPeriod ||
        this.externalItemRow[i].Time ||
        this.externalItemRow[i].Location
      ) {
        if (!this.externalItemRow[i].quotation) {
          this.invalidQuotationIDExternalItem[i] = true;
          flag = true;
        } else {
          this.invalidQuotationIDExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Item) {
          this.invalidItemExternalItem[i] = true;
          flag = true;
        } else {
          this.invalidItemExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].UOM) {
          this.invalidUOMExternalItem[i] = true;
          flag = true;
        } else {
          this.invalidUOMExternalItem[i] = false;
        }

        // if(!this.externalItemRow[i].Quantity || this.externalItemRow[i].Quantity <= 0){
        //   this.invalidQuantityExternalItem[i] = true
        //   flag = true;
        // }else {
        //   this.invalidQuantityExternalItem[i] = false
        // }

        // if(!this.externalItemRow[i].RentPeriod || this.externalItemRow[i].RentPeriod <= 0){
        //   this.invalidRentPeriodExternalItem[i] = true
        //   flag = true;
        // }else {
        //   this.invalidRentPeriodExternalItem[i] = false
        // }

        if (!this.externalItemRow[i].Unit) {
          this.invalidUnitExternalItem[i] = true;
          flag = true;
        } else {
          this.invalidUnitExternalItem[i] = false;
        }

        if (!this.externalItemRow[i].Time) {
          this.invalidTimeExternalItem[i] = true;
          flag = true;
        } else {
          this.invalidTimeExternalItem[i] = false;
        }

        if (
          !this.externalItemRow[i].Location ||
          this.externalItemRow[i].Location.length == 0
        ) {
          this.invalidLocationExternalItem[i] = true;
          flag = true;
        } else {
          this.invalidLocationExternalItem[i] = false;
        }
      } else if (
        this.externalItemRow.every((element) => element.quotation === null) &&
        this.externalItemRow.every((element) => element.Quantity === 0) &&
        this.externalItemRow.every((element) => element.Time === null) &&
        this.externalItemRow.every((element) => element.RentPeriod === 0) &&
        this.externalItemRow.every((element) => element.Location === null)
      ) {
        externalFlag[i] = true;
      }
    }

    this.datePickerWarning();
    this.focusOnInvalid();
    return flag;
  }

  // ------------------------------------ Add required to table -----------------------------------------------------

  addRequired(index: number) {
    for (let i = 0; i < this.machineryRow.length; i++) {
      if (this.machineryRow[i].Description) {
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
      if (this.otherMachineriesRow[i].Description) {
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

  // ------------------------------------ Remove invalid UI when user enter a value -----------------------------------------------------

  dropdownValueChange(event: any) {
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

      if(this.machineryRow[i].Description.startsWith("CRANE")){
        this.machineryRow[i].disableBoActivity = false;
      }else{
        this.machineryRow[i].disableBoActivity = true;
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
      if (this.otherMachineriesRow[i].Description) {
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

  inputValueChange(event: any) {
    if (this.mheForm.jobDescription) {
      this.invalidJobDescription = false;
    }

    if (this.mheForm.PONum) {
      this.invalidPONum = false;
    }

    for (let i = 0; i < this.machineryRow.length; i++) {
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
    }

    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (this.otherMachineriesRow[i].Quantity) {
        this.invalidQuantityOtherMachine[i] = false;
      }

      if (this.otherMachineriesRow[i].EstimatedHours) {
        this.invalidEHOtherMachine[i] = false;
      }
    }

    for (let i = 0; i < this.externalItemRow.length; i++) {
      if (this.externalItemRow[i].UOM) {
        this.invalidUOMExternalItem[i] = false;
      }

      // if(this.externalItemRow[i].Quantity){
      //   this.invalidQuantityExternalItem[i] = false;

      //   if(this.externalItemRow[i].Quantity > this.maxQty[i] ||
      //     this.externalItemRow[i].Quantity === 0){
      //     this.invalidQuantityExternalItem[i] = true;
      //     this.requiredExternalItem[i] = true;
      //   }
      // }

      // if(this.externalItemRow[i].RentPeriod){
      //   this.invalidRentPeriodExternalItem[i] = false

      //   if(this.externalItemRow[i].RentPeriod > 10 ||
      //     this.externalItemRow[i].RentPeriod === 0){
      //     this.invalidRentPeriodExternalItem[i] = true;
      //     this.requiredExternalItem[i] = true;
      //   }
      // }
    }
  }

  focusOnInvalid() {
    if (this.mheForm.bookingType == 'Daily') {
      if (this.invalidSingleDate) {
        this.bookingDateFocus.nativeElement.focus();
      } else if (this.invalidbackDated) {
        this.bookingDateFocus.nativeElement.focus();
      }
    }

    if (this.invalidRequestOnBehalf) {
      this.requestOnBehalfFocus.nativeElement.focus();
    } else if (this.invalidJobDescription) {
      this.jobDescFocus.nativeElement.focus();
      this.jobDescFocus.nativeElement.select();
    } else if (this.invalidPONum) {
      this.poNumberFocus.nativeElement.focus();
      this.poNumberFocus.nativeElement.select();
    }

    for (let i = 0; i < this.invalidbackDateds.length; i++) {
      if (this.invalidbackDateds[i]) {
        this.bookingDateFocus.nativeElement.focus();
      }
    }

    if (this.mheForm.bookingType == 'Recurring') {
      for (let i = 0; i < this.rangeDateRow.length; i++) {
        if (this.invalidRangeDate[i]) {
          this.bookingDateFocus.nativeElement.focus();
        }

        if (this.rangeInvalidRangeDate[i]) {
          this.bookingDateFocus.nativeElement.focus();
        }

        if (this.invalidRangeSameDay[i]) {
          this.bookingDateFocus.nativeElement.focus();
        }
      }
    }

    for (let i = 0; i < this.machineryRow.length; i++) {
      if (
        this.machineryTableInvalid ||
        this.invalidItemMachinery[i] ||
        this.invalidQuantityMachinery[i] ||
        this.invalidTimeMachinery[i] ||
        this.invalidEHMachinery[i] ||
        this.invalidLocationMachinery[i] ||
        this.invalidSpecificCrew[i]
      ) {
        this.machineryFocus.nativeElement.focus();
      }
    }

    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (
        this.manPowerTableInvalid ||
        this.invalidItemManPower[i] ||
        this.invalidQuantityManPower[i] ||
        this.invalidTimeManPower[i] ||
        this.invalidEHManPower[i] ||
        this.invalidLocationManPower[i] ||
        this.invalidMPSpecificCrew[i]
      ) {
        this.manpowerFocus.nativeElement.focus();
      }
    }

    for (let i = 0; i < this.otherMachineriesRow.length; i++) {
      if (
        this.otherMachineriesTableInvalid ||
        this.invalidItemOtherMachine[i] ||
        this.invalidQuantityOtherMachine[i] ||
        this.invalidTimeOtherMachine[i] ||
        this.invalidEHOtherMachine[i] ||
        this.invalidLocationOtherMachine[i]
      ) {
        this.othermachineryFocus.nativeElement.focus();
      }
    }

    for (let i = 0; i < this.externalItemRow.length; i++) {
      if (
        this.externalItemTableInvalid ||
        this.invalidQuotationIDExternalItem[i] ||
        this.invalidTimeExternalItem[i] ||
        this.invalidLocationExternalItem[i]
      ) {
        this.externalFocus.nativeElement.focus();
      }
    }
  }

  validateZeroValEH() {
    let flag = false;

    for (let i = 0; i < this.machineryRow.length; i++) {
      if (!this.machineryRow[i].EstimatedHours && this.machineryRow[i].Time) {
        this.invalidEHMachinery[i] = true;
        flag = true;
        this.machineryFocus.nativeElement.focus();
      } else {
        this.invalidEHMachinery[i] = false;
      }
    }

    for (let i = 0; i < this.manPowerRow.length; i++) {
      if (!this.manPowerRow[i].EstimatedHours && this.manPowerRow[i].Time) {
        this.invalidEHManPower[i] = true;
        this.manpowerFocus.nativeElement.focus();
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
        this.othermachineryFocus.nativeElement.focus();
      } else {
        this.invalidEHOtherMachine[i] = false;
      }
    }

    return flag;
  }

  // ------------------------------------ Recurring Date Overlap Validation (Start) -----------------------------------------------------//

  dateRangeOverlaps(a_start, a_end, b_start, b_end, i, j) {
    if (a_start <= b_start && b_start <= a_end) {
      this.rangeInvalidRangeDate[j] = true;
    }
    if (a_start <= b_end && b_end <= a_end) {
      this.rangeInvalidRangeDate[j] = true; // b ends in a
    }
    if (b_start <= a_start && a_end <= b_end) {
      this.rangeInvalidRangeDate[j] = true; // a in b
    }
    if (b_start > a_end && b_end > a_end) {
      this.rangeInvalidRangeDate[j] = false;
    }
    if (a_start > b_end && a_end > b_end) {
      this.rangeInvalidRangeDate[j] = false;
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
              i,
              j
            )
          )
            return true;
        }
      }
    return false;
  }

  datePickerWarning() {
    this.rangeDateRow.forEach((element, i) => {
      if (this.invalidbackDateds[i]) {
        this.dateWarning[i] = true;
        this.rangeDateWarning[i] = true;
      } else if (this.invalidRangeDate[i]) {
        this.dateWarning[i] = true;
        this.rangeDateWarning[i] = true;
      } else if (this.rangeInvalidRangeDate[i]) {
        this.dateWarning[i] = true;
        this.rangeDateWarning[i] = true;
      } else if (this.invalidRangeSameDay[i]) {
        this.dateWarning[i] = true;
        this.rangeDateWarning[i] = true;
      } else {
        this.dateWarning[i] = false;
        this.rangeDateWarning[i] = false;
      }
    });
  }

  // ------------------------------------ Recurring Date Overlap Validation (End) -----------------------------------------------------//

  //contract

  contract(initData: any) {
    const company: any = { company: initData.Company };
    restServices.pbksb_CustomerService
      .ListContractByCompany(this.appService.myApp)(company)
      .then((result) => {
        const resArr: any = result;
        const cont = JSON.parse(resArr);

        this.contractArr = cont;

        for (let i = 0; i < this.contractArr.length; i++) {
          this.contractItem.push({
            content: this.contractArr[i].contract_number,
          });
        }

        this.contractList = this.contractItem.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
      });
  }

  selectContract(event: any) {
    this.mheForm.contractNo = event.item.content;

    if (this.mheForm.contractNo) {
      this.machineryRow = [];
      const contractNo = { contract_number: this.mheForm.contractNo };
      restServices.pbksb_CustomerService
        .ContractDetails(this.appService.myApp)(contractNo)
        .then((result) => {
          const array: any = result;
          const contractArr = JSON.parse(array);

          this.mheForm.startDate = this.datepipe.transform(
            contractArr.date_start,
            'yyyy/MM/dd'
          );
          this.mheForm.endDate = this.datepipe.transform(
            contractArr.date_end,
            'yyyy/MM/dd'
          );

          this.machineryContractRow = [];
          this.machineryContractRow.push({
            id: contractArr.id,
            Description: contractArr.item.description ?? '-',
            Item: contractArr.item.code ?? '-',
            Quantity: contractArr.quantity ?? '-',
            Location: contractArr.location.description ?? '-',
            Time: '08:00',
            EstimatedHours: 1,
            // SpecificCrew: '-',
          });
        });
    } else {
      this.machineryRow = [];
    }
  }

  numericCount(type, value) {
    if (type === 'remarks') {
      this.numericRemarks = value.length;
      this.invalidNumericRemarks = this.numericRemarks >= 100 ? true : false;
    }

    if (this.mheForm.bookingType !== 'Contract') {
      if (type === 'jobDesc') {
        this.numericJobDesc = value.length;
        this.invalidNumericJobDesc = this.numericJobDesc >= 100 ? true : false;
      }
    }
  }
}
