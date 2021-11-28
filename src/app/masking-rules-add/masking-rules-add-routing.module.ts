import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaskingRulesAddComponent } from './masking-rules-add.component';

const routes: Routes = [
  {
    path: '',
    component: MaskingRulesAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaskingRulesAddRoutingModule { }
