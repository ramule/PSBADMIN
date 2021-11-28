import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminChargesCommissionAddRoutingModule } from './admin-charges-commission-add-routing.module';
import { AdminChargesCommissionAddComponent } from './admin-charges-commission-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminChargesCommissionAddComponent],
  imports: [
    CommonModule,
    AdminChargesCommissionAddRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AdminChargesCommissionAddModule { }
