import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SellerForm } from '../../interfaces/transfer-owner/transferOwnerForm_interface';

@Injectable({
  providedIn: 'root'
})
export class TransferOwnerService {

  sellerForm: SellerForm
  
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

  setSellerFormValue(data: SellerForm) {
    this.sellerForm = data
  }

  getSellerFormValue() {
    return this.sellerForm
  }
  
  public getPreviousUrl() {
    return this.previousUrl;
  }
}
