import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAdministrationAddRoleComponent } from './admin-administration-add-role.component';


const routes: Routes = [
  {
    path: '',
    component: AdminAdministrationAddRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAdministrationAddRoleRoutingModule { }
