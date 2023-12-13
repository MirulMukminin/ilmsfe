import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { SellerForm } from '../../interfaces/transfer-owner/transferOwnerForm_interface';
import { TransferOwnerService } from '../../services/transfer-owner/transfer-owner.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seller-form-preview',
  templateUrl: './seller-form-preview.component.html',
  styleUrls: ['./seller-form-preview.component.scss'],
})
export class SellerFormPreviewComponent implements OnInit {
  isLoading = false;
  overlay = false;

  selectedGoodsToSell = [];

  countFiles = 0;
  disableSubmit = false;

  date = new Date();

  requestNumber: any;
  transferOwnerShipID: any;
  filesToUpload = [];
  successUpload: any;

  open: boolean = false;
  trigger: boolean = false;

  sellerForm: SellerForm;
  uploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private transferOwnerService: TransferOwnerService,
    private router: Router,
    private appService: AppService,
    public datePipe: DatePipe,
    private http: HttpClient
  ) {}

  ipUrl = this.appService.apiIP;
  token: any;

  ngOnInit(): void {
    this.getData();
    this.userInfo();
  }
  companyName = '';
  requestBy = '';
  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);


        this.companyName = initialData.Company;
        this.requestBy = initialData.Fullname;
        this.token = initialData.Token.access_token;
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

  getData() {
    let filteredRelatedDocument = [];
    this.sellerForm = this.transferOwnerService.getSellerFormValue();

    if (this.transferOwnerService.getSellerFormValue().relatedDocuments) {
      this.transferOwnerService
        .getSellerFormValue()
        .relatedDocuments.forEach((element) => {
          if (!filteredRelatedDocument.includes(element)) {
            filteredRelatedDocument.push(element);
          }
        });

      this.transferOwnerService.getSellerFormValue().relatedDocuments =
        filteredRelatedDocument;
      this.transferOwnerService
        .getSellerFormValue()
        .relatedDocuments.forEach((element) => {
          this.filesToUpload.push({
            file: element.file,
          });
        });
    }


    this.transferOwnerService
      .getSellerFormValue()
      .goodsToSell.forEach((elem) => {
        this.selectedGoodsToSell.push({
          goodID: elem.id,
          current_quantity: elem.qty,
        });
      });
  }

  edit() {
    this.router.navigate(['/wms/psb-transfer-owner-seller-form']);
  }

  submitForm() {
    this.open = false;
    this.isLoading = true;
    this.overlay = true;

    this.disableSubmit = true;

    const form = {
      form: {
        seller: this.companyName,
        buyer: this.sellerForm.buyer,
        poNumber: this.sellerForm.poNumber,
        invoice: this.sellerForm.invoiceNumber,
        salesDate: (this.sellerForm.saleDate = this.datePipe.transform(
          this.sellerForm.saleDate,
          'yyyy-MM-dd'
        )),
        category: this.sellerForm.category,
        remarks: this.sellerForm.remarks,
        // "request_by": this.sellerForm.requestBy,
        psbTransferBuyerGoodsSells: this.selectedGoodsToSell,
      },
    };

    restServices.pbksb_PSBService
      .PostTransferOwnerShipSellerForm(this.appService.myApp)(form)
      .then((result) => {
        const resArr: any = result;
        let info = JSON.parse(resArr);

        this.transferOwnerShipID = info.transferownership_id;
        this.requestNumber = info.request_no;

        if (this.filesToUpload.length == 0) {
          if (info.request_no) {
            this.successToast();
          } else if (!info.request_no) {
            this.disableSubmit = false;
            this.isLoading = false;
            this.overlay = false;
            this.errorToast();
          }
        }
      })
      .then(() => {
        this.disableSubmit = true;

        this.isLoading = true;
        this.overlay = true;

        //upload form data
        this.uploadForm = this.formBuilder.group({
          fileData: [''],
        });

        this.filesToUpload.forEach((elem) => {
          const file = elem.file;
          this.uploadForm.get('fileData').setValue(file);

          // console.log(this.uploadForm.get('fileData').value);
          let formData = new FormData();
          formData.append('file', this.uploadForm.get('fileData').value);

          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + this.token,
            }),
          };

          this.http
            .post<any>(this.ipUrl + 'v2/files', formData, httpOptions)
            .subscribe((data) => {
              const filesUploaded = {
                file: {
                  transferOwnershipID: this.transferOwnerShipID,
                  fileID: data.id,
                  fileName: data.name,
                },
              };

              if (!data.id) {
                this.isLoading = false;
                this.overlay = false;
              }

              restServices.pbksb_PSBService
                .fileUpload_TransferOwnership(this.appService.myApp)(
                  filesUploaded
                )
                .then((result) => {
                  this.isLoading = false;
                  this.overlay = false;
                  // console.log(result)
                  this.successUpload = result;
                  // console.warn(this.successUpload)
                  if (this.successUpload) {
                    this.countFiles++;
                  }
                  // console.log(this.countFiles)
                  if (this.countFiles === this.filesToUpload.length) {
                    this.successToast();
                  }
                });
            });
        });
        // console.log(this.uploadForm);
        // end of upload form data
      })
      .catch((err) => {
        this.isLoading = false;
        this.overlay = false;
        this.errorToast();
        console.log(err);
      });
  }

  successToast() {
    const successNotif = {
      type: 'success',
      title: 'Request submitted',
      subtitle:
        'Request No.' +
        ' ' +
        this.requestNumber +
        ' ' +
        'is successfully submitted',
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
    this.router.navigate(['/wms/psb-transfer-owner-list']);
  }

  errorToast() {
    const successNotif = {
      type: 'error',
      title: 'Submit error',
      subtitle: 'Request is not submitted',
    };

    this.appService.showToaster(successNotif);
  }
}
