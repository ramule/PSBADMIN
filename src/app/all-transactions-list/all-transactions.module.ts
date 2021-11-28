import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { AllTransactionsRoutingModule } from './all-transactions-routing.module';
import { AllTranscationListComponent } from './all-transactions.component';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [AllTranscationListComponent],
  imports: [
    CommonModule,
    AllTransactionsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModuleModule
  ]
})
export class AllTransactionsModule { }
