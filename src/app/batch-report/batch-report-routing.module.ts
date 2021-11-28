import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BatchReportComponent } from './batch-report.component';

const routes: Routes = [
  {
    path: '',
    component: BatchReportComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchReportRoutingModule { }
