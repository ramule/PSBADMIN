import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCountryAddRoutingModule } from './master-country-add-routing.module';
import { MasterCountryAddComponent } from './master-country-add.component';

@NgModule({
  declarations: [MasterCountryAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCountryAddRoutingModule
  ]
})
export class MasterCountryAddModule { }
