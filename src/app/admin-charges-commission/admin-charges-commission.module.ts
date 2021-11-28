import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminChargesCommissionRoutingModule } from './admin-charges-commission-routing.module';
import { AdminChargesCommissionComponent } from './admin-charges-commission.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AdminChargesCommissionComponent],
  imports: [
    CommonModule,
    AdminChargesCommissionRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminChargesCommissionModule { }
