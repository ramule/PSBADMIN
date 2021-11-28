import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeDetailsRoutingModule } from './theme-details-routing.module';
import { ThemeDetailsComponent } from './theme-details.component';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [ThemeDetailsComponent],
  imports: [
    CommonModule,
    ThemeDetailsRoutingModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class ThemeDetailsModule { }
