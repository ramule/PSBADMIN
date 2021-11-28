import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOmniChannelRequestComponent } from './admin-omni-channel-request.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOmniChannelRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOmniChannelRequestRoutingModule { }
