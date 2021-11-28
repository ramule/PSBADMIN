import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateApproverRequestsComponent } from './corporate-approver-requests.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateApproverRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateApproverRequestsRoutingModule { }
