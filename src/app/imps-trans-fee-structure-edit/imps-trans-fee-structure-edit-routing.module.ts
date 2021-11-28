import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsTransFeeStructureEditComponent } from './imps-trans-fee-structure-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsTransFeeStructureEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTransFeeStructureEditRoutingModule { }
