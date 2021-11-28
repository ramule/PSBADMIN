import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateCompanyMenuComponent } from './corporate-company-menu.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCompanyMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCompanyMenuRoutingModule { }
