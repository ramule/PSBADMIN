import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdapterSrcChannelEditRoutingModule } from 'src/app/adapter-src-channel-edit/adapter-src-channel-edit-routing.module';
import { AdapterSrcChannelEditComponent } from 'src/app/adapter-src-channel-edit/adapter-src-channel-edit.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [AdapterSrcChannelEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule,
    ReactiveFormsModule,
    AdapterSrcChannelEditRoutingModule
  ]
})
export class AdapterSrcChannelEditModule { }
