import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaskingRulesComponent } from './masking-rules.component';

const routes: Routes = [
  {
    path: '',
    component: MaskingRulesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaskingRulesRoutingModule { }
