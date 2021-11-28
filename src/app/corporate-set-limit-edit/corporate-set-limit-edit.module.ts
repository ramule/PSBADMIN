import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateSetLimitEditRoutingModule } from './corporate-set-limit-edit-routing.module';
import { CorporateSetLimitEditComponent } from './corporate-set-limit-edit.component';

@NgModule({
  declarations: [CorporateSetLimitEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateSetLimitEditRoutingModule
  ]
})
export class CorporateSetLimitEditModule { }
