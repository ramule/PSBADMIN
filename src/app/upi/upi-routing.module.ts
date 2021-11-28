import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpiComponent } from './upi.component';

const routes: Routes = [
  {
    path: '',
    component: UpiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpiRoutingModule { }
