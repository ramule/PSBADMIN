import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterMenuEditComponent } from './master-menu-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterMenuEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterMenuEditRoutingModule { }
