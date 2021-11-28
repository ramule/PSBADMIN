import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { DocumentTypeEditRoutingModule } from './document-type-edit-routing.module';
import { DocumentTypeEditComponent } from './document-type-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [DocumentTypeEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentTypeEditRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class DocumentTypeEditModule { }
