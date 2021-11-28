import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterBranchRegistrationEditComponent } from './register-branch-registration-edit.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterBranchRegistrationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterBranchRegistrationEditRoutingModule { }
