import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavmenuComponent } from './navmenu.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NavmenuComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavmenuRoutingModule { }
