import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpDesignationLevelMappingAddRoutingModule } from './corp-designation-level-mapping-add-routing.module';
import { CorpDesignationLevelMappingAddComponent } from './corp-designation-level-mapping-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [CorpDesignationLevelMappingAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorpDesignationLevelMappingAddRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class CorpDesignationLevelMappingAddModule { }
