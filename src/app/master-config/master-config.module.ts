import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterConfigRoutingModule } from './master-config-routing.module';
import { MasterConfigComponent } from './master-config.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [MasterConfigComponent],
  imports: [
    CommonModule,
    MasterConfigRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
    NgxPaginationModule
  ],
  providers: []
})
export class MasterConfigModule { }
