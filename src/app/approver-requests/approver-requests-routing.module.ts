import { NgModule } from '@angular/core';
import { ApproverRequestsComponent } from './approver-requests.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ApproverRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproverRequestsRoutingModule { }
