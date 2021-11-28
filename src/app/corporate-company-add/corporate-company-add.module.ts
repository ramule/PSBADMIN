import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateCompanyAddRoutingModule } from './corporate-company-add-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCompanyAddComponent } from './corporate-company-add.component';

@NgModule({
  declarations: [CorporateCompanyAddComponent],
  imports: [
    CommonModule,
    CorporateCompanyAddRoutingModule,
    SharedModuleModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class CorporateCompanyAddModule { }
