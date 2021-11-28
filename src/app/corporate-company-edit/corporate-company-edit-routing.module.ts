import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateCompanyEditComponent } from './corporate-company-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCompanyEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCompanyEditRoutingModule { }
