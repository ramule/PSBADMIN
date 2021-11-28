import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCategoryEditComponent } from './insurance-category-edit.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceCategoryEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCategoryEditRoutingModule { }
