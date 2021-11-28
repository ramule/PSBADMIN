import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorpMenuRightsRoutingModule } from './corp-menu-rights-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpMenuRightsComponent } from './corp-menu-rights.component';

@NgModule({
  declarations: [CorpMenuRightsComponent],
  imports: [
    CommonModule,
    CorpMenuRightsRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorpMenuRightsModule { }
