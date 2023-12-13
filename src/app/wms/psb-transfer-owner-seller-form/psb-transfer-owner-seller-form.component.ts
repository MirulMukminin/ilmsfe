import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TableHeaderItem, TableModel } from 'carbon-components-angular';
import { ButtonType } from 'carbon-components-angular/button/button.types';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import {
  GoodsToSell,
  SellerForm,
} from '../interfaces/transfer-owner/transferOwnerForm_interface';
import { TransferOwnerService } from '../services/transfer-owner/transfer-owner.service';

@Component({
  selector: 'app-psb-transfer-owner-seller-form',
  templateUrl: './psb-transfer-owner-seller-form.component.html',
  styleUrls: ['./psb-transfer-owner-seller-form.component.scss'],
})
export class PsbTransferOwnerSellerFormComponent implements OnInit {
  saleDate = '';
  currentDate = '';
  // invalidbackDated = false;

  counter = 0;

  selectDataToLoad = '';
  disableRegNoCombo = false;
  goodsFormNumber: any[] = [];
  goodsFormNumberArr = [];
  formNumberList: any[] = [];

  goodsDetailsList = [];
  goodsDetailsArr = [];

  // regNoList = [];
  // regNoListed = false;
  // regNoSelected: string;
  selectedGoods = [] as GoodsToSell[];

  @Input() goodDetailsModel = new TableModel();

  goodsToSellTableInvalid = false;

  buyerArrName = [];
  buyerArrList = [];

  // For numbering input
  step = 1;
  min = 0;
  max = 100;

  fileArray = [];
  fileEvent: any;

  requiredOthersText = false;

  invalidBuyer = false;
  invalidPONumber = false;
  invalidInvoiceNumber = false;
  invalidSellingPrice = false;
  invalidDate = false;
  invalidOthersText = false;
  // invalidFile = false;
  invalidQuantity: any = [];
  requiredQuantity: any = [];

  sellerForm: SellerForm = {};

  disabledOtherText = true;

  companyName = '';
  requestBy = '';

  numericRemarks: any = 0;
  invalidNumericRemarks = false;

  open: boolean = false;
  trigger: boolean = false;

  @Input() files = new Set();
  @Input() buttonType = 'primary';
  @Input() accept = ['.jpg', '.png', '.pdf'];
  @Input() multiple = true;
  @Input() skeleton = false;
  @Input() sizeUploder = 'normal';
  @Input() disabled = false;

  protected maxSize = 500000;

  typeOfCategory: any[] = [
    {
      type: 'LOCAL',
      checked: true,
    },
    {
      type: 'BONDED',
    },
  ];

  @Input() ibmButton: ButtonType = 'primary';

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  @Input() size: 'sm' | 'md' | 'xl' = 'md';

  constructor(
    private appService: AppService,
    private transferOwnerService: TransferOwnerService,
    private router: Router,
    public datepipe: DatePipe
  ) {
    this.sellerForm.category = 'LOCAL';
    this.sellerForm.typeOfGoods = 'PETROLEUM';
  }

  ngOnInit(): void {
    this.userInfo();
    this.goodsDetailsTable();
    // this.goodDetailsTableHeader();

    if (
      this.transferOwnerService.getPreviousUrl() ===
      '/wms/psb-transfer-owner-seller-form-preview'
    ) {
      setTimeout(() => {
        this.getData();
      }, 900);
    }
  }

  selectK8(event: any) {
    this.selectDataToLoad = event.item.content;

    if (this.selectDataToLoad) {
      this.goodsDetailsList = [];
      const reqNo = {
        registrationNo: this.selectDataToLoad,
        customer: this.companyName,
      };
      restServices.pbksb_PSBService
        .GoodListByRegistrationNoAndCustomer(this.appService.myApp)(reqNo)
        .then((result) => {
          const array: any = result;
          const goodsArr = JSON.parse(array);

          this.goodsDetailsArr = goodsArr;

          for (let i = 0; i < this.goodsDetailsArr.length; i++) {
            this.goodsDetailsList.push({
              id: this.goodsDetailsArr[i].id,
              gdFormType: this.goodsDetailsArr[i].good_in.form_type,
              formNum: this.goodsDetailsArr[i].good_in.registration_no,
              goodsDesc: this.goodsDetailsArr[i].description,
              oriQuantity: this.goodsDetailsArr[i].quantity,
              currentQuantity: this.goodsDetailsArr[i].current_quantity,
              value: this.addZeroes(this.goodsDetailsArr[i].value),
              gdLocation: this.goodsDetailsArr[i].good_in.location.description,
              gdSelect: false,
            });
          }
        });
    } else {
      this.goodsDetailsList = [];
    }
    // console.log(this.selectDataToLoad)
  }

  addGoods() {
    this.open = false;
    this.goodsDetailsList.forEach((elem) => {
      let exist = this.selectedGoods.some((item) => item.id == elem.id);
      if (elem.gdSelect == true && !exist) {
        this.selectedGoods.push({
          id: elem.id,
          items: elem.goodsDesc,
          formtype: elem.gdFormType,
          regNo: elem.formNum,
          qty: elem.currentQuantity,
          maxQty: elem.currentQuantity,
          location: elem.gdLocation,
          selected: false,
        });
      }
    });

    // console.log(this.selectedGoods)
  }

  checkSelectedGoodsLength() {
    return this.selectedGoods.some((item) => item.selected == true);
  }

  deleteGoodsDetails() {
    this.selectedGoods.forEach((elem) => {
      if (elem.selected) {
        this.selectedGoods = this.selectedGoods.filter(
          (item) => item.selected !== elem.selected
        );
      }
    });
    this.counter = 0;
  }

  cancelMethod() {
    this.selectedGoods.forEach((elem) => {
      elem.selected = false;
    });

    this.counter = 0;
  }

  goodsCheckboxChange(event: any) {
    if (event === true) {
      this.counter++;
    } else if (event == false) {
      this.counter--;
    }
  }

  getData() {
    this.sellerForm = this.transferOwnerService.getSellerFormValue();
    if (this.transferOwnerService.getSellerFormValue().relatedDocuments) {
      this.transferOwnerService
        .getSellerFormValue()
        .relatedDocuments.forEach((item) => {
          this.files.add(item);
          this.fileEvent = this.files.add(item);
          // console.log(item);
          console.warn(this.files.add(item));
        });
    }

    this.selectedGoods = this.sellerForm.goodsToSell!;
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
      new TableHeaderItem({ data: 'Location' }),
    ];
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        // console.log(initialData);

        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;

        this.getRestServiceAPI();
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

  getRestServiceAPI() {
    restServices.pbksb_PSBService
      .customerList(this.appService.myApp)()
      .then((result) => {
        const resArr: any = result;
        const buyer = JSON.parse(resArr);

        for (let i = 0; i < buyer.length; i++) {
          this.buyerArrName.push({
            content: buyer[i].name,
          });
        }

        this.buyerArrName = this.buyerArrName.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        this.buyerArrList = this.buyerArrName;
      });
    //modal
    const param = { customer: this.companyName };
    restServices.pbksb_PSBService
      .registrationNoListByCustomer(this.appService.myApp)(param)
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
        // console.log(this.goodsFormNumber)
      });
  }

  // onChangeGoods(event: any) {

  //   if(event.value == 'OTHERS'){
  //     this.disabledOtherText = false;
  //     this.requiredOthersText = true;
  //   }else {
  //     this.disabledOtherText = true;
  //     this.requiredOthersText = false;
  //     this.sellerForm.othersText = '';
  //   }
  // }

  onDropped(event: any) {
    // this.invalidFile = false;
    this.fileEvent = event;

    // console.log(this.fileEvent);
  }

  onSubmit(sellerFormValue: NgForm) {
    try {
      for (let x of this.fileEvent) {
        this.fileArray.push(x);
        this.sellerForm.relatedDocuments = this.fileArray;
      }
    } catch (err) {
      console.debug();
    }

    if (sellerFormValue.valid) {
      // if (this.saleDate < this.currentDate) {
      //   this.invalidbackDated = true;
      // }
      //  if(this.fileArray.length == 0) {
      //   this.invalidFile = true
      // }
      if (this.selectedGoods.length == 0) {
        this.goodsToSellTableInvalid = true;
      } else if (this.invalidNumericRemarks) {
        //dont submit if remarks error
      } else {
        const data = {
          companyName: (this.sellerForm.companyName = this.companyName),
          requestBy: (this.sellerForm.requestBy = this.requestBy),
          buyer: this.sellerForm.buyer,
          poNumber: this.sellerForm.poNumber,
          invoiceNumber: this.sellerForm.invoiceNumber,
          saleDate: this.sellerForm.saleDate,
          category: this.sellerForm.category,
          relatedDocuments: this.sellerForm.relatedDocuments,
          remarks: this.sellerForm.remarks,
          goodsToSell: this.selectedGoods,
        };

        // console.log(data)
        this.transferOwnerService.setSellerFormValue(data);
        this.router.navigate(['/wms/psb-transfer-owner-seller-form-preview']);
        // console.log(sellerFormValue.value)
        // console.log(this.sellerForm.relatedDocuments)
      }
    } else if (sellerFormValue.invalid) {
      if (!this.sellerForm.buyer) {
        this.invalidBuyer = true;
      } else {
        this.invalidBuyer = false;
      }

      if (!this.sellerForm.poNumber) {
        this.invalidPONumber = true;
      } else {
        this.invalidPONumber = false;
      }

      if (!this.sellerForm.invoiceNumber) {
        this.invalidInvoiceNumber = true;
      } else {
        this.invalidInvoiceNumber = false;
      }

      // if (!this.sellerForm.sellingPrice) {
      //   this.invalidSellingPrice = true;
      // } else {
      //   this.invalidSellingPrice = false;
      // }

      if (!this.sellerForm.saleDate) {
        this.invalidDate = true;
      } else {
        this.invalidDate = false;
      }

      for (let i = 0; i < this.selectedGoods.length; i++) {
        if (!this.selectedGoods[i].qty) {
          this.requiredQuantity[i] = true;
        } else if (this.selectedGoods[i].qty) {
          this.requiredQuantity[i] = false;
        }
      }

      // if (this.requiredOthersText == true) {
      //   if (!this.sellerForm.othersText) {
      //     this.invalidOthersText = true;
      //   } else {
      //     this.invalidOthersText = false;
      //   }
      // }
    }
  }

  dropddownValueChange() {
    if (this.sellerForm.buyer) {
      this.invalidBuyer = false;
    }
  }

  inputValueChange() {
    this.selectedGoods.forEach((value, i) => {
      if (value.qty > value.maxQty || value.qty < 1) {
        this.invalidQuantity[i] = true;
      } else {
        this.invalidQuantity[i] = false;
      }
    });

    if (this.sellerForm.poNumber) {
      this.invalidPONumber = false;
    }

    if (this.sellerForm.invoiceNumber) {
      this.invalidInvoiceNumber = false;
    }

    // if (this.sellerForm.sellingPrice) {
    //   this.invalidSellingPrice = false;
    // }

    // if(this.sellerForm.othersText) {
    //   this.invalidOthersText = false;
    // }
  }

  dateValueChange(event: any) {
    if (this.sellerForm.saleDate) {
      this.invalidDate = false;
    }

    let dateToString = this.sellerForm.saleDate.toString();
    let singleDate = new Date(dateToString);
    let formatSingleDate = this.datepipe.transform(singleDate, 'dd-MM-yyyy');

    // Get current date
    let current = new Date();
    let formatCurrent = this.datepipe.transform(current, 'dd-MM-yyyy');

    this.saleDate = formatSingleDate;
    this.currentDate = formatCurrent;

    // if (this.saleDate < this.currentDate) {
    //   this.invalidbackDated = true;
    // } else {
    //   this.invalidbackDated = false;
    // }
  }
  numericCount(type, value) {
    if (type === 'remarks') {
      this.numericRemarks = value.length;
      this.invalidNumericRemarks = this.numericRemarks >= 100 ? true : false;
    }
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
