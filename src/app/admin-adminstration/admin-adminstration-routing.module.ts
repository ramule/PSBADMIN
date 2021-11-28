import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAdminstrationComponent } from './admin-adminstration.component';


const routes: Routes = [
  {
    path: '',
    component: AdminAdminstrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAdminstrationRoutingModule { }
