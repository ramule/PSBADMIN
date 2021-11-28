import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateCompanyRoutingModule } from './corporate-company-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyComponent } from './corporate-company.component';

@NgModule({
  declarations: [CorporateCompanyComponent],
  imports: [
    CommonModule,
    CorporateCompanyRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateCompanyModule { }
