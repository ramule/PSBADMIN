import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpiTransactionsComponent } from './upi-transactions.component';


const routes: Routes = [
  {
    path: '',
    component: UpiTransactionsComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiTransactionsRoutingModule { }
