import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLimitsComponent } from './master-limits.component';
import { MasterLimitsRoutingModule } from './master-limits-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [MasterLimitsComponent],
  imports: [
    CommonModule,
    MasterLimitsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModuleModule
  ]
})
export class MasterLimitsModule { }
