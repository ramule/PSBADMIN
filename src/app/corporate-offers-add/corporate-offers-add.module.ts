import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateOffersAddRoutingModule } from './corporate-offers-add-routing.module';
import { CorporateOffersAddComponent } from './corporate-offers-add.component';

@NgModule({
  declarations: [CorporateOffersAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateOffersAddRoutingModule
  ]
})
export class CorporateOffersAddModule { }
