import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentTypeAddRoutingModule } from './document-type-add-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { DocumentTypeAddComponent } from './document-type-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [DocumentTypeAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentTypeAddRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class DocumentTypeAddModule { }
