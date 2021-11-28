import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerBulkRegistrationComponent } from './customer-bulk-registration.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerBulkRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerBulkRegistrationRoutingModule { }
