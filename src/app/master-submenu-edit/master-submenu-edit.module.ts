import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterSubMenuEditComponent } from './master-submenu-edit.component';
import { MasterSubMenuEditRoutingModule } from './master-submenu-edit-routing.module';

@NgModule({
  declarations: [MasterSubMenuEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterSubMenuEditRoutingModule
  ]
})
export class MasterMenuEditModule { }
