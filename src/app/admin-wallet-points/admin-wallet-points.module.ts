import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminWalletPointsRoutingModule } from './admin-wallet-points-routing.module';
import { AdminWalletPointsComponent } from './admin-wallet-points.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AdminWalletPointsComponent],
  imports: [
    CommonModule,
    AdminWalletPointsRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminWalletPointsModule { }
