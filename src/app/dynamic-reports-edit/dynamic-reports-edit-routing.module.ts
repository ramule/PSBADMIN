import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicReportsEditComponent } from './dynamic-reports-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicReportsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicReportsEditRoutingModule { }
