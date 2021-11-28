import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationDetailsTableComponent } from './registration-details-table.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationDetailsTableComponent
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
export class RegistrationDetailsTableRoutingModule { }
