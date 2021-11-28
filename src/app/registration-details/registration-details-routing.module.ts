import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { RegistrationDetailsComponent } from './registration-details.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationDetailsComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
   //CommonModule

    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
  
})
export class RegistrationDetailsRoutingModule { }
