import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ButtonType,
  TableHeaderItem,
  TableModel,
} from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BuildParts,
  NewParts,
  PartsIssue,
} from '../interfaces/build-parts/build-parts';
import { BuildPartsService } from '../services/build-parts/build-parts.service';

@Component({
  selector: 'app-psb-build-parts-form',
  templateUrl: './psb-build-parts-form.component.html',
  styleUrls: ['./psb-build-parts-form.component.scss'],
})
export class PsbBuildPartsFormComponent implements OnInit {
  @ViewChild('dateFocus') dateFocus: ElementRef;
  @ViewChild('partsIssueFocus') partsIssueFocus: ElementRef;
  @ViewChild('newPartsFocus') newPartsFocus: ElementRef;
  @ViewChild('remarksElement') remarksElement: ElementRef;

  open: boolean = false;
  trigger: boolean = false;
  //disabledTypeOfGoods = true

  //drag & drop upload
  @Input() title = 'Upload related Documents';
  @Input() files = new Set();
  @Input() description =
    'Max. file size is 500kb. Supported file Types are .jpg, .png, .pdf';
  @Input() accept = ['.jpg', '.png', '.pdf'];
  @Input() multiple = true;
  @Input() dropText = 'Drag and drop files here or click to upload';
  @Input() disabled = false;
  @Input() drop = true;

  //number initialization
  step: number = 1;
  min: number = 0;
  max: number = 9999;

  disabledDropdownContent = false;
  addNewPartsDisabled = false;
  addPartsIssueDisabled = false;
  counter = 0;
  counterNewParts = 0;

  uploadFile = [];
  uploadEvent: any;

  ibmButton: ButtonType = 'primary';

  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  issueDate = '';
  dateInvalid = '';
  dateString = '';
  selectDate = '';
  currentDate = '';

  bpForm: BuildParts = {};
  selectedGoodsForm: any[] = [];

  //initial form declaration
  companyName = '';
  requestBy = '';

  selectLoadData = '';
  disableDropdown = false;

  locationNewParts = '';
  location = [];

  goodsFormNumber: any[] = [];
  goodsFormNumberArr = [];
  formNumberList: any[] = [];

  locationArr = [];
  locationList = [];

  goodsDetailsArr = [];

  id = '';
  gdFormType = '';
  formNum = '';
  goodsDesc = '';
  oriQuantity = '';
  currentQuantity = '';
  value = '';
  gdLocation = '';
  gdUOM = '';
  gdCustomCode = '';
  gdSelect = false;
  numericRemarks: any = 0;
  invalidNumericRemarks = false;

  typeOfCategory: any[] = [
    { type: 'Local', checked: true },
    { type: 'Bonded' },
  ];

  /*  TypeOfGoods: any[] = [
    {type: 'Dangerous Chemical',checked: true},
    {type: 'Others'}
  ];
 */

  //invalid
  invalidbackDated = false;
  invalidIssueDate = false;
  //invalidOtherTypeofGoods = false;
  invalidPartsQuantity: any = [];
  invalidNewPartsItem: any = [];
  invalidNewPartsQuantity: any = [];
  invalidNewPartsLocation: any = [];
  requiredPartsQuantity: any = [];
  requiredNewPartsQuantity: any = [];
  requiredNewPartsItem: any = [];
  requiredNewPartsLocation: any = [];
  invalidNewPartsItemText = 'Item required';
  //requiredOtherTypeofGoods = false;
  partsIssueListInvalid = false;
  newPartsListInvalid = false;
  requiredIssueDate = false;
  // invalidUpload = false;

  goodsChecked: any = [];

  @Input() goodDetailsModel = new TableModel();

  constructor(
    private appService: AppService,
    private buildPartsService: BuildPartsService,
    private router: Router,
    public datepipe: DatePipe
  ) {
    this.bpForm.category = 'Local';
    this.bpForm.typeOfGoods = 'DANGEROUS_CHEMICAL';
  }

  ngOnInit(): void {
    this.userInfo();
    this.goodsDetailsTable();

    if (
      this.buildPartsService.getPreviousUrl() === '/wms/psb-build-parts-preview'
    ) {
      setTimeout(() => {
        this.getData();
      }, 900);
    }

    this.checkPartsIssueLength();
  }

  goodsDetailsTable() {
    this.goodDetailsModel.header = [
      new TableHeaderItem({ data: 'Action' }),
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Form Type' }),
      new TableHeaderItem({ data: 'Form No.' }),
      new TableHeaderItem({ data: 'Goods Description' }),
      new TableHeaderItem({ data: 'Original Qty.' }),
      new TableHeaderItem({ data: 'Current Qty.' }),
      new TableHeaderItem({ data: 'Value (RM)' }),
      /*  new TableHeaderItem({ data: "Location" }), */
    ];
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;

        this.getRestServiceApi();
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

  getRestServiceApi() {
    const getRegNo = { customer: this.companyName };
    restServices.pbksb_PSBService
      .registrationNoListByCustomer(this.appService.myApp)(getRegNo)
      .then((result) => {
        const array: any = result;
        const formNumberDropdown = JSON.parse(array);

        this.goodsFormNumberArr = formNumberDropdown;

        this.goodsFormNumberArr.forEach((element) => {
          if (element) {
            this.formNumberList.push({ content: element });
          }
        });

        this.goodsFormNumber = this.formNumberList;
      });

    restServices.pbksb_PSBService
      .GetSiteLocation(this.appService.myApp)()
      .then((result) => {
        const array: any = result;
        const locationDropdown = JSON.parse(array);

        this.locationArr = locationDropdown;

        for (let i = 0; i < this.locationArr.length; i++) {
          this.locationList.push({
            content: this.locationArr[i].description,
          });
        }

        this.locationList = this.locationList.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        this.location = this.locationList;
      });
  }

  getData() {
    this.bpForm = this.buildPartsService.getBuildPartsFormValue();
    this.partsIssueList = this.bpForm.partsIssue!;
    this.newPartsList = this.bpForm.newParts!;

    this.buildPartsService.getBuildPartsFormValue().upload.forEach((item) => {
      this.files.add(item);
      this.uploadEvent = this.files.add(item);
    });
  }

  partsIssueList: PartsIssue[] = [];

  newPartsList: NewParts[] = [
    {
      id: Math.random().toString(36).substr(2, 9),
      npItem: '',
      npFormType: '',
      npFormNum: '',
      npQuantity: 0,
      npLocation: this.locationNewParts,
      npUOM: '',
      npCustomCode: '',
      npSelect: false,
    },
  ];

  goodsDetailsList = [];

  onSubmit(buildPartsForm: NgForm) {
    try {
      for (let x of this.uploadEvent) {
        this.uploadFile.push(x);
        this.bpForm.upload = this.uploadFile;
      }
    } catch (err) {
      console.debug();
    }

    this.checkValidation();

    if (buildPartsForm.valid) {
      this.checkFormNumberForNewParts();

      if (!this.bpForm.remarks) {
        this.bpForm.remarks = ' - ';
      } else if (this.partsIssueList.length < 1) {
        /* if(this.bpForm.typeOfGoods === 'Others'){
          this.bpForm.typeOfGoods = this.bpForm.otherTypeOfGood;
        } */
        this.partsIssueListInvalid = true;
        this.checkValidation();
        this.focusOnInvalid();
      } else if (this.newPartsList.length < 1) {
        this.newPartsListInvalid = true;
        this.checkValidation();
        this.focusOnInvalid();
      }

      //  else if(this.uploadFile.length == 0) {
      //     this.invalidUpload= true;
      //   }

      //  else if(this.issueDate < this.currentDate){
      //     this.invalidbackDated = true;
      //     this.dateInvalid = "Please select today's date or after today's date";
      //   }
      else if (this.invalidNumericRemarks) {
        //dont submit to preview.
        this.checkValidation();
        this.focusOnInvalid();
      } else {
        this.partsIssueListInvalid = false;
        this.newPartsListInvalid = false;
        // this.invalidUpload= false;
        // this.invalidbackDated = false;

        const data = {
          companyName: (this.bpForm.companyName = this.companyName),
          requestBy: (this.bpForm.requestBy = this.requestBy),
          issueDate: this.bpForm.issueDate,
          category: this.bpForm.category,
          typeOfGoods: this.bpForm.typeOfGoods,
          //otherTypeOfGood: this.bpForm.otherTypeOfGood,
          upload: this.bpForm.upload,
          remarks: this.bpForm.remarks,
          partsIssue: this.partsIssueList,
          newParts: this.newPartsList,
        };

        this.buildPartsService.setBuildPartsFormValue(data);
        this.router.navigate(['/wms/psb-build-parts-preview']);
      }
    } else if (buildPartsForm.invalid) {
      this.checkValidation();
      this.focusOnInvalid();
    }
  }

  checkValidation() {
    if (this.partsIssueList.length < 1) {
      this.partsIssueListInvalid = true;
    } else if (this.partsIssueList.length > 0) {
      this.partsIssueListInvalid = false;
    }
    if (this.newPartsList.length < 1) {
      this.newPartsListInvalid = true;
    } else if (this.newPartsList.length > 0) {
      this.newPartsListInvalid = false;
    }

    if (!this.bpForm.issueDate) {
      this.invalidIssueDate = true;
      this.requiredIssueDate = true;
      this.dateInvalid = 'Date Required';
    } else if (this.bpForm.issueDate) {
      this.invalidIssueDate = false;
      this.requiredIssueDate = false;
    }
    /*  if(this.bpForm.typeOfGoods === 'Others'){
      if (!this.bpForm.otherTypeOfGood){
        this.invalidOtherTypeofGoods = true;
        this.requiredOtherTypeofGoods = true;
      }else if (this.bpForm.otherTypeOfGood){
        this.invalidOtherTypeofGoods = false;
        this.requiredOtherTypeofGoods = false;
      }
    } */

    for (let i = 0; i < this.newPartsList.length; i++) {
      if (!this.newPartsList[i].npItem) {
        this.invalidNewPartsItem[i] = true;
        this.requiredNewPartsItem[i] = true;
      } else if (this.newPartsList[i].npItem) {
        this.invalidNewPartsItem[i] = false;
        this.requiredNewPartsItem[i] = true;
      }

      if (!this.newPartsList[i].npQuantity) {
        this.invalidNewPartsQuantity[i] = true;
        this.requiredNewPartsQuantity[i] = true;
      } else if (this.newPartsList[i].npQuantity) {
        this.invalidNewPartsQuantity[i] = false;
        this.requiredNewPartsQuantity[i] = true;
      }

      if (!this.newPartsList[i].npLocation) {
        this.invalidNewPartsLocation[i] = true;
        this.requiredNewPartsLocation[i] = true;
      } else if (this.newPartsList[i].npLocation) {
        this.invalidNewPartsLocation[i] = false;
        this.requiredNewPartsLocation[i] = true;
      }
    }

    for (let i = 0; i < this.partsIssueList.length; i++) {
      if (!this.partsIssueList[i].piQuantity) {
        this.invalidPartsQuantity[i] = true;
        this.requiredPartsQuantity[i] = true;
      } else if (this.partsIssueList[i].piQuantity) {
        this.invalidPartsQuantity[i] = false;
        this.requiredPartsQuantity[i] = false;
      }
    }

    // if(this.uploadFile.length == 0) {
    //   this.invalidUpload= true;
    // }

    this.focusOnInvalid();
  }

  dateValueChange(event: any) {
    if (this.bpForm.issueDate) {
      this.invalidIssueDate = false;
    }

    /* from calendar (user time) */
    this.dateString = this.bpForm.issueDate.toString();
    let date = new Date(this.dateString);
    this.selectDate = this.datepipe.transform(date, 'dd/MM/yyyy');

    let current = new Date();
    let formatCurrent = this.datepipe.transform(current, 'dd-MM-yyyy');

    this.issueDate = this.selectDate;
    this.currentDate = formatCurrent;

    // if(this.issueDate < this.currentDate){
    //   this.invalidbackDated = true;
    //   this.dateInvalid = "Please select today's date or after today's date";
    // }
    // else{
    //   this.invalidbackDated = false;
    // }
  }

  onChange(event: any) {
    this.bpForm.category = event.value;
  }

  selectK8(event: any) {
    this.selectLoadData = event.item.content;

    if (this.selectLoadData) {
      this.goodsDetailsList = [];
      const regNo = {
        registrationNo: this.selectLoadData,
        customer: this.companyName,
      };
      restServices.pbksb_PSBService
        .GoodListByRegistrationNoAndCustomer(this.appService.myApp)(regNo)
        .then((result) => {
          const array: any = result;
          const goodsArr = JSON.parse(array);

          this.goodsDetailsArr = goodsArr;
          this.goodsDetailsArr.forEach((value) => {
            this.apiGoodsDetailsTableValidation(value);
            this.pushGoodsDetailsListApi();
          });
        });
    } else {
      this.goodsDetailsList = [];
    }
  }

  apiGoodsDetailsTableValidation(value: any) {
    if (value.id) {
      this.id = value.id;
      this.gdSelect = false;
    } else {
      this.id = 'N/A';
    }
    if (value.good_in.form_type) {
      this.gdFormType = value.good_in.form_type;
    } else {
      this.gdFormType = 'N/A';
    }
    if (value.good_in.registration_no) {
      this.formNum = value.good_in.registration_no;
    } else {
      this.formNum = 'N/A';
    }
    if (value.description) {
      this.goodsDesc = value.description;
    } else {
      this.goodsDesc = 'N/A';
    }
    if (value.quantity) {
      this.oriQuantity = value.quantity;
    } else {
      this.oriQuantity = 'N/A';
    }
    if (value.current_quantity) {
      this.currentQuantity = value.current_quantity;
    } else {
      this.currentQuantity = 'N/A';
    }
    if (value.value || value.value == 0) {
      this.value = value.value;
    } else {
      this.value = 'N/A';
    }
    if (value.good_in.location.description) {
      this.gdLocation = value.good_in.location.description;
    } else {
      this.gdLocation = 'N/A';
    }
    if (value.uom) {
      this.gdUOM = value.uom;
    } else {
      this.gdUOM = 'N/A';
    }
    if (value.customs_code) {
      this.gdCustomCode = value.customs_code;
    } else {
      this.gdCustomCode = 'N/A';
    }
  }

  pushGoodsDetailsListApi() {
    this.goodsDetailsList.push({
      id: this.id,
      gdFormType: this.gdFormType,
      formNum: this.formNum,
      goodsDesc: this.goodsDesc,
      oriQuantity: this.oriQuantity,
      currentQuantity: this.currentQuantity,
      value: this.value,
      gdLocation: this.gdLocation,
      gdUOM: this.gdUOM,
      gdCustomCode: this.gdCustomCode,
      gdSelect: false,
    });
  }

  /*  onChangeTypeOfGoods(event: any) {
    this.bpForm.typeOfGoods  = event.value;

    if(this.bpForm.typeOfGoods === 'Others'){
      this.disabledTypeOfGoods = false;
      this.bpForm.typeOfGoods = this.bpForm.otherTypeOfGood;
    }
    else{
      this.disabledTypeOfGoods = true;
    }

  } */

  resetPartsIssue() {
    this.partsIssueList = [];
    this.goodsDetailsList = [];
    this.selectLoadData = '';
    let element: HTMLElement = document.getElementsByClassName(
      'bx--list-box__selection'
    )[0] as HTMLElement;
    if (element) {
      element.click();
    }
    this.disableDropdown = false;
  }

  checkFormNumberForNewParts() {
    const arrayFormNumber = this.partsIssueList.map((item) => item.formNum);
    const pushFormNumber = arrayFormNumber.toString();

    const arrayFormType = this.partsIssueList.map((item) => item.piFormType);
    const pushFormType = arrayFormType.toString();

    const pushValue = this.partsIssueList.map((item) => item.piValue);
    const pushUOM = this.partsIssueList.map((item) => item.piUOM);
    const pushCustomCode = this.partsIssueList.map((item) => item.piCustomCode);

    this.newPartsList.forEach((element) => {
      // element.npFormNum = pushFormNumber[0];
      element.npFormNum = pushFormNumber;
      element.npFormType = pushFormType;
      element.npUOM = pushUOM[0];
      element.npValue = pushValue[0];
      element.npCustomCode = pushCustomCode[0];
    });
  }

  addGoodsToParts() {
    // this.partsIssueList= [];

    this.goodsDetailsList.forEach((element) => {
      if (element.gdSelect == true) {
        this.partsIssueList.push({
          id: element.id,
          piItem: element.goodsDesc,
          piFormType: element.gdFormType,
          formNum: element.formNum,
          piQuantity: element.currentQuantity,
          piMaxQty: element.currentQuantity,
          piValue: element.value,
          piLocation: element.gdLocation,
          piUOM: element.gdUOM,
          piCustomCode: element.gdCustomCode,
          piSelect: false,
        });
      }
    });
    // console.log(this.partsIssueList);
    this.open = false;
  }

  addNewParts() {
    this.newPartsList.push({
      id: Math.random().toString(36).substr(2, 9),
      npItem: '',
      npFormType: '',
      npFormNum: '',
      npQuantity: 0,
      npLocation: '',
      npUOM: '',
      npCustomCode: '',
    });
    this.checkPartsIssueLength();
  }

  checkPartsIssueLength() {
    if (this.newPartsList.length < 1) {
      this.addNewPartsDisabled = false;
    } else if (this.newPartsList.length == 1) {
      this.addNewPartsDisabled = true;
    }
  }

  onUpload(event: any) {
    // this.invalidUpload= false;
    this.uploadEvent = event;
  }

  checkLengthPartsIssue() {
    return this.partsIssueList.some((item) => item.piSelect == true);
  }

  deletePartsIssue() {
    this.partsIssueList.forEach((ticket) => {
      if (ticket.piSelect) {
        this.partsIssueList = this.partsIssueList.filter(
          (item) => item.piSelect !== ticket.piSelect
        );
      }
    });
  }

  cancelDelPartsIssue() {
    this.partsIssueList.forEach((ticket) => {
      if (ticket.piSelect) {
        ticket.piSelect = false;
      }
    });
    this.counter = 0;
  }

  cancelDelNewParts() {
    this.newPartsList.forEach((ticket) => {
      if (ticket.npSelect) {
        ticket.npSelect = false;
      }
    });
    this.counterNewParts = 0;
  }

  checkLengthNewParts() {
    return this.newPartsList.some((item) => item.npSelect == true);
  }

  deleteNewParts() {
    this.newPartsList.forEach((ticket) => {
      if (ticket.npSelect) {
        this.newPartsList = this.newPartsList.filter(
          (item) => item.npSelect !== ticket.npSelect
        );
      }
    });

    this.checkPartsIssueLength();
  }

  partsIssueCheckbox(event: any) {
    if (event === true) {
      this.counter++;
    } else if (event == false) {
      this.counter--;
    }
  }

  newPartsCheckbox(event: any) {
    if (event === true) {
      this.counterNewParts++;
    } else if (event == false) {
      this.counterNewParts--;
    }
  }

  focusOnInvalid() {
    if (this.partsIssueListInvalid) {
      this.partsIssueFocus.nativeElement.focus();
    } else if (this.newPartsListInvalid) {
      this.newPartsFocus.nativeElement.focus();
    } else if (this.invalidIssueDate) {
      this.dateFocus.nativeElement.focus();
    } else if (this.invalidNumericRemarks) {
      this.remarksElement.nativeElement.focus();
    }
  }

  inputValueChange() {
    this.partsIssueList.forEach((value, i) => {
      if (value.piQuantity > value.piMaxQty || value.piQuantity < 1) {
        this.invalidPartsQuantity[i] = true;
      } else {
        this.invalidPartsQuantity[i] = false;
      }
    });
  }
  numericCount(type, value) {
    if (type === 'remarks') {
      this.numericRemarks = value.length;
      this.invalidNumericRemarks = this.numericRemarks >= 100 ? true : false;
    }
  }

  addZeroes(num) {
    const dec = num.toString().split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return this.numberWithCommas(Number(num).toFixed(len));
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
}
