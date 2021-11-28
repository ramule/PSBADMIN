import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCustomizeMenuRoutingModule } from './master-customize-menu-routing.module';
import { MasterCustomizeMenuComponent } from './master-customize-menu.component';

@NgModule({
  declarations: [MasterCustomizeMenuComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCustomizeMenuRoutingModule
  ]
})
export class MasterCustomizeMenuModule { }
