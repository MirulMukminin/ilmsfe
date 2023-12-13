import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-psb-goods-in-out-list',
  templateUrl: './psb-goods-in-out-list.component.html',
  styleUrls: ['./psb-goods-in-out-list.component.scss']
})
export class PsbGoodsInOutListComponent implements OnInit {

  switch: string = "goods-in";
  listType:string = '';


  constructor(private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.listType=this._Activatedroute.snapshot.paramMap.get("listType");
    //console.log(this.listType);
    
    if(this.listType == "goods-in"){
      this.switch = "goods-in";
      document.getElementById("goods-in").click();
    }else if(this.listType == "goods-out"){
      this.switch = "goods-out";
      document.getElementById("goods-out").click();
    }
  }

  selected(event: any) {
    //console.log(event.name)

    this.switch = event.name
  }


}
