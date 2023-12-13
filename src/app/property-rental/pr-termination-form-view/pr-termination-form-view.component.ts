import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pr-termination-form-view',
  templateUrl: './pr-termination-form-view.component.html',
  styleUrls: [
    './pr-termination-form-view.component.scss',
    '../property-rental.style.scss',
  ],
})
export class PrTerminationFormViewComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  formId: number;
  userData: { [key: string]: any };
  terminationData: { [key: string]: any };
  companyData: { [key: string]: any };
  propertyData: { [key: string]: any };

  populateFormData(data: any) {
    this.terminationData = data['terminationList'].find(
      (termination) => termination.formId === this.formId
    );

    this.userData = data['user'].find(
      (user) => user.userId === this.terminationData.userId
    );
    this.companyData = data['company'].find(
      (company) => company.companyId === this.userData.companyId
    );
    this.propertyData = data['propertyList'].find(
      (property) => property.propertyId === this.terminationData.propertyId
    );

    console.log(this.companyData);
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

  onClickBreadcrumb() {
    this.router.navigateByUrl('property-rental/termination-list');
  }
}
