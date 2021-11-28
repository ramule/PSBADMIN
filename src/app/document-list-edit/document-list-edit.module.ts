import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentListEditComponent } from './document-list-edit.component';
import { DocumentListEditRoutingModule } from './document-list-edit-routing.module';



@NgModule({
  declarations: [DocumentListEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentListEditRoutingModule
  ]
})
export class DocumentListEditModule { }
