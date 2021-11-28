import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyMenuComponent } from './corporate-company-menu.component';
import { CorporateCompanyMenuRoutingModule } from './corporate-company-menu-routing.module';

@NgModule({
  declarations: [CorporateCompanyMenuComponent],
  imports: [
    CommonModule,
    CorporateCompanyMenuRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateCompanyMenuModule { }
