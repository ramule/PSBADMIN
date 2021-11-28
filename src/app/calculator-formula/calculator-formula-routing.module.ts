import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorFormulaComponent } from './calculator-formula.component';

const routes: Routes = [
  {
    path: '',
    component: CalculatorFormulaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorFormulaRoutingModule { }
