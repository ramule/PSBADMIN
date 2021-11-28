import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsTransFeeStructureComponent } from './imps-trans-fee-structure.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsTransFeeStructureComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsTransFeeStructureRoutingModule { }
