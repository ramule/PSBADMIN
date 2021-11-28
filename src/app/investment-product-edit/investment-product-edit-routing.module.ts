import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentProductEditComponent } from './investment-product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InvestmentProductEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentProductEditRoutingModule { }
