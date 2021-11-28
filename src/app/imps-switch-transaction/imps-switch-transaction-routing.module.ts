import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsSwitchTransactionComponent } from './imps-switch-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsSwitchTransactionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSwitchTransactionRoutingModule { }
