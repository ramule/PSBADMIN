import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCityEditRoutingModule } from './master-city-edit-routing.module';
import { MasterCityEditComponent } from './master-city-edit.component';

@NgModule({
  declarations: [MasterCityEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCityEditRoutingModule
  ]
})
export class MasterCityEditModule { }
