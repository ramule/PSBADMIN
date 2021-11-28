import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceCompanyEditComponent } from './insurance-company-edit.component';
import { InsuranceCompanyEditRoutingModule } from './insurance-company-edit-routing.module';


@NgModule({
  declarations: [InsuranceCompanyEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceCompanyEditRoutingModule
  ]
})
export class InsuranceCompanyEditModule { }
