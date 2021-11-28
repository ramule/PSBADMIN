import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsReportCategoryAddComponent } from './imps-report-category-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsReportCategoryAddRoutingModule } from './imps-report-category-add-routing.module';

@NgModule({
  declarations: [ImpsReportCategoryAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsReportCategoryAddRoutingModule
  ]
})
export class ImpsReportCategoryAddModule { }
