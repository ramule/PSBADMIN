import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpiVolumeComponent } from './upi-volume.component';
import { UpiVolumeRoutingModule } from './upi-volume-routing.module';



@NgModule({
  declarations: [UpiVolumeComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    UpiVolumeRoutingModule
  ]
})
export class UpiVolumeModule { }
