import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { InsuranceCompanyComponent } from './insurance-company.component';
import { InsuranceCompanyRoutingModule } from './insurance-company-routing.module';


@NgModule({
  declarations: [InsuranceCompanyComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceCompanyRoutingModule
  ]
})
export class InsuranceCompanyModule { }
