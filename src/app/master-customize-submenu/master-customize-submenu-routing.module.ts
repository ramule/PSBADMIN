import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCustomizeSubmenuComponent } from './master-customize-submenu.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCustomizeSubmenuComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCustomizeSubmenuRoutingModule { }
