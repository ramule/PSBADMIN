import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsBusinessCorrComponent } from './imps-business-corr.component';
import { ImpsBusinessCorrRoutingModule } from './imps-business-corr-routing.module';


@NgModule({
  declarations: [ImpsBusinessCorrComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsBusinessCorrRoutingModule
  ]
})
export class ImpsBusinessCorrModule { }
