import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsCreditPoolAccDetailsEditComponent } from './imps-credit-pool-acc-details-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsCreditPoolAccDetailsEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsCreditPoolAccDetailsEditRoutingModule { }
