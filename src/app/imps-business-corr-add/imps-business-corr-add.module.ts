import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsBusinessCorrAddComponent } from './imps-business-corr-add.component';
import { ImpsBusinessCorrAddRoutingModule } from './imps-business-corr-add-routing.module';

@NgModule({
  declarations: [ImpsBusinessCorrAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsBusinessCorrAddRoutingModule
  ],
  
})
export class ImpsBusinessCorrAddModule { }
