import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterProductEditComponent } from './master-product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MasterProductEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterProductEditRoutingModule { }
