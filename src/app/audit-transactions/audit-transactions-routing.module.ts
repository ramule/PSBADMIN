import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditTransactionsComponent } from './audit-transactions.component';


const routes: Routes = [
  {
    path: '',
    component: AuditTransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditTransactionsRoutingModule { }
