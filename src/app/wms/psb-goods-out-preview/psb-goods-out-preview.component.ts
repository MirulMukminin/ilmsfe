import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';
import {
  DueDateChangeLogModel,
  listOfGoodsOut,
  listOfReturnGoodsOut,
} from '../interfaces/goods_interface';

@Component({
  selector: 'app-psb-goods-out-preview',
  templateUrl: './psb-goods-out-preview.component.html',
  styleUrls: ['./psb-goods-out-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class PsbGoodsOutPreviewComponent implements OnInit {
  @ViewChild('toTopRef') toTopRef: ElementRef;

  previousURL = '';
  RegistrationNo = '';
  detailsFormID = '';
  detailsCompanyName = '';
  detailsRequestBy = '';
  detailsRequestNo = '';
  detailsStatus = '';
  detailsFormType = '';
  detailsRegistrationNo = '';
  detailsMoveDate = '';
  detailsTransactionType = '';
  detailsDestination = '';
  detailsRemark = '-';
  detailsDueDate = '';
  dueDate = '';
  remarks = '';

  ReturnGoodsModal: boolean = false;
  ReturnGoodsModalTrigger: boolean = false;
  returnGoodsDescDropDown = '';
  returnGoodsList: any[] = [];
  RGReturnQuantity: number = 0;
  RGCurrentQuantity: number;
  invalidwithReturnQuantity = false;
  dateReturn = '';
  invalidReturnDate = false;
  returnSubmitDisabled = true;
  confirmationChkBox = false;
  goodsOutTempID = '';
  addNewDisabled = true;
  isLoading = false;
  overlay = false;
  invalidFormType = false;
  invalidTextRegNo = 'Form No. Required';
  invalidRegNo = false;
  formNo = '';
  formTypeSelected = '';

  tableDetailsTemporaryAPIModel = [];

  issueOutTableState = false;
  temporaryTableState = false;

  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';
  invalidTextDate = 'Due Date Required';
  invalidTextDateReturn = 'Invalid Date Return';
  invalidDueDate = false;
  invalidReturnGoodsDesc = false;
  invalidUsedQuantity: any = [];
  invalidReturnQuantity: any = [];
  invalidReturnGoodsFormType: any = [];
  invalidReturnGoodsCustomCode: any = [];
  invalidReturnGoodsUOM: any = [];
  invalidReturnGoodsFormNo: any = [];
  invalidReturnGoodsDescription: any = [];
  invalidReturnValue: any = [];
  openModal = false;
  pendingReturnQty = 0;
  constPendingReturnQty = 0;
  customsHelperText = '';
  isDisabledNewFlow = false;
  isDisabledDueDateRemark = false;
  formNoTypeEnabled = true;

  returnGoodStatus = false;
  returnGoodStatusReturned = false;
  formType: any[] = [];
  formTypeList: any[] = [];

  // For numbering input
  step = 1;
  min = 0;
  maxReturnQty = 0;

  numericRemarks: any = 0;
  invalidNumericRemarks = false;

  listOfGoodsOut = [] as listOfGoodsOut[];
  listOfTemporaryGoodsOut = [] as listOfGoodsOut[];
  listOfReturnGoods = [] as listOfReturnGoodsOut[];
  listOfDueDateChangeLog = [] as DueDateChangeLogModel[];
  returnGoodsSelection: any[] = [];
  returnGoodsSelectionList: any[] = [];

  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private requestFormService: RequestFormService,
    private router: Router,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
    this.returnGoodsDescDropDown = '';
    this.RGReturnQuantity = 0;
    this.pendingReturnQty = 0;
    this.constPendingReturnQty = 0;
    this.dateReturn = '';
    this.confirmationChkBox = false;
    this.returnSubmitDisabled = true;
    this.ReturnGoodsModal = false;
    this.dueDate = '';
    this.remarks = '';
    this.formNo = '';
    this.formTypeSelected = '';
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

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
    this.RegistrationNo =
      this._Activatedroute.snapshot.paramMap.get('RegistrationNo');
    var apiParam: any = { reference_no: this.RegistrationNo };
    restServices.pbksb_PSBService
      .GetGoodOutDetails(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const formDetailsAPI = JSON.parse(resArr);

        this.detailsFormID = formDetailsAPI.id;
        this.detailsCompanyName = formDetailsAPI.customer.name;
        this.detailsRequestBy = formDetailsAPI.request_by;
        this.detailsRequestNo = formDetailsAPI.reference_no;
        this.detailsStatus = formDetailsAPI.status.replace(/_/g, ' ');
        this.detailsStatus = this.titlecasePipe.transform(this.detailsStatus);

        if (this.detailsStatus != 'Approved') {
          this.isDisabledNewFlow = true;
        } else {
          this.isDisabledNewFlow = false;
        }

        if (
          this.detailsStatus == 'Temporary Out' ||
          this.detailsStatus == 'On Hold'
        ) {
          this.formNoTypeEnabled = false;
        } else {
          this.formNoTypeEnabled = true;
        }
        if (
          this.detailsStatus == 'Approved' ||
          this.detailsStatus == 'Temporary Out' ||
          this.detailsStatus == 'On Hold'
        ) {
          this.isDisabledDueDateRemark = false;
        } else {
          this.isDisabledDueDateRemark = true;
        }

        if (this.detailsStatus == 'Temporary Out') {
          this.returnGoodStatus = true;
          this.addNewDisabled = false;
          this.customsHelperText =
            '*Customs will change the transaction type to “Issue Out” if goods are not returned within new due date applied';
        }
        if (
          this.detailsStatus == 'Returned' ||
          this.detailsStatus == 'Override' ||
          this.detailsStatus == 'On Hold'
        ) {
          this.returnGoodStatus = true;
          this.addNewDisabled = true;
        }

        this.detailsFormType = formDetailsAPI.form_type;
        this.detailsRegistrationNo = formDetailsAPI.registration_no;
        this.detailsMoveDate = formatDate(
          formDetailsAPI.move_date,
          'dd/MM/yyyy',
          'en_US'
        );
        this.detailsTransactionType = formDetailsAPI.transaction_type;
        this.detailsDestination = formDetailsAPI.destinantion;
        if (formDetailsAPI.expected_date) {
          this.detailsDueDate = formatDate(
            formDetailsAPI.expected_date,
            'dd/MM/yyyy',
            'en_US'
          );
        }
        if (formDetailsAPI.reason) {
          this.detailsRemark = formDetailsAPI.reason;
        }

        if (
          this.detailsTransactionType == 'ISSUE_OUT' &&
          this.detailsStatus != 'Override'
        ) {
          this.issueOutTableState = true;
          this.temporaryTableState = false;

          //get table data issue out
          restServices.pbksb_PSBService
            .GetListIssueOutGood(this.appService.myApp)(apiParam)
            .then((result) => {
              const resArr: any = result;
              const tableDetailsAPI = JSON.parse(resArr);

              this.listOfGoodsOut = [];
              tableDetailsAPI.forEach((value, i) => {
                this.listOfGoodsOut.push({
                  good_ID: value.good.id,
                  form_type: value.good.good_in.form_type,
                  registration_no: value.good.good_in.registration_no,
                  goodsDescription: value.good.description,
                  withdrawal_qty: value.withdrawal_quantity,
                  remainingQTY: value.good.current_quantity,
                  totalValue: value.good.value * value.withdrawal_quantity,
                  value: value.good.value,
                  maxQTY: value.good.quantity,
                  Selected: false,
                });
              });
            });
        } else if (
          this.detailsTransactionType == 'TEMPORARY' ||
          this.detailsStatus == 'Override'
        ) {
          //get form type
          restServices.pbksb_PSBService
            .GetFormType(this.appService.myApp)()
            .then((result) => {
              const resArr: any = result;
              const formTypeAPI = JSON.parse(resArr);
              formTypeAPI.forEach((element) => {
                // if (element == 'K8' || element == 'F4' || element == 'DO') {
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

          this.issueOutTableState = false;
          this.temporaryTableState = true;
          //get table data Temporary type
          restServices.pbksb_PSBService
            .GetListTemporaryOutGood(this.appService.myApp)(apiParam)
            .then((result) => {
              const resArr: any = result;
              const tableDetailsTemporaryAPI = JSON.parse(resArr);
              this.tableDetailsTemporaryAPIModel = tableDetailsTemporaryAPI;
              this.listOfTemporaryGoodsOut = [];
              this.returnGoodsSelection = [];
              tableDetailsTemporaryAPI.forEach((value, i) => {
                this.listOfTemporaryGoodsOut.push({
                  good_ID: value.good.id,
                  form_type: value.form_type,
                  registration_no: value.good.good_in.registration_no,
                  goodsDescription: value.good.description,
                  withdrawal_qty: value.withdraw_quantity,
                  remainingQTY: value.good.current_quantity,
                  totalValue: value.good.value * value.withdraw_quantity,
                  value: value.good.value,
                  maxQTY: value.good.quantity,
                  pendingRtnQty: value.pending_return_quantity,
                  completedRtnQty: value.complete_return_quantity,
                  customs_code: value.good.customs_code,
                  quantity: value.good.quantity,
                  //form_number: value.form_no,
                  Selected: false,
                });

                if (value.pending_return_quantity != 0) {
                  this.returnGoodsSelection.push({
                    content: value.good.description,
                    pendingRtnQty: value.pending_return_quantity,
                    goodsOutTempID: value.id,
                  });
                }
              });
              this.returnGoodsSelectionList = this.returnGoodsSelection;

              //return good table
              restServices.pbksb_PSBService
                .GetListReturnGood(this.appService.myApp)(apiParam)
                .then((result) => {
                  const resArr2: any = result;
                  const tableDetailsTemporaryReturnAPI = JSON.parse(resArr2);

                  this.listOfReturnGoods = [];
                  let rowStatus = false;

                  tableDetailsTemporaryReturnAPI.forEach((value, i) => {
                    let returnDateformatted = formatDate(
                      value.return_date,
                      'dd/MM/yyyy',
                      'en_US'
                    );
                    this.listOfReturnGoods.push({
                      registration_no: value.registration_no,
                      good_name: value.good.description,
                      return_qty: value.return_quantity,
                      pendingRtnQty: value.remain_quantity,
                      dateReturn: returnDateformatted,
                      form_type: value.form_type,
                      status: value.status,
                    });
                  });
                });
            });

          //get table data return goods
          //  restServices.pbksb_PSBService
          //  .GetListReturnGood(this.appService.myApp)(apiParam)
          //  .then((result) => {
          //    const resArr: any = result;
          //    const tableDetailsReturnGoodsAPI = JSON.parse(resArr);

          //    this.listOfReturnGoods = [];
          //    tableDetailsReturnGoodsAPI.forEach((value, i) => {
          //      this.listOfReturnGoods.push({
          //        form_type: value.form_type,
          //        registration_no: value.registration_no,
          //        good_name: value.good_name,
          //        totalValue: value.totalValue,
          //        value: 0,
          //        form_number: value.form_no,
          //        return_qty: value.return_quantity,
          //      });
          //    });
          //  });

          //get table data due date change log
          restServices.pbksb_PSBService
            .GetListChangeLogExpectedDate(this.appService.myApp)(apiParam)
            .then((result) => {
              const resArr: any = result;
              const tableDetailsDueDateAPI = JSON.parse(resArr);

              this.listOfDueDateChangeLog = [];
              tableDetailsDueDateAPI.forEach((value, i) => {
                var processed_previus_expected_date: any;
                var processed_expected_date: any;
                var processed_request_date: any;
                var processed_request_by: any;
                var processed_remarks: any;
                if (value.previus_expected_date) {
                  processed_previus_expected_date = formatDate(
                    value.previus_expected_date,
                    'dd/MM/yyyy',
                    'en_US'
                  );
                } else {
                  processed_previus_expected_date = 'N/A';
                }
                if (value.expected_date) {
                  processed_expected_date = formatDate(
                    value.expected_date,
                    'dd/MM/yyyy',
                    'en_US'
                  );
                } else {
                  processed_expected_date = 'N/A';
                }
                if (value.request_date) {
                  processed_request_date = formatDate(
                    value.request_date,
                    'dd/MM/yyyy',
                    'en_US'
                  );
                } else {
                  processed_request_date = 'N/A';
                }
                if (value.request_by) {
                  processed_request_by = value.request_by;
                } else {
                  processed_request_by = 'N/A';
                }
                if (value.remarks) {
                  processed_remarks = value.remarks;
                } else {
                  processed_remarks = 'N/A';
                }
                this.listOfDueDateChangeLog.push({
                  previus_expected_date: processed_previus_expected_date,
                  expected_date: processed_expected_date,
                  request_date: processed_request_date,
                  request_by: processed_request_by,
                  remarks: processed_remarks,
                });
              });
            });
        }
      });
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

    this.toTopRef.nativeElement.focus();
  }

  dateChange(event: any) {
    //get formatted move date
    let formattedMoveDate = formatDate(event, 'yyyy-MM-dd', 'en_US');
    // Get current date
    let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    if (formattedMoveDate < currentDate) {
      this.invalidDueDate = true;
      this.invalidTextDate = "Please select today's date or after today's date";
    } else {
      this.invalidDueDate = false;
      this.invalidTextDate = 'Due Date Required';
    }
  }
  updateSubmit() {
    if (!this.dueDate) {
      this.invalidDueDate = true;
    }
    if (!this.invalidDueDate && !this.invalidNumericRemarks) {
      this.isLoading = true;
      this.overlay = true;

      const data = {
        form: {
          reference_no: this.detailsRequestNo,
          new_date: formatDate(this.dueDate, 'yyyy-MM-dd', 'en_US'),
          request_by: this.detailsRequestBy,
          remarks: this.remarks,
        },
      };

      restServices.pbksb_PSBService
        .ApplyNewReturnDate(this.appService.myApp)(data)
        .then((result) => {
          this.isLoading = false;
          this.overlay = false;
          let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
          if (result == 'OK') {
            let notiObject = {
              type: 'success',
              title: 'Submitted',
              subtitle: this.detailsRequestNo + ' is successfully submited',
              time: currentTime,
            };
            this.appService.showToaster(notiObject);
            this.ngOnInit();
          } else {
            let errorObject = {
              type: 'error',
              title: 'Cannot Submit',
              subtitle:
                'The request has failed to be submitted. Please try again',
              time: currentTime,
            };
            this.appService.showToaster(errorObject);

            this.ngOnInit();
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
          this.ngOnInit();
        });
    }
  }

  updateNewFlow() {
    if (!this.formTypeSelected) {
      this.invalidFormType = true;
    }
    if (!this.dueDate) {
      this.invalidDueDate = true;
    }
    if (!this.formNo) {
      this.invalidRegNo = true;
    }
    if (
      !this.invalidDueDate &&
      !this.invalidFormType &&
      !this.invalidRegNo &&
      !this.invalidNumericRemarks
    ) {
      this.isLoading = true;
      this.overlay = true;
      const data = {
        form: {
          reference_no: this.detailsRequestNo,
          registration_no: this.formNo,
          due_date: formatDate(this.dueDate, 'yyyy-MM-dd', 'en_US'),
          form_type: this.formTypeSelected,
          remarks: this.remarks,
          status: 'TEMPORARY_OUT',
        },
      };
      // console.log(data);

      restServices.pbksb_PSBService
        .ApplyTemporaryOutGoodOutForm(this.appService.myApp)(data)
        .then((result) => {
          this.isLoading = false;
          this.overlay = false;
          let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
          if (result == 'OK') {
            let notiObject = {
              type: 'success',
              title: 'Submitted',
              subtitle: this.detailsRequestNo + ' is successfully submited',
              time: currentTime,
            };
            this.appService.showToaster(notiObject);
            this.ngOnInit();
          } else {
            let errorObject = {
              type: 'error',
              title: 'Cannot Submit',
              subtitle:
                'The request has failed to be submitted. Please try again',
              time: currentTime,
            };
            this.appService.showToaster(errorObject);

            this.ngOnInit();
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
          this.ngOnInit();
        });
    }
  }
  onPrint() {
    window.print();
    // this.router.navigateByUrl('/wms/psb-goods-out-print');
  }
  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();

    this.router.navigate([this.previousURL]);
  }
  checkSelectedReturnGoods() {
    return this.listOfReturnGoods.some((item) => item.Selected == true);
  }

  deleteReturnGoods() {
    this.listOfReturnGoods.forEach((ticket, i) => {
      if (ticket.Selected) {
        this.listOfReturnGoods = this.listOfReturnGoods.filter(
          (item) => item.Selected !== ticket.Selected
        );
      }
    });
  }

  cancelMethodReturnGoods() {
    this.listOfReturnGoods.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
  }

  openReturnModal() {
    this.openModal = true;
  }
  addNewReturnGoods() {
    this.confirmationChkBox = false;
    this.returnSubmitDisabled = true;
    this.ReturnGoodsModal = true;
  }
  onChangeChkBox(event: any) {
    if (event.checked == true) {
      this.confirmationChkBox = true;
      this.returnSubmitDisabled = false;
    } else {
      this.confirmationChkBox = false;
      this.returnSubmitDisabled = true;
    }
  }
  selectReturnGoods(event: any) {
    this.RGReturnQuantity = event.item.pendingRtnQty;
    this.pendingReturnQty = event.item.pendingRtnQty;
    this.constPendingReturnQty = event.item.pendingRtnQty;
    this.maxReturnQty = event.item.pendingRtnQty;
    this.goodsOutTempID = event.item.goodsOutTempID;

    if (this.returnGoodsDescDropDown) {
      this.invalidReturnGoodsDesc = false;
    }
    if (
      this.RGReturnQuantity < 1 ||
      this.RGReturnQuantity > this.maxReturnQty
    ) {
      this.invalidwithReturnQuantity = true;
    } else {
      this.invalidwithReturnQuantity = false;
    }
    if (this.dateReturn) {
      this.invalidReturnDate = false;
    }
  }
  inputValueChange() {
    if (this.formTypeSelected) {
      this.invalidFormType = false;
    }
    if (this.formNo) {
      let regNoIsExist = false;
      var apiParamRegNo: any = {
        registrationNo: this.formNo,
      };
      //check if reg no already exist
      restServices.pbksb_PSBService
        .ExistReqistrationNoGO(this.appService.myApp)(apiParamRegNo)
        .then((result) => {
          if (result == 'true') {
            regNoIsExist = true;
          }

          let formNoInput = this.formNo;
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
        });
    }
  }

  dateReturnChange(event: any) {
    if (this.dateReturn) {
      this.invalidReturnDate = false;
    }
    //get formatted move date
    let formattedMoveDate = formatDate(event, 'yyyy-MM-dd', 'en_US');
    // Get current date
    let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    if (formattedMoveDate < currentDate) {
      this.invalidReturnDate = true;
      this.invalidTextDateReturn =
        "Please select today's date or after today's date";
    } else {
      this.invalidReturnDate = false;
      this.invalidTextDateReturn = 'Date Return Required';
    }
  }

  returnGoodsQuantityChange(event: any) {
    if (
      this.RGReturnQuantity < 1 ||
      this.RGReturnQuantity > this.maxReturnQty
    ) {
      this.invalidwithReturnQuantity = true;
      this.pendingReturnQty = this.constPendingReturnQty;
    } else {
      this.invalidwithReturnQuantity = false;
      this.pendingReturnQty = this.constPendingReturnQty - event;
    }
  }
  saveReturnGoodsModal() {
    let isError = false;
    if (!this.returnGoodsDescDropDown) {
      this.invalidReturnGoodsDesc = true;
      isError = true;
    }
    if (
      this.RGReturnQuantity < 1 ||
      this.RGReturnQuantity > this.maxReturnQty
    ) {
      this.invalidwithReturnQuantity = true;
      isError = true;
    } else {
      this.invalidwithReturnQuantity = false;
    }
    if (!this.dateReturn) {
      this.invalidReturnDate = true;
      isError = true;
    }
    if (!isError) {
      this.returnSubmitDisabled = true;
      this.submitReturnGoods();
    } else {
      this.openModal = false;
    }
  }

  submitReturnGoods() {
    let formattedReturnDate = formatDate(
      this.dateReturn,
      'yyyy-MM-dd',
      'en_US'
    );
    const data = {
      form: {
        goodOutTempID: this.goodsOutTempID,
        return_quantity: this.RGReturnQuantity,
        date_return: formattedReturnDate,
      },
    };
    this.isLoading = true;
    this.overlay = true;
    restServices.pbksb_PSBService
      .PostGoodReturn(this.appService.myApp)(data)
      .then((result) => {
        this.isLoading = false;
        this.overlay = false;
        const resArr: any = result;
        const returnGoodPostApiResult = JSON.parse(resArr);
        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');

        if (returnGoodPostApiResult.result == 'OK') {
          let notiObject = {
            type: 'success',
            title: 'Submitted',
            subtitle:
              'Return good ' +
              returnGoodPostApiResult.good_out_return.form_no +
              ' is successfully submited',
            time: currentTime,
          };
          this.appService.showToaster(notiObject);
          this.ngOnInit();
        } else {
          let errorObject = {
            type: 'error',
            title: 'Cannot Submit',
            subtitle:
              'The request has failed to be submitted. Please try again',
            time: currentTime,
          };
          this.appService.showToaster(errorObject);

          this.ngOnInit();
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.overlay = false;
        let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
        let errorObject = {
          type: 'error',
          title: 'Cannot Submit',
          subtitle: 'The request has failed to be submitted. Please try again',
          time: currentTime,
        };
        this.appService.showToaster(errorObject);
        this.ngOnInit();
      });
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
