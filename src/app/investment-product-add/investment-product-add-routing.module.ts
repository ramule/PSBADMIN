import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentProductAddComponent } from './investment-product-add.component';

const routes: Routes = [
  {
    path: '',
    component: InvestmentProductAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentProductAddRoutingModule { }
