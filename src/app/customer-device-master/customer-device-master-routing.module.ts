import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDeviceMasterComponent } from './customer-device-master.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDeviceMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDeviceMasterRoutingModule { }
