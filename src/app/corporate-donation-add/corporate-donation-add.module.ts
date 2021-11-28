import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateDonationAddRoutingModule } from './corporate-donation-add-routing.module';
import { CorporateDonationAddComponent } from './corporate-donation-add.component';

@NgModule({
  declarations: [CorporateDonationAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateDonationAddRoutingModule
  ]
})
export class CorporateDonationAddModule { }
