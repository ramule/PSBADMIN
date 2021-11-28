import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCategoryAddComponent } from './insurance-category-add.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceCategoryAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCategoryAddRoutingModule { }
