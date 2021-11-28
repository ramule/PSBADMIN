import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpAccountUserTypeEditComponent } from './corp-account-user-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorpAccountUserTypeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpAccountUserTypeEditRoutingModule { }
