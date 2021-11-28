import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCompanyAddComponent } from './insurance-company-add.component';


const routes: Routes = [
  {
    path: '',
    component: InsuranceCompanyAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCompanyAddRoutingModule { }
