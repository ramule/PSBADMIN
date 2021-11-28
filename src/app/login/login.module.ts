import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    NgxCaptchaModule
  ]
})
export class LoginModule { }
