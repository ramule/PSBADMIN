import { ReactiveFormsModule } from '@angular/forms';
import { OtpValidationComponent } from './otp-validation.component';
import {  OtpValidationRoutingModule } from './otp-validation-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    OtpValidationRoutingModule
  ],
  declarations: [OtpValidationComponent]
})
export class OtpValidationModule { }