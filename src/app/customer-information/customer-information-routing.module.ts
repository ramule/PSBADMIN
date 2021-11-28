import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInformationComponent } from 'src/app/customer-information/customer-information.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CustomerInformationComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CustomerInformationRoutingModule { }
