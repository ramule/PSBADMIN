import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCategoryComponent } from './insurance-category.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceCategoryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCategoryRoutingModule { }
