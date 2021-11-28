import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateUserEditComponent } from './corporate-user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateUserEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateUserEditRoutingModule { }
