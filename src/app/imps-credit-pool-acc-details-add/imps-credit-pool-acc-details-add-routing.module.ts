import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsCreditPoolAccDetailsAddComponent } from './imps-credit-pool-acc-details-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsCreditPoolAccDetailsAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsCreditPoolAccDetailsAddRoutingModule { }
