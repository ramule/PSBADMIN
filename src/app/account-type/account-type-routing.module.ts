import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountTypeComponent } from './account-type.component';

const routes: Routes = [
  {
    path: '',
    component: AccountTypeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTypeRoutingModule { }
