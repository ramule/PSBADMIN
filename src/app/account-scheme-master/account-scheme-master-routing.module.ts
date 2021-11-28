import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSchemeMasterComponent } from './account-scheme-master.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSchemeMasterComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSchemeMasterRoutingModule { }
