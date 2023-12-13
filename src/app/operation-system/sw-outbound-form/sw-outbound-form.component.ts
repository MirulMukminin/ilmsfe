import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from '../services/MHE/request-form.service';
import { outBoundForm } from './../interfaces/SWM/swm_interface';

@Component({
  selector: 'app-sw-outbound-form',
  templateUrl: './sw-outbound-form.component.html',
  styleUrls: ['./sw-outbound-form.component.scss'],
})
export class SwOutboundFormComponent implements OnInit {
  @ViewChild('reqOnBehalfRef') reqOnBehalfRef: ElementRef;
  @ViewChild('jobDescRef') jobDescRef: ElementRef;
  @ViewChild('poNumberRef') poNumberRef: ElementRef;
  @ViewChild('bookingDateRef') bookingDateRef: ElementRef;
  @ViewChild('refNoRef') refNoRef: ElementRef;
  @ViewChild('remarksElement') remarksElement: ElementRef;

  outBoundForm: outBoundForm = {};
  numericRemarks: any = 0;
  invalidNumericRemarks = false;

  // initial data
  companyName: string = '';
  requestBy: string = '';
  serviceOrderNo: string = '';

  wasteCodeCombo: any[] = [];
  wasteCodeComboList: any[] = [];
  previousURL: string = '';

  wasteCodeDetailList = [];

  listWasteCodeModal = [];
  wasteCodeSelected = [];

  // 2 way binding
  reqOnBehalf: string;
  jobDesc: string;
  PONo: string;
  bookingDate: string;
  remarks: string;
  refNo: string;

  token: string;
  invalidOnBehalf = false;
  invalidWasteCode = false;
  requestOnBehalfList: any[] = [];
  requestOnBehalfArr: any[] = [];
  wasteCodeComboListModel = '';
  time = '';

  outboundWasteDetails = [];

  // modal
  modalOpen: boolean = false;
  wasteCodeChoice = '';

  // Invalid
  invalidJobDesc: boolean = false;
  invalidPONo: boolean = false;
  invalidBookingDate: boolean = false;
  invalidRefNo: boolean = false;

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  constructor(
    private router: Router,
    private appService: AppService,
    private requestForm: RequestFormService
  ) {}

  ngOnInit(): void {
    this.previousURL = this.requestForm.getPreviousUrl();
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;
        this.token = initialData.Token.access_token;
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

  getRestServiceAPI(initData: any) {
    restServices.pbksb_MarineService
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
        if (this.previousURL === '/operation-system/sw-outbound-preview') {
          let value = this.appService.getValueOutboundForm();

          this.outBoundForm.requestOnBehalf = value.form.requestOnBehalf;
          this.outBoundForm.jobDescription = value.form.jobDescription;
          this.outBoundForm.PONumber = value.form.poNumber;
          this.outBoundForm.bookingDate = value.form.bookingDate;
          if (value.form.remarks) {
            this.outBoundForm.remarks = value.form.remarks;
          }
          this.outBoundForm.refNo = value.form.referenceNo;

          value.form.outboundWasteDetailsList.forEach((value, i) => {
            this.outboundWasteDetails.push({
              palletId: value.palletId,
              wasteCode: value.wasteCode,
              quantity: value.quantity,
              oum: value.oum,
              weight: value.weight,
              location: value.location,
              expireDate: value.expireDate,
              expiryDateOriginal: value.expiryDateOriginal,
            });
          });
        }
      });

    var apiParam: any = {
      customer: this.companyName,
    };

    restServices.pbksb_ScheduledWasteService
      .getWasteCodeList(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const wasteCodeListApi = JSON.parse(resArr);

        wasteCodeListApi.forEach((element) => {
          if (element) {
            this.wasteCodeCombo.push({ content: element.wasteCode });
          }
          this.wasteCodeComboList = this.wasteCodeCombo;
        });
      });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.outboundWasteDetails.length > 0 && !this.invalidNumericRemarks) {
        const data = {
          form: {
            companyName: this.companyName,
            requestBy: this.requestBy,
            requestOnBehalf: this.outBoundForm.requestOnBehalf,
            bookingDate: this.outBoundForm.bookingDate,
            jobDescription: this.outBoundForm.jobDescription,
            remarks: this.outBoundForm.remarks,
            poNumber: this.outBoundForm.PONumber,
            referenceNo: this.outBoundForm.refNo,
            outboundWasteDetailsList: this.outboundWasteDetails,
          },
        };

        this.appService.passOutBoundObj = {};
        this.appService.passOutBoundObj = data;
        this.router.navigate(['/operation-system/sw-outbound-preview']);
      }
    } else {
      if (!this.outBoundForm.requestOnBehalf) {
        this.invalidOnBehalf = true;
      }
      if (!this.outBoundForm.jobDescription) {
        this.invalidJobDesc = true;
      }

      if (!this.outBoundForm.PONumber) {
        this.invalidPONo = true;
      }

      if (!this.outBoundForm.bookingDate) {
        this.invalidBookingDate = true;
      }
      if (!this.outBoundForm.refNo) {
        this.invalidRefNo = true;
      }

      this.focusOnInvalid();
    }
  }

  checkSelected() {
    return this.outboundWasteDetails.some((item) => {
      return item.selected === true;
    });
  }

  deleteWasteDetails() {
    this.outboundWasteDetails.forEach((ticket, i) => {
      if (ticket.Selected) {
        this.outboundWasteDetails = this.outboundWasteDetails.filter(
          (item) => item.Selected !== ticket.Selected
        );

        if (ticket.palletId == this.listWasteCodeModal[i].palletId) {
          this.listWasteCodeModal[i].Selected = false;
        }
      }
    });
  }
  cancelWasteDetails() {
    this.outboundWasteDetails.forEach((item) => {
      item.selected = false;
    });
  }

  modalLoadData() {
    this.listWasteCodeModal = this.wasteCodeDetailList
      .filter((item) => {
        return this.wasteCodeChoice === item.wasteCode;
      })
      .map((item) => ({
        ...item,
        selected: false,
      }));
  }

  inputValueChange(event) {
    if (this.outBoundForm.requestOnBehalf) {
      this.invalidOnBehalf = false;
    }
    if (this.outBoundForm.jobDescription) {
      this.invalidJobDesc = false;
    }

    if (this.outBoundForm.PONumber) {
      this.invalidPONo = false;
    }

    if (this.outBoundForm.bookingDate) {
      this.invalidBookingDate = false;
    }
    if (this.outBoundForm.refNo) {
      this.invalidRefNo = false;
    }
  }

  focusOnInvalid() {
    if (this.invalidOnBehalf) {
      this.reqOnBehalfRef.nativeElement.focus();
    } else if (this.invalidJobDesc) {
      this.jobDescRef.nativeElement.focus();
    } else if (this.invalidPONo) {
      this.poNumberRef.nativeElement.focus();
    } else if (this.invalidBookingDate) {
      this.bookingDateRef.nativeElement.focus();
    } else if (this.invalidNumericRemarks) {
      this.remarksElement.nativeElement.focus();
    } else if (this.invalidRefNo) {
      this.refNoRef.nativeElement.focus();
    }
  }
  checkValidation() {}

  onSearch(event: any) {
    this.listWasteCodeModal = event;
    if (this.listWasteCodeModal) {
      this.invalidWasteCode = false;
    }
  }

  onSelectedCombo(event: any) {
    if (event.item) {
      if (event.item.content) {
        this.listWasteCodeModal = event.item.content;
        this.loadDataButton(event.item.content);
        if (this.listWasteCodeModal) {
          this.invalidWasteCode = false;
        }
      }
    }
  }

  loadDataButton(wasteCode: any) {
    if (this.wasteCodeComboListModel) {
      this.listWasteCodeModal = [];

      //populate modal table
      var apiParam: any = {
        customer: this.companyName,
        wasteCode: wasteCode,
      };

      restServices.pbksb_ScheduledWasteService
        .getOutboundWasteDetails(this.appService.myApp)(apiParam)
        .then((result) => {
          const resArr: any = result;
          const responseAPI = JSON.parse(resArr);

          responseAPI.forEach((value, index) => {
            var selectedStatus = false;
            this.generatelistWasteCodeModal(value, selectedStatus);
          });
          if (this.outboundWasteDetails.length > 0) {
            this.outboundWasteDetails.forEach((ticket, i) => {
              this.listWasteCodeModal.forEach((value2, i) => {
                if (ticket.palletId == value2.palletId) {
                  value2.Selected = true;
                }
              });
            });
          }
        });
    } else {
      this.invalidWasteCode = true;
      this.listWasteCodeModal = [];
    }
  }

  generatelistWasteCodeModal(value: any, selectedStatus: boolean) {
    let formattedExpiryDate = formatDate(value.expiryDate, 'd/M/Y', 'en-us');

    this.listWasteCodeModal.push({
      palletId: value.palletId ? value.palletId : 'N/A',
      wasteCode: value.itemCode ? value.itemCode : 'N/A',
      quantity: value.quantity ? value.quantity : 'N/A',
      oum: value.uom ? value.uom : 'N/A',
      weight: value.palletWeight ? value.palletWeight : 'N/A',
      location: value.location ? value.location : 'N/A',
      expireDate: formattedExpiryDate ? formattedExpiryDate : 'N/A',
      expiryDateOriginal: value.expiryDate,
      Selected: selectedStatus,
    });
    console.log(this.listWasteCodeModal);
  }

  addToOutboundList() {
    if (this.outboundWasteDetails.length > 0) {
      this.listWasteCodeModal.forEach((value, i) => {
        if (value.Selected == true) {
          let dataIsExist = false;
          this.outboundWasteDetails.forEach((value2, i) => {
            if (value.palletId == value2.palletId) {
              dataIsExist = true;
            }
          });
          if (!dataIsExist) {
            this.outboundWasteDetails.push({
              palletId: value.palletId,
              wasteCode: value.wasteCode,
              quantity: value.quantity,
              oum: value.oum ? value.oum : 'N/A',
              weight: value.weight ? value.weight : 'N/A',
              location: value.location ? value.location : 'N/A',
              expireDate: value.expireDate ? value.expireDate : 'N/A',
              expiryDateOriginal: value.expiryDateOriginal,
              Selected: true,
            });
          }
        }
      });
    } else {
      this.listWasteCodeModal.forEach((value, i) => {
        if (value.Selected == true) {
          this.outboundWasteDetails.push({
            palletId: value.palletId,
            wasteCode: value.wasteCode,
            quantity: value.quantity,
            oum: value.oum ? value.oum : 'N/A',
            weight: value.weight ? value.weight : 'N/A',
            location: value.location ? value.location : 'N/A',
            expireDate: value.expireDate ? value.expireDate : 'N/A',
            expiryDateOriginal: value.expiryDateOriginal,
            Selected: true,
          });
        }
      });
    }
    this.modalOpen = false;
  }
  numericCount(type, value) {
    if (type === 'remarks') {
      this.numericRemarks = value.length;
      this.invalidNumericRemarks = this.numericRemarks >= 100 ? true : false;
    }
  }
}
