import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterFacilityComponent } from './master-facility.component';
import { MasterFacilityRoutingModule } from './master-facility-routing.module';



@NgModule({
  declarations: [MasterFacilityComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterFacilityRoutingModule
  ]
})
export class MasterFacilityModule { }
