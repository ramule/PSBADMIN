import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicReportsDetailsAddComponent } from './dynamic-reports-details-add.component';


const routes: Routes = [
  {
    path: '',
    component: DynamicReportsDetailsAddComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicReportsDetailsAddRoutingModule { }
