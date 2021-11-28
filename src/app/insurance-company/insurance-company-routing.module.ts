import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCompanyComponent } from './insurance-company.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceCompanyComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCompanyRoutingModule { }
