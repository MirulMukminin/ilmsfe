import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardGuard } from './auth/role-guard.guard';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MarineBerthOccupancyDocketDetailsComponent } from './operation-system/marine-berth-occupancy-docket-details/marine-berth-occupancy-docket-details.component';
import { MarineBerthRequestListPreviewComponent } from './operation-system/marine-berth-request-list-preview/marine-berth-request-list-preview.component';
import { MheEndorseRequestDetailsComponent } from './operation-system/mhe-endorse-request-details/mhe-endorse-request-details.component';
import { MheJobTicketPreviewComponent } from './operation-system/mhe-job-ticket-preview/mhe-job-ticket-preview.component';
import { MheRequestPreviewEndorseComponent } from './operation-system/mhe-request-preview-endorse/mhe-request-preview-endorse.component';
import { MheRequestPreviewComponent } from './operation-system/mhe-request-preview/mhe-request-preview.component';
import { VesselPlanScheduleComponent } from './operation-system/vessel-plan-schedule/vessel-plan-schedule.component';
import { PsbTransferLocationPreviewComponent } from './wms/psb-transfer-location-preview/psb-transfer-location-preview.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'operation-system/vessel-plan-schedule',
    component: VesselPlanScheduleComponent,
  },
  // { path: 'operation-system/mhe-request-list', component: MheRequestListComponent},
  // { path: 'operation-system/mhe-request-form', component: MheRequestFormComponent},
  {
    path: 'operation-system/mhe-request-preview',
    component: MheRequestPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
  {
    path: 'operation-system/mhe-request-preview-endorse',
    component: MheRequestPreviewEndorseComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
  {
    path: 'operation-system/mhe-request-preview-endorse/:requestNo',
    component: MheRequestPreviewEndorseComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
  {
    path: 'operation-system/mhe-endorse-request-details/:requestNo',
    component: MheEndorseRequestDetailsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-occupancy-docket-details/:bodNo',
    component: MarineBerthOccupancyDocketDetailsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/mhe-job-ticket-preview/:jobNo',
    component: MheJobTicketPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-location-preview/:requestNo',
    component: PsbTransferLocationPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-request-list-preview/:RequestNo',
    component: MarineBerthRequestListPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },

  {
    path: 'coming-soon',
    component: ComingSoonComponent,
  },

  // { path: 'login', component: LoginComponent},
  {
    path: '',
    loadChildren: () =>
      import('./operation-system/operation-system.module').then(
        (m) => m.OperationSystemModule
      ),
  },

  {
    path: '',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: '',
    loadChildren: () => import('./wms/wms.module').then((m) => m.WmsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./property-rental/property-rental.module').then(
        (m) => m.PropertyRentalModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
