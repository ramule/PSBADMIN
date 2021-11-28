import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLimitsEditComponent } from './master-limits-edit.component';
import { MasterLimitsEditRoutingModule } from './master-limits-edit-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [MasterLimitsEditComponent],
  imports: [
    CommonModule,
    MasterLimitsEditRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModuleModule
  ]
})
export class MasterLimitsEditModule { }
