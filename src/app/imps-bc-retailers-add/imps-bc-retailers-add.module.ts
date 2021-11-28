import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsBcRetailersAddComponent } from './imps-bc-retailers-add.component';
import { ImpsBcRetailersAddRoutingModule } from './imps-bc-retailers-add-routing.module';


@NgModule({
  declarations: [ImpsBcRetailersAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsBcRetailersAddRoutingModule
  ]
})
export class ImpsBcRetailersAddModule { }
