import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsCreditPoolAccDetailsComponent } from './imps-credit-pool-acc-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsCreditPoolAccDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsCreditPoolAccDetailsRoutingModule { }
