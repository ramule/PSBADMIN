import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsCreditPoolAccDetailsEditComponent } from './imps-credit-pool-acc-details-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsCreditPoolAccDetailsEditRoutingModule } from './imps-credit-pool-acc-details-edit-routing.module';

@NgModule({
  declarations: [ImpsCreditPoolAccDetailsEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsCreditPoolAccDetailsEditRoutingModule
  ]
})
export class ImpsCreditPoolAccDetailsEditModule { }
