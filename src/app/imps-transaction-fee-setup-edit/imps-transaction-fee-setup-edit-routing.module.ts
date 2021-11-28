import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsTransactionFeeSetupEditComponent } from './imps-transaction-fee-setup-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsTransactionFeeSetupEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTransactionFeeSetupEditRoutingModule { }
