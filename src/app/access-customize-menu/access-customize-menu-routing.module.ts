import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessCustomizeMenuComponent } from './access-customize-menu.component';

const routes: Routes = [
  {
    path: '',
    component: AccessCustomizeMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessCustomizeMenuRoutingModule { }
