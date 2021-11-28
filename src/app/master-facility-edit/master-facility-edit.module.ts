import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterFacilityEditRoutingModule } from './master-facility-edit-routing.module';
import { MasterFacilityEditComponent } from './master-facility-edit.component';



@NgModule({
  declarations: [MasterFacilityEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterFacilityEditRoutingModule
  ]
})
export class MasterFacilityEditModule { }
