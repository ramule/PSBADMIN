import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateCompanyMenuAddComponent } from './corporate-company-menu-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCompanyMenuAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCompanyMenuAddRoutingModule { }
