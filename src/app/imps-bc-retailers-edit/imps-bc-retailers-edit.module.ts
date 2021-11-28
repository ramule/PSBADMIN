import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsBcRetailersEditComponent } from './imps-bc-retailers-edit.component';
import { ImpsBcRetailersEditRoutingModule } from './imps-bc-retailers-edit-routing.module';


@NgModule({
  declarations: [ImpsBcRetailersEditComponent],
  imports: [
    CommonModule,
    ImpsBcRetailersEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsBcRetailersEditModule { }
