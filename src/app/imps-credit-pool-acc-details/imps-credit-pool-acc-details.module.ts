import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsCreditPoolAccDetailsRoutingModule } from './imps-credit-pool-acc-details-routing.module';
import { ImpsCreditPoolAccDetailsComponent } from './imps-credit-pool-acc-details.component';

@NgModule({
  declarations: [ImpsCreditPoolAccDetailsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsCreditPoolAccDetailsRoutingModule
  ]
})
export class ImpsCreditPoolAccDetailsModule { }
