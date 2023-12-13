import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardGuard } from '../auth/role-guard.guard';
import { PsbBuildPartsFormComponent } from './psb-build-parts-form/psb-build-parts-form.component';
import { PsbBuildPartsListPreviewComponent } from './psb-build-parts-list-preview/psb-build-parts-list-preview.component';
import { PsbBuildPartsListComponent } from './psb-build-parts-list/psb-build-parts-list.component';
import { PsbBuildPartsPreviewComponent } from './psb-build-parts-preview/psb-build-parts-preview.component';
import { PsbGoodsInFormComponent } from './psb-goods-in-form/psb-goods-in-form.component';
import { PsbGoodsInOutListComponent } from './psb-goods-in-out-list/psb-goods-in-out-list.component';
import { PsbGoodsInPreviewComponent } from './psb-goods-in-preview/psb-goods-in-preview.component';
import { PsbGoodsOutFormComponent } from './psb-goods-out-form/psb-goods-out-form.component';
import { PsbGoodsOutPreviewComponent } from './psb-goods-out-preview/psb-goods-out-preview.component';
import { PsbInventoryListTransactPreviewComponent } from './psb-inventory-list-transact-preview/psb-inventory-list-transact-preview.component';
import { PsbInventoryListComponent } from './psb-inventory-list/psb-inventory-list.component';
import { PsbReportComponent } from './psb-report/psb-report.component';
import { PsbRgrFormComponent } from './psb-rgr-form/psb-rgr-form.component';
import { PsbTransferLocationFormComponent } from './psb-transfer-location-form/psb-transfer-location-form.component';
import { PsbTransferLocationListComponent } from './psb-transfer-location-list/psb-transfer-location-list.component';
import { PsbTransferLocationPreviewComponent } from './psb-transfer-location-preview/psb-transfer-location-preview.component';
import { PsbTransferOwnerBuyerFormComponent } from './psb-transfer-owner-buyer-form/psb-transfer-owner-buyer-form.component';
import { PsbTransferOwnerBuyerPreviewComponent } from './psb-transfer-owner-buyer-preview/psb-transfer-owner-buyer-preview.component';
import { PsbTransferOwnerListComponent } from './psb-transfer-owner-list/psb-transfer-owner-list.component';
import { PsbTransferOwnerSellerFormComponent } from './psb-transfer-owner-seller-form/psb-transfer-owner-seller-form.component';
import { SellerFormPreviewComponent } from './psb-transfer-owner-seller-form/seller-form-preview/seller-form-preview.component';
import { PsbTransferOwnerSellerPreviewComponent } from './psb-transfer-owner-seller-preview/psb-transfer-owner-seller-preview.component';

const routes: Routes = [
  {
    path: 'wms/psb-build-parts-form',
    component: PsbBuildPartsFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-build-parts-list',
    component: PsbBuildPartsListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-build-parts-preview',
    component: PsbBuildPartsPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-in-form',
    component: PsbGoodsInFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-in-form/:requestNo',
    component: PsbGoodsInFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-in-out-list',
    component: PsbGoodsInOutListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-in-out-list/:listType',
    component: PsbGoodsInOutListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-out-form',
    component: PsbGoodsOutFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-out-form/:requestNo',
    component: PsbGoodsOutFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-inventory-list',
    component: PsbInventoryListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-inventory-list-transact-preview',
    component: PsbInventoryListTransactPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-inventory-list-transact-preview/:RegistrationNo',
    component: PsbInventoryListTransactPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-location-form',
    component: PsbTransferLocationFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-location-list',
    component: PsbTransferLocationListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-location-preview',
    component: PsbTransferLocationPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-owner-buyer-form',
    component: PsbTransferOwnerBuyerFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-owner-seller-form',
    component: PsbTransferOwnerSellerFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-owner-seller-form-preview',
    component: SellerFormPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-owner-list',
    component: PsbTransferOwnerListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-owner-seller-preview/:requestNo',
    component: PsbTransferOwnerSellerPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-transfer-owner-buyer-preview/:requestNo',
    component: PsbTransferOwnerBuyerPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-in-preview',
    component: PsbGoodsInPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-in-preview/:RegistrationNo',
    component: PsbGoodsInPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-out-preview',
    component: PsbGoodsOutPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-goods-out-preview/:RegistrationNo',
    component: PsbGoodsOutPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-build-parts-list-preview/:requestNo',
    component: PsbBuildPartsListPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psb-report',
    component: PsbReportComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
  {
    path: 'wms/psp-rgr-form',
    component: PsbRgrFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'psbCustomer',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WmsRoutingModule {}
