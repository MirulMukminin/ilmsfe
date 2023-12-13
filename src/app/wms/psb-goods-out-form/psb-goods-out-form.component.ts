import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonType } from 'carbon-components-angular/button/button.types';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';
import {
  GoodsOut,
  listOfGoodsOut,
  listOfGoodsOutModal,
  listOfReturnGoodsOut,
} from '../interfaces/goods_interface';

@Component({
  selector: 'app-psb-goods-out-form',
  templateUrl: './psb-goods-out-form.component.html',
  styleUrls: ['./psb-goods-out-form.component.scss'],
})
export class PsbGoodsOutFormComponent implements OnInit {
  @ViewChild('formTypeElement') formTypeElement: ElementRef;
  @ViewChild('regNoElement') regNoElement: ElementRef;
  @ViewChild('moveDateElement') moveDateElement: ElementRef;
  @ViewChild('destinationElement') locationElement: ElementRef;
  @ViewChild('returnDateElement') returnDateElement: ElementRef;
  @ViewChild('remarksElement') remarksElement: ElementRef;

  open: boolean = false;
  trigger: boolean = false;

  required: boolean = false;
  buttonAddNewReturnGoodsDisabled = true;

  //Temporary OutGoods Table Modal
  //loadData: boolean = false;
  OutGoodsModal: boolean = false;
  OutGoodsModalTrigger: boolean = false;
  outGoodsModalDisabled = true;
  tempporaryOutGoodsModalDisabled = true;
  //Return Goods Table Modal
  ReturnGoodsModal: boolean = false;
  ReturnGoodsModalTrigger: boolean = false;
  companyName: string = '';
  requestBy: string = '';
  formNumberDisabled = false;

  listOfGoodsOut = [] as listOfGoodsOut[];
  listOfTemporaryGoodsOut = [] as listOfGoodsOut[];
  listOfReturnGoods = [] as listOfReturnGoodsOut[];
  listOfGoodsOutModal = [] as listOfGoodsOutModal[];
  //existingGoods = [] as listOfGoodsOutModal[];

  GoodsOut: GoodsOut = {};
  GoodsOutModal: GoodsOut = {};
  invalidGoodsFormNo: any = [];

  expectedReturnDate: Date | string;
  expectedReturnDateFormatted: Date | string;
  returnModalFormNo = '';
  newGoodsDescription = '';
  existingGoodsDropDown = '';
  formType: any[] = [];
  formTypeList: any[] = [];
  existingGoods: any[] = [];
  existingGoodsList: any[] = [];
  formNumber: any[] = [];
  formNumberList: any[] = [];
  ksbApprovalClicked = false;
  //sepatutnya true
  buttonSubmitDisabled = true;
  referenceNo = '';
  invoiceNo = '';
  formNumberCombo: any[] = [];
  formNumberComboList: any[] = [];
  regNoSelected: string;
  formNumberListed = false;
  goodsTypeDropDownDisabled = false;
  goodsTypeTxtAreaDisabled = true;
  formNumberComboListModel = '';

  formNumberModal: string;
  formNumberModal2: string;

  RGOriginalQuantity: number;
  RGCurrentQuantity: number;
  RGReturnQuantity: number = 0;
  RGValue: number = 0;
  RGTotalValue: number = 0;
  RGFormType = 'F5';
  RGFormNo = '';

  //details from api
  existingData = false;
  requestNo = '';
  detailsRequestNo = '';
  detailsStatus = '';
  getGoodOutDetailID = '';

  //invalid UI
  openModal = false;
  viewSubmitModal = false;
  viewDeleteModal = false;
  viewSaveModal = false;
  invalidexpectedReturnDate = false;
  invalidModalValue = false;
  invalidNewGoodsDescription = false;
  invalidReturnModalFormNo = false;
  invalidwithReturnQuantity = false;
  invalidExistingGoods = false;
  invalidFormType = false;
  invalidRegNo = false;
  invalidMoveDate = false;
  invalidTextDate = 'Move Date Required';
  invalidTextReturnDate = 'Due Date Required';
  invalidTextRegNo = 'Form No. Required';
  invalidDestination = false;
  goodsOutTableInvalid = false;
  invalidFormNumber = false;
  invalidwithdrawalQuantity: any = [];
  invalidwithdrawalQuantityTemporary: any = [];
  isLoading = false;
  overlay = false;
  registrationNoResult = '';
  formTypeResult = '';

  issueOutRequired: any[] = [];
  withdrawalTemporary: any[] = [];
  formNoTemporary: any[] = [];

  formTypeLabel = 'Form Type';
  formNoLabel = 'Form No.';

  deleteDisabled = true;

  typeOfTransaction: any[] = [
    {
      type: 'Issue Out',
      value: 'ISSUE_OUT',
      checked: true,
    },
    {
      type: 'Temporary',
      value: 'TEMPORARY',
    },
  ];

  typesOfGoodsSelected: string;

  typeOfGoods: any[] = [
    {
      type: 'Existing Goods',
      value: 'EXISTING_GOODS',
      checked: true,
    },
    {
      type: 'New Goods',
      value: 'NEW_GOODS',
    },
  ];

  step: number = 1;
  min: number = 0;
  max: number = 100;
  previousURL = '';

  Company = '';

  issueOutTableSelected = true;
  temporaryTableSelected = false;

  ibmButton: ButtonType = 'primary';

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  items: any[] = [
    {
      content: 'one',
    },
    {
      content: 'two',
    },
    {
      content: 'three',
    },
  ];

  numericRemarks: any = 0;
  invalidNumericRemarks = false;

  constructor(
    private appService: AppService,
    private router: Router,
    private requestFormService: RequestFormService,
    private cdref: ChangeDetectorRef,
    private _Activatedroute: ActivatedRoute
  ) {
    this.GoodsOut.transactionType = 'ISSUE_OUT';

    this.typesOfGoodsSelected = 'EXISTING_GOODS';
  }

  ngOnInit(): void {
    this.userInfo();
  }

  ngAfterViewInit() {
    // this.getListFormNumber();
    // this.cdref.detectChanges();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);
        this.Company = initialData.Company;
        this.getListFormNumber();
        this.getRestServiceAPI(initialData);
        // this.addGoodsInRow();

        //sepatutnya true
        this.buttonSubmitDisabled = true;
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
    //get form type
    restServices.pbksb_PSBService
      .GetFormType(this.appService.myApp)()
      .then((result) => {
        const resArr: any = result;
        const formTypeAPI = JSON.parse(resArr);
        formTypeAPI.forEach((element) => {
          // if (element == 'K9'|| element == 'DO') {
          //   this.formType.push({
          //     content: element,
          //   });
          // }
          this.formType.push({
            content: element,
          });
        });
        this.formTypeList = this.formType;
      });

    this.requestNo = this._Activatedroute.snapshot.paramMap.get('requestNo');
    if (this.requestNo) {
      this.existingData = true;
      this.deleteDisabled = false;

      var apiParam: any = { reference_no: this.requestNo };
      restServices.pbksb_PSBService
        .GetGoodOutDetails(this.appService.myApp)(apiParam)
        .then((result) => {
          const resArr: any = result;
          const formDetailsAPI = JSON.parse(resArr);

          this.getGoodOutDetailID = formDetailsAPI.id;
          this.companyName = formDetailsAPI.customer.name;
          this.requestBy = formDetailsAPI.request_by;
          this.detailsRequestNo = formDetailsAPI.reference_no;
          this.detailsStatus = formDetailsAPI.status;
          this.GoodsOut.form_type = formDetailsAPI.form_type;
          this.GoodsOut.registration_no = formDetailsAPI.registration_no;

          var convertedDate = new Date(formDetailsAPI.move_date);
          this.GoodsOut.moveDate = convertedDate;
          if (formDetailsAPI.expected_date) {
            var convertedReturnDate = new Date(formDetailsAPI.expected_date);
            this.expectedReturnDate = convertedReturnDate;
          }
          if (formDetailsAPI.reason) {
            this.GoodsOut.reason = formDetailsAPI.reason;
          }
          this.GoodsOut.transactionType = formDetailsAPI.transaction_type;
          this.GoodsOut.destination = formDetailsAPI.destinantion;
          if (this.GoodsOut.transactionType == 'ISSUE_OUT') {
            this.issueOutTableSelected = true;
            this.temporaryTableSelected = false;

            //get table data issue out
            restServices.pbksb_PSBService
              .GetListIssueOutGood(this.appService.myApp)(apiParam)
              .then((result) => {
                const resArr: any = result;
                const tableDetailsAPI = JSON.parse(resArr);

                this.listOfGoodsOut = [];
                tableDetailsAPI.forEach((value, i) => {
                  this.listOfGoodsOut.push({
                    id: value.id,
                    good_ID: value.good.id,
                    form_type: value.good.good_in.form_type,
                    registration_no: value.good.good_in.registration_no,
                    goodsDescription: value.good.description,
                    withdrawal_qty: value.withdrawal_quantity,
                    remainingQTY: value.good.current_quantity,
                    totalValue: value.good.value * value.withdrawal_quantity,
                    value: value.good.value,
                    maxQTY: value.good.quantity,
                    uom: value.good.uom,
                    customs_code: value.good.customs_code,
                    location: value.good.location.description,
                    Selected: false,
                  });
                  this.issueOutRequired[i] = true;
                  this.formNumberComboListModel =
                    value.good.good_in.registration_no;
                });

                this.loadDataButton();
                this.checkTableDataExist();
              });
          } else if (this.GoodsOut.transactionType == 'TEMPORARY') {
            this.issueOutTableSelected = false;
            this.temporaryTableSelected = true;

            //get table data temporary type
            restServices.pbksb_PSBService
              .GetListTemporaryOutGood(this.appService.myApp)(apiParam)
              .then((result) => {
                const resArr: any = result;
                const tableDetailsTemporaryAPI = JSON.parse(resArr);

                this.listOfTemporaryGoodsOut = [];
                tableDetailsTemporaryAPI.forEach((value, i) => {
                  this.listOfTemporaryGoodsOut.push({
                    id: value.id,
                    good_ID: value.good.id,
                    form_type: value.form_type,
                    registration_no: value.good.good_in.registration_no,
                    goodsDescription: value.good.description,
                    withdrawal_qty: value.withdraw_quantity,
                    remainingQTY: value.good.current_quantity,
                    totalValue: value.good.value * value.withdraw_quantity,
                    value: value.good.value,
                    maxQTY: value.good.quantity,
                    form_number: value.form_no,
                    uom: value.good.uom,
                    customs_code: value.good.customs_code,
                    location: value.good.location.description,
                    Selected: false,
                  });

                  this.formNumberComboListModel =
                    value.good.good_in.registration_no;
                  this.withdrawalTemporary[i] = true;
                  this.formNoTemporary[i] = true;
                });

                this.loadDataButton();
                this.checkTableDataExist();
              });
            //get table data return goods
            // restServices.pbksb_PSBService
            //   .GetListReturnGood(this.appService.myApp)(apiParam)
            //   .then((result) => {
            //     const resArr: any = result;
            //     const tableDetailsReturnGoodsAPI = JSON.parse(resArr);

            //     tableDetailsReturnGoodsAPI.forEach((value, i) => {
            //       this.listOfReturnGoods.push({
            //         id: value.id,
            //         form_type: value.form_type,
            //         registration_no: value.registration_no,
            //         good_name: value.good_name,
            //         totalValue: value.totalValue,
            //         form_number: value.form_no,
            //         expected_return: formatDate(
            //           this.expectedReturnDate,
            //           'yyyy-MM-dd',
            //           'en_US'
            //         ),
            //         value: value.value,
            //         return_qty: value.return_quantity,
            //         uom: value.id,
            //         customs_code: value.id,
            //         location: value.id,
            //         // Selected: false,
            //       });
            //       this.ReturnGoodsModal = false;
            //     });

            //     this.allowAddNewReturnGoodsAndSubmit();
            //   });
          }
        });
    } else {
      this.companyName = initData.Company;
      this.requestBy = initData.Fullname;
    }
  }

  onSubmit(goodsOutForm: NgForm) {
    this.isLoading = true;
    this.overlay = true;
    this.openModal = false;
    this.viewSaveModal = false;
    this.viewSubmitModal = false;
    if (this.issueOutTableSelected) {
      this.onSubmitIssueOut(goodsOutForm);
    } else if (this.temporaryTableSelected) {
      this.onSubmitTemporaryOut(goodsOutForm);
    }
  }

  onSubmitIssueOut(goodsOutForm: NgForm) {
    let regNoIsExist = false;

    if (goodsOutForm.valid) {
      if (this.GoodsOut.registration_no) {
        var apiParamRegNo: any = {
          registrationNo: this.GoodsOut.registration_no,
        };
        //check if reg no already exist
        restServices.pbksb_PSBService
          .ExistReqistrationNoGO(this.appService.myApp)(apiParamRegNo)
          .then((result) => {
            if (result == 'true') {
              regNoIsExist = true;
            }

            if (!this.existingData) {
              if (regNoIsExist) {
                this.invalidRegNo = true;
                this.invalidTextRegNo = 'This Form No. already exist';
                this.isLoading = false;
                this.overlay = false;
              } else {
                this.invalidRegNo = false;
                this.invalidTextRegNo = 'Form No. Required';
                this.isLoading = false;
                this.overlay = false;
              }
            } else {
              regNoIsExist = false;
            }

            let numberIsInvalid = false;
            for (let i = 0; i < this.listOfGoodsOut.length; i++) {
              if (this.invalidwithdrawalQuantity[i]) {
                numberIsInvalid = true;
              }

              if (this.listOfGoodsOut[i].withdrawal_qty == 0) {
                this.invalidwithdrawalQuantity[i] = true;
                numberIsInvalid = true;
              }
            }

            var formattedMoveDate = formatDate(
              this.GoodsOut.moveDate,
              'yyyy-MM-dd',
              'en_US'
            );
            // Get current date
            let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
            /*
      if (formattedMoveDate < currentDate) {
        this.invalidMoveDate = true;
        this.invalidTextDate =
          "Please select today's date or after today's date";
      } else if (!numberIsInvalid) {*/
            this.invalidMoveDate = false;
            this.invalidTextDate = 'Move Date Required';

            var latestMoveDate = formatDate(
              this.GoodsOut.moveDate,
              'yyyy-MM-dd',
              'en_US'
            );
            let regNoExceedMax = true;
            regNoExceedMax = this.validateFormNoLength2();

            if (
              !regNoIsExist &&
              !regNoExceedMax &&
              !numberIsInvalid &&
              !this.invalidNumericRemarks
            ) {
              //if KSB APPROVAL button clicked
              if (this.ksbApprovalClicked) {
                const data = {
                  form: {
                    //reference_no: this.referenceNo,
                    form_type: this.GoodsOut.form_type,
                    registration_no: this.GoodsOut.registration_no,
                    move_date: latestMoveDate,
                    transaction_type: this.GoodsOut.transactionType,
                    //agent_name: this.requestBy,
                    destination: this.GoodsOut.destination,
                    invoice_no: this.invoiceNo,
                    //category : "LOCAL",
                    //total_value : 1000.2,
                    status: 'PENDING_APPROVAL',
                    customer: this.companyName,
                    request_by: this.requestBy,
                    reason: this.GoodsOut.reason,
                    psbGoodOutIssueForm: this.listOfGoodsOut,
                  },
                };

                if (this.existingData) {
                  const data2 = {
                    form: {
                      id: this.getGoodOutDetailID,
                      form_type: this.GoodsOut.form_type,
                      registration_no: this.GoodsOut.registration_no,
                      move_date: latestMoveDate,
                      transaction_type: this.GoodsOut.transactionType,
                      //agent_name: this.requestBy,
                      destination: this.GoodsOut.destination,
                      invoice_no: this.invoiceNo,
                      //category : "LOCAL",
                      //total_value : 1000.2,
                      status: 'PENDING_APPROVAL',
                      customer: this.companyName,
                      request_by: this.requestBy,
                      reason: this.GoodsOut.reason,
                      psbGoodOutIssueForm: this.listOfGoodsOut,
                    },
                  };
                  restServices.pbksb_PSBService
                    .UpdateGoodOutForm(this.appService.myApp)(data2)
                    .then((result) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let currentTime = formatDate(
                        new Date(),
                        'HH:mm',
                        'en_US'
                      );
                      if (result == 'OK') {
                        let notiObject = {
                          type: 'success',
                          title: 'Submitted',
                          subtitle:
                            this.GoodsOut.registration_no +
                            ' is successfully submited',
                          time: currentTime,
                        };
                        this.appService.showToaster(notiObject);
                        this.router.navigate([
                          '/wms/psb-goods-in-out-list/goods-out',
                        ]);
                      } else {
                        let errorObject = {
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be submitted. Please try again',
                          time: currentTime,
                        };
                        this.appService.showToaster(errorObject);
                        this.router.navigate([
                          '/wms/psb-goods-in-out-list/goods-out',
                        ]);
                      }
                    })
                    .catch((err) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let currentTime = formatDate(
                        new Date(),
                        'HH:mm',
                        'en_US'
                      );
                      let errorObject = {
                        type: 'error',
                        title: 'Cannot Submit',
                        subtitle:
                          'The request has failed to be submitted. Please try again',
                        time: currentTime,
                      };
                      this.appService.showToaster(errorObject);
                      this.router.navigate([
                        '/wms/psb-goods-in-out-list/goods-out',
                      ]);
                    });
                } else {
                  restServices.pbksb_PSBService
                    .PostGoodOutwithListGood(this.appService.myApp)(data)
                    .then((result) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let currentTime = formatDate(
                        new Date(),
                        'HH:mm',
                        'en_US'
                      );
                      if (result == 'OK') {
                        let notiObject = {
                          type: 'success',
                          title: 'Submitted',
                          subtitle:
                            this.GoodsOut.registration_no +
                            ' is successfully submited',
                          time: currentTime,
                        };
                        this.appService.showToaster(notiObject);
                        this.router.navigate([
                          '/wms/psb-goods-in-out-list/goods-out',
                        ]);
                      } else {
                        let errorObject = {
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be submitted. Please try again',
                          time: currentTime,
                        };
                        this.appService.showToaster(errorObject);
                        this.router.navigate([
                          '/wms/psb-goods-in-out-list/goods-out',
                        ]);
                      }
                    })
                    .catch((err) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let currentTime = formatDate(
                        new Date(),
                        'HH:mm',
                        'en_US'
                      );
                      let errorObject = {
                        type: 'error',
                        title: 'Cannot Submit',
                        subtitle:
                          'The request has failed to be submitted. Please try again',
                        time: currentTime,
                      };
                      this.appService.showToaster(errorObject);
                      this.router.navigate([
                        '/wms/psb-goods-in-out-list/goods-out',
                      ]);
                    });
                }
              } else {
                //if save button clicked
                const data = {
                  form: {
                    //reference_no: this.referenceNo,
                    form_type: this.GoodsOut.form_type,
                    registration_no: this.GoodsOut.registration_no,
                    move_date: latestMoveDate,
                    transaction_type: this.GoodsOut.transactionType,
                    //agent_name: this.requestBy,
                    destination: this.GoodsOut.destination,
                    invoice_no: this.invoiceNo,
                    //category : "LOCAL",
                    //total_value : 1000.2,
                    status: 'INITIATED',
                    customer: this.companyName,
                    request_by: this.requestBy,
                    reason: this.GoodsOut.reason,
                    psbGoodOutIssueForm: this.listOfGoodsOut,
                  },
                };

                if (this.existingData) {
                  const data2 = {
                    form: {
                      id: this.getGoodOutDetailID,
                      form_type: this.GoodsOut.form_type,
                      registration_no: this.GoodsOut.registration_no,
                      move_date: latestMoveDate,
                      transaction_type: this.GoodsOut.transactionType,
                      //agent_name: this.requestBy,
                      destination: this.GoodsOut.destination,
                      invoice_no: this.invoiceNo,
                      //category : "LOCAL",
                      //total_value : 1000.2,
                      status: 'INITIATED',
                      customer: this.companyName,
                      request_by: this.requestBy,
                      reason: this.GoodsOut.reason,
                      psbGoodOutIssueForm: this.listOfGoodsOut,
                    },
                  };
                  restServices.pbksb_PSBService
                    .UpdateGoodOutForm(this.appService.myApp)(data2)
                    .then((result) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let currentTime = formatDate(
                        new Date(),
                        'HH:mm',
                        'en_US'
                      );
                      if (result == 'OK') {
                        let notiObject = {
                          type: 'success',
                          title: 'Submitted',
                          subtitle:
                            this.GoodsOut.registration_no +
                            ' is successfully submited',
                          time: currentTime,
                        };
                        this.appService.showToaster(notiObject);
                        this.router.navigate([
                          '/wms/psb-goods-in-out-list/goods-out',
                        ]);
                      } else {
                        let errorObject = {
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be submitted. Please try again',
                          time: currentTime,
                        };
                        this.appService.showToaster(errorObject);
                        this.router.navigate([
                          '/wms/psb-goods-in-out-list/goods-out',
                        ]);
                      }
                    })
                    .catch((err) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let currentTime = formatDate(
                        new Date(),
                        'HH:mm',
                        'en_US'
                      );
                      let errorObject = {
                        type: 'error',
                        title: 'Cannot Submit',
                        subtitle:
                          'The request has failed to be submitted. Please try again',
                        time: currentTime,
                      };
                      this.appService.showToaster(errorObject);
                      this.router.navigate([
                        '/wms/psb-goods-in-out-list/goods-out',
                      ]);
                    });
                } else {
                  restServices.pbksb_PSBService
                    .PostGoodOutwithListGood(this.appService.myApp)(data)
                    .then((result) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let currentTime = formatDate(
                        new Date(),
                        'HH:mm',
                        'en_US'
                      );
                      if (result == 'OK') {
                        let notiObject = {
                          type: 'success',
                          title: 'Submitted',
                          subtitle:
                            this.GoodsOut.registration_no +
                            ' is successfully submited',
                          time: currentTime,
                        };
                        this.appService.showToaster(notiObject);
                        this.router.navigate([
                          '/wms/psb-goods-in-out-list/goods-out',
                        ]);
                      } else {
                        let errorObject = {
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be submitted. Please try again',
                          time: currentTime,
                        };
                        this.appService.showToaster(errorObject);
                        this.router.navigate([
                          '/wms/psb-goods-in-out-list/goods-out',
                        ]);
                      }
                    })
                    .catch((err) => {
                      this.isLoading = false;
                      this.overlay = false;
                      let currentTime = formatDate(
                        new Date(),
                        'HH:mm',
                        'en_US'
                      );
                      let errorObject = {
                        type: 'error',
                        title: 'Cannot Submit',
                        subtitle:
                          'The request has failed to be submitted. Please try again',
                        time: currentTime,
                      };
                      this.appService.showToaster(errorObject);
                      this.router.navigate([
                        '/wms/psb-goods-in-out-list/goods-out',
                      ]);
                    });
                }
              }
              this.focusOnInvalid();
            }
            this.focusOnInvalid();
          });
      }
    } else if (goodsOutForm.invalid) {
      this.isLoading = false;
      this.overlay = false;
      if (!this.GoodsOut.form_type) {
        this.invalidFormType = true;
      } else if (this.GoodsOut.form_type) {
        this.invalidFormType = false;
      }

      if (!this.GoodsOut.registration_no) {
        this.invalidRegNo = true;
        this.invalidTextRegNo = 'Form No. Required';
      } else if (this.GoodsOut.registration_no) {
        this.invalidRegNo = false;
      }

      if (!this.GoodsOut.moveDate) {
        this.invalidMoveDate = true;
      } else if (this.GoodsOut.moveDate) {
        this.invalidMoveDate = false;
        this.invalidTextDate = 'Move Date Required';
        /*if (this.GoodsOut.moveDate) {
          var formattedMoveDate = formatDate(
            this.GoodsOut.moveDate,
            'yyyy-MM-dd',
            'en_US'
          );
          // Get current date
          let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
          if (formattedMoveDate < currentDate) {
            this.invalidMoveDate = true;
            this.invalidTextDate =
              "Please select today's date or after today's date";
          } else {
            this.invalidMoveDate = false;
            this.invalidTextDate = 'Move Date Required';
          }
        }*/
      }

      if (!this.GoodsOut.destination) {
        this.invalidDestination = true;
      } else if (this.GoodsOut.destination) {
        this.invalidDestination = false;
      }

      for (let i = 0; i < this.listOfGoodsOut.length; i++) {
        if (this.listOfGoodsOut[i].withdrawal_qty == 0) {
          this.invalidwithdrawalQuantity[i] = true;
        }
      }
      this.focusOnInvalid();
    }
  }
  onSubmitTemporaryOut(goodsOutForm: NgForm) {
    let regNoIsExist = false;

    if (goodsOutForm.valid) {
      var apiParamRegNo: any = {
        registrationNo: this.GoodsOut.registration_no,
      };
      let isError = false;
      for (let i = 0; i < this.listOfTemporaryGoodsOut.length; i++) {
        if (this.invalidwithdrawalQuantityTemporary[i]) {
          isError = true;
        }

        if (this.listOfTemporaryGoodsOut[i].withdrawal_qty == 0) {
          this.invalidwithdrawalQuantityTemporary[i] = true;
          isError = true;
        }
      }

      var formattedMoveDate = formatDate(
        this.GoodsOut.moveDate,
        'yyyy-MM-dd',
        'en_US'
      );
      let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

      // if (!this.expectedReturnDate) {
      //   this.invalidexpectedReturnDate = true;
      // } else
      if (this.invalidexpectedReturnDate) {
        //do nothing. if error, dont run submit code below
      } else {
        this.invalidMoveDate = false;
        this.invalidTextDate = 'Move Date Required';

        let regNoExceedMax = true;
        if (this.GoodsOut.registration_no) {
          regNoExceedMax = this.validateFormNoLength2();
        } else {
          regNoExceedMax = false;
        }
        if (
          !this.invalidRegNo &&
          !isError &&
          !regNoExceedMax &&
          !this.invalidNumericRemarks
        ) {
          if (this.expectedReturnDate) {
            this.expectedReturnDateFormatted = formatDate(
              this.expectedReturnDate,
              'yyyy-MM-dd',
              'en_US'
            );
          } else {
            this.expectedReturnDateFormatted = '';
          }
          if (this.GoodsOut.registration_no) {
            this.registrationNoResult = this.GoodsOut.registration_no;
          } else {
            this.registrationNoResult = '';
          }
          if (this.GoodsOut.form_type) {
            this.formTypeResult = this.GoodsOut.form_type;
          } else {
            this.formTypeResult = '';
          }
          //if KSB APPROVAL button clicked
          if (this.ksbApprovalClicked) {
            const data = {
              form: {
                //reference_no: this.referenceNo,
                form_type: this.formTypeResult,
                registration_no: this.registrationNoResult,
                move_date: formatDate(
                  this.GoodsOut.moveDate,
                  'yyyy-MM-dd',
                  'en_US'
                ),
                transaction_type: this.GoodsOut.transactionType,
                //agent_name: this.requestBy,
                destination: this.GoodsOut.destination,
                invoice_no: this.invoiceNo,
                //category : "LOCAL",
                //total_value : 1000.2,
                status: 'PENDING_APPROVAL',
                customer: this.companyName,
                exp_return_date: this.expectedReturnDateFormatted,
                request_by: this.requestBy,
                reason: this.GoodsOut.reason,
                psbGoodOutTemporaryForm: this.listOfTemporaryGoodsOut,
                psbGoodOutReturnForm: [],
                //psbGoodOutReturnForm: this.listOfReturnGoods,
              },
            };

            if (this.existingData) {
              const data2 = {
                form: {
                  id: this.getGoodOutDetailID,
                  form_type: this.formTypeResult,
                  registration_no: this.registrationNoResult,
                  move_date: formatDate(
                    this.GoodsOut.moveDate,
                    'yyyy-MM-dd',
                    'en_US'
                  ),
                  transaction_type: this.GoodsOut.transactionType,
                  //agent_name: this.requestBy,
                  destination: this.GoodsOut.destination,
                  invoice_no: this.invoiceNo,
                  //category : "LOCAL",
                  //total_value : 1000.2,
                  status: 'PENDING_APPROVAL',
                  customer: this.companyName,
                  exp_return_date: this.expectedReturnDateFormatted,
                  request_by: this.requestBy,
                  reason: this.GoodsOut.reason,
                  psbGoodOutTemporaryForm: this.listOfTemporaryGoodsOut,
                  psbGoodOutReturnForm: [],
                  //psbGoodOutReturnForm: this.listOfReturnGoods,
                },
              };
              restServices.pbksb_PSBService
                .UpdateGoodOutForm(this.appService.myApp)(data2)
                .then((result) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
                  if (result == 'OK') {
                    let notiObject = {
                      type: 'success',
                      title: 'Submitted',
                      subtitle: 'Successfully submited',
                      time: currentTime,
                    };
                    this.appService.showToaster(notiObject);
                    this.router.navigate([
                      '/wms/psb-goods-in-out-list/goods-out',
                    ]);
                  } else {
                    let errorObject = {
                      type: 'error',
                      title: 'Cannot Submit',
                      subtitle:
                        'The request has failed to be submitted. Please try again',
                      time: currentTime,
                    };
                    this.appService.showToaster(errorObject);
                    this.router.navigate([
                      '/wms/psb-goods-in-out-list/goods-out',
                    ]);
                  }
                })
                .catch((err) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
                  let errorObject = {
                    type: 'error',
                    title: 'Cannot Submit',
                    subtitle:
                      'The request has failed to be submitted. Please try again',
                    time: currentTime,
                  };
                  this.appService.showToaster(errorObject);
                  this.router.navigate([
                    '/wms/psb-goods-in-out-list/goods-out',
                  ]);
                });
            } else {
              restServices.pbksb_PSBService
                .PostGoodOutwithListGood(this.appService.myApp)(data)
                .then((result) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
                  if (result == 'OK') {
                    let notiObject = {
                      type: 'success',
                      title: 'Submitted',
                      subtitle: 'Successfully submited',
                      time: currentTime,
                    };
                    this.appService.showToaster(notiObject);
                    this.router.navigate([
                      '/wms/psb-goods-in-out-list/goods-out',
                    ]);
                  } else {
                    let errorObject = {
                      type: 'error',
                      title: 'Cannot Submit',
                      subtitle:
                        'The request has failed to be submitted. Please try again',
                      time: currentTime,
                    };
                    this.appService.showToaster(errorObject);
                    this.router.navigate([
                      '/wms/psb-goods-in-out-list/goods-out',
                    ]);
                  }
                })
                .catch((err) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
                  let errorObject = {
                    type: 'error',
                    title: 'Cannot Submit',
                    subtitle:
                      'The request has failed to be submitted. Please try again',
                    time: currentTime,
                  };
                  this.appService.showToaster(errorObject);
                  this.router.navigate([
                    '/wms/psb-goods-in-out-list/goods-out',
                  ]);
                });
            }
          } else {
            //if save button clicked
            const data = {
              form: {
                //reference_no: this.referenceNo,
                form_type: this.formTypeResult,
                registration_no: this.registrationNoResult,
                move_date: formatDate(
                  this.GoodsOut.moveDate,
                  'yyyy-MM-dd',
                  'en_US'
                ),
                transaction_type: this.GoodsOut.transactionType,
                //agent_name: this.requestBy,
                destination: this.GoodsOut.destination,
                invoice_no: this.invoiceNo,
                //category : "LOCAL",
                //total_value : 1000.2,
                status: 'INITIATED',
                customer: this.companyName,
                exp_return_date: this.expectedReturnDateFormatted,
                request_by: this.requestBy,
                reason: this.GoodsOut.reason,
                psbGoodOutTemporaryForm: this.listOfTemporaryGoodsOut,
                psbGoodOutReturnForm: [],
                //psbGoodOutReturnForm: this.listOfReturnGoods,
              },
            };

            if (this.existingData) {
              const data2 = {
                form: {
                  id: this.getGoodOutDetailID,
                  form_type: this.formTypeResult,
                  registration_no: this.registrationNoResult,
                  move_date: formatDate(
                    this.GoodsOut.moveDate,
                    'yyyy-MM-dd',
                    'en_US'
                  ),
                  transaction_type: this.GoodsOut.transactionType,
                  //agent_name: this.requestBy,
                  destination: this.GoodsOut.destination,
                  invoice_no: this.invoiceNo,
                  //category : "LOCAL",
                  //total_value : 1000.2,
                  status: 'INITIATED',
                  customer: this.companyName,
                  exp_return_date: this.expectedReturnDateFormatted,
                  request_by: this.requestBy,
                  reason: this.GoodsOut.reason,
                  psbGoodOutTemporaryForm: this.listOfTemporaryGoodsOut,
                  psbGoodOutReturnForm: [],
                  //psbGoodOutReturnForm: this.listOfReturnGoods,
                },
              };

              restServices.pbksb_PSBService
                .UpdateGoodOutForm(this.appService.myApp)(data2)
                .then((result) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
                  if (result == 'OK') {
                    let notiObject = {
                      type: 'success',
                      title: 'Submitted',
                      subtitle: 'Successfully submited',
                      time: currentTime,
                    };
                    this.appService.showToaster(notiObject);
                    this.router.navigate([
                      '/wms/psb-goods-in-out-list/goods-out',
                    ]);
                  } else {
                    let errorObject = {
                      type: 'error',
                      title: 'Cannot Submit',
                      subtitle:
                        'The request has failed to be submitted. Please try again',
                      time: currentTime,
                    };
                    this.appService.showToaster(errorObject);
                    this.router.navigate([
                      '/wms/psb-goods-in-out-list/goods-out',
                    ]);
                  }
                })
                .catch((err) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
                  let errorObject = {
                    type: 'error',
                    title: 'Cannot Submit',
                    subtitle:
                      'The request has failed to be submitted. Please try again',
                    time: currentTime,
                  };
                  this.appService.showToaster(errorObject);
                  this.router.navigate([
                    '/wms/psb-goods-in-out-list/goods-out',
                  ]);
                });
            } else {
              restServices.pbksb_PSBService
                .PostGoodOutwithListGood(this.appService.myApp)(data)
                .then((result) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
                  if (result == 'OK') {
                    let notiObject = {
                      type: 'success',
                      title: 'Submitted',
                      subtitle: 'Successfully submited',
                      time: currentTime,
                    };
                    this.appService.showToaster(notiObject);
                    this.router.navigate([
                      '/wms/psb-goods-in-out-list/goods-out',
                    ]);
                  } else {
                    let errorObject = {
                      type: 'error',
                      title: 'Cannot Submit',
                      subtitle:
                        'The request has failed to be submitted. Please try again',
                      time: currentTime,
                    };
                    this.appService.showToaster(errorObject);
                    this.router.navigate([
                      '/wms/psb-goods-in-out-list/goods-out',
                    ]);
                  }
                })
                .catch((err) => {
                  this.isLoading = false;
                  this.overlay = false;
                  let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
                  let errorObject = {
                    type: 'error',
                    title: 'Cannot Submit',
                    subtitle:
                      'The request has failed to be submitted. Please try again',
                    time: currentTime,
                  };
                  this.appService.showToaster(errorObject);
                  this.router.navigate([
                    '/wms/psb-goods-in-out-list/goods-out',
                  ]);
                });
            }
          }
          this.focusOnInvalid();
        } else {
          this.isLoading = false;
          this.overlay = false;
        }
        this.focusOnInvalid();
      }
      this.focusOnInvalid();

      //}
    } else if (goodsOutForm.invalid) {
      this.isLoading = false;
      this.overlay = false;
      // if (!this.GoodsOut.form_type) {
      //   this.invalidFormType = true;
      // } else if (this.GoodsOut.form_type) {
      //   this.invalidFormType = false;
      // }

      // if (!this.GoodsOut.registration_no) {
      //   this.invalidRegNo = true;
      //   this.invalidTextRegNo = 'Form No. Required';
      // } else if (this.GoodsOut.registration_no) {
      //   this.invalidRegNo = false;
      // }
      if (!this.GoodsOut.form_type) {
        this.invalidFormType = false;
      }
      if (!this.GoodsOut.registration_no) {
        this.invalidRegNo = false;
      }

      if (!this.GoodsOut.moveDate) {
        this.invalidMoveDate = true;
      } else if (this.GoodsOut.moveDate) {
        this.invalidMoveDate = false;
        this.invalidTextDate = 'Move Date Required';
        /*if (this.GoodsOut.moveDate) {
          var formattedMoveDate = formatDate(
            this.GoodsOut.moveDate,
            'yyyy-MM-dd',
            'en_US'
          );
          // Get current date
          let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
          if (formattedMoveDate < currentDate) {
            this.invalidMoveDate = true;
            this.invalidTextDate =
              "Please select today's date or after today's date";
          } else {
            this.invalidMoveDate = false;
            this.invalidTextDate = 'Move Date Required';
          }
        }*/
      }

      // if (!this.expectedReturnDate) {
      //   this.invalidexpectedReturnDate = true;
      // } else
      if (this.GoodsOut.moveDate) {
        this.invalidexpectedReturnDate = false;
      }

      if (!this.GoodsOut.destination) {
        this.invalidDestination = true;
      } else if (this.GoodsOut.destination) {
        this.invalidDestination = false;
      }

      for (let i = 0; i < this.listOfTemporaryGoodsOut.length; i++) {
        if (this.listOfTemporaryGoodsOut[i].withdrawal_qty == 0) {
          this.invalidwithdrawalQuantityTemporary[i] = true;
        }
        if (!this.listOfTemporaryGoodsOut[i].form_number) {
          this.invalidGoodsFormNo[i] = true;
        }
        if (!this.listOfTemporaryGoodsOut[i].form_number) {
          this.invalidGoodsFormNo[i] = true;
        }
      }
    }
    this.focusOnInvalid();
  }

  focusOnInvalid() {
    if (this.invalidFormType) {
      this.formTypeElement.nativeElement.focus();
    } else if (this.invalidRegNo) {
      this.regNoElement.nativeElement.focus();
    } else if (this.invalidMoveDate) {
      this.moveDateElement.nativeElement.focus();
    } else if (this.invalidDestination) {
      this.locationElement.nativeElement.focus();
    } else if (this.invalidNumericRemarks) {
      this.remarksElement.nativeElement.focus();
    } else if (this.invalidexpectedReturnDate) {
      this.returnDateElement.nativeElement.focus();
    }
  }

  inputValueChange(event: any) {
    this.checkTableDataExist();

    if (this.GoodsOut.moveDate) {
      this.invalidMoveDate = false;
      this.invalidTextDate = 'Move Date Required';

      if (this.GoodsOut.moveDate && this.expectedReturnDate) {
        var formattedexpectedReturnDate = formatDate(
          this.expectedReturnDate,
          'yyyy-MM-dd',
          'en_US'
        );
        var formattedmoveDate = formatDate(
          this.GoodsOut.moveDate,
          'yyyy-MM-dd',
          'en_US'
        );
        let newformattedexpectedReturnDate = formatDate(
          new Date(formattedexpectedReturnDate),
          'yyyy-MM-dd',
          'en_US'
        );
        let newformattedmoveDate = formatDate(
          new Date(formattedmoveDate),
          'yyyy-MM-dd',
          'en_US'
        );
        if (newformattedexpectedReturnDate <= newformattedmoveDate) {
          this.invalidexpectedReturnDate = true;

          this.invalidTextReturnDate =
            'The due date needs to be after the move date';
        } else {
          this.invalidexpectedReturnDate = false;
          this.invalidTextReturnDate = 'Due Date Required';
        }
      }
    }

    this.listOfGoodsOut.forEach((value, i) => {
      if (value.withdrawal_qty) {
        if (value.withdrawal_qty > value.maxQTY || value.withdrawal_qty <= 0) {
          this.invalidwithdrawalQuantity[i] = true;
        } else {
          this.invalidwithdrawalQuantity[i] = false;
          value.remainingQTY = value.maxQTY - value.withdrawal_qty;
          value.totalValue = value.value * value.withdrawal_qty;
        }
      } else {
        this.invalidwithdrawalQuantity[i] = true;
      }
    });

    this.listOfTemporaryGoodsOut.forEach((value, i) => {
      if (value.withdrawal_qty) {
        if (value.withdrawal_qty > value.maxQTY || value.withdrawal_qty <= 0) {
          this.invalidwithdrawalQuantityTemporary[i] = true;
        } else {
          this.invalidwithdrawalQuantityTemporary[i] = false;

          value.remainingQTY = value.maxQTY - value.withdrawal_qty;
          value.totalValue = value.value * value.withdrawal_qty;
        }
      }
      if (value.form_number) {
        this.invalidGoodsFormNo[i] = false;
      }
    });

    if (this.GoodsOut.form_type) {
      this.invalidFormType = false;
    }
    if (this.GoodsOut.registration_no) {
      let regNoIsExist = false;
      var apiParamRegNo: any = {
        registrationNo: this.GoodsOut.registration_no,
      };
      //check if reg no already exist
      restServices.pbksb_PSBService
        .ExistReqistrationNoGO(this.appService.myApp)(apiParamRegNo)
        .then((result) => {
          if (result == 'true') {
            regNoIsExist = true;
          }

          let formNoInput = this.GoodsOut.registration_no;
          if (!this.existingData) {
            if (regNoIsExist) {
              this.invalidRegNo = true;
              this.invalidTextRegNo =
                'This Form No. already exists. Please submit another Form No.';
            } else {
              if (formNoInput.length > 15) {
                this.invalidRegNo = true;
                this.invalidTextRegNo =
                  'Form No. should consist only 15 characters';
              } else {
                this.invalidRegNo = false;
                this.invalidTextRegNo = 'Form No. Required';
              }
            }
          } else {
            if (formNoInput.length > 15) {
              this.invalidRegNo = true;
              this.invalidTextRegNo =
                'Form No. should consist only 15 characters';
            } else {
              this.invalidRegNo = false;
              this.invalidTextRegNo = 'Form No. Required';
            }
          }
        });
    }
    if (this.GoodsOut.destination) {
      this.invalidDestination = false;
    }
  }

  onChange(event: any) {
    if (event.value == 'ISSUE_OUT') {
      this.formTypeLabel = 'Form Type';
      this.formNoLabel = 'Form No.';
      this.issueOutTableSelected = true;
      this.temporaryTableSelected = false;
      if (!this.existingData) this.resetTable();
    }
    if (event.value == 'TEMPORARY') {
      this.formTypeLabel = 'Form Type (Optional)';
      this.formNoLabel = 'Form No. (Optional)';
      this.invalidFormType = false;
      this.invalidRegNo = false;
      this.issueOutTableSelected = false;
      this.temporaryTableSelected = true;
      if (!this.existingData) this.resetTable();
    }
  }

  onSaveSubmit() {
    this.ksbApprovalClicked = false;
  }
  onKSBApprovalSubmit() {
    this.ksbApprovalClicked = true;
  }

  checkTableDataExist() {
    this.allowAddNewReturnGoodsAndSubmit();
  }

  onSubmitGoodsOutModal(goodsOutModalForm: NgForm) {}

  // inputValueModalChange(event: any) {
  //   if (this.formNumberModal) {
  //     this.invalidFormNumber = false;
  //   }
  // }

  GoodsDetailModal() {
    this.OutGoodsModal = true;
    if (
      this.listOfGoodsOut.length != 0 ||
      this.listOfTemporaryGoodsOut.length != 0
    ) {
      //this.formNumberDisabled = true;
      this.formNumberDisabled = false;
    } else {
      this.formNumberDisabled = false;
      //get form number
      this.getListFormNumber();
    }
  }

  OutGoodsModalButton() {
    //this.listOfGoodsOut = [];
    if (this.listOfGoodsOut.length > 0) {
      this.listOfGoodsOutModal.forEach((value, i) => {
        if (value.Selected == true) {
          let dataIsExist = false;
          this.listOfGoodsOut.forEach((value2, i) => {
            if (value.id == value2.good_ID) {
              dataIsExist = true;
            }
          });
          if (!dataIsExist) {
            this.listOfGoodsOut.push({
              id: '',
              good_ID: value.id,
              form_type: value.form_type,
              registration_no: value.registration_no,
              goodsDescription: value.goodsDescription,
              withdrawal_qty: 0,
              remainingQTY: value.currentQTY,
              totalValue: 0,
              value: value.value,
              maxQTY: value.currentQTY,
              uom: value.uom,
              customs_code: value.customs_code,
              location: value.location,
              Selected: false,
            });
            this.issueOutRequired[i] = true;
          }
        }
      });
    } else {
      this.listOfGoodsOutModal.forEach((value, i) => {
        if (value.Selected == true) {
          this.listOfGoodsOut.push({
            id: '',
            good_ID: value.id,
            form_type: value.form_type,
            registration_no: value.registration_no,
            goodsDescription: value.goodsDescription,
            withdrawal_qty: 0,
            remainingQTY: value.currentQTY,
            totalValue: 0,
            value: value.value,
            maxQTY: value.currentQTY,
            uom: value.uom,
            customs_code: value.customs_code,
            location: value.location,
            Selected: false,
          });
          this.issueOutRequired[i] = true;
        }
      });
    }

    this.checkTableDataExist();

    //close the modal
    this.OutGoodsModal = false;
  }

  OutGoodsModalButtonTemporary() {
    //this.listOfTemporaryGoodsOut = [];
    // this.listOfGoodsOutModal.forEach((value, i) => {
    //   if (value.Selected == true) {
    //     this.listOfTemporaryGoodsOut.push({
    //       id: '',
    //       good_ID: value.id,
    //       form_type: 'F4',
    //       registration_no: value.registration_no,
    //       goodsDescription: value.goodsDescription,
    //       withdrawal_qty: 0,
    //       remainingQTY: value.currentQTY,
    //       totalValue: value.value * value.currentQTY,
    //       value: value.value,
    //       maxQTY: value.currentQTY,
    //       //formNo: value.formNo,
    //       uom: value.uom,
    //       customs_code: value.customs_code,
    //       location: value.location,
    //       Selected: false,
    //     });

    //     this.withdrawalTemporary[i] = true;
    //     this.formNoTemporary[i] = true;
    //   }
    // });

    // this.checkTableDataExist();

    // //close the modal
    // this.OutGoodsModal = false;

    //////////////////////////////////
    if (this.listOfTemporaryGoodsOut.length > 0) {
      this.listOfGoodsOutModal.forEach((value, i) => {
        if (value.Selected == true) {
          let dataIsExist = false;
          this.listOfTemporaryGoodsOut.forEach((value2, i) => {
            if (value.id == value2.good_ID) {
              dataIsExist = true;
            }
          });
          if (!dataIsExist) {
            this.listOfTemporaryGoodsOut.push({
              id: '',
              good_ID: value.id,
              form_type: 'F4',
              registration_no: value.registration_no,
              form_number: value.registration_no,
              goodsDescription: value.goodsDescription,
              withdrawal_qty: 0,
              remainingQTY: value.currentQTY,
              totalValue: 0,
              value: value.value,
              maxQTY: value.currentQTY,
              uom: value.uom,
              customs_code: value.customs_code,
              location: value.location,
              Selected: false,
            });
            this.issueOutRequired[i] = true;
          }
        }
      });
    } else {
      this.listOfGoodsOutModal.forEach((value, i) => {
        if (value.Selected == true) {
          this.listOfTemporaryGoodsOut.push({
            id: '',
            good_ID: value.id,
            form_type: 'F4',
            registration_no: value.registration_no,
            form_number: value.registration_no,
            goodsDescription: value.goodsDescription,
            withdrawal_qty: 0,
            remainingQTY: value.currentQTY,
            totalValue: 0,
            value: value.value,
            maxQTY: value.currentQTY,
            uom: value.uom,
            customs_code: value.customs_code,
            location: value.location,
            Selected: false,
          });
          this.issueOutRequired[i] = true;
        }
      });
    }

    this.checkTableDataExist();

    //close the modal
    this.OutGoodsModal = false;
  }

  onSelectGoodsOutModal(event: any) {
    let buttonState = false;
    this.listOfGoodsOutModal.forEach((value) => {
      //if at least one checkbox is selected
      if (value.Selected == true) {
        buttonState = true;
      }
    });

    if (buttonState) {
      if (this.issueOutTableSelected) {
        this.outGoodsModalDisabled = false;
      } else if (this.temporaryTableSelected) {
        this.tempporaryOutGoodsModalDisabled = false;
      }
    } else {
      if (this.issueOutTableSelected) {
        this.outGoodsModalDisabled = true;
      } else if (this.temporaryTableSelected) {
        this.tempporaryOutGoodsModalDisabled = true;
      }
    }
  }

  onSelectGoodsOutlist() {}

  checkLengthGoodsOut() {
    return this.listOfGoodsOut.some((item) => item.Selected == true);
  }

  checkLengthTemporaryGoodsOut() {
    return this.listOfTemporaryGoodsOut.some((item) => item.Selected == true);
  }

  // checkLengthReturnGoodsOut() {
  //   return this.listOfReturnGoods.some((item) => item.Selected == true);
  // }

  cancelMethodGoodsOut() {
    this.listOfGoodsOut.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
  }
  cancelMethodTemporaryGoodsOut() {
    this.listOfTemporaryGoodsOut.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
  }

  // cancelMethodReturnGoodsOut() {
  //   this.listOfReturnGoods.forEach((ticket) => {
  //     if (ticket.Selected) {
  //       ticket.Selected = false;
  //     }
  //   });
  // }

  deleteGoodsOut() {
    this.listOfGoodsOut.forEach((ticket, i) => {
      if (ticket.Selected) {
        this.listOfGoodsOut = this.listOfGoodsOut.filter(
          (item) => item.Selected !== ticket.Selected
        );
        if (ticket.good_ID == this.listOfGoodsOutModal[i].id) {
          this.listOfGoodsOutModal[i].Selected = false;
        }
      }
    });
    this.checkTableDataExist();
  }

  deleteTemporaryGoodsOut() {
    this.listOfTemporaryGoodsOut.forEach((ticket, i) => {
      if (ticket.Selected) {
        this.listOfTemporaryGoodsOut = this.listOfTemporaryGoodsOut.filter(
          (item) => item.Selected !== ticket.Selected
        );
        if (ticket.good_ID == this.listOfGoodsOutModal[i].id) {
          this.listOfGoodsOutModal[i].Selected = false;
        }
      }
    });
    this.checkTableDataExist();
  }

  // deleteReturnGoodsOut() {
  //   this.listOfReturnGoods.forEach((ticket, i) => {
  //     if (ticket.Selected) {
  //       this.listOfReturnGoods = this.listOfReturnGoods.filter(
  //         (item) => item.Selected !== ticket.Selected
  //       );
  //     }
  //   });
  //   this.checkTableDataExist();
  // }
  resetTable() {
    this.listOfGoodsOut = [];
    this.listOfTemporaryGoodsOut = [];
    this.formNumberDisabled = false;
    this.listOfGoodsOutModal = [];
    this.existingGoodsList = [];

    this.outGoodsModalDisabled = true;
    this.tempporaryOutGoodsModalDisabled = true;
    //to clear filter combo box. act as if user click the x button on the filter
    let element: HTMLElement = document.getElementsByClassName(
      'bx--list-box__selection'
    )[0] as HTMLElement;
    if (element) {
      element.click();
    }
    this.checkTableDataExist();
    this.cdref.detectChanges();
  }

  loadDataButton() {
    if (this.formNumberComboListModel) {
      this.listOfGoodsOutModal = [];
      this.existingGoods = [];

      //populate modal table
      var apiParam: any = {
        registrationNo: this.formNumberComboListModel,
        customer: this.Company,
      };
      restServices.pbksb_PSBService
        .GoodListByRegistrationNoAndCustomer(this.appService.myApp)(apiParam)
        .then((result) => {
          const resArr: any = result;
          const formNumberAPI = JSON.parse(resArr);

          formNumberAPI.forEach((value, index) => {
            var selectedStatus = false;

            this.generateGoodsOutModal(value, selectedStatus);
          });
          if (this.GoodsOut.transactionType == 'ISSUE_OUT') {
            if (this.listOfGoodsOut.length > 0) {
              this.listOfGoodsOut.forEach((ticket, i) => {
                this.listOfGoodsOutModal.forEach((value2, i) => {
                  if (ticket.good_ID == value2.id) {
                    value2.Selected = true;
                  }
                });

                this.outGoodsModalDisabled = false;
              });
            }
          } else {
            if (this.listOfTemporaryGoodsOut.length > 0) {
              this.listOfTemporaryGoodsOut.forEach((ticket, i) => {
                this.listOfGoodsOutModal.forEach((value2, i) => {
                  if (ticket.good_ID == value2.id) {
                    value2.Selected = true;
                  }
                });
                this.tempporaryOutGoodsModalDisabled = false;
              });
            }
          }
        });
    } else {
      this.invalidFormNumber = true;
      this.listOfGoodsOutModal = [];
      this.existingGoods = [];
    }
    this.cdref.detectChanges();
  }
  generateGoodsOutModal(value: any, selectedStatus: boolean) {
    var currentQuantityIsExist = 0;
    if (value.current_quantity) {
      currentQuantityIsExist = value.current_quantity;
    }

    this.listOfGoodsOutModal.push({
      id: value.id,
      form_type: value.good_in.form_type,
      registration_no: value.good_in.registration_no,
      goodsDescription: value.description,
      originalQTY: value.quantity,
      currentQTY: currentQuantityIsExist,
      value: value.value,
      //formNo: value.good_in.reference_no,
      uom: value.uom,
      customs_code: value.customs_code,
      location: value.good_in.location.description,
      Selected: selectedStatus,
    });
    this.referenceNo = value.good_in.reference_no;
    this.invoiceNo = value.good_in.invoice_no;

    this.existingGoods.push({
      content: value.description,
      id: value.id,
    });

    this.existingGoodsList = this.existingGoods;
  }
  onSelectedCombo(event: any) {
    if (event.item) {
      if (event.item.content) {
        this.formNumberModal = event.item.content;
        this.loadDataButton();
        if (this.formNumberModal) {
          this.invalidFormNumber = false;
        }
      }
    }
  }
  onSearch(event: any) {
    this.formNumberModal = event;
    if (this.formNumberModal) {
      this.invalidFormNumber = false;
    }
  }

  getListFormNumber() {
    this.formNumberCombo = [];
    this.formNumberComboList = [];

    var apiParam: any = { customer: this.Company };
    restServices.pbksb_PSBService
      .registrationNoListByCustomer(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const formNumberAPI = JSON.parse(resArr);

        formNumberAPI.forEach((element) => {
          if (element) {
            this.formNumberCombo.push({ content: element });
          }
          this.formNumberComboList = this.formNumberCombo;
        });
        if (this.formNumberComboList.length > 0) {
          this.formNumberListed = true;
        }
      });
  }

  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();
    this.router.navigate([this.previousURL]);
  }

  // addNewReturnGood() {
  //   if (this.expectedReturnDate && !this.invalidexpectedReturnDate) {
  //     this.ReturnGoodsModal = true;
  //   }
  // }
  saveReturnGoodsModal() {
    let isError = false;
    let description = '';
    if (this.typesOfGoodsSelected == 'EXISTING_GOODS') {
      if (!this.existingGoodsDropDown) {
        this.invalidExistingGoods = true;
        this.invalidNewGoodsDescription = false;
        isError = true;
      } else {
        description = this.existingGoodsDropDown;
      }
    } else if (this.typesOfGoodsSelected == 'NEW_GOODS') {
      if (!this.newGoodsDescription) {
        this.invalidNewGoodsDescription = true;
        this.invalidExistingGoods = false;
        isError = true;
      } else {
        description = this.newGoodsDescription;
      }
    }
    if (this.RGReturnQuantity == 0) {
      this.invalidwithReturnQuantity = true;
      isError = true;
    }
    if (this.RGValue == 0) {
      this.invalidModalValue = true;
      isError = true;
    }
    if (!this.returnModalFormNo) {
      this.invalidReturnModalFormNo = true;
      isError = true;
    }

    if (!isError) {
      this.listOfReturnGoods.push({
        id: '',
        form_type: 'F5',
        registration_no: this.formNumberModal,
        good_name: description,
        // withdrawal_qty: value.currentQTY,
        // remainingQTY: value.originalQTY - value.currentQTY,
        totalValue: this.RGTotalValue,
        value: this.RGValue,
        // maxQTY: value.originalQTY,
        form_number: this.returnModalFormNo,
        expected_return: formatDate(
          this.expectedReturnDate,
          'yyyy-MM-dd',
          'en_US'
        ),
        return_qty: this.RGReturnQuantity,
        // Selected: false,
      });
      this.ReturnGoodsModal = false;
    }
    this.allowAddNewReturnGoodsAndSubmit();
  }
  onChangeGoodType(event: any) {
    if (event.value == 'EXISTING_GOODS') {
      this.goodsTypeDropDownDisabled = false;
      this.goodsTypeTxtAreaDisabled = true;
    } else if (event.value == 'NEW_GOODS') {
      this.goodsTypeDropDownDisabled = true;
      this.goodsTypeTxtAreaDisabled = false;
    }
    this.RGReturnQuantity = 0;
    this.RGTotalValue = this.RGValue * this.RGReturnQuantity;
    this.returnModalInputChange();
  }
  txtAreaClick() {
    this.typesOfGoodsSelected = 'NEW_GOODS';
    this.goodsTypeDropDownDisabled = true;
    this.goodsTypeTxtAreaDisabled = false;
    this.RGReturnQuantity = 0;
    this.RGTotalValue = this.RGValue * this.RGReturnQuantity;
    this.returnModalInputChange();
  }
  existingGoodsDropdownChange(event: any) {
    this.listOfGoodsOutModal.forEach((value) => {
      if (value.id == event.item.id) {
        this.RGOriginalQuantity = value.originalQTY;
        this.RGCurrentQuantity = value.currentQTY;
        this.RGReturnQuantity = 0;
        this.RGTotalValue = this.RGValue * this.RGReturnQuantity;
      }
    });
    this.returnModalInputChange();
  }
  returnGoodsQuantityChange(event: any) {
    this.RGTotalValue = this.RGValue * event;
    this.returnModalInputChange();
  }
  returnGoodsValueChange(event: any) {
    this.RGTotalValue = this.RGReturnQuantity * event;
    this.returnModalInputChange();
  }
  returnModalInputChange() {
    if (this.typesOfGoodsSelected == 'EXISTING_GOODS') {
      if (this.existingGoodsDropDown) {
        this.invalidExistingGoods = false;
      }
    } else if (this.typesOfGoodsSelected == 'NEW_GOODS') {
      if (this.newGoodsDescription) {
        this.invalidNewGoodsDescription = false;
      }
    }
    if (this.RGReturnQuantity > 0) {
      this.invalidwithReturnQuantity = false;
    }
    if (this.RGValue > 0) {
      this.invalidModalValue = false;
    }
    if (this.returnModalFormNo) {
      this.invalidReturnModalFormNo = false;
    }
  }
  dateValueChange(event: any) {
    if (this.expectedReturnDate) {
      this.invalidexpectedReturnDate = false;
      this.invalidTextReturnDate = 'Due Date Required';

      if (this.GoodsOut.moveDate && this.expectedReturnDate) {
        var formattedexpectedReturnDate = formatDate(
          this.expectedReturnDate,
          'yyyy-MM-dd',
          'en_US'
        );
        var formattedmoveDate = formatDate(
          this.GoodsOut.moveDate,
          'yyyy-MM-dd',
          'en_US'
        );
        let newformattedexpectedReturnDate = formatDate(
          new Date(formattedexpectedReturnDate),
          'yyyy-MM-dd',
          'en_US'
        );
        let newformattedmoveDate = formatDate(
          new Date(formattedmoveDate),
          'yyyy-MM-dd',
          'en_US'
        );
        if (newformattedexpectedReturnDate <= newformattedmoveDate) {
          this.invalidexpectedReturnDate = true;

          this.invalidTextReturnDate =
            'The due date needs to be after the move date';
        } else {
          this.invalidexpectedReturnDate = false;
          this.invalidTextReturnDate = 'Due Date Required';
        }
      }
    }
    this.allowAddNewReturnGoodsAndSubmit();
  }
  allowAddNewReturnGoodsAndSubmit() {
    if (this.issueOutTableSelected) {
      if (
        this.listOfGoodsOut === undefined ||
        this.listOfGoodsOut.length == 0
      ) {
        //sepatutnya true
        this.buttonSubmitDisabled = true;
      } else {
        this.buttonSubmitDisabled = false;
      }
    } else if (this.temporaryTableSelected) {
      if (
        this.listOfTemporaryGoodsOut === undefined ||
        this.listOfTemporaryGoodsOut.length == 0
      ) {
        //sepatutnya true
        this.buttonSubmitDisabled = true;
        //this.buttonAddNewReturnGoodsDisabled = true;
      } else if (
        this.listOfTemporaryGoodsOut.length != 0 //&&
        //!this.invalidexpectedReturnDate &&
        //this.expectedReturnDate
      ) {
        this.buttonSubmitDisabled = false;
        //this.buttonAddNewReturnGoodsDisabled = false;
      }
      // if (
      //   this.listOfTemporaryGoodsOut.length != 0 &&
      //   !this.invalidexpectedReturnDate &&
      //   this.listOfReturnGoods.length != 0
      // ) {
      //   this.buttonSubmitDisabled = false;
      //   this.buttonAddNewReturnGoodsDisabled = false;
      // }
    }
  }
  openSaveModal() {
    this.openModal = true;
    this.viewSaveModal = true;
    this.viewSubmitModal = false;
    this.viewDeleteModal = false;
  }
  openSubmitModal() {
    this.openModal = true;
    this.viewSubmitModal = true;
    this.viewSaveModal = false;
    this.viewDeleteModal = false;
  }
  openDeleteModal() {
    this.openModal = true;
    this.viewDeleteModal = true;
    this.viewSaveModal = false;
    this.viewSubmitModal = false;
  }
  cancelSubmission() {
    if (this.existingData) {
      var apiParam: any = { goodOutID: this.getGoodOutDetailID };

      this.isLoading = true;
      this.overlay = true;
      restServices.pbksb_PSBService
        .CancelGoodOut(this.appService.myApp)(apiParam)
        .then((result: any) => {
          this.isLoading = false;
          this.overlay = false;
          const resArr: any = result;
          const cancelApiResult = JSON.parse(resArr);
          let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
          if (cancelApiResult.result == 'OK') {
            let notiObject = {
              type: 'success',
              title: 'Canceled',
              subtitle: this.detailsRequestNo + ' is canceled',
              time: currentTime,
            };
            this.appService.showToaster(notiObject);
            this.router.navigate(['/wms/psb-goods-in-out-list/goods-out']);
          } else {
            let errorObject = {
              type: 'error',
              title: 'Cannot Cancel',
              subtitle:
                this.detailsRequestNo +
                ' has failed to be canceled. Please try again',
              time: currentTime,
            };
            this.appService.showToaster(errorObject);
            this.router.navigate(['/wms/psb-goods-in-out-list/goods-out']);
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.overlay = false;
          let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
          let errorObject = {
            type: 'error',
            title: 'Cannot Cancel',
            subtitle:
              this.detailsRequestNo +
              ' has failed to be canceled. Please try again',
            time: currentTime,
          };
          this.appService.showToaster(errorObject);
          this.router.navigate(['/wms/psb-goods-in-out-list/goods-out']);
        });
    }
  }

  validateFormNoLength(event: any) {
    const formNoInput = (event.target as HTMLInputElement).value;
    if (formNoInput.length > 15) {
      this.invalidReturnModalFormNo = true;
      // this.invalidRegNoText = "Form No. should consist only 15 characters";
    }
  }
  validateFormNoLength2() {
    let formNoInput = this.GoodsOut.registration_no;

    if (formNoInput.length > 15) {
      this.invalidRegNo = true;
      this.invalidTextRegNo = 'Form No. should consist only 15 characters';
      return true;
    }
  }
  validateWithdrawalQty() {}

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
