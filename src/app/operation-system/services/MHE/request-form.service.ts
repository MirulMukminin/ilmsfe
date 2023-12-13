import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MheForm, ConsoleForm  } from '../../interfaces/MHE/mhe_interface';

@Injectable({
  providedIn: 'root'
})
export class RequestFormService {

  valueForm: MheForm = {};
  // consoleForm: ConsoleForm = {};

  requestType: string = ''

  setRequestType(request: string) {
    this.requestType = request
  }

  getRequestType() {
    return this.requestType
  }

  setFormValue(data: MheForm) {
    this.valueForm = data;
  }

  getFormValue(){
    return this.valueForm;
    
  }

  // setFormValues(dataConsole: ConsoleForm) {
  //   this.consoleForm = dataConsole;
  // }

  // getFormValues(){
  //   return this.consoleForm;
  // }


  private previousUrl: string = '';
  private currentUrl: string = '';

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

}
