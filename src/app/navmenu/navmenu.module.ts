import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavmenuRoutingModule } from './navmenu-routing.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule,
    NavmenuRoutingModule
  ]
})
export class NavmenuModule { }
