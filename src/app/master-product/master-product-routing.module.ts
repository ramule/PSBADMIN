import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterProductComponent } from './master-product.component';

const routes: Routes = [
  {
    path: '',
    component: MasterProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterProductRoutingModule { }
