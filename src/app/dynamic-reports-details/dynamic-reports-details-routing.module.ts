import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DynamicReportsDetailsComponent } from './dynamic-reports-details.component';


const routes: Routes = [
  {
    path: '',
    component: DynamicReportsDetailsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicReportsDetailsRoutingModule { }
