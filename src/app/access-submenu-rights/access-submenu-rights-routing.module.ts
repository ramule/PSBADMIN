import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessSubmenuRightsComponent } from './access-submenu-rights.component';


const routes: Routes = [
  {
    path: '',
    component: AccessSubmenuRightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessSubmenuRightsRoutingModule { }
