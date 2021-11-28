import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ThemeEditRoutingModule } from './theme-edit-routing.module';
import { ThemeEditComponent } from './theme-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ThemeEditComponent],
  imports: [
    CommonModule,
    ThemeEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class ThemeEditModule { }
