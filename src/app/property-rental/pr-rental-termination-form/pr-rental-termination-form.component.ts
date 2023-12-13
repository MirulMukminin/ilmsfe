import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pr-rental-termination-form',
  templateUrl: './pr-rental-termination-form.component.html',
  styleUrls: [
    './pr-rental-termination-form.component.scss',
    '../property-rental.style.scss',
  ],
})
export class PrRentalTerminationFormComponent implements OnInit {
  @ViewChild('terminationForm') terminationForm: NgForm;

  user: any = {};
  formValues: any = {};
  selectedReason: string = '';
  formId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  propertyId: number;
  userId = 0;
  contractId: number;
  companyData: { [key: string]: any };
  propertyData: { [key: string]: any };

  submitForm() {
    if (this.terminationForm.valid) {
      // Log the form input values
      this.formValues.contractId = this.contractId;
      this.formValues.selectedReason = this.selectedReason;
      console.log(this.formValues);
    } else {
      console.log('Invalid input - form is not valid');
    }
    window.history.back();
  }

  ngOnInit(): void {
    // Extract the form ID from the URL parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.propertyId = id ? parseInt(id, 10) : undefined;
      if (this.propertyId !== undefined) {
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

  populateFormData(data: any) {
    this.user = data['user'].find((user) => user.userId === this.userId);
    this.companyData = data['company'].find(
      (company) => company.companyId === this.user.companyId
    );

    this.contractId = data['propertyList'].find(
      (property) => property.propertyId === this.propertyId
    ).contractId;

    this.propertyData = data['propertyList'].find(
      (property) => property.propertyId === this.propertyId
    );

    let terminationLength = data['terminationList'].length - 1;
    this.formId = data['terminationList'][terminationLength].formId + 1;
    console.log(this.companyData);
  }

  onClickBreadcrumb() {
    console.log('clicked');
    this.router.navigateByUrl('property-rental/property-list');
  }
}
