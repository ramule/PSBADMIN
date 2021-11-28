import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBranchRegistrationRoutingModule } from './register-branch-registration-routing.module';
import { RegisterBranchRegistrationComponent } from './register-branch-registration.component';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [RegisterBranchRegistrationComponent],
  imports: [
    CommonModule,
    RegisterBranchRegistrationRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class RegisterBranchRegistrationModule { }
