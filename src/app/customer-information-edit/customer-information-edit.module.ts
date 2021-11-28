import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CustomerInformationEditRoutingModule } from './customer-information-edit-routing.module';
import { CustomerInformationEditComponent } from './customer-information-edit.component';

@NgModule({
  declarations: [CustomerInformationEditComponent],
  imports: [
    CommonModule,
    CustomerInformationEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CustomerInformationEditModule { }
