import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateDonationEditRoutingModule } from './corporate-donation-edit-routing.module';
import { CorporateDonationEditComponent } from './corporate-donation-edit.component';

@NgModule({
  declarations: [CorporateDonationEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateDonationEditRoutingModule
  ]
})
export class CorporateDonationEditModule { }
