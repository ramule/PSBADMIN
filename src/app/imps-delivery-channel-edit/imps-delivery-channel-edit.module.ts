import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsDeliveryChannelEditComponent } from './imps-delivery-channel-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsDeliveryChannelEditRoutingModule } from './imps-delivery-channel-edit-routing.module';

@NgModule({
  declarations: [ImpsDeliveryChannelEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsDeliveryChannelEditRoutingModule
  ]
})
export class ImpsDeliveryChannelEditModule { }
