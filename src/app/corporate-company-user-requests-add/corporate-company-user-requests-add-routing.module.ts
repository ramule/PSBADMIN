import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateCompanyUserRequestsAddComponent } from './corporate-company-user-requests-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCompanyUserRequestsAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCompanyUserRequestsAddRoutingModule { }
