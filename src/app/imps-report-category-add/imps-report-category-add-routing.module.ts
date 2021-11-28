import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpsReportCategoryAddComponent } from './imps-report-category-add.component';


const routes: Routes = [
  {
    path: '',
    component: ImpsReportCategoryAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpsReportCategoryAddRoutingModule { }
