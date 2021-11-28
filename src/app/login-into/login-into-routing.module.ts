import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginIntoComponent } from './login-into.component'


const routes: Routes = [
  {
    path: '',
    component: LoginIntoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginIntoRoutingModule { }
