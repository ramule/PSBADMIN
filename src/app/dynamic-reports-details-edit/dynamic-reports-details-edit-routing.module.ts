import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicReportsDetailsEditComponent } from './dynamic-reports-details-edit.component';


const routes: Routes = [
  {
    path: '',
    component: DynamicReportsDetailsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicReportsDetailsEditRoutingModule { }
