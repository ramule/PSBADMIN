import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { AdminOmniChannelRequestEditRoutingModule } from './admin-omni-channel-request-edit-routing.module';
import { AdminOmniChannelRequestEditComponent } from './admin-omni-channel-request-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminOmniChannelRequestEditComponent],
  imports: [
    CommonModule,
    AdminOmniChannelRequestEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ],providers:[TitleCasePipe]
})
export class AdminOmniChannelRequestEditModule { }
