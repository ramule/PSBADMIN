import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCustomizeMenuEditComponent } from './master-customize-menu-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCustomizeMenuEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCustomizeMenuEditRoutingModule { }
