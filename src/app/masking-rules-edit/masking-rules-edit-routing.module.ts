import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaskingRulesEditComponent } from './masking-rules-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MaskingRulesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaskingRulesEditRoutingModule { }
