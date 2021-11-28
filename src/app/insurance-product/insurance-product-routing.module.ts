import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceProductComponent } from './insurance-product.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceProductRoutingModule { }
