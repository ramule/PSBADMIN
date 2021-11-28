import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsBcRetailersEditComponent } from './imps-bc-retailers-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsBcRetailersEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsBcRetailersEditRoutingModule { }
