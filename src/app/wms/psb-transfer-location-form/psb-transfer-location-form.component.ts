import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { TransferForm } from '../interfaces/transfer-location/transferLocation_interface';

@Component({
  selector: 'app-psb-transfer-location-form',
  templateUrl: './psb-transfer-location-form.component.html',
  styleUrls: ['./psb-transfer-location-form.component.scss'],
})
export class PsbTransferLocationFormComponent implements OnInit {
  companyName: string;
  requestBy: string;
  datepickerval: string;
  category = 'LOCAL';
  remarks = '';
  transferForm: TransferForm;
  // transferForm: any;
  // currentPreviousLocation: TransferLocation;
  open: boolean;
  regNoList = [];
  disableRegNoCombo = false;
  regNoListed = false;
  regNoSelected: string;
  selectedGoods = [];
  selectedGoodsNew = [];
  locationList = [];
  location = [];
  step: number = 1;
  min: number = 0;
  invalidDate = false;
  invalidQty = [];
  invalidLocation = [];
  selectedLocation = [];
  numericRemarks: any = 0;
  invalidNumericRemarks = false;

  @Input() goodDetailsModel = new TableModel();

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.datepickerval = '';

    this.userInfo();
    this.goodDetailsTableHeader();
    this.getLocationList();
  }

  ngAfterViewInit() {
    // this.getListRegNo();
    this.checkPassObj();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.requestBy = initialData.Fullname;
        this.companyName = initialData.Company;
        this.getListRegNo(this.companyName);
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

  goodDetailsTableHeader() {
    let idCol = new TableHeaderItem({ data: 'goods id' });
    idCol.visible = false;
    let oriQtyCol = new TableHeaderItem({ data: 'Original Qty.' });
    oriQtyCol.visible = false;

    this.goodDetailsModel.header = [
      // new TableHeaderItem({ data: "Action" }),
      new TableHeaderItem({ data: 'No.' }),
      new TableHeaderItem({ data: 'Form Type' }),
      new TableHeaderItem({ data: 'Registration No.' }),
      new TableHeaderItem({ data: 'Goods Description' }),
      oriQtyCol,
      new TableHeaderItem({ data: 'Current Qty.' }),
      new TableHeaderItem({
        data: 'Value (RM)',
        style: { 'text-align': 'right' },
      }),
      new TableHeaderItem({ data: 'Location' }),
      idCol,
    ];
  }

  getListRegNo(company: string) {
    const param = { customer: company };
    // console.log(param);
    restServices.pbksb_PSBService
      .registrationNoListByCustomer(this.appService.myApp)(param)
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);

        resArr.forEach((element) => {
          if (element) {
            this.regNoList.push({ content: element });
          }
        });

        if (this.regNoList.length > 0) {
          this.regNoListed = true;
        }
      });
  }

  selected(even: any) {
    if (even.item) {
      this.regNoSelected = even.item.content;
      this.getGoodsInList(this.regNoSelected);
    } else {
      this.goodDetailsModel.data = [];
    }
  }

  getGoodsInList(regNo: string) {
    const param = { registrationNo: regNo, customer: this.companyName };

    restServices.pbksb_PSBService
      .GoodListByRegistrationNoAndCustomer(this.appService.myApp)(param)
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);
        this.goodDetailsModel.data = this.populateData(resArr);

        // if(this.goodDetailsModel.data[0].length < 1 ){

        //   this.goodDetailsModel.data.push([
        //     new TableItem({ data: "No data found.", colSpan: 7 })
        //   ]);
        // }
      });
  }

  populateData(data: any) {
    let populate = [];

    // console.log(data);
    // console.log(data.length);

    if (data.length > 0) {
      data.forEach((val, idx) => {
        populate.push([
          new TableItem({ data: idx + 1 }),
          new TableItem({ data: val.good_in.form_type }),
          new TableItem({ data: val.good_in.registration_no }),
          new TableItem({ data: val.description }),
          new TableItem({ data: val.quantity }),
          new TableItem({ data: val.current_quantity }),
          new TableItem({
            data: this.addZeroes(val.value),
            style: { 'text-align': 'right' },
          }),
          new TableItem({ data: val.good_in.location.description }),
          new TableItem({ data: val.id }),
        ]);
      });
    }
    // else{

    //   populate.push([

    //     new TableItem({ data: "No data found.", colSpan: 7 })

    //   ]);

    // }

    return populate;
  }

  addItems() {
    let selectedRow = [];

    this.goodDetailsModel.rowsSelected.forEach((selected, idx) => {
      if (selected) {
        selectedRow = this.appService.jsonToArray(
          JSON.stringify(this.goodDetailsModel.data[idx])
        );

        if (!this.checkAddedToCurrLocation(selectedRow[8].data)) {
          this.selectedGoods.push({
            items: selectedRow[3].data,
            formtype: selectedRow[1].data,
            regNo: selectedRow[2].data,
            qty: selectedRow[5].data,
            location: selectedRow[7].data,
            gid: selectedRow[8].data,
            selected: false,
            pair: idx,
            maxQty: selectedRow[5].data,
          });

          this.selectedGoodsNew.push({
            items: selectedRow[3].data,
            formtype: selectedRow[1].data,
            regNo: selectedRow[2].data,
            // qty: selectedRow[5].data,
            qty: 0,
            // location: selectedRow[7].data,
            location: '',
            gid: selectedRow[8].data,
            selected: false,
            pair: idx,
            maxQty: selectedRow[5].data,
            holdQty: 0,
          });

          this.invalidLocation.push(false);
          this.invalidQty.push(false);
        }
      }
    });
  }

  checkAddedToCurrLocation(gid: string) {
    let added = false;

    this.selectedGoods.forEach((item) => {
      if (item.gid == gid) {
        // console.log(gid);
        added = true;
      }
    });

    return added;
  }

  getLocationList() {
    restServices.pbksb_PSBService
      .GetSiteLocation(this.appService.myApp)()
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);

        resArr.forEach((element) => {
          this.locationList.push({
            content: element.description,
          });
        });

        this.locationList = this.locationList.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        this.location = this.locationList;
      });
  }

  onSubmit(formModel: NgForm) {
    // console.log(formModel);

    let submitData: any;
    // let categoryData = formModel.form.value.category;
    let categoryData = this.category;
    // let categoryData = "";

    if (!categoryData) {
      categoryData = 'LOCAL';
    }

    // console.log(formModel.form.value);
    // console.log(this.validation(formModel));
    if (this.validation(formModel) && !this.invalidNumericRemarks) {
      submitData = {
        form: {
          customer: this.companyName,
          transfer_date: formatDate(
            formModel.form.value.transferdate[0],
            'yyyy-MM-dd',
            'en_US'
          ),
          category: categoryData,
          type_of_goods: 'PETROLEUM',
          status: 'IN_PROGRESS',
          remarks: formModel.form.value.remarks,
          request_by: this.requestBy,
          psbOldLocationForm: [],
          psbNewLocationForm: [],
        },
      };

      this.selectedGoods.forEach((item) => {
        submitData.form.psbOldLocationForm.push({
          items: item.items,
          goodID: item.gid,
          quantity: item.qty,
          location: item.location,
          formType: item.formtype,
          regNo: item.regNo,
          pair: item.pair,
          maxQty: item.maxQty,
        });
      });

      // console.log(submitData.form.psbOldLocationForm);

      this.selectedGoodsNew.forEach((item) => {
        submitData.form.psbNewLocationForm.push({
          items: item.items,
          goodID: item.gid,
          quantity: item.qty,
          location: item.location.content,
          formType: item.formtype,
          regNo: item.regNo,
          pair: item.pair,
          maxQty: item.maxQty,
          holdQty: item.holdQty,
        });
      });

      // console.log(submitData);
      this.appService.passObj = submitData;
      this.router.navigate(['/wms/psb-transfer-location-preview']);
    }
  }

  validation(formData: any) {
    let validate = false;
    this.invalidDate = false;

    // console.log(this.datepickerval);

    if (!this.datepickerval || this.datepickerval.length == 0) {
      this.invalidDate = true;
      validate = false;
    } else if (!this.validateRow()) {
      validate = false;
    } else {
      validate = true;
    }

    return validate;
  }

  validateRow() {
    let rowStatus = false;

    this.selectedGoodsNew.forEach((element, idx) => {
      // console.log(element.location);

      if (!element.qty || element.qty == 0) {
        this.invalidQty[idx] = true;
        rowStatus = false;
      } else if (!element.location) {
        this.invalidLocation[idx] = true;
        rowStatus = false;
      } else {
        rowStatus = true;
      }
    });

    return rowStatus;
  }

  checkActionCurr() {
    return this.selectedGoods.some((item) => item.selected == true);
  }

  checkActionNew() {
    return this.selectedGoodsNew.some((item) => item.selected == true);
  }

  cancelActionCurr() {
    this.selectedGoods.forEach((item) => {
      if (item.selected) {
        item.selected = false;
      }
    });
  }

  cancelActionNew() {
    this.selectedGoodsNew.forEach((item) => {
      if (item.selected) {
        item.selected = false;
      }
    });
  }

  deleteCurrLocationRow() {
    let arrOldIdx = [];
    let arrNewIdx = [];

    this.selectedGoods.forEach((item, oriIdx) => {
      if (item.selected) {
        this.selectedGoodsNew.forEach((val, idx) => {
          if (val.pair == item.pair) {
            arrNewIdx.push({ idx });
          }
        });

        arrOldIdx.push({ oriIdx });
        this.goodDetailsModel.selectRow(item.pair, false);
      }
    });

    arrNewIdx.forEach((val) => {
      this.selectedGoodsNew.splice(val, 1);
    });

    arrOldIdx.forEach((val) => {
      this.selectedGoods.splice(val, 1);
    });
  }

  addLocation() {
    this.selectedGoodsNew.forEach((item) => {
      if (item.selected) {
        this.selectedGoodsNew.push({
          items: item.items,
          formtype: item.formtype,
          regNo: item.regNo,
          // qty: item.qty,
          qty: 0,
          // location: selectedRow[7].data,
          location: '',
          gid: item.gid,
          selected: false,
          pair: item.pair,
          maxQty: item.maxQty,
          holdQty: 0,
        });
      }
    });

    this.selectedGoodsNew.sort((a, b) => {
      return a.pair - b.pair;
    });
  }

  removeLocation() {
    let arrNewIdx = [];
    let arrNewPair = [];
    let totalPairHold = 0;

    this.selectedGoodsNew.forEach((item, idx) => {
      if (item.selected) {
        arrNewIdx.push(idx);
        arrNewPair.push(item.pair);
      }
    });

    let countUp = 0;

    arrNewIdx.forEach((val) => {
      this.selectedGoodsNew.splice(val - countUp, 1);
      countUp = countUp + 1;
    });

    arrNewPair.forEach((val) => {
      this.selectedGoodsNew.forEach((element, idx) => {
        if (element.pair == val) {
          totalPairHold = totalPairHold + element.holdQty;
        }
      });

      this.selectedGoods.forEach((item, idx) => {
        if (item.pair == val) {
          item.qty = item.maxQty - totalPairHold;
        }
      });
    });

    this.removeCurrRow(arrNewPair);
  }

  removeCurrRow(pairs: any) {
    let UnfilteredPairIdx = [];
    let pairIdx = [];

    let tempVal = '';
    let countFilter = 0;
    let countUp = 0;

    pairs.forEach((element) => {
      if (!this.checkOtherPair(element)) {
        this.selectedGoods.forEach((val, idx) => {
          if (val.pair == element) {
            UnfilteredPairIdx.push(idx);
            this.goodDetailsModel.selectRow(val.pair, false);
          }
        });
      }
    });

    UnfilteredPairIdx.forEach((val, idx) => {
      if (countFilter == 0) {
        tempVal = val;
      }

      if (tempVal !== val) {
        pairIdx.push(val);

        tempVal = val;
      } else if (countFilter == 0 && tempVal == val) {
        pairIdx.push(val);
      }

      countFilter = countFilter + 1;
    });

    pairIdx.forEach((val, idx) => {
      this.selectedGoods.splice(val - countUp, 1);
      countUp = countUp + 1;
    });
  }

  checkOtherPair(pair: string) {
    let foundPair = false;

    this.selectedGoodsNew.forEach((item, idx) => {
      if (item.pair == pair) {
        foundPair = true;
      }
    });

    return foundPair;
  }

  updateQty(event: any, pair: string, rowIdx: number) {
    let totalPairHold = 0;

    this.selectedGoodsNew.forEach((element, idx) => {
      if (idx == rowIdx) {
        element.holdQty = event.value;
      }

      if (element.pair == pair) {
        totalPairHold = totalPairHold + element.holdQty;
      }
    });

    this.selectedGoods.forEach((val, idx) => {
      if (val.pair == pair) {
        val.qty = val.maxQty - totalPairHold;
      }
    });
  }

  checkPassObj() {
    // console.log(this.appService.passObj);
    if (this.appService.passObj) {
      const form = this.appService.passObj.form;
      this.datepickerval = formatDate(form.transfer_date, 'd/M/Y', 'en-us');
      this.category = form.category;
      this.remarks = form.remarks;

      form.psbNewLocationForm.forEach((element) => {
        // console.log(element.location);

        this.selectedGoodsNew.push({
          items: element.items,
          formtype: element.formType,
          regNo: element.regNo,
          // qty: item.qty,
          qty: element.quantity,
          // location: selectedRow[7].data,
          location: element.location,
          gid: element.goodID,
          selected: false,
          pair: element.pair,
          maxQty: element.maxQty,
          holdQty: element.holdQty,
        });

        // this.getLocationList();

        // this.locationList.forEach(val => {

        //   console.log(val.content);

        //   if(val.content == element.location){

        //     val.selected = true;

        //   }

        // });
      });

      form.psbOldLocationForm.forEach((element) => {
        this.selectedGoods.push({
          items: element.items,
          formtype: element.formType,
          regNo: element.regNo,
          qty: element.quantity,
          location: element.location,
          gid: element.goodID,
          selected: false,
          pair: element.pair,
          maxQty: element.maxQty,
        });
      });
    }
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
