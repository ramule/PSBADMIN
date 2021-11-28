import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsUsersEditComponent } from './imps-users-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsUsersEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsUsersEditRoutingModule { }
