import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationDetailsRoutingModule } from './registration-details-routing.module';
import { RegistrationDetailsComponent } from './registration-details.component';



@NgModule({
  declarations: [RegistrationDetailsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationDetailsRoutingModule
  ]
})
export class RegistrationDetailsModule { }
