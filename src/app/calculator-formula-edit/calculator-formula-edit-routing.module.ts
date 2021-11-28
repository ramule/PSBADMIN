import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorFormulaEditComponent } from './calculator-formula-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CalculatorFormulaEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorFormulaEditRoutingModule { }
