import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOmniChannelRequestRoutingModule } from './admin-omni-channel-request-routing.module';
import { AdminOmniChannelRequestComponent } from './admin-omni-channel-request.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AdminOmniChannelRequestComponent],
  imports: [
    CommonModule,
    AdminOmniChannelRequestRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminOmniChannelRequestModule { }
