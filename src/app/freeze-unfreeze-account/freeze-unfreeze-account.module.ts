import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreezeUnfreezeAccountRoutingModule } from './freeze-unfreeze-account-routing.module';
import { FreezeUnfreezeAccountComponent } from './freeze-unfreeze-account.component';

@NgModule({
  declarations: [FreezeUnfreezeAccountComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    FreezeUnfreezeAccountRoutingModule
  ]
})
export class FreezeUnfreezeAccountModule { }
