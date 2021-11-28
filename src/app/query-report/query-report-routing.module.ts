import { NgModule } from '@angular/core';
import { QueryReportComponent } from './query-report.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: QueryReportComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryReportRoutingModule { }
