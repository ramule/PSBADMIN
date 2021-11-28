import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsCustomerDetailsComponent } from './imps-customer-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsCustomerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsCustomerDetailsRoutingModule { }
