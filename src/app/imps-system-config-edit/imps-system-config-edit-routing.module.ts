import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ImpsSystemConfigEditComponent } from './imps-system-config-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsSystemConfigEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSystemConfigEditRoutingModule { }
