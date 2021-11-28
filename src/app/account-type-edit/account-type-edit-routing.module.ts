import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountTypeEditComponent } from './account-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AccountTypeEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTypeEditRoutingModule { }
