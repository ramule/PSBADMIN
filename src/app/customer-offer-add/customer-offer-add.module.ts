import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerOfferAddRoutingModule } from './customer-offer-add-routing.module';
import { CustomerOfferAddComponent } from './customer-offer-add.component'
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerOfferAddComponent],
  imports: [
    CommonModule,
    CustomerOfferAddRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class CustomerOfferAddModule { }
