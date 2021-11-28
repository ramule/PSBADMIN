import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateOffersRoutingModule } from './corporate-offers-routing.module';
import { CorporateOffersComponent } from './corporate-offers.component';

@NgModule({
  declarations: [CorporateOffersComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateOffersRoutingModule
  ]
})
export class CorporateOffersModule { }
