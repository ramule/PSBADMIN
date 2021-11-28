import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImpsReportCategoryComponent } from './imps-report-category.component';

const routes: Routes = [
  {
    path: '',
    component: ImpsReportCategoryComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsReportCategoryRoutingModule { }
