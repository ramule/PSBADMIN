import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCustomizeSubmenuAddComponent } from './master-customize-submenu-add.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCustomizeSubmenuAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCustomizeSubmenuAddRoutingModule { }
