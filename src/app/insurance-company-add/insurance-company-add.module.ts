import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { InsuranceCompanyAddComponent } from './insurance-company-add.component';
import { InsuranceCompanyAddRoutingModule } from './insurance-company-add-routing.module';



@NgModule({
  declarations: [InsuranceCompanyAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    InsuranceCompanyAddRoutingModule
  ]
})
export class InsuranceCompanyAddModule { }
