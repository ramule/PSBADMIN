import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceEditRoutingModule } from './service-edit-routing.module';
import { ServiceEditComponent } from './service-edit.component';

@NgModule({
  declarations: [ServiceEditComponent],
  imports: [
    CommonModule,
    ServiceEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ServiceEditModule { }
