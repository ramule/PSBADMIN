import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CorporateProductMasterComponent } from './corporate-product-master.component';
import { CorporateProductMasterRoutingModule } from './corporate-product-master-routing.module';

@NgModule({
  declarations: [CorporateProductMasterComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateProductMasterRoutingModule
  ]
})
export class CorporateProductMasterModule { }
