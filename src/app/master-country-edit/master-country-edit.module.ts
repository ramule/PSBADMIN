import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCountryEditRoutingModule } from './master-country-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MasterCountryEditComponent } from './master-country-edit.component';

@NgModule({
  declarations: [MasterCountryEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCountryEditRoutingModule
  ]
})
export class MasterCountryEditModule { }
