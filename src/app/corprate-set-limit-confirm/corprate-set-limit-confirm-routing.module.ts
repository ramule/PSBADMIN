import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorprateSetLimitConfirmComponent } from './corprate-set-limit-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: CorprateSetLimitConfirmComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorprateSetLimitConfirmRoutingModule { }
