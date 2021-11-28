import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterMenuRoutingModule } from './master-menu-routing.module';
import { MasterMenuComponent } from './master-menu.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [MasterMenuComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterMenuRoutingModule
  ]
})
export class MasterMenuModule { }
