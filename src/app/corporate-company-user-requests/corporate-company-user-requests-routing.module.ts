import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateCompanyUserRequestsComponent } from './corporate-company-user-requests.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCompanyUserRequestsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCompanyUserRequestsRoutingModule { }
