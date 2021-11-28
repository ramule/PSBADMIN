import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MasterSubMenuComponent } from './master-submenu.component';
import { MasterSubMenuRoutingModule } from './master-submenu-routing.module';

@NgModule({
  declarations: [MasterSubMenuComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterSubMenuRoutingModule
  ]
})
export class MasterSubMenuModule { }
