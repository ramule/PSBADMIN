import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActivityResponseTimeComponent } from './activity-response-time.component';



const routes: Routes = [
  {
    path: '',
    component: ActivityResponseTimeComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityResponseTimeRoutingModule { }
