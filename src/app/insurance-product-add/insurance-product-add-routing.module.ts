import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceProductAddComponent } from './insurance-product-add.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceProductAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceProductAddRoutingModule { }
