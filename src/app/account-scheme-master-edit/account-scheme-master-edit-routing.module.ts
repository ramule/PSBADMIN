import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSchemeMasterEditComponent } from './account-scheme-master-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSchemeMasterEditComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSchemeMasterEditRoutingModule { }
