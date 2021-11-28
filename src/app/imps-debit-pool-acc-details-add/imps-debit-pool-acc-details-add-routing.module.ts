import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsDebitPoolAccDetailsAddComponent } from './imps-debit-pool-acc-details-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsDebitPoolAccDetailsAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsDebitPoolAccDetailsAddRoutingModule { }
