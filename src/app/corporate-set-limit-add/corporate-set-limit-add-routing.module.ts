import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateSetLimitAddComponent } from './corporate-set-limit-add.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CorporateSetLimitAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateSetLimitAddRoutingModule { }
