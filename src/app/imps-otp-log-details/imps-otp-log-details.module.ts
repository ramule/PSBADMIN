import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsOtpLogDetailsRoutingModule } from './imps-otp-log-details-routing.module';
import { ImpsOtpLogDetailsComponent } from './imps-otp-log-details.component';

@NgModule({
  declarations: [ImpsOtpLogDetailsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsOtpLogDetailsRoutingModule
  ]
})
export class ImpsOtpLogDetailsModule { }
