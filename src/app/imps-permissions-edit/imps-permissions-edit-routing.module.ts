import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsPermissionsEditComponent } from './imps-permissions-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsPermissionsEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsPermissionsEditRoutingModule { }
