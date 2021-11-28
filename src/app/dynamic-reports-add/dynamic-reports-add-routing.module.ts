import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicReportsAddComponent } from './dynamic-reports-add.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicReportsAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicReportsAddRoutingModule { }
