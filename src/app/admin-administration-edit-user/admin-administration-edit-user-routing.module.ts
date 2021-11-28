import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAdministrationEditUserComponent } from './admin-administration-edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAdministrationEditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAdministrationEditUserRoutingModule { }
