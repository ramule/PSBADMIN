import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskingRulesAddRoutingModule } from './masking-rules-add-routing.module';
import { MaskingRulesAddComponent } from './masking-rules-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MaskingRulesAddComponent],
  imports: [
    CommonModule,
    MaskingRulesAddRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
  ]
})
export class MaskingRulesAddModule { }
