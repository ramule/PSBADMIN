import { NgModule } from '@angular/core';
import { TransactionReportComponent } from './transaction-report.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TransactionReportComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionReportRoutingModule { }
