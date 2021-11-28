import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterCalculatorComponent } from './master-calculator.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCalculatorComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCalculatorRoutingModule { }
