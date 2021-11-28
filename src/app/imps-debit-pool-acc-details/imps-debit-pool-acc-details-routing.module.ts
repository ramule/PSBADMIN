import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsDebitPoolAccDetailsComponent } from './imps-debit-pool-acc-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsDebitPoolAccDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsDebitPoolAccDetailsRoutingModule { }
