import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsTransFeeStructureComponent } from './imps-trans-fee-structure.component';
import { ImpsTransFeeStructureRoutingModule } from './imps-trans-fee-structure-routing.module';


@NgModule({
  declarations: [ImpsTransFeeStructureComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsTransFeeStructureRoutingModule
  ]
})
export class ImpsTransFeeStructureModule { }
