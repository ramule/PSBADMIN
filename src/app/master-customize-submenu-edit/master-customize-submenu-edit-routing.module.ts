import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCustomizeSubmenuEditComponent } from './master-customize-submenu-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCustomizeSubmenuEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCustomizeSubmenuEditRoutingModule { }
