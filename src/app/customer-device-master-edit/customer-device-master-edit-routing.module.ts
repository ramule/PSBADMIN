import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDeviceMasterEditComponent } from './customer-device-master-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDeviceMasterEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDeviceMasterEditRoutingModule { }
