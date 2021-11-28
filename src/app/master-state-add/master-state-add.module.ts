import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterStateAddRoutingModule } from './master-state-add-routing.module';
import { MasterStateAddComponent } from './master-state-add.component';

@NgModule({
  declarations: [MasterStateAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterStateAddRoutingModule
  ]
})
export class MasterStateAddModule { }
