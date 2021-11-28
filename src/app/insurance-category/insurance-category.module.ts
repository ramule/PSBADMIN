import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { InsuranceCategoryComponent } from './insurance-category.component';
import { InsuranceCategoryRoutingModule } from './insurance-category-routing.module';

@NgModule({
  declarations: [InsuranceCategoryComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceCategoryRoutingModule
  ]
})
export class InsuranceCategoryModule { }
