import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsReportCategoryRoutingModule } from './imps-report-category-routing.module';
import { ImpsReportCategoryComponent } from './imps-report-category.component';

@NgModule({
  declarations: [ImpsReportCategoryComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsReportCategoryRoutingModule
  ]
})
export class ImpsReportCategoryModule { }
