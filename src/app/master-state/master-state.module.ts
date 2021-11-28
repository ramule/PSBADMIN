import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterStateRoutingModule } from './master-state-routing.module';
import { MasterStateComponent } from './master-state.component';

@NgModule({
  declarations: [MasterStateComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterStateRoutingModule
  ]
})
export class MasterStateModule { }
