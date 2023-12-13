import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrRequestListComponent } from './pr-request-list/pr-request-list.component';
import { PrRentalRequestFormComponent } from './pr-rental-request-form/pr-rental-request-form.component';
import { PrTerminationListComponent } from './pr-termination-list/pr-termination-list.component';
import { PrPropertyListComponent } from './pr-property-list/pr-property-list.component';
import { PrRentalTerminationFormComponent } from './pr-rental-termination-form/pr-rental-termination-form.component';
import { PrRequestViewComponent } from './pr-request-view/pr-request-view.component';
import { PrTerminationFormViewComponent } from './pr-termination-form-view/pr-termination-form-view.component';

const routes: Routes = [
  {
    path: 'property-rental/request-list',
    component: PrRequestListComponent,
  },
  {
    path: 'property-rental/rental-request-form',
    component: PrRentalRequestFormComponent,
  },
  {
    path: 'property-rental/termination-list',
    component: PrTerminationListComponent,
  },
  {
    path: 'property-rental/property-list',
    component: PrPropertyListComponent,
  },
  {
    path: 'property-rental/rental-termination-form/:id',
    component: PrRentalTerminationFormComponent,
  },
  {
    path: 'property-rental/rental-request-view/:id',
    component: PrRequestViewComponent,
  },

  {
    path: 'property-rental/termination-form-view/:id',
    component: PrTerminationFormViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRentalRoutingModule {}
