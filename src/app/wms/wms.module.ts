import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WmsRoutingModule } from './wms-routing.module';
import { PsbInventoryListComponent } from './psb-inventory-list/psb-inventory-list.component';
import { CurrentInventoryComponent}  from './psb-inventory-list/current-inventory/current-inventory.component';
import { InventoryTransactionComponent } from './psb-inventory-list/inventory-transaction/inventory-transaction.component';
import { PsbGoodsInOutListComponent } from './psb-goods-in-out-list/psb-goods-in-out-list.component';
import { GoodsInComponent } from './psb-goods-in-out-list/goods-in/goods-in.component';
import { GoodsOutComponent } from './psb-goods-in-out-list/goods-out/goods-out.component';
import { PsbGoodsInFormComponent } from './psb-goods-in-form/psb-goods-in-form.component';
import { PsbGoodsOutFormComponent } from './psb-goods-out-form/psb-goods-out-form.component';
import { PsbTransferOwnerListComponent } from './psb-transfer-owner-list/psb-transfer-owner-list.component';
import { SellerComponent } from './psb-transfer-owner-list/seller/seller.component';
import { BuyerConfirmationComponent } from './psb-transfer-owner-list/buyer-confirmation/buyer-confirmation.component';
import { PsbTransferOwnerSellerFormComponent } from './psb-transfer-owner-seller-form/psb-transfer-owner-seller-form.component';
import { PsbTransferOwnerBuyerFormComponent } from './psb-transfer-owner-buyer-form/psb-transfer-owner-buyer-form.component';
import { PsbTransferLocationListComponent } from './psb-transfer-location-list/psb-transfer-location-list.component';
import { PsbTransferLocationFormComponent } from './psb-transfer-location-form/psb-transfer-location-form.component';
import { PsbTransferLocationPreviewComponent } from './psb-transfer-location-preview/psb-transfer-location-preview.component';
import { PsbBuildPartsListComponent } from './psb-build-parts-list/psb-build-parts-list.component';
import { PsbBuildPartsFormComponent } from './psb-build-parts-form/psb-build-parts-form.component';
import { PsbBuildPartsPreviewComponent } from './psb-build-parts-preview/psb-build-parts-preview.component';
import { BreadcrumbModule, ButtonModule, CheckboxModule, ComboBoxModule, ContentSwitcherModule, DatePickerModule, DialogModule, DropdownModule, FileUploaderModule,
  GridModule, IconModule, InputModule, ModalModule, NotificationModule, NumberModule,
  PaginationModule, PlaceholderModule, RadioModule, TableModule, TilesModule, LoadingModule } from 'carbon-components-angular';
import { FormsModule } from '@angular/forms';
import { PsbTransferOwnerBuyerPreviewComponent } from './psb-transfer-owner-buyer-preview/psb-transfer-owner-buyer-preview.component';
import { PsbTransferOwnerSellerPreviewComponent } from './psb-transfer-owner-seller-preview/psb-transfer-owner-seller-preview.component';
import { SellerFormPreviewComponent } from './psb-transfer-owner-seller-form/seller-form-preview/seller-form-preview.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { PsbGoodsInPreviewComponent } from './psb-goods-in-preview/psb-goods-in-preview.component';
import { PsbGoodsOutPreviewComponent } from './psb-goods-out-preview/psb-goods-out-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { PsbBuildPartsListPreviewComponent } from './psb-build-parts-list-preview/psb-build-parts-list-preview.component';
import { PsbInventoryListTransactPreviewComponent } from './psb-inventory-list-transact-preview/psb-inventory-list-transact-preview.component';
import { PsbRgrFormComponent } from './psb-rgr-form/psb-rgr-form.component';
import { PsbReportComponent } from './psb-report/psb-report.component';

@NgModule({
  declarations: [
    PsbInventoryListComponent,
    PsbGoodsInOutListComponent,
    GoodsInComponent,
    GoodsOutComponent,
    PsbGoodsInFormComponent,
    PsbGoodsOutFormComponent,
    PsbTransferOwnerListComponent,
    SellerComponent,
    BuyerConfirmationComponent,
    PsbTransferOwnerSellerFormComponent,
    PsbTransferOwnerBuyerFormComponent,
    PsbTransferLocationListComponent,
    PsbTransferLocationFormComponent,
    PsbTransferLocationPreviewComponent,
    PsbBuildPartsListComponent,
    PsbBuildPartsFormComponent,
    PsbBuildPartsPreviewComponent,
    PsbTransferOwnerBuyerPreviewComponent,
    PsbTransferOwnerSellerPreviewComponent,
    SellerFormPreviewComponent,
    PsbGoodsInPreviewComponent,
    PsbGoodsOutPreviewComponent,
    PsbBuildPartsListPreviewComponent,
    CurrentInventoryComponent,
    InventoryTransactionComponent,
    PsbInventoryListTransactPreviewComponent,
    PsbRgrFormComponent,
    PsbReportComponent

  ],
  imports: [
    CommonModule,
    WmsRoutingModule,
    GridModule,
    BreadcrumbModule,
    ContentSwitcherModule,
    TableModule,
    InputModule,
    CheckboxModule,
    ButtonModule,
    PaginationModule,
    DropdownModule,
    DatePickerModule,
    IconModule,
    NumberModule,
    RadioModule,
    FileUploaderModule,
    NotificationModule,
    FormsModule,
    DialogModule,
    PlaceholderModule,
    ModalModule,
    TilesModule,
    NgxCsvParserModule,
    ComboBoxModule,
    HttpClientModule,
    LoadingModule
  ]
})
export class WmsModule { }
