import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsTableComponent } from './transactions-table.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsTableComponent
  }
];




@NgModule({
  declarations: [],
  imports: [
    //CommonModule
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TransactionsTableRoutingModule { }
