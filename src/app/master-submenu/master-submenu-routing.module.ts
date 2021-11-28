import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSubMenuComponent } from './master-submenu.component';

const routes: Routes = [
  {
    path: '',
    component: MasterSubMenuComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSubMenuRoutingModule { }
