import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSearchTransactionComponent } from './imps-search-transaction.component';
import { ImpsSearchTransactionRoutingModule } from './imps-search-transaction-routing.module';


@NgModule({
  declarations: [ImpsSearchTransactionComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSearchTransactionRoutingModule
  ]
})
export class ImpsSearchTransactionModule { }
