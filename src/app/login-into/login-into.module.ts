import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginIntoRoutingModule } from './login-into-routing.module';
import { LoginIntoComponent } from './login-into.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [LoginIntoComponent],
  imports: [
    CommonModule,
    LoginIntoRoutingModule,
    SharedModuleModule
  ]
})
export class LoginIntoModule { }
