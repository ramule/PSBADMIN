import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpDesignationLevelMappingRoutingModule } from './corp-designation-level-mapping-routing.module';
import { CorpDesignationLevelMappingComponent } from './corp-designation-level-mapping.component';

@NgModule({
  declarations: [CorpDesignationLevelMappingComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorpDesignationLevelMappingRoutingModule
  ]
})
export class CorpDesignationLevelMappingModule { }
