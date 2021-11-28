import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CorporateAuditTransactionComponent } from './corporate-audit-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateAuditTransactionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateAuditTransactionRoutingModule { }
