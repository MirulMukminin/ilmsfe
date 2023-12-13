import {
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsModule } from '@carbon/icons-angular';
import AddAlt20 from '@carbon/icons/es/add--alt/20';
import Add20 from '@carbon/icons/es/add/20';
import AppSwitcher16 from '@carbon/icons/es/app-switcher/16';
import ArrowDown16 from '@carbon/icons/es/arrow--down/16';
import ArrowDown20 from '@carbon/icons/es/arrow--down/20';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16';
import ArrowUp16 from '@carbon/icons/es/arrow--up/16';
import ArrowUp20 from '@carbon/icons/es/arrow--up/20';
import Arrows16 from '@carbon/icons/es/arrows/16';
import Arrows20 from '@carbon/icons/es/arrows/20';
import CheckboxFilled20 from '@carbon/icons/es/checkbox--checked--filled/20';
import CheckmarkFilled20 from '@carbon/icons/es/checkmark--filled/20';
import CheckmarkOutline20 from '@carbon/icons/es/checkmark--outline/20';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16';
import ChevronLeft16 from '@carbon/icons/es/chevron--left/16';
import ChevronLeft20 from '@carbon/icons/es/chevron--left/20';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16';
import ChevronRight20 from '@carbon/icons/es/chevron--right/20';
import ChevronUp16 from '@carbon/icons/es/chevron--up/16';
import CloseFilled20 from '@carbon/icons/es/close--filled/20';
import documentExport20 from '@carbon/icons/es/document--export/20';
import Download20 from '@carbon/icons/es/download/20';
import Edit16 from '@carbon/icons/es/edit/16';
import Edit20 from '@carbon/icons/es/edit/20';
import FilterReset20 from '@carbon/icons/es/filter--reset/20';
import filter16 from '@carbon/icons/es/filter/16';
import filter20 from '@carbon/icons/es/filter/20';
import HourGlass20 from '@carbon/icons/es/hourglass/20';
import informationSquare20 from '@carbon/icons/es/information--square/20';
import Link20 from '@carbon/icons/es/link/20';
import logout20 from '@carbon/icons/es/logout/20';
import Notification20 from '@carbon/icons/es/notification/20';
import Printer20 from '@carbon/icons/es/printer/20';
import Renew20 from '@carbon/icons/es/renew/20';
import Search16 from '@carbon/icons/es/search/16';
import Search20 from '@carbon/icons/es/search/20';
import Settings16 from '@carbon/icons/es/settings/16';
import Subtract20 from '@carbon/icons/es/subtract/20';
import Template20 from '@carbon/icons/es/template/20';
import TrashCan16 from '@carbon/icons/es/trash-can/16';
import TrashCan20 from '@carbon/icons/es/trash-can/20';
import Upload16 from '@carbon/icons/es/upload/16';
import Upload20 from '@carbon/icons/es/upload/20';
import UserAvatarFilledAlt20 from '@carbon/icons/es/user--avatar--filled--alt/20';
import UserAvatar20 from '@carbon/icons/es/user--avatar/20';
import ViewOff16 from '@carbon/icons/es/view--off/16';
import ViewOff20 from '@carbon/icons/es/view--off/20';
import View16 from '@carbon/icons/es/View/16';
import View20 from '@carbon/icons/es/View/20';
import WarningAltFilled32 from '@carbon/icons/es/warning--alt--filled/32';
import WarningOther20 from '@carbon/icons/es/warning--other/20';

import {
  BreadcrumbModule,
  ButtonModule,
  CheckboxModule,
  ComboBoxModule,
  DatePickerModule,
  DialogModule,
  DropdownModule,
  FileUploaderModule,
  GridModule,
  IconModule,
  IconService,
  InputModule,
  ListModule,
  LoadingModule,
  ModalModule,
  NotificationModule,
  PaginationModule,
  PlaceholderModule,
  TableModule,
  TilesModule,
  UIShellModule,
} from 'carbon-components-angular';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListNotificationComponent } from './dashboard/list-notification/list-notification.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { PrRequestListComponent } from './property-rental/pr-request-list/pr-request-list.component';
import { PrRentalRequestFormComponent } from './property-rental/pr-rental-request-form/pr-rental-request-form.component';
import { PrTerminationListComponent } from './property-rental/pr-termination-list/pr-termination-list.component';
import { PrPropertyListComponent } from './property-rental/pr-property-list/pr-property-list.component';
import { PrRentalTerminationFormComponent } from './property-rental/pr-rental-termination-form/pr-rental-termination-form.component';
import { PrRequestViewComponent } from './property-rental/pr-request-view/pr-request-view.component';
import { PrTerminationFormViewComponent } from './property-rental/pr-termination-form-view/pr-termination-form-view.component';

//import { IcwRsFormComponent } from './src/app/operation-system/icw-rs-form/icw-rs-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    ListNotificationComponent,
    LoginComponent,
    NavigationComponent,
    ComingSoonComponent,

    //IcwRsFormComponent,
  ],
  imports: [
    BrowserModule,
    UIShellModule,
    IconModule,
    AppRoutingModule,
    GridModule,
    BreadcrumbModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    PlaceholderModule,
    CheckboxModule,
    SettingsModule,
    DialogModule,
    NotificationModule,
    InputModule,
    FileUploaderModule,
    PaginationModule,
    TableModule,
    ListModule,
    TilesModule,
    ListModule,
    NgxWebstorageModule.forRoot(),
    DropdownModule,
    LoadingModule,
    HttpClientModule,
    DatePickerModule,
    ComboBoxModule,
  ],
  providers: [
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(protected iconService: IconService) {
    iconService.registerAll([
      Notification20,
      UserAvatar20,
      UserAvatarFilledAlt20,
      AppSwitcher16,
      Template20,
      WarningOther20,
      HourGlass20,
      Link20,
      filter20,
      AddAlt20,
      FilterReset20,
      TrashCan20,
      TrashCan16,
      filter16,
      informationSquare20,
      logout20,
      ArrowRight16,
      ChevronDown16,
      ChevronUp16,
      ChevronLeft16,
      ChevronRight16,
      ChevronLeft20,
      ChevronRight20,
      Subtract20,
      Add20,
      Upload20,
      Settings16,
      Edit16,
      Edit20,
      Search20,
      Search16,
      CheckmarkFilled20,
      CloseFilled20,
      CheckmarkOutline20,
      View16,
      ViewOff16,
      View20,
      ViewOff20,
      Printer20,
      Download20,
      Arrows20,
      Arrows16,
      ArrowUp20,
      ArrowUp16,
      ArrowDown20,
      ArrowDown16,
      documentExport20,
      CheckboxFilled20,
      Renew20,
      Upload16,
      WarningAltFilled32,
    ]);
  }
}
