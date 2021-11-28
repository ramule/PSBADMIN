import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeApplyRoutingModule } from './theme-apply-routing.module';
import { ThemeApplyComponent } from './theme-apply.component';



@NgModule({
  declarations: [ThemeApplyComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeApplyRoutingModule
  ]
})
export class ThemeApplyModule { }
