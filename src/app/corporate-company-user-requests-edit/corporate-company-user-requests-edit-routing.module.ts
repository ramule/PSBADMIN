import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateCompanyUserRequestsEditComponent } from './corporate-company-user-requests-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCompanyUserRequestsEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCompanyUserRequestsEditRoutingModule { }
