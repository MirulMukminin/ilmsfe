import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BreadcrumbModule,
  ButtonModule,
  CheckboxModule,
  ComboBoxModule,
  ContentSwitcherModule,
  DatePickerModule,
  DialogModule,
  DropdownModule,
  FileUploaderModule,
  GridModule,
  IconModule,
  InputModule,
  LoadingModule,
  ModalModule,
  NotificationModule,
  NumberModule,
  PaginationModule,
  PlaceholderModule,
  ProgressIndicatorModule,
  RadioModule,
  SelectModule,
  TableModule,
  TabsModule,
  TilesModule,
  TimePickerModule,
} from 'carbon-components-angular';
import { BookingTimeCounterComponent } from './booking-time-counter/booking-time-counter.component';
import { CfsEndorsedListComponent } from './cfs-endorsed-list/cfs-endorsed-list.component';
import { CfsHousekeepingComponent } from './cfs-other-activity-form/cfs-housekeeping/cfs-housekeeping.component';
import { CfsLoadingCablingComponent } from './cfs-other-activity-form/cfs-loading-cabling/cfs-loading-cabling.component';
import { CfsOtherActivityFormComponent } from './cfs-other-activity-form/cfs-other-activity-form.component';
import { CfsPlugOnOffComponent } from './cfs-other-activity-form/cfs-plug-on-off/cfs-plug-on-off.component';
import { CfsRepairComponent } from './cfs-other-activity-form/cfs-repair/cfs-repair.component';
import { CfsOtherRequestPreviewComponent } from './cfs-other-request-preview/cfs-other-request-preview.component';
import { CfsRequestFormComponent } from './cfs-request-form/cfs-request-form.component';
import { HousekeepingCleaningStuffingComponent } from './cfs-request-form/housekeeping-cleaning-stuffing/housekeeping-cleaning-stuffing.component';
import { LoadingCablingComponent } from './cfs-request-form/loading-cabling/loading-cabling.component';
import { PlugOnOffComponent } from './cfs-request-form/plug-on-off/plug-on-off.component';
import { RepairComponent } from './cfs-request-form/repair/repair.component';
import { StorageComponent } from './cfs-request-form/storage/storage.component';
import { CfsRequestListComponent } from './cfs-request-list/cfs-request-list.component';
import { CfsRequestPreviewComponent } from './cfs-request-preview/cfs-request-preview.component';
import { MarineBerthOccupancyDocketDetailsComponent } from './marine-berth-occupancy-docket-details/marine-berth-occupancy-docket-details.component';
import { MarineWorkProgramDetailsComponent } from './marine-berth-occupancy-docket-details/marine-work-program-details/marine-work-program-details.component';
import { MarineBerthOccupancyDocketListComponent } from './marine-berth-occupancy-docket-list/marine-berth-occupancy-docket-list.component';
import { MarineBerthOccupancyDocketPreviewComponent } from './marine-berth-occupancy-docket-preview/marine-berth-occupancy-docket-preview.component';
import { MarineBerthRequestFormPreviewComponent } from './marine-berth-request-form-preview/marine-berth-request-form-preview.component';
import { FuelWaterPreviewComponent } from './marine-berth-request-form/fuel-water-preview/fuel-water-preview.component';
import { FuelWaterComponent } from './marine-berth-request-form/fuel-water/fuel-water.component';
import { GeneralWorksPreviewComponent } from './marine-berth-request-form/general-works-preview/general-works-preview.component';
import { GeneralWorksComponent } from './marine-berth-request-form/general-works/general-works.component';
import { MarineBerthRequestFormComponent } from './marine-berth-request-form/marine-berth-request-form.component';
import { BerthConsoleComponent } from './marine-berth-request-form/mhe/berth-console/berth-console.component';
import { BerthNormalComponent } from './marine-berth-request-form/mhe/berth-normal/berth-normal.component';
import { ConsolePreviewComponent } from './marine-berth-request-form/mhe/console-preview/console-preview.component';
import { MheComponent } from './marine-berth-request-form/mhe/mhe.component';
import { NormalPreviewComponent } from './marine-berth-request-form/mhe/normal-preview/normal-preview.component';
import { UnderdeckPreviewComponent } from './marine-berth-request-form/underdeck-preview/underdeck-preview.component';
import { UnderdeckComponent } from './marine-berth-request-form/underdeck/underdeck.component';
import { WorkWithPermitPreviewComponent } from './marine-berth-request-form/work-with-permit-preview/work-with-permit-preview.component';
import { WorkWithPermitComponent } from './marine-berth-request-form/work-with-permit/work-with-permit.component';
import { FuelwaterPreviewComponent } from './marine-berth-request-list-preview/fuelwater-preview/fuelwater-preview.component';
import { GeneralPreviewComponent } from './marine-berth-request-list-preview/general-preview/general-preview.component';
import { MarineBerthRequestListPreviewComponent } from './marine-berth-request-list-preview/marine-berth-request-list-preview.component';
import { MhePreviewConsoleComponent } from './marine-berth-request-list-preview/mhe-preview/mhe-preview-console/mhe-preview-console.component';
import { MhePreviewNormalComponent } from './marine-berth-request-list-preview/mhe-preview/mhe-preview-normal/mhe-preview-normal.component';
import { MhePreviewComponent } from './marine-berth-request-list-preview/mhe-preview/mhe-preview.component';
import { UnderdecksPreviewComponent } from './marine-berth-request-list-preview/underdecks-preview/underdecks-preview.component';
import { WorkPermitPreviewComponent } from './marine-berth-request-list-preview/work-permit-preview/work-permit-preview.component';
import { MarineBerthRequestListComponent } from './marine-berth-request-list/marine-berth-request-list.component';
import { MarineEndorseBodListComponent } from './marine-endorse-bod-list/marine-endorse-bod-list.component';
import { MarineEndorseFuelwaterDetailsComponent } from './marine-endorse-fuelwater-details/marine-endorse-fuelwater-details.component';
import { MarineEndorseFuelwaterListComponent } from './marine-endorse-fuelwater-list/marine-endorse-fuelwater-list.component';
import { MarineFuelWaterRequestListComponent } from './marine-fuel-water-request-list/marine-fuel-water-request-list.component';
import { MarineFuelwaterFormPreviewComponent } from './marine-fuelwater-form-preview/marine-fuelwater-form-preview.component';
import { MarineFuelwaterRequestFormComponent } from './marine-fuelwater-request-form/marine-fuelwater-request-form.component';
import { MheEndorseRequestDetailsComponent } from './mhe-endorse-request-details/mhe-endorse-request-details.component';
import { MheEndorseRequestListComponent } from './mhe-endorse-request-list/mhe-endorse-request-list.component';
import { MheJobTicketPreviewComponent } from './mhe-job-ticket-preview/mhe-job-ticket-preview.component';
import { MheNotificationModalComponent } from './mhe-notification-modal/mhe-notification-modal.component';
import { ConsoleComponent } from './mhe-request-form/console/console.component';
import { MheRequestFormComponent } from './mhe-request-form/mhe-request-form.component';
import { NormalComponent } from './mhe-request-form/normal/normal.component';
import { MheRequestListComponent } from './mhe-request-list/mhe-request-list.component';
import { MheRequestPreviewEndorseComponent } from './mhe-request-preview-endorse/mhe-request-preview-endorse.component';
import { DetailBreakdownComponent } from './mhe-request-preview/detail-breakdown/detail-breakdown.component';
import { MheRequestPreviewComponent } from './mhe-request-preview/mhe-request-preview.component';
import { OperationSystemRoutingModule } from './operation-system-routing.module';
import { PbkssJobTicketPreviewComponent } from './pbkss-job-ticket-preview/pbkss-job-ticket-preview.component';
import { SwAdditionalServiceReportListComponent } from './sw-additional-service-report-list/sw-additional-service-report-list.component';
import { SwAdditionalServiceReportMheComponent } from './sw-additional-service-report-mhe/sw-additional-service-report-mhe.component';
import { SwAdditionalServiceReportViewComponent } from './sw-additional-service-report-view/sw-additional-service-report-view.component';
import { SwCurrentInventoryListComponent } from './sw-current-inventory-list/sw-current-inventory-list.component';
import { SwInventoryTableListComponent } from './sw-current-inventory-list/sw-inventory-table-list/sw-inventory-table-list.component';
import { SwSummaryTableListComponent } from './sw-current-inventory-list/sw-summary-table-list/sw-summary-table-list.component';
import { SwInboundFormComponent } from './sw-inbound-form/sw-inbound-form.component';
import { InboundComponent } from './sw-inbound-outbound-list/inbound/inbound.component';
import { OutboundComponent } from './sw-inbound-outbound-list/outbound/outbound.component';
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
import { VesselPlanScheduleComponent } from './vessel-plan-schedule/vessel-plan-schedule.component';
import { WasteDisposalEndorseListComponent } from './waste-disposal-endorse-list/waste-disposal-endorse-list.component';
// import { WasteDisposalEndorseListComponent } from './waste-disposal-endorse-list/waste-disposal-endorse-list.component';
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
import { IcwBookingCounterComponent } from './icw-booking-counter/icw-booking-counter.component';
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
import { MarineMaterialRequisitionFormPreviewComponent } from './marine-material-requisition-form-preview/marine-material-requisition-form-preview.component';
import { MarineMaterialRequisitionFormComponent } from './marine-material-requisition-form/marine-material-requisition-form.component';
import { MarineMaterialRequisitionListComponent } from './marine-material-requisition-list/marine-material-requisition-list.component';
import { MarineServiceRequestFormPreviewComponent } from './marine-service-request-form-preview/marine-service-request-form-preview.component';
import { MarineServiceRequestFormComponent } from './marine-service-request-form/marine-service-request-form.component';
import { MarineServiceRequestListPreviewComponent } from './marine-service-request-list-preview/marine-service-request-list-preview.component';
import { MarineServiceRequestListComponent } from './marine-service-request-list/marine-service-request-list.component';
import { WasteDisposalFormComponent } from './waste-disposal-form/waste-disposal-form.component';
import { WasteDisposalListComponent } from './waste-disposal-list/waste-disposal-list.component';
import { WasteDisposalPreviewComponent } from './waste-disposal-preview/waste-disposal-preview.component';
import { CtEndorsedSignOnListComponent } from './ct-endorsed-sign-on-list/ct-endorsed-sign-on-list.component';
import { CtEndorsedSignOffListComponent } from './ct-endorsed-sign-off-list/ct-endorsed-sign-off-list.component';
import { HeavyPackageListComponent } from './marine-berth-request-form/heavy-package-list/heavy-package-list.component';
import { HeavyPackageListPreviewComponent } from './marine-berth-request-form/heavy-package-list-preview/heavy-package-list-preview.component';
import { CfsContainerListComponent } from './cfs-container-list/cfs-container-list.component';

@NgModule({
  declarations: [
    VesselPlanScheduleComponent,
    MheRequestListComponent,
    MheRequestFormComponent,
    NormalComponent,
    ConsoleComponent,
    MheRequestPreviewComponent,
    DetailBreakdownComponent,
    MheRequestPreviewEndorseComponent,
    MheJobTicketPreviewComponent,
    BookingTimeCounterComponent,
    MheNotificationModalComponent,
    MarineBerthRequestFormComponent,
    MarineEndorseBodListComponent,
    MarineBerthOccupancyDocketListComponent,
    MarineBerthOccupancyDocketPreviewComponent,
    MheComponent,
    FuelWaterComponent,
    GeneralWorksComponent,
    UnderdeckComponent,
    WorkWithPermitComponent,
    WorkWithPermitPreviewComponent,
    UnderdeckPreviewComponent,
    GeneralWorksPreviewComponent,
    FuelWaterPreviewComponent,
    ConsolePreviewComponent,
    NormalPreviewComponent,
    MarineBerthRequestListComponent,
    MarineBerthRequestFormPreviewComponent,
    BerthNormalComponent,
    BerthConsoleComponent,
    MheEndorseRequestListComponent,
    MheEndorseRequestDetailsComponent,
    MarineBerthOccupancyDocketDetailsComponent,
    MarineBerthRequestListPreviewComponent,
    MhePreviewComponent,
    WorkPermitPreviewComponent,
    FuelwaterPreviewComponent,
    GeneralPreviewComponent,
    UnderdecksPreviewComponent,
    WasteDisposalListComponent,
    WasteDisposalFormComponent,
    WasteDisposalPreviewComponent,
    WasteDisposalEndorseListComponent,
    MheEndorseRequestDetailsComponent,
    MarineBerthRequestListPreviewComponent,
    MhePreviewComponent,
    WorkPermitPreviewComponent,
    FuelwaterPreviewComponent,
    GeneralPreviewComponent,
    UnderdecksPreviewComponent,
    MarineWorkProgramDetailsComponent,
    PbkssJobTicketPreviewComponent,
    SwInboundOutboundListComponent,
    SwInboundFormComponent,
    SwOutboundFormComponent,
    SwInboundViewComponent,
    SwOutboundViewComponent,
    SwOutboundPreviewComponent,
    SwInboundPreviewComponent,
    SwInboundSoReportListComponent,
    SwInboundSoReportViewComponent,
    SwAdditionalServiceReportListComponent,
    SwAdditionalServiceReportViewComponent,
    SwAdditionalServiceReportMheComponent,
    SwOutboundSoReportListComponent,
    SwOutboundSoReportViewComponent,
    SwTwgListComponent,
    SwTwgFormComponent,
    SwTwgViewComponent,
    SwTwgPrintComponent,
    SwTwgEditComponent,
    SwCurrentInventoryListComponent,
    InboundComponent,
    OutboundComponent,
    SwSummaryTableListComponent,
    SwInventoryTableListComponent,
    MhePreviewConsoleComponent,
    MhePreviewNormalComponent,
    MarineFuelWaterRequestListComponent,
    MarineEndorseFuelwaterListComponent,
    MarineFuelwaterRequestFormComponent,
    MarineFuelwaterFormPreviewComponent,
    MarineEndorseFuelwaterDetailsComponent,
    CfsRequestListComponent,
    CfsRequestFormComponent,
    PlugOnOffComponent,
    StorageComponent,
    LoadingCablingComponent,
    HousekeepingCleaningStuffingComponent,
    RepairComponent,
    CfsRequestPreviewComponent,
    CfsEndorsedListComponent,
    CfsContainerListComponent,
    CfsOtherActivityFormComponent,
    CfsHousekeepingComponent,
    CfsPlugOnOffComponent,
    CfsLoadingCablingComponent,
    CfsRepairComponent,
    CfsOtherRequestPreviewComponent,
    CfsOtherRequestPreviewComponent,
    GoodsRecievingFormComponent,
    GoodsRecievingListComponent,
    GoodsRecievingViewComponent,
    IcwRequestStorageFormComponent,
    IcwRequestStorageListComponent,
    IcwRequestStorageViewComponent,
    IcwRequestStorageEndorsedListComponent,
    IcwRequestStorageEndorsedViewComponent,
    IcwTransferFormComponent,
    IcwTransferListComponent,
    IcwTransferViewComponent,
    IcwInventoryItemsComponent,
    IcwInventoryTransactionsComponent,
    IcwTransferEndorsedListComponent,
    IcwTransferEndorsedViewComponent,
    GoodsRecievingEndorsedListComponent,
    GoodsReleaseFormComponent,
    GoodsReleaseListComponent,
    GoodsReleaseEndorsedListComponent,
    GoodsReleaseViewComponent,
    GoodsReleaseEndorsedViewComponent,
    GoodsRecievingEndorsedViewComponent,
    IcysInventoryItemsComponent,
    IcysTransactionsComponent,
    IcwAsFormComponent,
    IcwAsListComponent,
    IcwAsViewComponent,
    IcwAsEndorsedListComponent,
    IcwAsEndorsedViewComponent,
    CwcyGoodsReceivingListComponent,
    CwcyGoodsReceivingFormComponent,
    CwcyGoodsReceivingViewComponent,
    CwcyEndorsedGoodsReceivingListComponent,
    CwcyGoodsReleaseFormComponent,
    CwcyGoodsReleaseRequestListComponent,
    CwcyEndorsedGoodsReleaseListComponent,
    CwcyGoodsReleaseViewComponent,
    CwcyCwInventoriesComponent,
    CwcyCyInventoriesComponent,
    CwcyCwTransactionsComponent,
    CwcyCyTransactionsComponent,
    IcwBookingCounterComponent,
    IcwInventoryBalancesComponent,
    IcwInventoryBalancesTransactionsComponent,
    IcwWarehouseSpaceComponent,
    MarineServiceRequestFormComponent,
    MarineServiceRequestListComponent,
    MarineServiceRequestFormPreviewComponent,
    MarineMaterialRequisitionFormComponent,
    MarineMaterialRequisitionFormPreviewComponent,
    MarineMaterialRequisitionListComponent,
    MarineServiceRequestListPreviewComponent,
    CtSignOnListComponent,
    CtSignOnFormComponent,
    CtSignOnViewComponent,
    CtSignOffListComponent,
    CtSignOffFormComponent,
    CtSignOffViewComponent,
    CtEndorsedSignOnListComponent,
    CtEndorsedSignOffListComponent,
    HeavyPackageListComponent,
    HeavyPackageListPreviewComponent,
    CfsContainerListComponent,
  ],
  imports: [
    CommonModule,
    OperationSystemRoutingModule,
    BreadcrumbModule,
    GridModule,
    DropdownModule,
    ButtonModule,
    InputModule,
    RadioModule,
    CheckboxModule,
    FormsModule,
    DatePickerModule,
    TableModule,
    NumberModule,
    IconModule,
    ContentSwitcherModule,
    PlaceholderModule,
    ModalModule,
    PaginationModule,
    TilesModule,
    NotificationModule,
    ProgressIndicatorModule,
    FileUploaderModule,
    TabsModule,
    SelectModule,
    HttpClientModule,
    LoadingModule,
    ComboBoxModule,
    DialogModule,
    TimePickerModule,
  ],
})
export class OperationSystemModule {}
