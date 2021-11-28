import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsRolesEditComponent } from './imps-roles-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsRolesEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsRolesEditRoutingModule { }
