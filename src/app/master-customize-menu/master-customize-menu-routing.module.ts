import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterCustomizeMenuComponent } from './master-customize-menu.component';

const routes: Routes = [
  {
    path: '',
    component: MasterCustomizeMenuComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCustomizeMenuRoutingModule { }
