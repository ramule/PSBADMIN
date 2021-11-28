import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessCustomizeMenuAddComponent } from './access-customize-menu-add.component';

const routes: Routes = [
  {
    path: '',
    component: AccessCustomizeMenuAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessCustomizeMenuAddRoutingModule { }
