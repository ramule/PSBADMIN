import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminChargesCommissionEditRoutingModule } from './admin-charges-commission-edit-routing.module';
import { AdminChargesCommissionEditComponent } from './admin-charges-commission-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminChargesCommissionEditComponent],
  imports: [
    CommonModule,
    AdminChargesCommissionEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AdminChargesCommissionEditModule { }
