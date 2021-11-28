import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsIfscCodesEditRoutingModule } from './imps-ifsc-codes-edit-routing.module';
import { ImpsIfscCodesEditComponent } from './imps-ifsc-codes-edit.component';




@NgModule({
  declarations: [ImpsIfscCodesEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsIfscCodesEditRoutingModule
  ]
})
export class ImpsIfscCodesEditModule { }
