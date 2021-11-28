import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskingRulesEditRoutingModule } from './masking-rules-edit-routing.module';
import { MaskingRulesEditComponent } from './masking-rules-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MaskingRulesEditComponent],
  imports: [
    CommonModule,
    MaskingRulesEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class MaskingRulesEditModule { }
