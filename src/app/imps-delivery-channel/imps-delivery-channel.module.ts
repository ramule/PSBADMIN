import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsDeliveryChannelRoutingModule } from './imps-delivery-channel-routing.module';
import { ImpsDeliveryChannelComponent } from './imps-delivery-channel.component';

@NgModule({
  declarations: [ImpsDeliveryChannelComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsDeliveryChannelRoutingModule
  ]
})
export class ImpsDeliveryChannelModule { }
