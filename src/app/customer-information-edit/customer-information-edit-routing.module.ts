import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerInformationEditComponent } from './customer-information-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerInformationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerInformationEditRoutingModule { }
