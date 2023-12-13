import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardGuard } from '../auth/role-guard.guard';
import { CfsEndorsedListComponent } from './cfs-endorsed-list/cfs-endorsed-list.component';
import { CfsContainerListComponent } from './cfs-container-list/cfs-container-list.component';
import { CfsOtherActivityFormComponent } from './cfs-other-activity-form/cfs-other-activity-form.component';
import { CfsOtherRequestPreviewComponent } from './cfs-other-request-preview/cfs-other-request-preview.component';
import { CfsRequestFormComponent } from './cfs-request-form/cfs-request-form.component';
import { CfsRequestListComponent } from './cfs-request-list/cfs-request-list.component';
import { CfsRequestPreviewComponent } from './cfs-request-preview/cfs-request-preview.component';
import { CtEndorsedSignOffListComponent } from './ct-endorsed-sign-off-list/ct-endorsed-sign-off-list.component';
import { CtEndorsedSignOnListComponent } from './ct-endorsed-sign-on-list/ct-endorsed-sign-on-list.component';
import { CtSignOffFormComponent } from './ct-sign-off-form/ct-sign-off-form.component';
import { CtSignOffListComponent } from './ct-sign-off-list/ct-sign-off-list.component';
import { CtSignOffViewComponent } from './ct-sign-off-view/ct-sign-off-view.component';
import { CtSignOnFormComponent } from './ct-sign-on-form/ct-sign-on-form.component';
import { CtSignOnListComponent } from './ct-sign-on-list/ct-sign-on-list.component';
import { CtSignOnViewComponent } from './ct-sign-on-view/ct-sign-on-view.component';
import { CwcyCwInventoriesComponent } from './cwcy-cw-inventories/cwcy-cw-inventories.component';
import { CwcyCwTransactionsComponent } from './cwcy-cw-transactions/cwcy-cw-transactions.component';
import { CwcyCyInventoriesComponent } from './cwcy-cy-inventories/cwcy-cy-inventories.component';
import { CwcyCyTransactionsComponent } from './cwcy-cy-transactions/cwcy-cy-transactions.component';
import { CwcyEndorsedGoodsReceivingListComponent } from './cwcy-endorsed-goods-receiving-list/cwcy-endorsed-goods-receiving-list.component';
import { CwcyEndorsedGoodsReleaseListComponent } from './cwcy-endorsed-goods-release-list/cwcy-endorsed-goods-release-list.component';
import { CwcyGoodsReceivingFormComponent } from './cwcy-goods-receiving-form/cwcy-goods-receiving-form.component';
import { CwcyGoodsReceivingListComponent } from './cwcy-goods-receiving-list/cwcy-goods-receiving-list.component';
import { CwcyGoodsReceivingViewComponent } from './cwcy-goods-receiving-view/cwcy-goods-receiving-view.component';
import { CwcyGoodsReleaseFormComponent } from './cwcy-goods-release-form/cwcy-goods-release-form.component';
import { CwcyGoodsReleaseRequestListComponent } from './cwcy-goods-release-request-list/cwcy-goods-release-request-list.component';
import { CwcyGoodsReleaseViewComponent } from './cwcy-goods-release-view/cwcy-goods-release-view.component';
import { GoodsRecievingEndorsedListComponent } from './goods-recieving-endorsed-list/goods-recieving-endorsed-list.component';
import { GoodsRecievingEndorsedViewComponent } from './goods-recieving-endorsed-view/goods-recieving-endorsed-view.component';
import { GoodsRecievingFormComponent } from './goods-recieving-form/goods-recieving-form.component';
import { GoodsRecievingListComponent } from './goods-recieving-list/goods-recieving-list.component';
import { GoodsRecievingViewComponent } from './goods-recieving-view/goods-recieving-view.component';
import { GoodsReleaseEndorsedListComponent } from './goods-release-endorsed-list/goods-release-endorsed-list.component';
import { GoodsReleaseEndorsedViewComponent } from './goods-release-endorsed-view/goods-release-endorsed-view.component';
import { GoodsReleaseFormComponent } from './goods-release-form/goods-release-form.component';
import { GoodsReleaseListComponent } from './goods-release-list/goods-release-list.component';
import { GoodsReleaseViewComponent } from './goods-release-view/goods-release-view.component';
import { IcwAsEndorsedListComponent } from './icw-as-endorsed-list/icw-as-endorsed-list.component';
import { IcwAsEndorsedViewComponent } from './icw-as-endorsed-view/icw-as-endorsed-view.component';
import { IcwAsFormComponent } from './icw-as-form/icw-as-form.component';
import { IcwAsListComponent } from './icw-as-list/icw-as-list.component';
import { IcwAsViewComponent } from './icw-as-view/icw-as-view.component';
import { IcwInventoryBalancesTransactionsComponent } from './icw-inventory-balances-transactions/icw-inventory-balances-transactions.component';
import { IcwInventoryBalancesComponent } from './icw-inventory-balances/icw-inventory-balances.component';
import { IcwInventoryItemsComponent } from './icw-inventory-items/icw-inventory-items.component';
import { IcwInventoryTransactionsComponent } from './icw-inventory-transactions/icw-inventory-transactions.component';
import { IcwRequestStorageEndorsedListComponent } from './icw-request-storage-endorsed-list/icw-request-storage-endorsed-list.component';
import { IcwRequestStorageEndorsedViewComponent } from './icw-request-storage-endorsed-view/icw-request-storage-endorsed-view.component';
import { IcwRequestStorageFormComponent } from './icw-request-storage-form/icw-request-storage-form.component';
import { IcwRequestStorageListComponent } from './icw-request-storage-list/icw-request-storage-list.component';
import { IcwRequestStorageViewComponent } from './icw-request-storage-view/icw-request-storage-view.component';
import { IcwTransferEndorsedListComponent } from './icw-transfer-endorsed-list/icw-transfer-endorsed-list.component';
import { IcwTransferEndorsedViewComponent } from './icw-transfer-endorsed-view/icw-transfer-endorsed-view.component';
import { IcwTransferFormComponent } from './icw-transfer-form/icw-transfer-form.component';
import { IcwTransferListComponent } from './icw-transfer-list/icw-transfer-list.component';
import { IcwTransferViewComponent } from './icw-transfer-view/icw-transfer-view.component';
import { IcwWarehouseSpaceComponent } from './icw-warehouse-space/icw-warehouse-space.component';
import { IcysInventoryItemsComponent } from './icys-inventory-items/icys-inventory-items.component';
import { IcysTransactionsComponent } from './icys-transactions/icys-transactions.component';
import { MarineBerthOccupancyDocketDetailsComponent } from './marine-berth-occupancy-docket-details/marine-berth-occupancy-docket-details.component';
import { MarineWorkProgramDetailsComponent } from './marine-berth-occupancy-docket-details/marine-work-program-details/marine-work-program-details.component';
import { MarineBerthOccupancyDocketListComponent } from './marine-berth-occupancy-docket-list/marine-berth-occupancy-docket-list.component';
import { MarineBerthOccupancyDocketPreviewComponent } from './marine-berth-occupancy-docket-preview/marine-berth-occupancy-docket-preview.component';
import { MarineBerthRequestFormComponent } from './marine-berth-request-form/marine-berth-request-form.component';
import { MheComponent } from './marine-berth-request-form/mhe/mhe.component';
import { MarineBerthRequestListPreviewComponent } from './marine-berth-request-list-preview/marine-berth-request-list-preview.component';
import { MarineBerthRequestListComponent } from './marine-berth-request-list/marine-berth-request-list.component';
import { MarineEndorseBodListComponent } from './marine-endorse-bod-list/marine-endorse-bod-list.component';
import { MarineEndorseFuelwaterDetailsComponent } from './marine-endorse-fuelwater-details/marine-endorse-fuelwater-details.component';
import { MarineEndorseFuelwaterListComponent } from './marine-endorse-fuelwater-list/marine-endorse-fuelwater-list.component';
import { MarineFuelWaterRequestListComponent } from './marine-fuel-water-request-list/marine-fuel-water-request-list.component';
import { MarineFuelwaterFormPreviewComponent } from './marine-fuelwater-form-preview/marine-fuelwater-form-preview.component';
import { MarineFuelwaterRequestFormComponent } from './marine-fuelwater-request-form/marine-fuelwater-request-form.component';
import { MarineMaterialRequisitionFormPreviewComponent } from './marine-material-requisition-form-preview/marine-material-requisition-form-preview.component';
import { MarineMaterialRequisitionFormComponent } from './marine-material-requisition-form/marine-material-requisition-form.component';
import { MarineMaterialRequisitionListComponent } from './marine-material-requisition-list/marine-material-requisition-list.component';
import { MarineServiceRequestFormPreviewComponent } from './marine-service-request-form-preview/marine-service-request-form-preview.component';
import { MarineServiceRequestFormComponent } from './marine-service-request-form/marine-service-request-form.component';
import { MarineServiceRequestListPreviewComponent } from './marine-service-request-list-preview/marine-service-request-list-preview.component';
import { MarineServiceRequestListComponent } from './marine-service-request-list/marine-service-request-list.component';
import { MheEndorseRequestDetailsComponent } from './mhe-endorse-request-details/mhe-endorse-request-details.component';
import { MheEndorseRequestListComponent } from './mhe-endorse-request-list/mhe-endorse-request-list.component';
import { MheRequestFormComponent } from './mhe-request-form/mhe-request-form.component';
import { MheRequestListComponent } from './mhe-request-list/mhe-request-list.component';
import { MheRequestPreviewEndorseComponent } from './mhe-request-preview-endorse/mhe-request-preview-endorse.component';
import { MheRequestPreviewComponent } from './mhe-request-preview/mhe-request-preview.component';
import { PbkssJobTicketPreviewComponent } from './pbkss-job-ticket-preview/pbkss-job-ticket-preview.component';
import { SwAdditionalServiceReportListComponent } from './sw-additional-service-report-list/sw-additional-service-report-list.component';
import { SwAdditionalServiceReportMheComponent } from './sw-additional-service-report-mhe/sw-additional-service-report-mhe.component';
import { SwAdditionalServiceReportViewComponent } from './sw-additional-service-report-view/sw-additional-service-report-view.component';
import { SwCurrentInventoryListComponent } from './sw-current-inventory-list/sw-current-inventory-list.component';
import { SwInboundFormComponent } from './sw-inbound-form/sw-inbound-form.component';
import { SwInboundOutboundListComponent } from './sw-inbound-outbound-list/sw-inbound-outbound-list.component';
import { SwInboundPreviewComponent } from './sw-inbound-preview/sw-inbound-preview.component';
import { SwInboundSoReportListComponent } from './sw-inbound-so-report-list/sw-inbound-so-report-list.component';
import { SwInboundSoReportViewComponent } from './sw-inbound-so-report-view/sw-inbound-so-report-view.component';
import { SwInboundViewComponent } from './sw-inbound-view/sw-inbound-view.component';
import { SwOutboundFormComponent } from './sw-outbound-form/sw-outbound-form.component';
import { SwOutboundPreviewComponent } from './sw-outbound-preview/sw-outbound-preview.component';
import { SwOutboundSoReportListComponent } from './sw-outbound-so-report-list/sw-outbound-so-report-list.component';
import { SwOutboundSoReportViewComponent } from './sw-outbound-so-report-view/sw-outbound-so-report-view.component';
import { SwOutboundViewComponent } from './sw-outbound-view/sw-outbound-view.component';
import { SwTwgEditComponent } from './sw-twg-edit/sw-twg-edit.component';
import { SwTwgFormComponent } from './sw-twg-form/sw-twg-form.component';
import { SwTwgListComponent } from './sw-twg-list/sw-twg-list.component';
import { SwTwgPrintComponent } from './sw-twg-print/sw-twg-print.component';
import { SwTwgViewComponent } from './sw-twg-view/sw-twg-view.component';
import { WasteDisposalEndorseListComponent } from './waste-disposal-endorse-list/waste-disposal-endorse-list.component';
import { WasteDisposalFormComponent } from './waste-disposal-form/waste-disposal-form.component';
import { WasteDisposalListComponent } from './waste-disposal-list/waste-disposal-list.component';
import { WasteDisposalPreviewComponent } from './waste-disposal-preview/waste-disposal-preview.component';

const routes: Routes = [
  {
    path: 'operation-system/mhe-request-list',
    component: MheRequestListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
  {
    path: 'operation-system/mhe-request-form',
    component: MheRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
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
    path: 'operation-system/mhe-endorse-request-list',
    component: MheEndorseRequestListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
  {
    path: 'operation-system/mhe-endorse-request-details',
    component: MheEndorseRequestDetailsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'mheCustomer',
    },
  },
  {
    path: 'operation-system/marine-work-program-details',
    component: MarineWorkProgramDetailsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-request-list',
    component: MarineBerthRequestListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-request-form',
    component: MarineBerthRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-request-form/:requestNum',
    component: MarineBerthRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-request-form/mhe',
    component: MheComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-occupancy-docket-list',
    component: MarineBerthOccupancyDocketListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-occupancy-docket-details',
    component: MarineBerthOccupancyDocketDetailsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-occupancy-docket-preview',
    component: MarineBerthOccupancyDocketPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-endorse-bod-list',
    component: MarineEndorseBodListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-fuel-water-request-list',
    component: MarineFuelWaterRequestListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-fuelwater-request-form',
    component: MarineFuelwaterRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-fuelwater-request-form/:requestNo',
    component: MarineFuelwaterRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-fuelwater-form-preview',
    component: MarineFuelwaterFormPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-fuelwater-form-preview/:requestNo',
    component: MarineFuelwaterFormPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-endorse-fuelwater-list',
    component: MarineEndorseFuelwaterListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-endorse-fuelwater-details/:requestNo',
    component: MarineEndorseFuelwaterDetailsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/waste-disposal-list',
    component: WasteDisposalListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'wdCustomer',
    },
  },
  {
    path: 'operation-system/waste-disposal-form/:jobNo',
    component: WasteDisposalFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'wdCustomer',
    },
  },
  {
    path: 'operation-system/waste-disposal-form',
    component: WasteDisposalFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'wdCustomer',
    },
  },
  {
    path: 'operation-system/waste-disposal-preview/:jobNo',
    component: WasteDisposalPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'wdCustomer',
    },
  },
  {
    path: 'operation-system/waste-disposal-preview',
    component: WasteDisposalPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'wdCustomer',
    },
  },
  {
    path: 'operation-system/waste-disposal-endorse-list',
    component: WasteDisposalEndorseListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'wdCustomer',
    },
  },
  {
    path: 'operation-system/marine-berth-request-list-preview',
    component: MarineBerthRequestListPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/pbkss-job-ticket-preview/:jobNo',
    component: PbkssJobTicketPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-outbound-list',
    component: SwInboundOutboundListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-outbound-list/:listType',
    component: SwInboundOutboundListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-form',
    component: SwInboundFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-preview',
    component: SwInboundPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-view/:orderNo',
    component: SwInboundViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-view',
    component: SwInboundViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-outbound-form',
    component: SwOutboundFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-outbound-preview',
    component: SwOutboundPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-outbound-view/:orderNo',
    component: SwOutboundViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-outbound-view',
    component: SwOutboundViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-so-report-list',
    component: SwInboundSoReportListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-so-report-view/:formNo',
    component: SwInboundSoReportViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-inbound-so-report-view',
    component: SwInboundSoReportViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-additional-service-report-list',
    component: SwAdditionalServiceReportListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-additional-service-report-view',
    component: SwAdditionalServiceReportViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-additional-service-report-view/:formNo',
    component: SwAdditionalServiceReportViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-additional-service-report-mhe',
    component: SwAdditionalServiceReportMheComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-outbound-so-report-list',
    component: SwOutboundSoReportListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-outbound-so-report-view',
    component: SwOutboundSoReportViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-outbound-so-report-view/:FormNo',
    component: SwOutboundSoReportViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-twg-list',
    component: SwTwgListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-twg-edit',
    component: SwTwgEditComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-twg-view',
    component: SwTwgViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-twg-view/:formNo',
    component: SwTwgViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-twg-form',
    component: SwTwgFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-twg-form/:formNo',
    component: SwTwgFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-twg-print',
    component: SwTwgPrintComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-twg-print/:formNo',
    component: SwTwgPrintComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/sw-current-inventory-list',
    component: SwCurrentInventoryListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'swmCustomer',
    },
  },
  {
    path: 'operation-system/goods-recieving-form',
    component: GoodsRecievingFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-recieving-form/:requestno',
    component: GoodsRecievingFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-recieving-list',
    component: GoodsRecievingListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-recieving-endorsed-list',
    component: GoodsRecievingEndorsedListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-recieving-view/:requestNo',
    component: GoodsRecievingViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-recieving-endorsed-view/:requestNo',
    component: GoodsRecievingEndorsedViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icys-inventory-items',
    component: IcysInventoryItemsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icysCustomer',
    },
  },
  {
    path: 'operation-system/icys-transactions',
    component: IcysTransactionsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icysCustomer',
    },
  },
  {
    path: 'operation-system/goods-release-form',
    component: GoodsReleaseFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-release-form/:requestno',
    component: GoodsReleaseFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-release-list',
    component: GoodsReleaseListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-release-endorsed-list',
    component: GoodsReleaseEndorsedListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-release-endorsed-view/:requestNo',
    component: GoodsReleaseEndorsedViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/goods-release-view/:requestNo',
    component: GoodsReleaseViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-request-storage-form',
    component: IcwRequestStorageFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-request-storage-form/:requestno',
    component: IcwRequestStorageFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-request-storage-list',
    component: IcwRequestStorageListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-request-storage-endorsed-list',
    component: IcwRequestStorageEndorsedListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-request-storage-view/:docketNo',
    component: IcwRequestStorageViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-request-storage-endorsed-view/:docketNo',
    component: IcwRequestStorageEndorsedViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-transfer-form',
    component: IcwTransferFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-transfer-form/:requestno',
    component: IcwTransferFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-transfer-list',
    component: IcwTransferListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-inventory-items',
    component: IcwInventoryItemsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-inventory-transactions',
    component: IcwInventoryTransactionsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-transfer-view/:docketNo',
    component: IcwTransferViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-transfer-endorsed-list',
    component: IcwTransferEndorsedListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-transfer-endorsed-view/:docketNo',
    component: IcwTransferEndorsedViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-as-form',
    component: IcwAsFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-as-form/:requestno',
    component: IcwAsFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-as-list',
    component: IcwAsListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-as-view/:docketNo',
    component: IcwAsViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-as-endorsed-list',
    component: IcwAsEndorsedListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-as-endorsed-view/:docketNo',
    component: IcwAsEndorsedViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-inventory-balances',
    component: IcwInventoryBalancesComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-inventory-balances-transactions',
    component: IcwInventoryBalancesTransactionsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-inventory-balances-transactions/:chemicalId',
    component: IcwInventoryBalancesTransactionsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/icw-warehouse-space-utilization',
    component: IcwWarehouseSpaceComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'icwCustomer',
    },
  },
  {
    path: 'operation-system/cfs-request-list',
    component: CfsRequestListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-request-list/:type',
    component: CfsRequestListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-request-form',
    component: CfsRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-request-form/:formNo',
    component: CfsRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-other-activity-form',
    component: CfsOtherActivityFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-other-activity-form/:formNo',
    component: CfsOtherActivityFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-request-preview',
    component: CfsRequestPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-request-preview/:formNo',
    component: CfsRequestPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-other-activities-request-preview',
    component: CfsOtherRequestPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-other-activities-request-preview/:formNo',
    component: CfsOtherRequestPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-endorsed-list',
    component: CfsEndorsedListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cfs-container-list',
    component: CfsContainerListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cfsCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-receiving-request-list',
    component: CwcyGoodsReceivingListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-receiving-form',
    component: CwcyGoodsReceivingFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-receiving-form/:formNo',
    component: CwcyGoodsReceivingFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-receiving-form-view',
    component: CwcyGoodsReceivingViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-receiving-form-view/:formNo',
    component: CwcyGoodsReceivingViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-endorsed-goods-receiving-request-list',
    component: CwcyEndorsedGoodsReceivingListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-release-form',
    component: CwcyGoodsReleaseFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-release-form/:formNo',
    component: CwcyGoodsReleaseFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-releasing-request-list',
    component: CwcyGoodsReleaseRequestListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-endorsed-goods-release-request-list',
    component: CwcyEndorsedGoodsReleaseListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-release-form-view',
    component: CwcyGoodsReleaseViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-goods-release-form-view/:formNo',
    component: CwcyGoodsReleaseViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-cw-inventories',
    component: CwcyCwInventoriesComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-cy-inventories',
    component: CwcyCyInventoriesComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-cw-transactions',
    component: CwcyCwTransactionsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/cwcy-cy-transactions',
    component: CwcyCyTransactionsComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'cwcyCustomer',
    },
  },
  {
    path: 'operation-system/marine-service-request-list',
    component: MarineServiceRequestListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-service-request-list-preview/:requestNum',
    component: MarineServiceRequestListPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-service-request-form',
    component: MarineServiceRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-service-request-form/:RequestNo',
    component: MarineServiceRequestFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-service-request-form-preview',
    component: MarineServiceRequestFormPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-service-request-form-preview/:requestNum',
    component: MarineServiceRequestFormPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-material-requisition-list',
    component: MarineMaterialRequisitionListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-material-requisition-form',
    component: MarineMaterialRequisitionFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-material-requisition-form/:requestNum',
    component: MarineMaterialRequisitionFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-material-requisition-form-preview',
    component: MarineMaterialRequisitionFormPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/marine-material-requisition-form-preview/:requestNum',
    component: MarineMaterialRequisitionFormPreviewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'marineCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-on-list',
    component: CtSignOnListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-on-form',
    component: CtSignOnFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-on-form/:formNo',
    component: CtSignOnFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-on-view',
    component: CtSignOnViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-on-view/:formNo',
    component: CtSignOnViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-endorsed-sign-on-list',
    component: CtEndorsedSignOnListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-off-list',
    component: CtSignOffListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-off-form',
    component: CtSignOffFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-off-form/:formNo',
    component: CtSignOffFormComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-off-view',
    component: CtSignOffViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-sign-off-view/:formNo',
    component: CtSignOffViewComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
  {
    path: 'operation-system/ct-endorsed-sign-off-list',
    component: CtEndorsedSignOffListComponent,
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'crewCustomer',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationSystemRoutingModule {}
