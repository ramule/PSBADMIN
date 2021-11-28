import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCustomizeSubmenuEditRoutingModule } from './master-customize-submenu-edit-routing.module';
import { MasterCustomizeSubmenuEditComponent } from './master-customize-submenu-edit.component';

@NgModule({
  declarations: [MasterCustomizeSubmenuEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCustomizeSubmenuEditRoutingModule
  ]
})
export class MasterCustomizeSubmenuEditModule { }
