import { Item } from './../../../../../entities/pbksb_Item';
import { Component, OnInit, Input,ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common'
import { NgForm, RequiredValidator } from '@angular/forms';

import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { restServices } from 'services';
import { ConsoleForm, MachineryConsole, MheForm, DetailBreakdown } from '../../interfaces/MHE/mhe_interface';
import { RequestFormService } from '../../services/MHE/request-form.service';
import { DetailBreakdownService } from '../../services/MHE/detail-breakdown.service';
import { TableModel } from 'carbon-components-angular';


@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  @ViewChild('requestOnBehalf') requestOnBehalf: ElementRef;
  @ViewChild('jobDescription') jobDescription: ElementRef;
  @ViewChild('bookingDate') bookingDate: ElementRef;
  @ViewChild('estDuration') estDuration: ElementRef;
  @ViewChild('estTrip') estTrip: ElementRef;
  @ViewChild('estQtyGoods') estQtyGoods: ElementRef;
  @ViewChild('machineryConsole') machineryConsole: ElementRef;

  // From parent component (mhe-request-form component)
  @Input() requestByName: string;
  @Input() companyName: string;

  @Input() serviceRequestList = new TableModel();

  detailBreakdownList: DetailBreakdown = {};
  totalEstimatedPrice = ''

  locationMachinery = ''
  timeMachinery = ''

  //for invalid UI
  invalidRequestOnBehalf = false;
  invalidJobDescription = false;
  invalidBookingDate = false;
  invalidEstDuration = false;
  invalidEstTrip = false;
  invalidEstGoods = false;
  invalidTimeMachinery: any = [];
  invalidLocationMachinery: any = [];
  requiredTime: any = [];
  requiredLocation: any = [];
  disable: any = [];
  requestOnBehalfArr: any[] = [];
  requestOnBehalfName: any[] = [];
  requestOnBehalfList: any[] = [];
  requiredEstDuration = false
  requiredEstTrip = false
  requiredEstGoods = false
  requiredBookingDate = false

  dateString = '';
  date = new Date(); 
  selectDate : any; 
  userDate = new Date();
  currentDateTime = new Date();
  currentDate : any
  // currentDate = this.datepipe.transform(this.current, 'dd/MM/yyyy');

  dateFlag: boolean;
  nextDay : boolean;
  sameDay : boolean;
  status = 'BOOKED'
  open = false;

  dateInvalid = ''

  consoleForm: ConsoleForm = {};

  machineConsoleArr: any[] = [];
/*   machineryConsoleList: MachineryConsole[] = []; */

  mheForm: MheForm = {}

  description: string = "Please add required services in the table below. To Remove, select the check box and press remove button in the console"
  machineryTableInvalid: boolean = false;

  // For numbering input
  step = 1;
  min = 0;
  max = 2;
  maxGood = 6;
  value = 0;


  // Date Format
  dateFormat = 'd/m/Y';
  placeholder = 'dd/mm/yyyy';
  size: 'sm' | 'md' | 'xl' = 'md';

  dropUp = false;

  time= [];
  location = [];

  sitesArr: any[] = [];
  sitesName: any[] = [];
  sitesList: any[] = [];

  isLoading = false;
  overlay = false;
  numericRemarks: any = 0
  invalidNumericRemarks = false
  numericJobDesc: any = 0
  invalidNumericJobDesc = false

  constructor(private router: Router,
    private requestFormService: RequestFormService,
    public datepipe: DatePipe,
    private appService:AppService,
    private detailBreakdownService: DetailBreakdownService) {

    this.mheForm.requestType = 'Console';
    this.mheForm.estTrip = 0;
    this.mheForm.estDuration = 0;
    this.mheForm.estGoods = 0;


  }


  ngOnInit(): void {

    this.currentDate =  this.currentDateTime.getFullYear()+'/'+(this.currentDateTime.getMonth()+1)+'/'+('0' + this.currentDateTime.getDate()).slice(-2)

   this.getTimeDropdown();
  //  this.filterTimeArr();

  
    // Getting the previous url
    if (this.requestFormService.getPreviousUrl() === '/operation-system/mhe-request-preview'
      && this.requestFormService.getRequestType() === 'Console') {
console.log("ngOnInit ===")
        this.isLoading = true;
        this.overlay = true;
        setTimeout(() => {
         
          this.getData();

          for (let i = 0; i < this.machineryConsoleList.length; i++) {

            if (this.machineryConsoleList[i].Selected == true) {
              this.disable[i] = false;
            }
          }

           this.isLoading = false;
           this.overlay = false;

           if(this.mheForm.remarks !== undefined){
            this.numericCount('remarks', this.mheForm.remarks)
           }

           this.numericCount('jobDesc', this.mheForm.jobDescription)
          

        }, 1200)

       


        
    
    }
    this.userInfo();
   

  }

  getData() {
    this.mheForm = this.requestFormService.getFormValue();
    console.log("getData==");
    console.log(this.mheForm.requestOnBehalf)
    // this.consoleForm = this.requestFormService.getFormValues();
    // this.machineryConsoleList = this.consoleForm.machineryConsole!;
    this.machineryConsoleList = this.mheForm.machineryConsole!;

    let date = new Date(this.mheForm.bookingDate)
    let dateFromEdit = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+('0' + date.getDate()).slice(-2)

    console.log(dateFromEdit);
    console.log(this.currentDate);
    
    this.sameDay = JSON.parse(sessionStorage.getItem('sameDay'));
    this.nextDay = JSON.parse(sessionStorage.getItem('nextDay'));
    this.dateFlag = JSON.parse(sessionStorage.getItem('dateFlag'));
    this.status = JSON.parse(sessionStorage.getItem('status'));

    if( dateFromEdit == this.currentDate){
      this.filterTimeArr();
    }
   

  }


  
  userInfo(){

    this.appService.getUserInfo()
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
        subtitle:
          'Server Error. Please try again'
      };
      this.appService.showToaster(errorObject);
      this.appService.terminateSession();

    });
   
  }

  getRestServiceAPI(initData: any) {


    const getCode: any = {userID: initData.UserID, CustomerCode: initData.CustomerCode}
    restServices.pbksb_CustomerService.getRequestFrom(this.appService.myApp)(getCode).then((result) => {
      const resArr: any = result;
      const cust = JSON.parse(resArr);

      this.machineConsoleArr = cust.machineryconsole;
      this.requestOnBehalfArr = cust.CustomerOnBehalf;
      this.sitesArr = cust.sites;

      this.machineryConsoleList = []

      this.machineConsoleArr.forEach((value, index) => {
        if(value.Description){
          this.machineryConsoleList.push({
            id: value.no,
            Description : value.Description,
            Item: value.Item,
            Quantity: value.Quantity,
            Selected: false
           
        })
        }
      
      });

      //REQUEST ON BEHALF
      for(let i = 0; i < this.requestOnBehalfArr.length; i++){
        if(this.requestOnBehalfArr[i].name){
          this.requestOnBehalfName.push({
            content: this.requestOnBehalfArr[i].name
          })
        }
      }

      //LOCATION
      for(let i = 0; i < this.sitesArr.length; i++){
        this.sitesName.push({
          content: this.sitesArr[i].description
        })
      }

      this.location = this.sitesName.sort((a, b) => a.content.toLocaleLowerCase()> b.content.toLocaleLowerCase()? 1 : -1);
      this.requestOnBehalfList = this.requestOnBehalfName.sort((a, b) => a.content.toLocaleLowerCase()> b.content.toLocaleLowerCase()? 1 : -1);
     

      for (let i = 0; i < this.machineryConsoleList.length; i++) {
        this.disable[i] = true;
      }
  


    });
  }



  machineryConsoleList: MachineryConsole[] = []
  machineryDetailBreakdown = []

  getTimeDropdown() {
    const interval = 60; // 1 Hour interval
    const time = []
    let startT = 0
    for(let i = 0; startT < 24 * 60; i++){
      const hh = Math.floor(startT / 60);
      const mm = (startT % 60);
      time[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2);
      startT += interval;
    }

    for(let i = 0; i < time.length; i++){
      this.time.push(
        {
          content: time[i]
        }
      )
    }
  }

  filterTimeArr() {
    let current = new Date()
    let latestTime = this.datepipe.transform(current, 'HH:mm')

    this.time = this.time.filter(time => time.content > latestTime)
  }

  onSubmit(newConsoleForm: NgForm) {

    

    let machineryValidStatus: boolean = false;
    this.machineryConsoleList.forEach(element => {
      //if at least one checkbox is selected
      if (element.Selected == true) {
        machineryValidStatus = true;
      }
    });
    if (!machineryValidStatus) {
      //display error text if no checkbox selected
      this.machineryTableInvalid = true;
    } else {
      this.machineryTableInvalid = false;
    }

    if (!this.mheForm.requestOnBehalf || this.mheForm.requestOnBehalf.length == 0) {
      this.invalidRequestOnBehalf = true;
    } else if (this.mheForm.requestOnBehalf) {
      this.invalidRequestOnBehalf = false;
    }

    if (!this.mheForm.jobDescription) {
      this.invalidJobDescription = true;
    } else if (this.mheForm.jobDescription) {
      this.invalidJobDescription = false;
    }

    if (!this.mheForm.bookingDate || this.mheForm.bookingDate.length == 0) {
      this.invalidBookingDate = true;
      this.dateInvalid = "Date Required";
    } else if (this.mheForm.bookingDate) {
      this.invalidBookingDate = false;
    }

    if (!this.mheForm.estDuration) {
      this.invalidEstDuration = true;
      this.requiredEstDuration = true;
    } else if (this.mheForm.estDuration) {
      this.invalidEstDuration = false;
      this.requiredEstDuration = false;
    }

    if (!this.mheForm.estTrip) {
      this.invalidEstTrip = true;
      this.requiredEstTrip = true;
    } else if (this.mheForm.estTrip) {
      this.invalidEstTrip = false;
      this.requiredEstTrip = false;
    }

    if (!this.mheForm.estGoods) {
      this.invalidEstGoods = true;
      this.requiredEstGoods = true;
    } else if (this.mheForm.estGoods) {
      this.invalidEstGoods = false;
      this.requiredEstGoods = false;
    }

    let flagValid = false;

    for (let i = 0; i < this.machineryConsoleList.length; i++) {
      if (this.machineryConsoleList[i].Selected == true) {
        if (!this.machineryConsoleList[i].Time) {
          this.invalidTimeMachinery[i] = true;
          this.requiredTime = true;
          flagValid = true;
        } else {
          this.invalidTimeMachinery[i] = false;
        }
        if (!this.machineryConsoleList[i].Location || this.machineryConsoleList[i].Location.length == 0) {
          this.invalidLocationMachinery[i] = true;
          this.requiredLocation = true;
          flagValid = true;
        } else {
          this.invalidLocationMachinery[i] = false;
        }
      }
      else {
        this.invalidTimeMachinery[i] = false;
        this.invalidLocationMachinery[i] = false;

        this.requiredTime = false;
        this.requiredLocation = false;
      }
    }
    this.focusOnInvalid();

   

    if (newConsoleForm.valid && machineryValidStatus) {
      const dataConsole = {
        requestType: this.mheForm.requestType,
        companyName: this.mheForm.companyName = this.companyName,
        requestBy: this.mheForm.requestBy = this.requestByName,
        requestOnBehalf: this.mheForm.requestOnBehalf,
        jobDescription: this.mheForm.jobDescription,
        bookingDate: this.mheForm.bookingDate,
        estDuration: this.mheForm.estDuration,
        estTrip: this.mheForm.estTrip,
        estGoods: this.mheForm.estGoods,
        remarks: this.mheForm.remarks,
        refNo: this.mheForm.refNo,
        machineryConsole: this.machineryConsoleList
      };

      console.log(dataConsole)

      if(!this.mheForm.remarks){
        this.mheForm.remarks = "-";
      }
      if(!this.mheForm.refNo){
        this.mheForm.refNo = "-";
      }

      if(this.mheForm.bookingDate && this.mheForm.estDuration > 0 && this.mheForm.estTrip > 0
        && this.mheForm.estGoods > 0){
          let bookDate = new Date(this.mheForm.bookingDate)

         let bookingDate = bookDate.getFullYear()+'/'+(bookDate.getMonth()+1)+'/'+bookDate.getDate()

        if(bookingDate > this.currentDate || this.selectDate > this.currentDate || this.selectDate == this.currentDate){
          
          if(flagValid == false){
            this.invalidBookingDate = false;

            this.machineryDetailBreakdown = []

            this.machineryConsoleList.forEach((element, index) => {
              let count = 0
              if(element.Selected){
                this.machineryDetailBreakdown.push(
                  {
                    "no" : count + 1, //mandatory
                    "Item": element.Item,
                    "Quantity": element.Quantity,
                    "Time": element.Time,
                    "EstimatedHours": 1, //mandatory
                    "Location": element.Location,
                    "SpecificCrew": [], //mandatory
                    
                  }
                )
              }
            })
    
            let param = {
              "fs": {
                "machinery": this.machineryDetailBreakdown,
                "manpower" : [],
                "equipment": []
                  }
              };
        
              // console.log(param)
              restServices.pbksb_CustomerService.GetPageDetailBreakDownEstimation(this.appService.myApp)(param).then( result => {
        
                let resArr: any = result;
                let info = JSON.parse(resArr);
        
                this.detailBreakdownList = info.items
        
              this.totalEstimatedPrice = info.TotalEstimatedPrice
        
                // console.log(this.detailBreakdownList)
        
              }).then(() => { 
        
                const items = this.detailBreakdownList
                this.detailBreakdownService.setItemList(items);
                this.detailBreakdownService.setTotal(this.totalEstimatedPrice);
        
                if( this.detailBreakdownService.setItemList(items) !== null){
        
                  // console.log(items)
                  // console.log(this.dateFlag)
                  this.requestFormService.setFormValue(dataConsole)
                  sessionStorage.setItem('status', JSON.stringify(this.status));
                  sessionStorage.setItem('dateFlag', JSON.stringify(this.dateFlag));
                  sessionStorage.setItem('nextDay', JSON.stringify(this.nextDay));
                  sessionStorage.setItem('sameDay', JSON.stringify(this.sameDay));
                  this.router.navigate(['/operation-system/mhe-request-preview']);
                
                
                }
      
            })
          }
        }

        else{
          this.invalidBookingDate = true

          if(this.selectDate < this.currentDate){
            this.dateFlag = false;
            this.invalidBookingDate = true;
            // console.log(this.selectDate)
            // console.log(this.currentDate);
            
            this.dateInvalid = "Please select today's date or after today's date";
            this.bookingDate.nativeElement.focus();
          }
        }

      }
      else if(!this.mheForm.bookingDate || this.mheForm.estDuration < 1 || this.mheForm.estTrip < 1
        || this.mheForm.estGoods < 1){
        

        if(this.mheForm.estDuration < 1){
          this.invalidEstDuration = true
        }
        if(this.mheForm.estTrip < 1){
          this.invalidEstTrip = true
        }
        if(this.mheForm.estGoods < 1){
          this.invalidEstGoods = true
        }

        if(!this.mheForm.bookingDate){
          this.invalidBookingDate = true

          console.log(this.currentDate)
          if(this.selectDate < this.currentDate){
            this.dateFlag = false;
            this.invalidBookingDate = true;
            this.dateInvalid = "Please select today's date or after today's date";
    
            // console.log(this.mheForm.bookingDate)
            // console.log(this.selectDate)
          }
        }
        else{
          this.invalidBookingDate = false;
        }

      

        
      }
      // else if(this.mheForm.bookingDate && this.mheForm.estDuration > 1 && this.mheForm.estTrip > 1
      //   && this.mheForm.estGoods > 1){
      //   let param = {
      //     "fs": {
      //       "machinery": this.mheForm.machineryConsole
      //         }
      //     };
    
      //     restServices.pbksb_CustomerService.GetPageDetailBreakDownEstimation(this.appService.myApp)(param).then( result => {
    
      //       let resArr: any = result;
      //       let info = JSON.parse(resArr);
    
      //       this.detailBreakdownList = info.items
    
      //     this.totalEstimatedPrice = info.TotalEstimatedPrice
    
      //       console.log(this.detailBreakdownList)
    
      //     }).then(() => { 
    
      //       const items = this.detailBreakdownList
      //       this.detailBreakdownService.setItemList(items);
      //       this.detailBreakdownService.setTotal(this.totalEstimatedPrice);
    
      //       if( this.detailBreakdownService.setItemList(items) !== null){
    
      //         console.log(items)
      //         this.requestFormService.setFormValue(dataConsole)
      //         this.router.navigate(['/operation-system/mhe-request-preview']);
            
            
      //       }
    
      //     })
      // }

      

      // if(this.mheForm.bookingDate > this.currentDate){
      //   this.dateFlag = false;
      //   this.invalidBookingDate = false;

      //   this.requestFormService.setFormValue(dataConsole)
      //   this.router.navigate(['/operation-system/mhe-request-preview']);
      // }
     
    }

    
  }

  formValidation(){
    if (!this.mheForm.requestOnBehalf || this.mheForm.requestOnBehalf.length == 0) {
      this.invalidRequestOnBehalf = true;
    } else if (this.mheForm.requestOnBehalf) {
      this.invalidRequestOnBehalf = false;
    }

    if (!this.mheForm.jobDescription) {
      this.invalidJobDescription = true;
    } else if (this.mheForm.jobDescription) {
      this.invalidJobDescription = false;
    }

    if (!this.mheForm.bookingDate) {
      this.invalidBookingDate = true;
      this.dateInvalid = "Date Required";
    } else if (this.mheForm.bookingDate) {
      this.invalidBookingDate = false;
    }

      if(this.mheForm.bookingDate.length == 0){
        this.invalidBookingDate = true;
      }
    

    if (!this.mheForm.estDuration) {
      this.invalidEstDuration = true;
      this.requiredEstDuration = true;
    } else if (this.mheForm.estDuration) {
      this.invalidEstDuration = false;
      this.requiredEstDuration = false;
    }

    if (!this.mheForm.estTrip) {
      this.invalidEstTrip = true;
      this.requiredEstTrip = true;
    } else if (this.mheForm.estTrip) {
      this.invalidEstTrip = false;
      this.requiredEstTrip = false;
    }

    if (!this.mheForm.estGoods) {
      this.invalidEstGoods = true;
      this.requiredEstGoods = true;
    } else if (this.mheForm.estGoods) {
      this.invalidEstGoods = false;
      this.requiredEstGoods = false;
    }

    for (let i = 0; i < this.machineryConsoleList.length; i++) {
      if (this.machineryConsoleList[i].Selected == true) {
        if (!this.machineryConsoleList[i].Time) {
          this.invalidTimeMachinery[i] = true;
          this.requiredTime = true;

        } else {
          this.invalidTimeMachinery[i] = false;
        }
        if (!this.machineryConsoleList[i].Location || this.machineryConsoleList[i].Location.length == 0) {
          this.invalidLocationMachinery[i] = true;
          this.requiredLocation = true;

        } else {
          this.invalidLocationMachinery[i] = false;
        }
      }
      else {
        this.invalidTimeMachinery[i] = false;
        this.invalidLocationMachinery[i] = false;

        this.requiredTime = false;
        this.requiredLocation = false;
      }
    }
    this.focusOnInvalid();
  }


  selectedTimeMachinery(event: any, index: any) {
    this.machineryConsoleList[index].Time = event.item.content;
  }

  selectedLocationMachinery(event: any, index: any) {
    this.machineryConsoleList[index].Location = event.item.content;
  }

  onChange(i: any) {
    let select = this.machineryConsoleList[i].Selected;

    if (select) {
      this.disable[i] = false;
      this.machineryTableInvalid = false;
    }
    else {
      this.disable[i] = true;
    }

  }

  onReset(form: NgForm) {
    form.resetForm(); // or form.reset();
    this.mheForm.requestType = 'Console';
    for (let i = 0; i < this.machineryConsoleList.length; i++) {
      this.disable[i] = true;
      this.invalidTimeMachinery[i] = false;
      this.invalidLocationMachinery[i] = false;
    }
    this.mheForm.estTrip = 0;
    this.mheForm.estDuration = 0;
    this.mheForm.estGoods = 0;
    this.invalidRequestOnBehalf = false;
    this.invalidJobDescription = false;
    this.invalidBookingDate = false;
    this.invalidEstDuration = false;
    this.invalidEstTrip = false;
    this.invalidEstGoods = false;
    this.machineryTableInvalid = false;

    this.machineryDetailBreakdown = []

  }
  inputValueChange(event: any) {



    if (this.mheForm.requestOnBehalf) {
      this.invalidRequestOnBehalf = false;
    }
    if (this.mheForm.jobDescription) {
      this.invalidJobDescription = false;
    }

    if (this.mheForm.estDuration) {
      if(this.mheForm.estDuration > this.max || this.mheForm.estDuration <= 0){
        this.invalidEstDuration = true;
        this.requiredEstDuration = true;
      }
      else{
        this.invalidEstDuration = false;
      }
    }

    if (this.mheForm.estTrip) {
      if(this.mheForm.estTrip > this.max || this.mheForm.estTrip <= 0){
        this.invalidEstTrip = true;
        this.requiredEstTrip = true;
      }
      else{
        this.invalidEstTrip = false;
      }
    }

    if (this.mheForm.estGoods) {
      if(this.mheForm.estGoods > this.maxGood || this.mheForm.estGoods <= 0){
        this.invalidEstGoods = true;
        this.requiredEstGoods = true;
      }
      else{
        this.invalidEstGoods = false;
      }
    }

   

  

   

  }

  dateValueChange(event: any){



    if (!this.mheForm.bookingDate || 
      this.mheForm.bookingDate.length == 0 ) {
      this.invalidBookingDate = true;
      this.requiredBookingDate = true
    }

    if (this.mheForm.bookingDate) {
      this.invalidBookingDate = false;
    }
   /*  else {
      this.invalidBookingDate = true;
      this.dateInvalid = "Date Required";
    } */

    /* from calendar (user time) */

    let dateTimeInput = new Date(this.mheForm.bookingDate)
    let dateInput = dateTimeInput.getFullYear()+'/'+(dateTimeInput.getMonth()+1)+'/'+('0' + dateTimeInput.getDate()).slice(-2)
    let todayDateTime = new Date()
    let todayDate =  todayDateTime.getFullYear()+'/'+(todayDateTime.getMonth()+1)+'/'+('0' + todayDateTime.getDate()).slice(-2)

    // Get input date
    let dateToString = this.mheForm.bookingDate.toString();
    let singleDate = new Date(dateToString);
    let formatSingleDate = this.datepipe.transform(singleDate, 'dd-MM-yyyy');

    // Get current date
    let current = new Date();
    let formatCurrent = this.datepipe.transform(current, 'dd-MM-yyyy');
    // Get current time
    let currentHour = current.getHours()


  //  this.dateString = this.mheForm.bookingDate.toString();
  //  this.date = new Date(this.dateString); 
  //  this.selectDate = this.datepipe.transform(this.date, 'dd/MM/yyyy'); 

    this.selectDate = dateInput
    
    if (dateInput < todayDate) {
      this.dateFlag = false;
      this.invalidBookingDate = true;
      this.dateInvalid = "Please select today's date or after today's date";
 
      this.getTimeDropdown();
      console.log(dateInput)
      console.log(todayDate)
      console.log("less than today")

    }else if(dateInput == todayDate){
      console.log("same day")
      console.log(dateInput)
      console.log(todayDate)
      this.filterTimeArr();

    }else{
      console.log(dateInput)
      console.log(todayDate)
      console.log("more than today")
      this.time = [];
      this.getTimeDropdown();

    }

    let formatCurrentPlusDay =  current.setDate(current.getDate() + 1)
    let formatCurrentPlusDayOne = new Date(formatCurrentPlusDay)
    let newformatCurrentPlusDayOne = this.datepipe.transform(formatCurrentPlusDayOne, 'dd-MM-yyyy')

  
    if(formatSingleDate.valueOf() === formatCurrent.valueOf()) {
      this.sameDay = false
      this.nextDay = false
      this.dateFlag = false;
      this.status = "WAITING_LIST"
      
    }
     else if(newformatCurrentPlusDayOne === formatSingleDate  && currentHour >= 15 && currentHour <= 24){
      this.nextDay = false
      this.sameDay = false
      this.dateFlag = false;
      this.status = "WAITING_LIST"
     }
    else {
      this.nextDay = false
      this.sameDay = false
      this.dateFlag = false;
      this.status = "BOOKED"
    }


  }

  focusOnInvalid(){
    if (this.invalidRequestOnBehalf) {
      this.requestOnBehalf.nativeElement.focus();
    } 
    else if (this.invalidJobDescription) {
      this.jobDescription.nativeElement.focus();
    }
    else if (this.invalidBookingDate) {
      this.bookingDate.nativeElement.focus();
    }
    else if (this.invalidEstDuration) {
      this.estDuration.nativeElement.focus();
    }
    else if (this.invalidEstTrip) {
      this.estTrip.nativeElement.focus();
    }
    else if (this.invalidEstGoods) {
      this.estQtyGoods.nativeElement.focus();
    }
    else if (this.machineryTableInvalid) {
      this.machineryConsole.nativeElement.focus();
    }
  }

  numericCount(type, value) {
    if(type === 'remarks'){
      this.numericRemarks = value.length;
      this.invalidNumericRemarks = this.numericRemarks >= 100 ? true : false
    }

    if(type === 'jobDesc'){
      this.numericJobDesc = value.length;
      this.invalidNumericJobDesc = this.numericJobDesc >= 100 ? true : false
    }
  }


}
