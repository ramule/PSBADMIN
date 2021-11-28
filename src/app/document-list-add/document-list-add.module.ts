import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListAddRoutingModule } from './document-list-add-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { DocumentListAddComponent } from './document-list-add.component';



@NgModule({
  declarations: [DocumentListAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentListAddRoutingModule
  ]
})
export class DocumentListAddModule { }
