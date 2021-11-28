import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankTokenComponent } from './bank-token.component';

const routes: Routes = [
  {
    path: '',
    component: BankTokenComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankTokenRoutingModule { }
