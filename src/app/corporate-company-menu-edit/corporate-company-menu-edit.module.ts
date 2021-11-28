import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyMenuEditComponent } from './corporate-company-menu-edit.component';
import { CorporateCompanyMenuEditRoutingModule } from './corporate-company-menu-edit-routing.module';

@NgModule({
  declarations: [CorporateCompanyMenuEditComponent],
  imports: [
    CommonModule,
    CorporateCompanyMenuEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateCompanyMenuEditModule { }
