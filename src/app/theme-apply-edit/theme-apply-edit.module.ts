import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ThemeApplyEditRoutingModule } from './theme-apply-edit-routing.module';
import { ThemeApplyEditComponent } from './theme-apply-edit.component';



@NgModule({
  declarations: [ThemeApplyEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeApplyEditRoutingModule
  ]
})
export class ThemeApplyEditModule { }
