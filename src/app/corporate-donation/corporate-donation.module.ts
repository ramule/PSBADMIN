import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateDonationRoutingModule } from './corporate-donation-routing.module';
import { CorporateDonationComponent } from './corporate-donation.component';

@NgModule({
  declarations: [CorporateDonationComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateDonationRoutingModule
  ]
})
export class CorporateDonationModule { }
