import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerOfferRoutingModule } from './customer-offer-routing.module';
import { CustomerOfferComponent } from './customer-offer.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [CustomerOfferComponent],
  imports: [
    CommonModule,
    CustomerOfferRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CustomerOfferModule { }
