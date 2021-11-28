import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KycFolderAddRoutingModule } from './kyc-folder-add-routing.module';
import { KycFolderAddComponent } from './kyc-folder-add.component';

@NgModule({
  declarations: [KycFolderAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    KycFolderAddRoutingModule
  ]
})
export class KycFolderAddModule { }
