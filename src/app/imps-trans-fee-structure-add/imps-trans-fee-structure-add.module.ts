import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsTransFeeStructureAddComponent } from './imps-trans-fee-structure-add.component';
import { ImpsTransFeeStructureAddRoutingModule } from './imps-trans-fee-structure-add-routing.module';


@NgModule({
  declarations: [ImpsTransFeeStructureAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsTransFeeStructureAddRoutingModule
  ]
})
export class ImpsTransFeeStructureAddModule { }
