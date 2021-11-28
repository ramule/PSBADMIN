import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateSetLimitRoutingModule } from './corporate-set-limit-routing.module';
import { CorporateSetLimitComponent } from './corporate-set-limit.component';

@NgModule({
  declarations: [CorporateSetLimitComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateSetLimitRoutingModule
  ]
})
export class CorporateSetLimitModule { }
