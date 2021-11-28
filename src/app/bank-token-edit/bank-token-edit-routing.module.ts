import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankTokenEditComponent } from './bank-token-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BankTokenEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankTokenEditRoutingModule { }
