import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpUserTypeAddComponent } from './corp-user-type-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorpUserTypeAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpUserTypeRoutingModule { }
