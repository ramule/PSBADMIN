import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCompanyEditComponent } from './insurance-company-edit.component';


const routes: Routes = [
  {
    path: '',
    component: InsuranceCompanyEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCompanyEditRoutingModule { }
