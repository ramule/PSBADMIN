import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsPermissionsComponent } from './imps-permissions.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsPermissionsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsPermissionsRoutingModule { }
