import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterCalculatorEditComponent } from './master-calculator-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCalculatorEditComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCalculatorEditRoutingModule { }
