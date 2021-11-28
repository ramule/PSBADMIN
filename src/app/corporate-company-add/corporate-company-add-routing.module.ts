import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateCompanyAddComponent } from './corporate-company-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateCompanyAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateCompanyAddRoutingModule { }
