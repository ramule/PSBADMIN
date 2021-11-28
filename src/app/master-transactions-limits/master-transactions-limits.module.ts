import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MasterTransactionsLimitsComponent } from 'src/app/master-transactions-limits/master-transactions-limits.component';
import { MasterTransactionsLimitsRoutingModule } from 'src/app/master-transactions-limits/master-transactions-limits-routing.module';



@NgModule({
  declarations: [
    MasterTransactionsLimitsComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterTransactionsLimitsRoutingModule
  ]
})
export class MasterTransactionsLimitsModule { }
