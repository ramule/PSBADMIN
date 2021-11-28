import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterLocationRoutingModule } from './master-location-routing.module';
import { MasterLocationComponent } from './master-location.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [MasterLocationComponent],
  imports: [
    CommonModule,
    MasterLocationRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModuleModule
  ]
})
export class MasterLocationModule { }
