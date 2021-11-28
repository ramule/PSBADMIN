import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateSetLimitComponent } from './corporate-set-limit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CorporateSetLimitComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateSetLimitRoutingModule { }
