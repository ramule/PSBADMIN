import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { TransactionsLogsComponent } from './transactions-logs.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsLogsComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TransactionsLogsRoutingModule { }
