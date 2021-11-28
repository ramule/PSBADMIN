import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsIfscCodesAddComponent } from './imps-ifsc-codes-add.component';
import { ImpsIfscCodesAddRoutingModule } from './imps-ifsc-codes-add-routing.module';



@NgModule({
  declarations: [ImpsIfscCodesAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsIfscCodesAddRoutingModule
  ]
})
export class ImpsIfscCodesAddModule { }
