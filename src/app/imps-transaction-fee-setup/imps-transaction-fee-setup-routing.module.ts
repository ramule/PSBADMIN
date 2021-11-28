import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsTransactionFeeSetupComponent } from './imps-transaction-fee-setup.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsTransactionFeeSetupComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTransactionFeeSetupRoutingModule { }
