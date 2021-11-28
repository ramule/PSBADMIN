import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpCompanyReqMenuMappingRoutingModule } from './corp-company-req-menu-mapping-routing.module';
import { CorpCompanyReqMenuMappingComponent } from './corp-company-req-menu-mapping.component';

@NgModule({
  declarations: [CorpCompanyReqMenuMappingComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorpCompanyReqMenuMappingRoutingModule
  ]
})
export class CorpCompanyReqMenuMappingModule { }
