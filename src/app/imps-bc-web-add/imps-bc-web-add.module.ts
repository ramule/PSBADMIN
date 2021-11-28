import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsBcWebAddComponent } from './imps-bc-web-add.component';
import { ImpsBcWebAddRoutingModule } from './imps-bc-web-add-routing.module';


@NgModule({
  declarations: [ImpsBcWebAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsBcWebAddRoutingModule
  ]
})
export class ImpsBcWebAddModule { }
