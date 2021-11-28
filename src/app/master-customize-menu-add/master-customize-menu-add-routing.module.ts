import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCustomizeMenuAddComponent } from './master-customize-menu-add.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCustomizeMenuAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCustomizeMenuAddRoutingModule { }
