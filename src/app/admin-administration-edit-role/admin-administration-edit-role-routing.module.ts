import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAdministrationEditRoleComponent } from './admin-administration-edit-role.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAdministrationEditRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAdministrationEditRoleRoutingModule { }
