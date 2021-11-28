import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsDebitPoolAccDetailsEditComponent } from './imps-debit-pool-acc-details-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsDebitPoolAccDetailsEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsDebitPoolAccDetailsEditRoutingModule { }
