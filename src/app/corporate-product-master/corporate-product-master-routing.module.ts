import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateProductMasterComponent } from './corporate-product-master.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateProductMasterComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateProductMasterRoutingModule { }
