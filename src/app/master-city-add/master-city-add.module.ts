import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCityAddRoutingModule } from './master-city-add-routing.module';
import { MasterCityAddComponent } from './master-city-add.component';

@NgModule({
  declarations: [MasterCityAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCityAddRoutingModule
  ]
})
export class MasterCityAddModule { }
