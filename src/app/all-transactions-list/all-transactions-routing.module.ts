import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTranscationListComponent } from './all-transactions.component';


const routes: Routes = [
  {
    path: '',
    component: AllTranscationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllTransactionsRoutingModule { }
