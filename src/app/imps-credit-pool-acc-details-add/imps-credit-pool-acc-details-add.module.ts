import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsCreditPoolAccDetailsAddRoutingModule } from './imps-credit-pool-acc-details-add-routing.module';
import { ImpsCreditPoolAccDetailsAddComponent } from './imps-credit-pool-acc-details-add.component';

@NgModule({
  declarations: [ImpsCreditPoolAccDetailsAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsCreditPoolAccDetailsAddRoutingModule
  ]
})
export class ImpsCreditPoolAccDetailsAddModule { }
