import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeDetailsComponent } from './theme-details.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeDetailsRoutingModule { }
