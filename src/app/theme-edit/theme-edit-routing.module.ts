import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeEditComponent } from './theme-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeEditRoutingModule { }
