import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLeadsComponent } from './account-leads.component';


const routes: Routes = [
  {
    path: '',
    component: AccountLeadsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountLeadsRoutingModule { }
