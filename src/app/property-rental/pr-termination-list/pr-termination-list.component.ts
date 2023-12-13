import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pr-termination-list',
  templateUrl: './pr-termination-list.component.html',
  styleUrls: [
    './pr-termination-list.component.scss',
    '../property-rental.style.scss',
  ],
})
export class PrTerminationListComponent implements OnInit {
  constructor(private router: Router, private dataService: AppService) {}

  //placeholder
  userId = 0;

  terminationData: any[] = [];
  propertyData: { [key: string]: any };

  populateFormData(data: any) {
    this.terminationData = data['terminationList'].filter(
      (termination) => termination.userId === this.userId
    );

    this.propertyData = data['propertyList'].filter((property) =>
      this.terminationData.some(
        (request) => request.propertyId === property.propertyId
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

  onItemClick(formId: number) {
    this.router.navigate(['property-rental/termination-form-view', formId]);
  }

  onRefreshClick() {
    console.log('Refresh clicked!');
  }
}
