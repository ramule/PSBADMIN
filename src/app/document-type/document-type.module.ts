import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentTypeRoutingModule } from './document-type-routing.module';
import { DocumentTypeComponent } from './document-type.component';

@NgModule({
  declarations: [DocumentTypeComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentTypeRoutingModule
  ]
})
export class DocumentTypeModule { }
