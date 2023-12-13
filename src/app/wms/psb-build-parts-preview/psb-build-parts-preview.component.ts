import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { restServices } from 'services';
import { BuildParts, PartsIssue, NewParts} from '../interfaces/build-parts/build-parts';
import { BuildPartsService } from '../services/build-parts/build-parts.service';
import { AppService } from 'src/app/app.service';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-psb-build-parts-preview',
  templateUrl: './psb-build-parts-preview.component.html',
  styleUrls: ['./psb-build-parts-preview.component.scss']
})
export class PsbBuildPartsPreviewComponent implements OnInit {

  isLoading = false;
	overlay = false;
  disableSubmit = false

  filesToUpload = [];
  successUpload: any;
  countFiles = 0;
  requestNumber = "";
  formID : any;
  date = new Date();

  bpForm: BuildParts = {}
  piForm: PartsIssue = {}
  npForm: NewParts = {}
  partsIssue: PartsIssue [] = []
  newParts: NewParts [] = []

  uploadForm: FormGroup;

  constructor(private buildPartsService: BuildPartsService, 
    private router: Router,
    private appService: AppService,
    public datepipe: DatePipe,
    private http: HttpClient,
    private formBuilder: FormBuilder,) { }

  open = false;
  newPartsArr = [];
  partsIssueArr = [];

  ipUrl = this.appService.apiIP
  token : any
  
  ngOnInit(): void {
    this.userInfo();
  }

  userInfo(){
   

    this.appService.getUserInfo()
     .then((result) => {

      const userInfo = this.appService.jsonToArray(result);
      const initialData = this.appService.populateInitData(userInfo);
      this.token = initialData.Token.access_token
      this.getData();
      this.pushArray();

    })
    .catch((err) => {

      console.error(err);
      this.appService.terminateSession();

    });
   
  }

  getData(){
    let filteredRelatedDocument = [];

    this.bpForm = this.buildPartsService.getBuildPartsFormValue()
    this.bpForm.partsIssue = this.bpForm.partsIssue.filter(i => i.piItem !== null)
    this.bpForm.newParts = this.bpForm.newParts.filter(i => i.npItem !== null)

    if(this.buildPartsService.getBuildPartsFormValue().upload){
      this.buildPartsService.getBuildPartsFormValue().upload.forEach(element => {
        if(!filteredRelatedDocument.includes(element)) {
          filteredRelatedDocument.push(element);
        }
      })
  
      this.buildPartsService.getBuildPartsFormValue().upload = filteredRelatedDocument;
      this.buildPartsService.getBuildPartsFormValue().upload.forEach(element => {
        this.filesToUpload.push({
          file: element.file
        })
      })
    }
    

    // console.log( this.buildPartsService.getBuildPartsFormValue())
  }
  

  edit() {
      this.router.navigate(['/wms/psb-build-parts-form'])
  }

  pushArray(){

    // console.log(this.bpForm.newParts)
    this.bpForm.newParts.forEach((value) => {
     
      this.newPartsArr.push({
        description: value.npItem,
        quantity: value.npQuantity,
        location: value.npLocation,
        value: value.npValue,
        uom: value.npUOM,
        customs_code: value.npCustomCode
      }
      );
      
    });

    
    // console.log(this.bpForm.partsIssue)
    this.bpForm.partsIssue.forEach((value) => {
      this.partsIssueArr.push({
        goods_id: value.id,
        quantity: value.piQuantity
      }
      );
      
    });

    
  }

  submitBuildPartsForm() {

    this.open = false
    this.isLoading = true;
		this.overlay = true;

    this.disableSubmit = true;

    const param = {
      "bfp_form":{ 
        "customer"       : this.bpForm.companyName,
        "issue_date"     : this.bpForm.issueDate = this.datepipe.transform(this.bpForm.issueDate, 'yyyy-MM-dd'),
        "category"       : this.bpForm.category.toUpperCase(),
        "good_type"      : this.bpForm.typeOfGoods.toUpperCase(),
        "remarks"        : this.bpForm.remarks,
        "partsIssueList" : this.partsIssueArr,
        "partsNew"       : this.newPartsArr
      }
    }

  
    restServices.pbksb_PSBService.PostBuildFromPartsForm(this.appService.myApp)(param).then((result) => {
      // console.log(param)

          const formArr: any = result;
          let formResult = JSON.parse(formArr);

          this.formID = formResult.build_from_part_id;
          this.requestNumber = formResult.request_no;

          // console.log(result)
          // console.log(this.formID)
          // console.log(this.requestNumber)

          if(this.filesToUpload.length == 0){

            if(formResult.build_from_part_id){
              this.successToast()
            }
            else if(!formResult.build_from_part_id){
              this.disableSubmit = false;
              this.isLoading = false;
              this.overlay = false;
              this.errorToast()
            }
          }

      }).then(() => {

        this.disableSubmit = true;
        this.isLoading = true;
        this.overlay = true;
        
          //upload form data
          this.uploadForm = this.formBuilder.group({
            fileData: ['']
          });

        this.filesToUpload.forEach(files => { 

          const file = files.file;
          this.uploadForm.get('fileData').setValue(file);

            // console.log(this.uploadForm.get('fileData').value)
            let formData = new FormData();
            formData.append('file', this.uploadForm.get('fileData').value);

            const httpOptions = {
              headers: new HttpHeaders({
                'Authorization': "Bearer " + this.token,
              })
            };

          this.http.post<any>(this.ipUrl + 'v2/files', formData, httpOptions).subscribe(data => {


             
            // console.log(files)
            const filesParam = {
              "file":{
                "formID"      : this.formID,
                "fileID"     : data.id,
                "fileName"   : data.name
              }
            }
            // console.log(filesParam)
            restServices.pbksb_PSBService.UploadBuildPartsDoc(this.appService.myApp)(filesParam).then((result) => {
               

                this.successUpload = result
                if(this.successUpload) {
                  this.countFiles++;
                }

                if(this.countFiles === this.filesToUpload.length){
                  this.successToast()
                }
            })
          })
        })
      })
      .catch(err => {
        this.isLoading = false;
        this.overlay = false;
        this.errorToast()
        console.log(err)
      })
     
  }

  successToast(){
    const successNotif = {
      type: "success",
      title: "Request submitted",
      subtitle: "Request No." + ' ' + this.requestNumber + ' ' + 'is successfully submitted',
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`
    }

    this.appService.showToaster(successNotif);
    this.router.navigate(['/wms/psb-build-parts-list'])
  }

  errorToast(){
    const successNotif = {
      type: "error",
      title: "Submit error",
      subtitle: "Request is not submitted",
    }

    this.appService.showToaster(successNotif);
  }

}
