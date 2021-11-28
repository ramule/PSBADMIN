import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsDeliveryChannelAddComponent } from './imps-delivery-channel-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsDeliveryChannelAddRoutingModule } from './imps-delivery-channel-add-routing.module';

@NgModule({
  declarations: [ImpsDeliveryChannelAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsDeliveryChannelAddRoutingModule
  ]
})
export class ImpsDeliveryChannelAddModule { }
