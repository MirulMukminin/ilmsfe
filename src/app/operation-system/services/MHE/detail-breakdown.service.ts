import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DetailBreakdown  } from '../../interfaces/MHE/mhe_interface';


@Injectable({
  providedIn: 'root',
})
export class DetailBreakdownService {

  // detailBreakdownDetails : DetailBreakdown = {}

  itemList :  DetailBreakdown = {}
  totalEstimatedPrice = ''

  setItemList(items: DetailBreakdown) {
    this.itemList = items;
   
    console.log(this.itemList);
  }

  getItemList(){
    return this.itemList;
  }

  setTotal(totalEstimatedPrice){
    this.totalEstimatedPrice = totalEstimatedPrice;
  }

  getTotal(){
    return this.totalEstimatedPrice;
  }

}
