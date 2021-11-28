import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule
  ]
})
export class ResetPasswordModule { }
