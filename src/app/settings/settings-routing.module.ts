import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddUserComponent } from './user-registration/add-user/add-user.component';
import { AssignAgentComponent } from './user-registration/assign-agent/assign-agent.component';
import { EditUserComponent } from './user-registration/edit-user/edit-user.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  {
    path: 'settings/user-registration',
    component: UserRegistrationComponent,
  },
  {
    path: 'settings/user-registration/add-user',
    component: AddUserComponent,
  },
  {
    path: 'settings/user-registration/assign-agent',
    component: AssignAgentComponent,
  },
  {
    path: 'settings/user-registration/edit-user',
    component: EditUserComponent,
  },
  {
    path: 'settings/my-profile',
    component: MyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
