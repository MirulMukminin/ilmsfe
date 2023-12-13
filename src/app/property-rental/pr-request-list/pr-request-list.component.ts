import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pr-request-list',
  templateUrl: './pr-request-list.component.html',
  styleUrls: [
    './pr-request-list.component.scss',
    '../property-rental.style.scss',
  ],
  providers: [AppService],
})
export class PrRequestListComponent implements OnInit {
  //placeholder
  userId = 0;

  requestData: any[] = [];
  contractData: { [key: string]: any };
  propertyData: { [key: string]: any };

  constructor(private router: Router, private dataService: AppService) {}

  onRequestClick(formId: number) {
    //console.log(formId);
    this.router.navigate(['property-rental/rental-request-view', formId]);
  }

  onRefreshClick() {
    console.log('Refresh clicked!');
  }

  onNewClick() {
    this.router.navigate(['property-rental/rental-request-form']);
    console.log('New request clicked!');
  }

  populateFormData(data: any) {
    this.requestData = data['requestList'].filter(
      (request) => request.userId === this.userId
    );
    this.propertyData = data['propertyList'].filter((property) =>
      this.requestData.some(
        (request) => request.propertyId === property.propertyId
      )
    );

    this.contractData = data['contracts'].filter((contract) =>
      this.requestData.some(
        (request) => request.contractId === contract.contractId
      )
    );
  }

  getPropertyInfo(propertyId: number, infoType: 'name' | 'size'): string {
    const propertyDetail = this.propertyData.find(
      (property) => property.propertyId === propertyId
    );

    if (propertyDetail) {
      if (infoType === 'name') {
        return propertyDetail.propertyName;
      } else if (infoType === 'size') {
        return propertyDetail.propertySpace.toString();
      }
    }
    return ''; // Return an empty string if no matching property is found
  }

  getContractDate(contractId: number): string {
    const contractDetail = this.contractData.find(
      (contract) => contract.contractId === contractId
    );
    if (contractDetail) {
      return contractDetail.contractDate;
    }
    return '';
  }

  ngOnInit(): void {
    this.dataService.fetchJsonData().subscribe(
      (data) => {
        this.populateFormData(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
