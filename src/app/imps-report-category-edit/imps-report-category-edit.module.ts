import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsReportCategoryEditComponent } from './imps-report-category-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsReportCategoryEditRoutingModule } from './imps-report-category-edit-routing.module';

@NgModule({
  declarations: [ImpsReportCategoryEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsReportCategoryEditRoutingModule
  ]
})
export class ImpsReportCategoryEditModule { }
