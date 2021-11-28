import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ImpsTransFeeStructureAddComponent } from './imps-trans-fee-structure-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsTransFeeStructureAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTransFeeStructureAddRoutingModule { }
