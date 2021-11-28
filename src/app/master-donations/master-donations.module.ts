import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDonationsRoutingModule } from './master-donations-routing.module';
import { MasterDonationsComponent } from './master-donations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [MasterDonationsComponent],
  imports: [
    CommonModule,
    MasterDonationsRoutingModule,
    SharedModuleModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class MasterDonationsModule { }
