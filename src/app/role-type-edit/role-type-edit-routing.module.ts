import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleTypeEditComponent } from './role-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: RoleTypeEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleTypeEditRoutingModule { }
