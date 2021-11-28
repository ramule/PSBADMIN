import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsSearchTransactionComponent } from './imps-search-transaction.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsSearchTransactionComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsSearchTransactionRoutingModule { }
