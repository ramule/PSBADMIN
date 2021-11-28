import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MasterProductEditRoutingModule } from './master-product-edit-routing.module';
import { MasterProductEditComponent } from './master-product-edit.component';

@NgModule({
  declarations: [MasterProductEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterProductEditRoutingModule
  ]
})
export class MasterProductEditModule { }
