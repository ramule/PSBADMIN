import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCityRoutingModule } from './master-city-routing.module';
import { MasterCityComponent } from './master-city.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [MasterCityComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCityRoutingModule
  ]
})
export class MasterCityModule { }
