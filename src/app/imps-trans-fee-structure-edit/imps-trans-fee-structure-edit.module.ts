import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsTransFeeStructureEditComponent } from './imps-trans-fee-structure-edit.component';
import { ImpsTransFeeStructureEditRoutingModule } from './imps-trans-fee-structure-edit-routing.module';


@NgModule({
  declarations: [ImpsTransFeeStructureEditComponent],
  imports: [
    CommonModule,
    ImpsTransFeeStructureEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsTransFeeStructureEditModule { }
