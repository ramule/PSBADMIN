import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsIfscCodesComponent } from './imps-ifsc-codes.component';
import { ImpsIfscCodesRoutingModule } from './imps-ifsc-codes-routing.module';



@NgModule({
  declarations: [ImpsIfscCodesComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsIfscCodesRoutingModule
  ]
})
export class ImpsIfscCodesModule { }
