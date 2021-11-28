import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCustomizeSubmenuAddRoutingModule } from './master-customize-submenu-add-routing.module';
import { MasterCustomizeSubmenuAddComponent } from './master-customize-submenu-add.component';

@NgModule({
  declarations: [MasterCustomizeSubmenuAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCustomizeSubmenuAddRoutingModule
  ]
})
export class MasterCustomizeSubmenuAddModule { }
