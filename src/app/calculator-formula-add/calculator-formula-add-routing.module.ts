import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorFormulaAddComponent } from './calculator-formula-add.component';

const routes: Routes = [
  {
    path: '',
    component: CalculatorFormulaAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorFormulaAddRoutingModule { }
