import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeApplyEditComponent } from './theme-apply-edit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ThemeApplyEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeApplyEditRoutingModule { }
