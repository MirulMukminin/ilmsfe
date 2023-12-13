import { Component, Input, OnInit } from '@angular/core';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { DetailBreakdownService } from '../../services/MHE/detail-breakdown.service';
import { DetailBreakdown, MheForm } from '../../interfaces/MHE/mhe_interface';
import { RequestFormService } from '../../services/MHE/request-form.service';

@Component({
  selector: 'app-detail-breakdown',
  templateUrl: './detail-breakdown.component.html',
  styleUrls: ['./detail-breakdown.component.scss'],
})
export class DetailBreakdownComponent implements OnInit {
  open: boolean = false;
  // itemList: any = {};

  @Input() status: string;
  @Input() requestNo: string;
  @Input() itemList: any = {};
  @Input() totalPrice: any;

  itemArray: any;
  // itemArray: DetailBreakdown = {};

  TotalEstimatedPrice = '';

  constructor(
    private appService: AppService,
    private requestFormService: RequestFormService,
    private detailBreakdownService: DetailBreakdownService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getTotalData();
    this.detailBreakdownService.setTotal('');
  }

  getData() {
    this.itemArray = this.detailBreakdownService.getItemList();
    let i = 0;

    if (this.itemArray.length > 1) {
      this.itemArray.forEach((element, index) => {
        if (element.subnumber == 1) {
          element.number = i++;
        } else {
          element.number = 0;
        }
        element.price = this.addZeroes(element.price)
      });
      console.log(this.itemArray);
    }
    else if(this.itemArray.length == 1){
      this.itemArray.forEach((element, index) => {
       
          element.number = 0;
        element.price = this.addZeroes(element.price)
        
      });
    }
  }

  getTotalData() {
    if(this.detailBreakdownService.getTotal()){
      this.TotalEstimatedPrice = this.addZeroes(this.detailBreakdownService.getTotal());
      console.log(this.TotalEstimatedPrice);
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  addZeroes(num) {
    const dec = num.toString().split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    console.log(num);
    return this.numberWithCommas(Number(num).toFixed(len));
  }
}
