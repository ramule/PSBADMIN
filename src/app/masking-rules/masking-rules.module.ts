import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskingRulesRoutingModule } from './masking-rules-routing.module';
import { MaskingRulesComponent } from './masking-rules.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [MaskingRulesComponent],
  imports: [
    CommonModule,
    MaskingRulesRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
  ]
})
export class MaskingRulesModule { }
