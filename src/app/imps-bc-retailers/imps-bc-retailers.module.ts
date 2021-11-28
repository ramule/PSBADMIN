import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsBcRetailersComponent } from './imps-bc-retailers.component';
import { ImpsBcRetailersRoutingModule } from './imps-bc-retailers-routing.module';


@NgModule({
  declarations: [ImpsBcRetailersComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsBcRetailersRoutingModule
  ]
})
export class ImpsBcRetailersModule { }
