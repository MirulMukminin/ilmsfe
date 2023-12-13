import { formatDate, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { RequestFormService } from 'src/app/operation-system/services/MHE/request-form.service';

@Component({
  selector: 'app-psb-inventory-list-transact-preview',
  templateUrl: './psb-inventory-list-transact-preview.component.html',
  styleUrls: ['./psb-inventory-list-transact-preview.component.scss'],
  providers: [TitleCasePipe],
})
export class PsbInventoryListTransactPreviewComponent implements OnInit {
  previousURL = '';
  RegistrationNo = '';

  detailsID: string = '';
  detailsCompanyName: string = '';
  detailsRequestBy: string = '';
  detailsformType: string = '';
  detailsRegistrationNo: string = '';
  detailsMoveDate: string = '';
  detailsAgent: string = '';
  detailsLocation: string = '';
  detailsInvoiceNo: string = '-';
  detailsCategory: string = '';
  detailsTotalValue: string = '';
  detailsRequestNo: string = '';
  detailsStatus: string = '';

  pendingApproval = false;
  isLoading = false;
  overlay = false;

  open = false;
  adjust = false;
  inventoryDisabled = false;
  viewHistoryDisabled = false;
  openModal = false;
  noDataTable = false;

  date = new Date();

  listOfGoods = [];
  listOfGoodsList = [];
  inventoryChangeList = [];
  /*
  inventoryChangeList = [
    {
      tarifCode: '9209',
      goodsDesc: 'Crossover, Sub W/UPR Plug PR..',
      qty: 10,
      newQty: 19,
      adjustDate: '10/07/2021',
      adjustTime: '10:23',
      changedBy: 'Abdul Rahim bin Maarof',
      approveDate: '15/07/2021',
      approveTime: '15:23',
    },
    {
      tarifCode: '9209',
      goodsDesc: 'Crossover, Sub W/UPR Plug PR..',
      qty: 10,
      newQty: 19,
      adjustDate: '10/07/2021',
      adjustTime: '10:23',
      changedBy: 'Abdul Rahim bin Maarof',
      approveDate: '15/07/2021',
      approveTime: '15:23',
    },
    {
      tarifCode: '9209',
      goodsDesc: 'Crossover, Sub W/UPR Plug PR..',
      qty: 10,
      newQty: 19,
      adjustDate: '10/07/2021',
      adjustTime: '10:23',
      changedBy: 'Abdul Rahim bin Maarof',
      approveDate: '15/07/2021',
      approveTime: '15:23',
    },
    {
      tarifCode: '9209',
      goodsDesc: 'Crossover, Sub W/UPR Plug PR..',
      qty: 10,
      newQty: 19,
      adjustDate: '10/07/2021',
      adjustTime: '10:23',
      changedBy: 'Abdul Rahim bin Maarof',
      approveDate: '15/07/2021',
      approveTime: '15:23',
    },
    {
      tarifCode: '9209',
      goodsDesc: 'Crossover, Sub W/UPR Plug PR..',
      qty: 10,
      newQty: 19,
      adjustDate: '10/07/2021',
      adjustTime: '10:23',
      changedBy: 'Abdul Rahim bin Maarof',
      approveDate: '15/07/2021',
      approveTime: '15:23',
    },
    {
      tarifCode: '9209',
      goodsDesc: 'Crossover, Sub W/UPR Plug PR..',
      qty: 10,
      newQty: 19,
      adjustDate: '10/07/2021',
      adjustTime: '10:23',
      changedBy: 'Abdul Rahim bin Maarof',
      approveDate: '15/07/2021',
      approveTime: '15:23',
    },
    {
      tarifCode: '9209',
      goodsDesc: 'Crossover, Sub W/UPR Plug PR..',
      qty: 10,
      newQty: 19,
      adjustDate: '10/07/2021',
      adjustTime: '10:23',
      changedBy: 'Abdul Rahim bin Maarof',
      approveDate: '15/07/2021',
      approveTime: '15:23',
    },
    {
      tarifCode: '9209',
      goodsDesc: 'Crossover, Sub W/UPR Plug PR..',
      qty: 10,
      newQty: 19,
      adjustDate: '10/07/2021',
      adjustTime: '10:23',
      changedBy: 'Abdul Rahim bin Maarof',
      approveDate: '15/07/2021',
      approveTime: '15:23',
    },
  ];
  */
  listOfGoodsIn: any;

  invalidQtyValue: any = [];

  constructor(
    private appService: AppService,
    private router: Router,
    private requestFormService: RequestFormService,
    private _Activatedroute: ActivatedRoute,
    private titlecasePipe: TitleCasePipe
  ) {}

  ngOnInit(): void {
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
      .GetGoodsInFormDetails(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const formDetailsAPI = JSON.parse(resArr);

        this.detailsID = formDetailsAPI.id;
        this.detailsformType = formDetailsAPI.form_type;
        this.detailsRegistrationNo = formDetailsAPI.registration_no;
        this.detailsMoveDate = formatDate(
          formDetailsAPI.move_date,
          'dd/MM/yyyy',
          'en_US'
        );
        this.detailsCompanyName = formDetailsAPI.customer.name;
        this.detailsRequestBy = formDetailsAPI.request_by;
        this.detailsLocation = formDetailsAPI.location.description;
        this.detailsInvoiceNo = formDetailsAPI.test2;
        if (formDetailsAPI.invoice_no) {
          this.detailsInvoiceNo = formDetailsAPI.invoice_no;
        } else {
          this.detailsInvoiceNo = '-';
        }
        this.detailsCategory = formDetailsAPI.category;
        this.detailsRequestNo = formDetailsAPI.reference_no;
        this.detailsStatus = formDetailsAPI.status;
        if (this.detailsStatus == 'PENDING_ADJUSTMENT_APPROVAL') {
          this.pendingApproval = true;
          this.inventoryDisabled = true;
        }
        if (this.detailsStatus == 'SUBMITTED') {
          this.viewHistoryDisabled = true;
        } else {
          this.viewHistoryDisabled = false;
        }

        //inventory change history
        const changeHistoryAPIParam = { form_no: this.detailsRegistrationNo };

        restServices.pbksb_PSBService
          .InventoryChangeHistory(this.appService.myApp)(changeHistoryAPIParam)
          .then((result) => {
            const resArr2: any = result;
            const changeHistoryResult = JSON.parse(resArr2);

            changeHistoryResult.goodList.forEach((value, index) => {
              let adjustDateTimeConverted = new Date(value.adjust_DateTime);

              let adjustDateConverted =
                adjustDateTimeConverted.toLocaleDateString('en-GB');
              let adjustTimeConverted =
                adjustDateTimeConverted.toLocaleTimeString(navigator.language, {
                  hour: '2-digit',
                  minute: '2-digit',
                });
              let approveDateTimeConverted = new Date(
                value.adjust_approval_DateTime
              );
              let approveDateConverted =
                approveDateTimeConverted.toLocaleDateString('en-GB');
              let approveTimeConverted =
                approveDateTimeConverted.toLocaleTimeString(
                  navigator.language,
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                );
              if (!value.adjust_approval_DateTime) {
                approveDateConverted = 'N/A';
                approveTimeConverted = 'N/A';
              }

              this.inventoryChangeList.push({
                tarifCode: value.custom_code,
                goodsDesc: value.description,
                qty: value.quantity,
                newQty: value.new_quantity,
                adjustDate: adjustDateConverted,
                adjustTime: adjustTimeConverted,
                changedBy: value.adjust_by,
                approveDate: approveDateConverted,
                approveTime: approveTimeConverted,
              });
            });
          });
      });

    restServices.pbksb_PSBService
      .GetListGoods(this.appService.myApp)(apiParam)
      .then((result) => {
        const resArr: any = result;
        const tableDetailsAPI = JSON.parse(resArr);

        tableDetailsAPI.forEach((value, index) => {
          // let finalQuantity:string;
          // if(value.adjustment_quantity){
          //   finalQuantity = value.adjustment_quantity;
          // }else{
          //   finalQuantity = value.quantity;
          // }
          this.listOfGoods.push({
            id: value.id,
            new_quantity: value.adjustment_quantity,
            customs_code: value.customs_code,
            description: value.description,
            quantity: value.current_quantity,
            value: this.addZeroes(value.value),
            uom: value.uom,
            totalValue: this.addZeroes(value.totalValue),
            Selected: false,
          });
        });
      });

    this.detailsStatus = this.titlecasePipe.transform(
      this.detailsStatus.replace(/_/g, ' ')
    );
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  addZeroes(num) {
    const dec = num.toString().split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return this.numberWithCommas(Number(num).toFixed(len));
  }

  onPrint(id: any) {
    if (id === 'print1') {
      document.getElementById('print1').classList.add('printable');
      document.getElementById('print2').classList.remove('printable');
    } else {
      document.getElementById('print2').classList.add('printable');
      document.getElementById('print1').classList.remove('printable');
    }

    window.print();
  }

  onSubmit() {
    this.isLoading = true;
    this.overlay = true;
    var isError = false;
    this.listOfGoods.forEach((value, i) => {
      if (value.new_quantity) {
        if (value.new_quantity < 1) {
          this.invalidQtyValue[i] = true;
          isError = true;
          this.isLoading = false;
          this.overlay = false;
          this.openModal = false;
        } else {
          this.listOfGoodsList.push({
            id: value.id,
            new_quantity: value.new_quantity,
          });
        }
      }
    });
    if (this.listOfGoodsList.length == 0) {
      this.noDataTable = true;
      this.openModal = false;
      isError = true;

      this.listOfGoods.forEach((value, i) => {
        if (value.new_quantity) {
          this.noDataTable = false;
        }
      });
    }
    const data = {
      form: {
        id: this.detailsID,
        request_by: this.detailsRequestBy,
        good_list: this.listOfGoodsList,
      },
    };

    if (!isError) {
      restServices.pbksb_PSBService
        .PostInventoryAdjustment(this.appService.myApp)(data)
        .then((result) => {
          this.isLoading = false;
          this.overlay = false;
          let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
          if (result == '"OK"') {
            let notiObject = {
              type: 'success',
              title: 'Submitted',
              subtitle: this.detailsRequestNo + ' is successfully submited',
              time: currentTime,
            };
            this.appService.showToaster(notiObject);
            this.router.navigate(['/wms/psb-inventory-list']);
          } else {
            let errorObject = {
              type: 'error',
              title: 'Cannot Submit',
              subtitle:
                'The request has failed to be submitted. Please try again',
              time: currentTime,
            };
            this.appService.showToaster(errorObject);
            this.router.navigate(['/wms/psb-inventory-list']);
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
          this.router.navigate(['/wms/psb-inventory-list']);
        });
    }
  }

  openSubmitModal() {
    this.openModal = true;
  }
  inputValueChange() {
    for (let i = 0; i < this.listOfGoods.length; i++) {
      if (this.listOfGoods[i].new_quantity) {
        this.noDataTable = false;
        if (
          this.listOfGoods[i].new_quantity &&
          this.listOfGoods[i].new_quantity > 0
        ) {
          this.invalidQtyValue[i] = false;
        }
      }
    }
  }
}
