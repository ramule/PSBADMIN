import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpiVolumeDetailsComponent } from './upi-volume-details.component';
import { UpiVolumeDetailsRoutingModule } from './upi-volume-details-routing.module';




@NgModule({
  declarations: [UpiVolumeDetailsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    UpiVolumeDetailsRoutingModule
  ]
})
export class UpiVolumeDetailsModule { }
