import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DynamicReportsGridComponent } from './dynamic-reports-grid.component';


const routes: Routes = [
  {
    path: '',
    component: DynamicReportsGridComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicReportsGridRoutingModule { }
