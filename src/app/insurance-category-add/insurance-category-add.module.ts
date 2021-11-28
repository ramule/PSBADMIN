import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { InsuranceCategoryAddComponent } from './insurance-category-add.component';
import { InsuranceCategoryAddRoutingModule } from './insurance-category-add-routing.module';


@NgModule({
  declarations: [InsuranceCategoryAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceCategoryAddRoutingModule
  ]
})
export class InsuranceCategoryAddModule { }
