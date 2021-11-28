import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAdministrationAddCorporateUserComponent } from './admin-administration-add-corporate-user.component';


const routes: Routes = [
  {
    path: '',
    component: AdminAdministrationAddCorporateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAdministrationAddCorporateUserRoutingModule { }
