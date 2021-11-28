import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpDesignationLevelMappingEditRoutingModule } from './corp-designation-level-mapping-edit-routing.module';
import { CorpDesignationLevelMappingEditComponent } from './corp-designation-level-mapping-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [CorpDesignationLevelMappingEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorpDesignationLevelMappingEditRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class CorpDesignationLevelMappingEditModule { }
