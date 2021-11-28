import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateSetLimitAddRoutingModule } from './corporate-set-limit-add-routing.module';
import { CorporateSetLimitAddComponent } from './corporate-set-limit-add.component';

@NgModule({
  declarations: [CorporateSetLimitAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateSetLimitAddRoutingModule
  ]
})
export class CorporateSetLimitAddModule { }
