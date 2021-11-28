import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterCustomizeMenuAddRoutingModule } from './master-customize-menu-add-routing.module';
import { MasterCustomizeMenuAddComponent } from './master-customize-menu-add.component';

@NgModule({
  declarations: [MasterCustomizeMenuAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterCustomizeMenuAddRoutingModule
  ]
})
export class MasterCustomizeMenuAddModule { }
