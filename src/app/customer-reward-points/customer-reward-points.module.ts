import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { CustomerRewardPointsComponent } from './customer-reward-points.component';
import { CustomerRewardPointsRoutingModule } from './customer-reward-points-routing.module';

@NgModule({
  declarations: [CustomerRewardPointsComponent],
  imports: [
    CommonModule,
    CustomerRewardPointsRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CustomerRewardPointsModule { }
