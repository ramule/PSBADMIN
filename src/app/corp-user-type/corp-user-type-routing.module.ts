import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorpUserTypeComponent } from './corp-user-type.component';

const routes: Routes = [
  {
    path: '',
    component: CorpUserTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpUserTypeRoutingModule { }
