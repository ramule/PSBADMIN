import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleTypeComponent } from './role-type.component';

const routes: Routes = [
  {
    path: '',
    component: RoleTypeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleTypeRoutingModule { }
