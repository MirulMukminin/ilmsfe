import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { BreadcrumbModule, ButtonModule, CheckboxModule, ContentSwitcherModule, DialogModule, GridModule, IconModule, InputModule, PaginationModule, PlaceholderModule, TableModule, DropdownModule, RadioModule, ComboBoxModule } from 'carbon-components-angular';
import { ChangePasswordComponent } from './my-profile/change-password/change-password.component';
import { AddUserComponent } from './user-registration/add-user/add-user.component';
import { EditUserComponent } from './user-registration/edit-user/edit-user.component';
import { AssignAgentComponent } from './user-registration/assign-agent/assign-agent.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyProfileComponent,
    UserRegistrationComponent,
    ChangePasswordComponent,
    AddUserComponent,
    EditUserComponent,
    AssignAgentComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    BreadcrumbModule,
    GridModule,
    ContentSwitcherModule,
    TableModule,
    InputModule,
    ButtonModule,
    IconModule,
    PlaceholderModule,
    DialogModule,
    CheckboxModule,
    PaginationModule,
    DropdownModule,
    RadioModule,
    FormsModule,
    ComboBoxModule
  ]
})
export class SettingsModule { }
