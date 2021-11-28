import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { CustomerInformationAddRoutingModule } from './customer-information-add-routing.module';
import { CustomerInformationAddComponent } from './customer-information-add.component';


@NgModule({
  declarations: [CustomerInformationAddComponent],
  imports: [
    CommonModule,
    CustomerInformationAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerInformationAddModule { }
