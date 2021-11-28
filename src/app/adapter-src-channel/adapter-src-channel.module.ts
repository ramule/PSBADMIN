import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdapterSrcChannelComponent } from 'src/app/adapter-src-channel/adapter-src-channel.component';
import { AdapterSrcChannelRoutingModule } from 'src/app/adapter-src-channel/adapter-src-channel-routing.module';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdapterSrcChannelComponent
  ],
  imports: [
    CommonModule,
    AdapterSrcChannelRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdapterSrcChannelModule { }
