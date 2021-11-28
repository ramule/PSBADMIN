import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateOffersEditRoutingModule } from './corporate-offers-edit-routing.module';
import { CorporateOffersEditComponent } from './corporate-offers-edit.component';

@NgModule({
  declarations: [CorporateOffersEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateOffersEditRoutingModule
  ]
})
export class CorporateOffersEditModule { }
