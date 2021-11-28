import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsTransactionDashboardComponent } from './imps-transaction-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsTransactionDashboardComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTransactionDashboardRoutingModule { }
