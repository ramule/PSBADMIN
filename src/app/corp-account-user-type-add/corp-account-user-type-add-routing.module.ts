import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CorpAccountUserTypeAddComponent } from 'src/app/corp-account-user-type-add/corp-account-user-type-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorpAccountUserTypeAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorpAccountUserTypeAddRoutingModule { }
