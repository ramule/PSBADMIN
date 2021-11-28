import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsTransactionDashboardComponent } from './imps-transaction-dashboard.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsTransactionDashboardRoutingModule } from './imps-transaction-dashboard-routing.module';

@NgModule({
  declarations: [ImpsTransactionDashboardComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsTransactionDashboardRoutingModule
  ]
})
export class ImpsTransactionDashboardModule { }
