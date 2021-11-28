import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MasterProductRoutingModule } from './master-product-routing.module';
import { MasterProductComponent } from './master-product.component';

@NgModule({
  declarations: [MasterProductComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterProductRoutingModule
  ]
})
export class MasterProductModule { }
