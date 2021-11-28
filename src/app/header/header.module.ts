import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderRoutingModule
  ]
})
export class HeaderModule { }
