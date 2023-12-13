import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRentalRoutingModule } from './property-rental-routing.module';

import { PrPropertyListComponent } from './pr-property-list/pr-property-list.component';
import { PrRentalRequestFormComponent } from './pr-rental-request-form/pr-rental-request-form.component';
import { PrRentalTerminationFormComponent } from './pr-rental-termination-form/pr-rental-termination-form.component';
import { PrRequestListComponent } from './pr-request-list/pr-request-list.component';
import { PrTerminationListComponent } from './pr-termination-list/pr-termination-list.component';
import { PrRequestViewComponent } from './pr-request-view/pr-request-view.component';
import { PrTerminationFormViewComponent } from './pr-termination-form-view/pr-termination-form-view.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PrPropertyListComponent,
    PrRentalRequestFormComponent,
    PrRentalTerminationFormComponent,
    PrRequestListComponent,
    PrTerminationListComponent,
    PrRequestViewComponent,
    PrTerminationFormViewComponent,
  ],
  imports: [CommonModule, PropertyRentalRoutingModule, FormsModule],
})
export class PropertyRentalModule {}
