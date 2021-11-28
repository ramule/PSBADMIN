import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsRolesAddComponent } from './imps-roles-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsRolesAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsRolesAddRoutingModule { }
