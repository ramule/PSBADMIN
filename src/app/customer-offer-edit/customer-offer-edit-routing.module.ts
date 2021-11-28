import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOfferEditComponent } from './customer-offer-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerOfferEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerOfferEditRoutingModule { }
