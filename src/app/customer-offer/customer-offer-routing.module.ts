import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOfferComponent } from './customer-offer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerOfferRoutingModule { }
