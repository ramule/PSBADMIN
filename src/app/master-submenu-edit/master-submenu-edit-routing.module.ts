import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSubMenuEditComponent } from './master-submenu-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterSubMenuEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSubMenuEditRoutingModule { }
