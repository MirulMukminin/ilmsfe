import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pr-rental-request-form',
  templateUrl: './pr-rental-request-form.component.html',
  styleUrls: [
    './pr-rental-request-form.component.scss',
    '../property-rental.style.scss',
  ],
})
export class PrRentalRequestFormComponent implements OnInit {
  @ViewChild('propertyRequestForm') propertyRequestForm: NgForm;
  formValues: any = {};
  propertyType = '';

  //placeholder
  userId = 0;

  formId: number;
  companyData: { [key: string]: any };

  constructor(private dataService: AppService) {}

  submitForm() {
    if (this.propertyRequestForm.valid) {
      this.formValues.formId = this.formId;
      this.formValues.selectedReason = this.propertyType;
      this.formValues.userId = this.userId;
      console.log(this.formValues);
    } else {
      console.log('Invalid input - form is not valid');
    }
    window.history.back();
  }

  ngOnInit(): void {
    this.dataService.fetchJsonData().subscribe(
      (data) => {
        this.populateData(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  populateData(data: any) {
    let formLength = data['requestList'].length - 1;
    this.formId = data['requestList'][formLength].formId + 1;
    let companyId = data['user'].find(
      (user) => user.userId === this.userId
    ).companyId;
    this.companyData = data['company'].find(
      (company) => company.companyId === companyId
    );
    console.log(this.companyData.companyName);
  }
}
