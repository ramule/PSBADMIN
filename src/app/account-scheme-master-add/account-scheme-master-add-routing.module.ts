import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSchemeMasterAddComponent } from './account-scheme-master-add.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSchemeMasterAddComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSchemeMasterAddRoutingModule { }
