import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsRolesComponent } from './imps-roles.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsRolesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsRolesRoutingModule { }
