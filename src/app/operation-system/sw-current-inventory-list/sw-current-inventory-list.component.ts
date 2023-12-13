import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ButtonType,
  TableHeaderItem,
  TableItem,
  TableModel,
} from 'carbon-components-angular';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sw-current-inventory-list',
  templateUrl: './sw-current-inventory-list.component.html',
  styleUrls: ['./sw-current-inventory-list.component.scss'],
})
export class SwCurrentInventoryListComponent implements OnInit {
  switch: string = 'SummaryTable';
  wasteNearExpiredDate: number;
  wasteExceedExpiredDate: number;
  totalQtyNearExpiredDate: number;

  constructor(protected appService: AppService) {}

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo() {
    this.appService
      .getUserInfo()
      .then((result) => {
        const userInfo = this.appService.jsonToArray(result);
        const initialData = this.appService.populateInitData(userInfo);

        this.getRestQueryAPI(initialData.Company);
      })
      .catch((err) => {
        console.error(err);
        this.appService.terminateSession();
      });
  }

  getRestQueryAPI(Company: string) {
    var apiParam: any = { customer: Company };

    //fire api and get response data
    restServices.pbksb_ScheduledWasteService
      .getSummaryList(this.appService.myApp)(apiParam)
      .then((result) => {
        let resArr: any = result;
        let summaryTableResponse = JSON.parse(resArr);
        // console.log(summaryTableResponse);
        this.wasteNearExpiredDate = summaryTableResponse.wasteNearExpiryCount;
        this.wasteExceedExpiredDate =
          summaryTableResponse.wasteExceedExpiryCount;
        this.totalQtyNearExpiredDate =
          summaryTableResponse.nearExpiryDateTotalQty;
      });
  }

  selected(event: any) {
    this.switch = event.name;
  }
}
