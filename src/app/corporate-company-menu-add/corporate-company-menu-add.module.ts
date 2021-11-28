import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyMenuAddComponent } from './corporate-company-menu-add.component';
import { CorporateCompanyMenuAddRoutingModule } from './corporate-company-menu-add-routing.module';

@NgModule({
  declarations: [CorporateCompanyMenuAddComponent],
  imports: [
    CommonModule,
    CorporateCompanyMenuAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateCompanyMenuAddModule { }
