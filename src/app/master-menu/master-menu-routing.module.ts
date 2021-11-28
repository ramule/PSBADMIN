import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterMenuComponent } from './master-menu.component';

const routes: Routes = [
  {
    path: '',
    component: MasterMenuComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterMenuRoutingModule { }
