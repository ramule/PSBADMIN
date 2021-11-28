import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleTypeAddComponent } from './role-type-add.component';

const routes: Routes = [
  {
    path: '',
    component: RoleTypeAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleTypeAddRoutingModule { }
