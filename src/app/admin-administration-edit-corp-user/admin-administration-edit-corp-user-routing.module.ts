import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAdministrationEditCorpUserComponent } from './admin-administration-edit-corp-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAdministrationEditCorpUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAdministrationEditCorpUserRoutingModule { }
