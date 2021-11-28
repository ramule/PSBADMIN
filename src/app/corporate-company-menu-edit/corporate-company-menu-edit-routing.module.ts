import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateCompanyMenuEditComponent } from './corporate-company-menu-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCompanyMenuEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCompanyMenuEditRoutingModule { }
