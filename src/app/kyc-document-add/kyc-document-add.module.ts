import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KycDocumentAddComponent } from './kyc-document-add.component';
import { KycDocumentAddRoutingModule } from './kyc-document-add-routing.module';


@NgModule({
  declarations: [KycDocumentAddComponent],
  imports: [
    CommonModule,
    KycDocumentAddRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class KycDocumentAddModule { }
