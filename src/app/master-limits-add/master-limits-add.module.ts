import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLimitsAddComponent } from './master-limits-add.component';
import { MasterLimitsAddRoutingModule } from './master-limits-add-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [MasterLimitsAddComponent],
  imports: [
    CommonModule,
    MasterLimitsAddRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModuleModule
  ]
})
export class MasterLimitsAddModule { }
