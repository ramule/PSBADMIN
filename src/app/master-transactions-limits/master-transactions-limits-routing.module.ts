import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterTransactionsLimitsComponent } from 'src/app/master-transactions-limits/master-transactions-limits.component';

const routes: Routes = [
  {
    path: '',
    component: MasterTransactionsLimitsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class MasterTransactionsLimitsRoutingModule { }
