import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CorporateProductMasterEditComponent } from './corporate-product-master-edit.component';
import { CorporateProductMasterEditRoutingModule } from './corporate-product-master-edit-routing.module';

@NgModule({
  declarations: [CorporateProductMasterEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateProductMasterEditRoutingModule
  ]
})
export class CorporateProductMasterEditModule { }
