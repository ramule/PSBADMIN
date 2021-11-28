import { NgModule } from '@angular/core';
import { ThemeApplyComponent } from './theme-apply.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ThemeApplyComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeApplyRoutingModule { }
