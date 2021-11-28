import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KycDocumentListComponent } from './kyc-document-list.component';
import { KycDocumentListRoutingModule } from './kyc-document-list-routing.module';


@NgModule({
  declarations: [KycDocumentListComponent],
  imports: [
    CommonModule,
    KycDocumentListRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class KycDocumentListModule { }
