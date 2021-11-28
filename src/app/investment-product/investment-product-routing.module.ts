import { NgModule } from '@angular/core';
import { InvestmentProductComponent } from './investment-product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InvestmentProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentProductRoutingModule { }
