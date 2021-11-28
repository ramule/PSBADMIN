import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAdministrationAddUserComponent } from './admin-administration-add-user.component';


const routes: Routes = [
  {
    path: '',
    component: AdminAdministrationAddUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAdministrationAddUserRoutingModule { }
