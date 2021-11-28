import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateSetLimitCheckerViewRoutingModule } from './corporate-set-limit-checker-view-routing.module';
import { CorporateSetLimitCheckerViewComponent } from './corporate-set-limit-checker-view.component';

@NgModule({
  declarations: [CorporateSetLimitCheckerViewComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateSetLimitCheckerViewRoutingModule
  ]
})
export class CorporateSetLimitCheckerViewModule { }
