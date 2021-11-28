import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateProductMasterEditComponent } from './corporate-product-master-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateProductMasterEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateProductMasterEditRoutingModule { }
