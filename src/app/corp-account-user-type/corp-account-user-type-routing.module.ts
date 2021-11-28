import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CorpAccountUserTypeComponent } from 'src/app/corp-account-user-type/corp-account-user-type.component';

const routes: Routes = [
  {
    path: '',
    component: CorpAccountUserTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpAccountUserTypeRoutingModule { }
