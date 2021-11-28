import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLocationComponent } from './master-location.component';


const routes: Routes = [
  {
    path: '',
    component: MasterLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLocationRoutingModule { }
