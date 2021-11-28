import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListRoutingModule } from './document-list-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { DocumentListComponent } from './document-list.component';



@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    DocumentListRoutingModule
  ]
})
export class DocumentListModule { }
