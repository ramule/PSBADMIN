import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsBusinessCorrEditComponent } from './imps-business-corr-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsBusinessCorrEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsBusinessCorrEditRoutingModule { }
