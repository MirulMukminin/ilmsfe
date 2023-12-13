import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  BerthForm,
  DocumentList,
} from '../../interfaces/Marine/marine_interface';

@Injectable({
  providedIn: 'root',
})
export class BerthRequestFormService {
  valueForm: BerthForm = {};
  formID = '';
  requestNo = '';
  berthFormStatus: any;
  berthFormID = '';
  workProgram: any;
  eaDate: any;
  viewJobTicket: any;
  // valueDoc: DocumentList = {};

  formStatusChanged = new Subject<any[]>();
  workProgramChanged = new Subject<any[]>();
  eaDateChanged = new Subject<any[]>();
  flagChargeChanged = new Subject<any[]>();

  formCharge = {
    fuelWater: false,
    fuelWaterCancel: false,
    generalWorks: false,
    generalWorksCancel: false,
  }

  formChargeChanged = new BehaviorSubject<any>(this.formCharge);

  // Form Value
  setFormValue(data: BerthForm) {
    this.valueForm = data;
  }

  getFormValue() {
    return this.valueForm;
  }

  // Form Id
  setFormID(data) {
    this.formID = data;
    console.log(this.formID);
  }

  getFormID() {
    return this.formID;
  }

  // Request No
  setRequestNo(data) {
    this.requestNo = data;
  }

  getrequestNo() {
    return this.requestNo;
  }

  // Berth Form Status
  setBerthFormStatus(status) {
    this.berthFormStatus = status;
    this.formStatusChanged.next(this.berthFormStatus);
  }

  getBerthFormStatus() {
    return this.berthFormStatus;
  }

  // Work Program
  setWorkProgram(program: any) {
    this.workProgram = program;
    this.workProgramChanged.next(this.workProgram);
  }

  getWorkProgram() {
    return this.workProgram;
  }

  // Estimate Arrival Date
  setEaDate(value: any) {
    this.eaDate = value;
    this.eaDateChanged.next(this.eaDate);
  }

  getEaDate() {
    return this.eaDate;
  }

  // set form charge
  setFormChargeStatus(type: any, value: any, cancelType: any, cancelValue: any) {
    this.formCharge[type] = value
    this.formCharge[cancelType] = cancelValue
    this.formChargeChanged.next(this.formCharge);
  }

  // set flag charge
  setFlagCharge(value: any) {
    this.flagChargeChanged.next(value)
  }

  //------------------------- preview update ----------------------------//

  setBerthFormID(data) {
    this.berthFormID = data;
  }

  getBerthFormID() {
    return this.berthFormID;
  }

  private previousUrl: string = '';
  private currentUrl: string = '';

  constructor(private router: Router) {
    this.previousUrl = '';
    this.currentUrl = '';
    this.currentUrl = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

  public getCurrentUrl() {
    return this.currentUrl;
  }

  setJobTicketPreview(val: any) {    
    this.viewJobTicket = val;
  }

}

