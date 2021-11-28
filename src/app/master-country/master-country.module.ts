import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCountryRoutingModule } from './master-country-routing.module';
import { MasterCountryComponent } from './master-country.component';

@NgModule({
  declarations: [MasterCountryComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCountryRoutingModule
  ]
})
export class MasterCountryModule { }
