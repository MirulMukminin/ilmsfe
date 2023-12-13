import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService, NotificationService } from 'carbon-components-angular';
import { MheForm, Machinery, ConsoleForm, MachineryConsole, DetailBreakdown} from '../interfaces/MHE/mhe_interface';
import { RequestFormService } from '../services/MHE/request-form.service';
import { restServices } from 'services';
import { environment } from 'src/environments/environment';
import { CubaApp } from '@cuba-platform/rest';
import { DatePipe, formatDate } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { DetailBreakdownService } from '../services/MHE/detail-breakdown.service';

@Component({
  selector: 'app-mhe-request-preview',
  templateUrl: './mhe-request-preview.component.html',
  styleUrls: ['./mhe-request-preview.component.scss']
})
export class MheRequestPreviewComponent implements OnInit {

  open = false
  date = new Date();
  mheForm: MheForm = {};
  machinery: Machinery[] = [];
  rangeDate = []

  consoleForm: ConsoleForm = {};
  machineryConsole: MachineryConsole[] = []
  editConsole = false;

  consoleMachinery = []

  userID: string;

  totalEstimatedPrice = '';
  special = false

  bookingFrom = ''
  bookingTo = ''

  status = ''
  isLoading = false
  overlay = false
  vessel = []
  vesselSubmit = []


  constructor(
    protected modalService: ModalService, 
    private requestFormService: RequestFormService, 
    private router: Router,
    private detailBreakdownService: DetailBreakdownService,
    protected notificationService: NotificationService,
    public datepipe: DatePipe,
    private appService: AppService,
  ) {}

  ngOnInit(): void {

    this.userInfo();
    this.getData();
    // this.getConsoleData();
  }

  userInfo() {

    this.appService.getUserInfo()
      .then((result) => {

        this.special = this.appService.special

        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.userID = initialData.UserID;

      })
      .catch((err) => {

        console.error(err);

        let errorObject = {
          type: 'error',
          title: 'Server Error',
          subtitle:
            'Server Error. Please try again'
        };
        this.appService.showToaster(errorObject);
        this.appService.terminateSession();

      });

  }

  getData(){
    this.mheForm = this.requestFormService.getFormValue()
    this.totalEstimatedPrice = this.detailBreakdownService.getTotal()

  

 

    
    if(this.mheForm.requestType === 'Normal'){

      if(this.mheForm.bookingType === 'Contract'){
       
      }
      else{
        this.mheForm.machinery = this.mheForm.machinery.filter(i => i.Item !== null)
        this.mheForm.manPower = this.mheForm.manPower.filter(i => i.Item !== null)
        this.mheForm.otherMachineries = this.mheForm.otherMachineries.filter(i => i.Item !== null)
        this.mheForm.externalItem = this.mheForm.externalItem.filter(i => i.quotation !== null)

        
  
        let getRangeDate = this.requestFormService.getFormValue().rangeDate
  
        getRangeDate.forEach(elem => {
            this.rangeDate.push({
              startDate : this.datepipe.transform(elem.date[0] , 'yyyy-MM-dd'),
              endDate   : this.datepipe.transform(elem.date[1] , 'yyyy-MM-dd') 
            })
        })
  
        console.log(this.rangeDate)
  
        for(let i =0; i< this.rangeDate.length ; i++){
          this.bookingFrom = this.rangeDate[0].startDate
          this.bookingTo = this.rangeDate[this.rangeDate.length-1].endDate
        }

        this.vessel = []
        this.vesselSubmit = []

        if(this.mheForm.vesselName){
          for(let i =0; i< this.mheForm.vesselName.length; i++){
            this.vessel.push(this.mheForm.vesselName[i].content)
          }

          this.vesselSubmit =JSON.parse(sessionStorage.getItem('vesselCode'));
        }
      }

    
      
    }
    
    if(this.mheForm.requestType === 'Console'){
      this.consoleMachinery = this.mheForm.machineryConsole.filter(item => item.Selected)
    }

    
   
    this.status = JSON.parse(sessionStorage.getItem('status'));
    console.log(this.status);
    
    

  }

  edit() {
    if(this.mheForm.requestType === 'Normal'){
      this.requestFormService.setRequestType(this.mheForm.requestType)
      this.router.navigate(['/operation-system/mhe-request-form']) 
    }
    else if(this.mheForm.requestType === 'Console'){
      this.requestFormService.setRequestType(this.mheForm.requestType)
      
      this.router.navigate(['/operation-system/mhe-request-form'])
      this.editConsole = true;
   
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


  submitForm() {
    this.open = false

    if(this.mheForm.requestType === 'Normal'){

      let param;

      if(this.mheForm.bookingType == 'Daily'){

        param = {
          "fs":{ 
            "job_service_type":"MHE", 
            "UserName": this.userID,
            "RequestType" : "NORMAL",
            "PONumber": this.mheForm.PONum,
            "RequestOnBehalf": this.mheForm.requestOnBehalf,
            "JobDescription": this.mheForm.jobDescription,
            "BookingDateFrom": this.mheForm.singleDate = this.datepipe.transform(this.mheForm.singleDate, 'yyyy-MM-dd'), 
            "BookingDateTo": this.mheForm.singleDate = this.datepipe.transform(this.mheForm.singleDate, 'yyyy-MM-dd'),
            "Status" : this.status,
            "Remarks" : this.mheForm.remarks,
            "vesselRequestForms" : this.vesselSubmit,
            "machinery" : this.mheForm.machinery,
            "manpower" : this.mheForm.manPower,
            "equipment" : this.mheForm.otherMachineries,
            "external_items": this.mheForm.externalItem
          }
        };

      }
        else  if(this.mheForm.bookingType == 'Recurring'){
          param = {
            "fs":{ 
              "job_service_type":"MHE",
              "UserName": this.userID,
              "RequestType" : "NORMAL",
              "PONumber": this.mheForm.PONum,
              "RequestOnBehalf": this.mheForm.requestOnBehalf,
              "JobDescription": this.mheForm.jobDescription,
              "BookingDateFrom": this.bookingFrom,
              "BookingDateTo": this.bookingTo,
              
              "Status" : this.status,
              "Remarks" : this.mheForm.remarks,
              "bookingType": "RECURRING",
              "RecurringDateRanges": this.rangeDate,
              "machinery" : this.mheForm.machinery,
              "manpower" : this.mheForm.manPower,
              "equipment" : this.mheForm.otherMachineries,
              "external_items": this.mheForm.externalItem
            }
          }
        }
        else{
         

          param = {
            "fs":{ 
              "job_service_type":"MHE",
              "UserName": this.userID,
              "RequestType" : "NORMAL",
              "PONumber": this.mheForm.PONum,
              "RequestOnBehalf": this.mheForm.requestOnBehalf,
              // "JobDescription": this.mheForm.jobDescription,
              "BookingDateFrom":  this.mheForm.startDate.replace(/[/]/g,'-'),
              "BookingDateTo":   this.mheForm.endDate.replace(/[/]/g,'-'),
              // "Status" : this.status,
              "Status" : "BOOKED",
              "Remarks" : this.mheForm.remarks,
              "bookingType": "CONTRACT",
              "contract_number": this.mheForm.contractNo,
              "RecurringDateRanges":[
                {
                   "startDate":  this.mheForm.startDate.replace(/[/]/g,'-'),
                   "endDate": this.mheForm.endDate.replace(/[/]/g,'-'),
                }
               ],
              "machinery" : this.mheForm.machineryContract
            }
          }
        }

        console.log(param)
        this.isLoading = true
        this.overlay = true
      restServices.pbksb_CustomerService.submitRequestFrom(this.appService.myApp)(param).then( result => {

          let resArr: any = result;
          let info = JSON.parse(resArr);
          let requestNumber = info.RequestNumber;
  
          if(result){
            this.isLoading = false
            this.overlay = false
            const successNotif = {
              type: "success",
              title: "Request submitted",
              subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
              time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`
            }

            this.detailBreakdownService.setTotal("")
            this.appService.showToaster(successNotif);
            this.router.navigate(['/operation-system/mhe-request-list'])
          }
          
  
        }).catch(err => {
          console.log(err)
  
          const successNotif = {
            type: "error",
            title: "Request Error",
            subtitle: "Request is not submitted",
            time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`
          }
          this.appService.showToaster(successNotif);
          this.router.navigate(['/operation-system/mhe-request-list']);
        });
      
     

    }else if(this.mheForm.requestType === 'Console'){
      const param = {
        "fs":{ 
          "job_service_type":"MHE", 
          // "UserName":"3f580473-267f-222f-401d-d80b3816fa8c",
          "UserName": this.userID,
          "RequestType" : "CONSOLE",
          "RequestOnBehalf": this.mheForm.requestOnBehalf,
          "JobDescription": this.mheForm.jobDescription,
          "BookingDateFrom": this.datepipe.transform( this.mheForm.bookingDate, 'yyyy-MM-dd'),
          "BookingDateTo":  this.datepipe.transform( this.mheForm.bookingDate, 'yyyy-MM-dd'),
          // "BookingDate": this.mheForm.bookingDate,
          "Status" : this.status,
          "Console_EstimatedHour" : this.mheForm.estDuration,
          "Console_EstimatedTrip" : this.mheForm.estTrip,
          "Console_EstimatedQuantity" : this.mheForm.estGoods,
          "Remarks" : this.mheForm.remarks,
          "Console_Reference" : this.mheForm.refNo,
          "machinery" : this.consoleMachinery
        }
      }
        
      console.log(param);

      restServices.pbksb_CustomerService.submitRequestFrom(this.appService.myApp)(param).then( result => {
        let resArr: any = result;
        let info = JSON.parse(resArr)
        // console.warn(info.RequestNumber + ' ' +'Submit Success')

        let requestNumber = info.RequestNumber
        // console.log(result);
        // console.log("Console success submit");

        const successNotif = {
          type: "success",
          title: "Request submitted",
          subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
          time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`
        }

        this.appService.showToaster(successNotif);
        this.router.navigate(['/operation-system/mhe-request-list'])

      }).catch(err => {
        console.log(err)
        const successNotif = {
          type: "error",
          title: "Request Error",
          subtitle: "Request is not submitted",
          time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`
        }
        this.appService.showToaster(successNotif);
        this.router.navigate(['/operation-system/mhe-request-list'])
      })

    }
    
  }


}
