import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCustomizeSubmenuRoutingModule } from './master-customize-submenu-routing.module';
import { MasterCustomizeSubmenuComponent } from './master-customize-submenu.component';

@NgModule({
  declarations: [MasterCustomizeSubmenuComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCustomizeSubmenuRoutingModule
  ]
})
export class MasterCustomizeSubmenuModule { }
