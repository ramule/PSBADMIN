import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpUserTypeEditComponent } from './corp-user-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorpUserTypeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpUserTypeEditRoutingModule { }
