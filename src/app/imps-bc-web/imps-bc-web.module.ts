import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsBcWebComponent } from './imps-bc-web.component';
import { ImpsBcWebRoutingModule } from './imps-bc-web-routing.module';

@NgModule({
  declarations: [ImpsBcWebComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsBcWebRoutingModule
  ]
})
export class ImpsBcWebModule { }
