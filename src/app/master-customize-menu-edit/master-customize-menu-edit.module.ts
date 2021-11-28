import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCustomizeMenuEditRoutingModule } from './master-customize-menu-edit-routing.module';
import { MasterCustomizeMenuEditComponent } from './master-customize-menu-edit.component';

@NgModule({
  declarations: [MasterCustomizeMenuEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCustomizeMenuEditRoutingModule
  ]
})
export class MasterCustomizeMenuEditModule { }
