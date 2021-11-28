import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceCategoryEditComponent } from './insurance-category-edit.component';
import { InsuranceCategoryEditRoutingModule } from './insurance-category-edit-routing.module';

@NgModule({
  declarations: [InsuranceCategoryEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceCategoryEditRoutingModule
  ]
})
export class InsuranceCategoryEditModule { }
