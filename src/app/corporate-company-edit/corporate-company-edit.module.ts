import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateCompanyEditRoutingModule } from './corporate-company-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyEditComponent } from './corporate-company-edit.component';

@NgModule({
  declarations: [CorporateCompanyEditComponent],
  imports: [
    CommonModule,
    CorporateCompanyEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateCompanyEditModule { }
