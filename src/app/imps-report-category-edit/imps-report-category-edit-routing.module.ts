import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpsReportCategoryEditComponent } from './imps-report-category-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsReportCategoryEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsReportCategoryEditRoutingModule { }
