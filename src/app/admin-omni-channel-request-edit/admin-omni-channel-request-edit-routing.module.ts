import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOmniChannelRequestEditComponent } from './admin-omni-channel-request-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminOmniChannelRequestEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOmniChannelRequestEditRoutingModule { }
