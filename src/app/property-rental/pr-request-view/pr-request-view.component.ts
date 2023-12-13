import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pr-request-view',
  templateUrl: './pr-request-view.component.html',
  styleUrls: [
    './pr-request-view.component.scss',
    '../property-rental.style.scss',
  ],
})
export class PrRequestViewComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  //placeholder
  userId = 0;

  formId: number;
  companyData: { [key: string]: any };
  userData: { [key: string]: any };
  formData: { [key: string]: any };
  propertyData: { [key: string]: any };
  contractData: { [key: string]: any };
  activitiesData: { [key: string]: any };

  onClickBreadcrumb() {
    console.log('clicked');
    this.router.navigateByUrl('property-rental/request-list');
  }

  getPropertyInfo(propertyId: number, infoType: 'type' | 'size'): string {
    const propertyDetail = this.propertyData.find(
      (property) => property['property-details']['property-id'] === propertyId
    );

    if (propertyDetail) {
      if (infoType === 'type') {
        return propertyDetail['property-details']['property-type'];
      } else if (infoType === 'size') {
        return propertyDetail['property-details']['property-space'].toString();
      }
    }
    return ''; // Return an empty string if no matching property is found
  }

  populateFormData(data: any) {
    this.formData = data['requestList'].find(
      (request) => request.formId === this.formId
    );
    this.activitiesData = this.formData['activities'];
    this.userData = data['user'].find((user) => user.userId === this.userId);
    this.companyData = data['company'].find(
      (company) => company.companyId === this.userData.companyId
    );
    this.propertyData = data['propertyList'].find(
      (property) => property.propertyId === this.formData.propertyId
    );
    this.contractData = data['contracts'].find(
      (contract) => contract.contractId === this.formData.contractId
    );
  }

  ngOnInit(): void {
    // Extract the form ID from the URL parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.formId = id ? parseInt(id, 10) : undefined;
      if (this.formId !== undefined) {
        this.appService.fetchJsonData().subscribe(
          (data) => {
            this.populateFormData(data);
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }
    });
  }
}
