import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pr-property-list',
  templateUrl: './pr-property-list.component.html',
  styleUrls: [
    './pr-property-list.component.scss',
    '../property-rental.style.scss',
  ],
})
export class PrPropertyListComponent implements OnInit {
  constructor(private router: Router, private dataService: AppService) {}

  //placeholder
  userId = 0;

  officeData: any[] = [];
  warehouseData: any[] = [];
  propertyData: any[] = [];
  contractData: { [key: string]: any };

  populateFormData(data: any) {
    this.contractData = data['contracts'].filter(
      (contract) => contract['contractOrganization'].userId === this.userId
    );

    this.propertyData = data['propertyList'].filter((property) =>
      this.contractData.some(
        (contract) => contract.contractId === property.contractId
      )
    );

    this.warehouseData = this.propertyData.filter(
      (warehouse) => warehouse.propertyType === 'Warehouse'
    );

    this.officeData = this.propertyData.filter(
      (office) => office.propertyType === 'Office'
    );
  }

  getContractDate(contractId: number, dateType: 'start' | 'end'): string {
    const contractDetail = this.contractData.find(
      (contract) => contract.contractId === contractId
    );
    if (contractDetail) {
      if (dateType === 'start') {
        return contractDetail.contractDate;
      } else if (dateType === 'end') {
        return contractDetail.contractEndDate;
      }
    }
    return '';
  }

  onItemClick(propertyId: number) {
    this.router.navigate([
      'property-rental/rental-termination-form',
      propertyId,
    ]);
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
