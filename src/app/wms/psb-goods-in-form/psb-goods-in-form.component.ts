import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonType } from 'carbon-components-angular';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';
import { GoodsIn, listOfGoodsIn } from '../interfaces/goods_interface';

@Component({
  selector: 'app-psb-goods-in-form',
  templateUrl: './psb-goods-in-form.component.html',
  styleUrls: ['./psb-goods-in-form.component.scss'],
})
export class PsbGoodsInFormComponent implements OnInit {
  @ViewChild('formTypeElement') formTypeElement: ElementRef;
  @ViewChild('regNoElement') regNoElement: ElementRef;
  @ViewChild('moveDateElement') moveDateElement: ElementRef;
  @ViewChild('locationElement') locationElement: ElementRef;
  @ViewChild('remarksElement') remarksElement: ElementRef;

  csvRecords: any[] = [];
  header = false;

  step: number = 1;
  min: number = 0;
  max: number = 100;
  previousURL = '';
  open = false;
  listOfGoodsIn = [] as listOfGoodsIn[];
  goodsInTableInvalid = false;
  goodsType: any[] = [];
  goodsTypeList: any[] = [];
  location: any[] = [];
  locationList: any[] = [];
  companyName: string = '';
  requestBy: string = '';
  kastamClicked = false;
  buttonSubmitDisabled = true;
  formType: any[] = [];
  formTypeList: any[] = [];
  listOfGoodsTableInvalid = false;
  requestNo = '';

  //form details returned by api
  detailsRequestNo = '';
  detailsStatus = '';
  GetGoodsInFormDetailsID = '';

  existingData = false;

  GoodsIn: GoodsIn = {};

  //invalid UI
  viewSubmitModal = false;
  viewSaveModal = false;
  invalidFormType = false;
  invalidRegNo = false;
  invalidMoveDate = false;
  invalidLocation = false;
  invalidGoodsType: any = [];
  invalidGoodsDescription: any = [];
  invalidGoodsQuantity: any = [];
  invalidGoodsValue: any = [];
  invalidGoodsUOM: any = [];
  invalidTextDate = 'Move Date Required';
  invalidRegNoText = 'Form No. Required';
  viewDeleteModal = false;
  deleteDisabled = true;
  isLoading = false;
  overlay = false;

  searchModel: string = '';
  flip: boolean = true;
  offset: object = {
    x: 0,
    y: 0,
  };

  ibmButton: ButtonType = 'primary';

  size: 'sm' | 'md' | 'xl' = 'md';
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';

  numericRemarks: any = 0;
  invalidNumericRemarks = false;

  // formType: any[] = [
  //   {
  //     content: 'one',
  //   },
  //   {
  //     content: 'two',
  //   },
  //   {
  //     content: 'three',
  //   },
  // ];
  // goodsTypeDummy: any[] = [
  //   {
  //     content: 'goods type one',
  //   },
  //   {
  //     content: 'goods type two',
  //   },
  //   {
  //     content: 'goods type three',
  //   },
  // ];

  typeOfBooking: any[] = [
    {
      type: 'LOCAL',
      checked: true,
    },
    {
      type: 'BONDED',
    },
  ];

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private appService: AppService,
    private router: Router,
    private requestFormService: RequestFormService,
    private _Activatedroute: ActivatedRoute,
    private elem: ElementRef
  ) {
    this.GoodsIn.bookingType = 'LOCAL';
  }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  ngOnInit(): void {
    //this.getData();
    this.userInfo();
  }

  onChange(event: any) {}

  // getData() {}
  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.getRestServiceAPI(initialData);
        //this.addGoodsInRow();
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
    //get types of goods list
    restServices.pbksb_PSBService
      .GetGoodType(this.appService.myApp)()
      .then((result) => {
        const resArr: any = result;
        const typeOfGoodAPI = JSON.parse(resArr);
        typeOfGoodAPI.forEach((element) => {
          this.goodsType.push({
            content: element,
          });
        });
        this.goodsTypeList = this.goodsType;
      });

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

    //get location list
    restServices.pbksb_PSBService
      .GetSiteLocation(this.appService.myApp)()
      .then((result) => {
        const resArr: any = result;
        const locationLocationAPI = JSON.parse(resArr);

        locationLocationAPI.forEach((element) => {
          this.location.push({
            content: element.description,
          });
        });
        this.locationList = this.location;

        this.requestNo =
          this._Activatedroute.snapshot.paramMap.get('requestNo');
        if (this.requestNo) {
          this.existingData = true;

          this.deleteDisabled = false;

          var apiParam: any = { reference_no: this.requestNo };
          restServices.pbksb_PSBService
            .GetGoodsInFormDetails(this.appService.myApp)(apiParam)
            .then((result) => {
              const resArr: any = result;
              const formDetailsAPI = JSON.parse(resArr);
              this.GetGoodsInFormDetailsID = formDetailsAPI.id;
              this.companyName = formDetailsAPI.customer.name;
              this.requestBy = formDetailsAPI.request_by;
              this.detailsRequestNo = formDetailsAPI.reference_no;
              this.detailsStatus = formDetailsAPI.status;
              this.GoodsIn.formType = formDetailsAPI.form_type;
              this.GoodsIn.regNo = formDetailsAPI.registration_no;
              var convertedDate = new Date(formDetailsAPI.move_date);
              this.GoodsIn.moveDate = convertedDate;
              this.GoodsIn.location = formDetailsAPI.location.description;
              if (formDetailsAPI.invoice_no) {
                this.GoodsIn.invoiceNumber = formDetailsAPI.invoice_no;
              }
              this.GoodsIn.bookingType = formDetailsAPI.category;
              this.GoodsIn.remark = formDetailsAPI.remarks;
            });

          restServices.pbksb_PSBService
            .GetListGoods(this.appService.myApp)(apiParam)
            .then((result) => {
              const resArr: any = result;
              const tableDetailsAPI = JSON.parse(resArr);
              tableDetailsAPI.forEach((value, index) => {
                this.listOfGoodsIn.push({
                  id: value.id,
                  angularID: Math.floor(Math.random() * 10000),
                  customs_code: value.customs_code,
                  description: value.description,
                  quantity: value.quantity,
                  value: value.value,
                  uom: value.uom,
                  totalValue: value.totalValue,
                  Selected: false,
                });

                this.checkTableDataExist();
              });
            });
        } else {
          this.companyName = initData.Company;
          this.requestBy = initData.Fullname;
        }
      });
  }
  public addGoodsInRow(): void {
    //this.goodsTypeList = this.goodsTypeDummy;

    this.listOfGoodsIn.push({
      id: '',
      angularID: Math.floor(Math.random() * 10000),
      customs_code: '',
      description: '',
      quantity: 0,
      value: 0,
      uom: '',
      totalValue: 0,
      Selected: false,
    });

    this.checkTableDataExist();
  }

  onSubmit(goodsInForm: NgForm) {
    let regNoIsExist = false;
    let goodsValueExist = true;
    this.open = false;
    this.viewSaveModal = false;
    this.viewSubmitModal = false;
    if (goodsInForm.valid) {
      if (this.GoodsIn.regNo) {
        var apiParamRegNo: any = {
          registrationNo: this.GoodsIn.regNo,
        };

        this.isLoading = true;
        this.overlay = true;
        //check if reg no already exist
        restServices.pbksb_PSBService
          .ExistReqistrationNoGI(this.appService.myApp)(apiParamRegNo)
          .then((result) => {
            if (result == 'true') {
              regNoIsExist = true;
            }

            for (let i = 0; i < this.listOfGoodsIn.length; i++) {
              // console.log(this.listOfGoodsIn[i]);

              if (this.listOfGoodsIn[i].value == 0) {
                this.invalidGoodsValue[i] = true;
                goodsValueExist = false;
              }
            }

            if (!this.existingData) {
              if (regNoIsExist) {
                this.invalidRegNo = true;
                this.invalidRegNoText = 'This Form No. already exist';
                this.isLoading = false;
                this.overlay = false;
              } else {
                this.invalidRegNo = false;
                this.invalidRegNoText = 'Form No. Required';
                this.isLoading = false;
                this.overlay = false;
              }
            } else {
              regNoIsExist = false;
            }

            var formattedMoveDate = formatDate(
              this.GoodsIn.moveDate,
              'yyyy-MM-dd',
              'en_US'
            );
            // Get current date
            let currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
            this.invalidMoveDate = false;
            this.invalidTextDate = 'Move Date Required';

            var latestMoveDate = formatDate(
              this.GoodsIn.moveDate,
              'yyyy-MM-dd',
              'en_US'
            );
            let regNoExceedMax = this.checkFormNoLength();

            // if (!regNoIsExist && !regNoExceedMax && goodsValueExist && !this.invalidNumericRemarks) {
            if (!regNoIsExist && !regNoExceedMax && goodsValueExist) {
              //if kastam button clicked

              if (this.kastamClicked) {
                const data = {
                  form: {
                    //reference_no: 'ref001',
                    form_type: this.GoodsIn.formType,
                    registration_no: this.GoodsIn.regNo,
                    move_date: latestMoveDate,
                    customer: this.companyName,
                    remarks: this.GoodsIn.remark,
                    //agent_name: this.requestBy,
                    location: this.GoodsIn.location,
                    invoice_no: this.GoodsIn.invoiceNumber,
                    category: this.GoodsIn.bookingType,
                    //total_value: 1000.2,
                    status: 'SUBMITTED',
                    request_by: this.requestBy,
                    psbGoodForm: this.listOfGoodsIn,
                  },
                };
                if (this.existingData) {
                  const data2 = {
                    form: {
                      id: this.GetGoodsInFormDetailsID,
                      form_type: this.GoodsIn.formType,
                      registration_no: this.GoodsIn.regNo,
                      move_date: latestMoveDate,
                      customer: this.companyName,
                      remarks: this.GoodsIn.remark,
                      //agent_name: this.requestBy,
                      location: this.GoodsIn.location,
                      invoice_no: this.GoodsIn.invoiceNumber,
                      category: this.GoodsIn.bookingType,
                      //total_value: 1000.2,
                      status: 'SUBMITTED',
                      request_by: this.requestBy,
                      psbGoodForm: this.listOfGoodsIn,
                    },
                  };
                  restServices.pbksb_PSBService
                    .UpdateGoodInForm(this.appService.myApp)(data2)
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
                            this.GoodsIn.regNo + ' is successfully submited',
                          time: currentTime,
                        };
                        this.appService.showToaster(notiObject);
                        this.router.navigate(['/wms/psb-goods-in-out-list']);
                      } else {
                        let errorObject = {
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be submitted. Please try again',
                          time: currentTime,
                        };
                        this.appService.showToaster(errorObject);
                        this.router.navigate(['/wms/psb-goods-in-out-list']);
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
                      this.router.navigate(['/wms/psb-goods-in-out-list']);
                    });
                } else {
                  restServices.pbksb_PSBService
                    .PostGoodInForm(this.appService.myApp)(data)
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
                            this.GoodsIn.regNo + ' is successfully submited',
                          time: currentTime,
                        };
                        this.appService.showToaster(notiObject);
                        this.router.navigate(['/wms/psb-goods-in-out-list']);
                      } else {
                        let errorObject = {
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be submitted. Please try again',
                          time: currentTime,
                        };
                        this.appService.showToaster(errorObject);
                        this.router.navigate(['/wms/psb-goods-in-out-list']);
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
                      this.router.navigate(['/wms/psb-goods-in-out-list']);
                    });
                }
              } else {
                //if save button clicked
                const data = {
                  form: {
                    //reference_no: 'ref001',
                    form_type: this.GoodsIn.formType,
                    registration_no: this.GoodsIn.regNo,
                    move_date: latestMoveDate,
                    customer: this.companyName,
                    remarks: this.GoodsIn.remark,
                    //agent_name: this.requestBy,
                    location: this.GoodsIn.location,
                    invoice_no: this.GoodsIn.invoiceNumber,
                    category: this.GoodsIn.bookingType,
                    //total_value: 1000.2,
                    status: 'INITIATED',
                    request_by: this.requestBy,
                    psbGoodForm: this.listOfGoodsIn,
                  },
                };

                if (this.existingData) {
                  const data2 = {
                    form: {
                      id: this.GetGoodsInFormDetailsID,
                      form_type: this.GoodsIn.formType,
                      registration_no: this.GoodsIn.regNo,
                      move_date: latestMoveDate,
                      customer: this.companyName,
                      remarks: this.GoodsIn.remark,
                      //agent_name: this.requestBy,
                      location: this.GoodsIn.location,
                      invoice_no: this.GoodsIn.invoiceNumber,
                      category: this.GoodsIn.bookingType,
                      //total_value: 1000.2,
                      status: 'INITIATED',
                      request_by: this.requestBy,
                      psbGoodForm: this.listOfGoodsIn,
                    },
                  };
                  restServices.pbksb_PSBService
                    .UpdateGoodInForm(this.appService.myApp)(data2)
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
                            this.GoodsIn.regNo + ' is successfully saved',
                          time: currentTime,
                        };
                        this.appService.showToaster(notiObject);
                        this.router.navigate(['/wms/psb-goods-in-out-list']);
                      } else {
                        let errorObject = {
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be submitted. Please try again',
                          time: currentTime,
                        };
                        this.appService.showToaster(errorObject);
                        this.router.navigate(['/wms/psb-goods-in-out-list']);
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
                      this.router.navigate(['/wms/psb-goods-in-out-list']);
                    });
                } else {
                  restServices.pbksb_PSBService
                    .PostGoodInForm(this.appService.myApp)(data)
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
                            this.GoodsIn.regNo + ' is successfully saved',
                          time: currentTime,
                        };
                        this.appService.showToaster(notiObject);
                        this.router.navigate(['/wms/psb-goods-in-out-list']);
                      } else {
                        let errorObject = {
                          type: 'error',
                          title: 'Cannot Submit',
                          subtitle:
                            'The request has failed to be submitted. Please try again',
                          time: currentTime,
                        };
                        this.appService.showToaster(errorObject);
                        this.router.navigate(['/wms/psb-goods-in-out-list']);
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
                      this.router.navigate(['/wms/psb-goods-in-out-list']);
                    });
                }
              }
              this.focusOnInvalid();
            } else {
              this.isLoading = false;
              this.overlay = false;
            }
            this.focusOnInvalid();

            //}
          });
      }
    } else if (goodsInForm.invalid) {
      if (!this.GoodsIn.formType) {
        this.invalidFormType = true;
      } else if (this.GoodsIn.formType) {
        this.invalidFormType = false;
      }

      if (!this.GoodsIn.regNo) {
        this.invalidRegNo = true;
        this.invalidRegNoText = 'Form No. Required';
      } else if (this.GoodsIn.regNo) {
        this.invalidRegNo = false;
      }

      // this.getExistingFormNo(this.GoodsIn.regNo).then((result) => {
      //   if (result === 'true') {
      //     this.invalidRegNo = true;
      //     this.invalidRegNoText = 'This Form No. already exist';
      //     this.regNoElement.nativeElement.focus();
      //   } else {
      //     this.invalidRegNo = false;
      //   }
      // });

      if (!this.GoodsIn.moveDate) {
        this.invalidMoveDate = true;
      } else if (this.GoodsIn.moveDate) {
        this.invalidMoveDate = false;
        this.invalidTextDate = 'Move Date Required';
        /*if (this.GoodsIn.moveDate) {
          var formattedMoveDate = formatDate(
            this.GoodsIn.moveDate,
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

      if (!this.GoodsIn.location) {
        this.invalidLocation = true;
      } else if (this.GoodsIn.location) {
        this.invalidLocation = false;
      }
      for (let i = 0; i < this.listOfGoodsIn.length; i++) {
        if (!this.listOfGoodsIn[i].customs_code) {
          this.invalidGoodsType[i] = true;
        } else {
          this.invalidGoodsType[i] = false;
        }
        if (!this.listOfGoodsIn[i].description) {
          this.invalidGoodsDescription[i] = true;
        } else {
          this.invalidGoodsDescription[i] = false;
        }
        if (!this.listOfGoodsIn[i].quantity) {
          this.invalidGoodsQuantity[i] = true;
        } else {
          this.invalidGoodsQuantity[i] = false;
        }
        if (!this.listOfGoodsIn[i].value) {
          this.invalidGoodsValue[i] = true;
        } else {
          this.invalidGoodsValue[i] = false;
        }
        if (!this.listOfGoodsIn[i].uom) {
          this.invalidGoodsUOM[i] = true;
        } else {
          this.invalidGoodsUOM[i] = false;
        }
      }
      this.focusOnInvalid();
    }
  }
  focusOnInvalid() {
    if (this.invalidFormType) {
      this.formTypeElement.nativeElement.focus();
    } else if (this.invalidRegNo) {
      this.regNoElement.nativeElement.focus();
    } else if (this.invalidMoveDate) {
      this.moveDateElement.nativeElement.focus();
    } else if (this.invalidLocation) {
      this.locationElement.nativeElement.focus();
    } else if (this.invalidNumericRemarks) {
      this.remarksElement.nativeElement.focus();
    }
  }

  fileChangeListener(event: any): void {
    // Select the files from the event
    const files = event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          this.csvRecords = result;
          let totalvaluefinal = 0;

          this.csvRecords.forEach((value, index) => {
            if (value[2] && value[3]) {
              totalvaluefinal = value[2] * value[3];
            } else {
              totalvaluefinal = 0;
            }
            if (index > 0) {
              this.listOfGoodsIn.push({
                id: '',
                angularID: Math.floor(Math.random() * 10000),
                customs_code: value[0],
                description: value[1],
                quantity: value[2],
                value: value[3],
                uom: value[4],
                totalValue: totalvaluefinal,
                Selected: false,
              });
            }
          });

          this.checkTableDataExist();
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  checkLengthGoodsIn() {
    return this.listOfGoodsIn.some((item) => item.Selected == true);
  }

  checkTableDataExist() {
    if (this.listOfGoodsIn === undefined || this.listOfGoodsIn.length == 0) {
      this.buttonSubmitDisabled = true;
    } else {
      this.buttonSubmitDisabled = false;
    }
  }

  inputValueChange(event: any) {
    this.checkTableDataExist();
    this.listOfGoodsIn.forEach((value, index) => {
      value.totalValue = value.value * value.quantity;
    });

    if (this.GoodsIn.moveDate) {
      this.invalidMoveDate = false;
      this.invalidTextDate = 'Move Date Required';
      /*var formattedMoveDate = formatDate(
        this.GoodsIn.moveDate,
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
      }*/
    }

    for (let i = 0; i < this.listOfGoodsIn.length; i++) {
      if (this.listOfGoodsIn[i].customs_code) {
        this.invalidGoodsType[i] = false;
      }
      if (this.listOfGoodsIn[i].description) {
        this.invalidGoodsDescription[i] = false;
      }
      if (this.listOfGoodsIn[i].quantity) {
        this.invalidGoodsQuantity[i] = false;
      }
      if (this.listOfGoodsIn[i].value) {
        this.invalidGoodsValue[i] = false;
      }
      if (this.listOfGoodsIn[i].uom) {
        this.invalidGoodsUOM[i] = false;
      }
    }

    if (this.GoodsIn.formType) {
      this.invalidFormType = false;
    }
    if (this.GoodsIn.location) {
      this.invalidLocation = false;
    }
    if (this.GoodsIn.regNo) {
      let regNoIsExist = false;

      var apiParamRegNo: any = {
        registrationNo: this.GoodsIn.regNo,
      };
      //check if reg no already exist
      restServices.pbksb_PSBService
        .ExistReqistrationNoGI(this.appService.myApp)(apiParamRegNo)
        .then((result) => {
          if (result == 'true') {
            regNoIsExist = true;
          }

          if (!this.existingData) {
            if (regNoIsExist) {
              this.invalidRegNo = true;
              this.invalidRegNoText = 'This Form No. already exist';
            } else {
              let formNoInput = this.GoodsIn.regNo;

              if (formNoInput.length > 15) {
                this.invalidRegNo = true;
                this.invalidRegNoText =
                  'Form No. should consist only 15 characters';
              } else {
                this.invalidRegNo = false;
                this.invalidRegNoText = 'Form No. Required';
              }
            }
          } else {
            let formNoInput = this.GoodsIn.regNo;

            if (formNoInput.length > 15) {
              this.invalidRegNo = true;
              this.invalidRegNoText =
                'Form No. should consist only 15 characters';
            } else {
              this.invalidRegNo = false;
              this.invalidRegNoText = 'Form No. Required';
            }
          }
        });
    }
  }

  cancelMethodGoodsIn() {
    this.listOfGoodsIn.forEach((ticket) => {
      if (ticket.Selected) {
        ticket.Selected = false;
      }
    });
  }

  deleteGoodsIn() {
    this.listOfGoodsIn.forEach((ticket, i) => {
      this.invalidGoodsType[i] = false;
      this.invalidGoodsDescription[i] = false;
      this.invalidGoodsQuantity[i] = false;
      this.invalidGoodsValue[i] = false;
      this.invalidGoodsUOM[i] = false;
      if (ticket.Selected) {
        this.listOfGoodsIn = this.listOfGoodsIn.filter(
          (item) => item.Selected !== ticket.Selected
        );
      }
    });
    this.checkTableDataExist();
  }
  downloadExcelTemplate() {
    const link = document.createElement('a');
    link.setAttribute('target', '_self');
    link.setAttribute(
      'href',
      './assets/documents/Goods_In_Form_Sample_CSV.csv'
    );
    link.setAttribute('download', `Goods_In_Form_Sample_CSV.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  onSaveSubmit() {
    this.kastamClicked = false;
  }
  onKastamSubmit() {
    this.kastamClicked = true;
  }

  redirectToPrevious() {
    this.previousURL = this.requestFormService.getPreviousUrl();
    this.router.navigate([this.previousURL]);
  }
  openSaveModal() {
    this.open = true;
    this.viewSaveModal = true;
    this.viewSubmitModal = false;
    this.viewDeleteModal = false;
  }
  openSubmitModal() {
    this.open = true;
    this.viewSubmitModal = true;
    this.viewSaveModal = false;
    this.viewDeleteModal = false;
  }

  openCancelModal() {
    this.open = true;
    this.viewDeleteModal = true;
    this.viewSaveModal = false;
    this.viewSubmitModal = false;
  }

  deleteSubmission() {
    if (this.existingData) {
      var apiParam: any = { goodInID: this.GetGoodsInFormDetailsID };
      this.isLoading = true;
      this.overlay = true;
      restServices.pbksb_PSBService
        .CancelGoodIn(this.appService.myApp)(apiParam)
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
            this.router.navigate(['/wms/psb-goods-in-out-list']);
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
            this.router.navigate(['/wms/psb-goods-in-out-list']);
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
          this.router.navigate(['/wms/psb-goods-in-out-list']);
        });
    }
  }

  checkFormNoLength() {
    let formNoInput = this.GoodsIn.regNo;

    if (formNoInput.length > 15) {
      this.invalidRegNo = true;
      this.invalidRegNoText = 'Form No. should consist only 15 characters';
      return this.invalidRegNo;
    }
  }

  // getExistingFormNo(formNo: string) {
  //   const param = { registrationNo: formNo };
  //   return restServices.pbksb_PSBService.ExistReqistrationNoGI(
  //     this.appService.myApp
  //   )(param);
  // }

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
