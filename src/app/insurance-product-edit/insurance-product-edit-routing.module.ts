import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceProductEditComponent } from './insurance-product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceProductEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceProductEditRoutingModule { }
