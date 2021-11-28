import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerOfferAddComponent } from './customer-offer-add.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerOfferAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerOfferAddRoutingModule { }
