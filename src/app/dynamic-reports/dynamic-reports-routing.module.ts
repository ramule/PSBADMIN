import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicReportsComponent } from './dynamic-reports.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicReportsRoutingModule { }
