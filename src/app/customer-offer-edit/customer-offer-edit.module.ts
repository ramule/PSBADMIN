import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerOfferEditRoutingModule } from './customer-offer-edit-routing.module';
import { CustomerOfferEditComponent } from './customer-offer-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerOfferEditComponent],
  imports: [
    CommonModule,
    CustomerOfferEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class CustomerOfferEditModule { }
