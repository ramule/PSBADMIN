import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsMasterComponent } from './imps-master.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsMasterRoutingModule } from './imps-master-routing.module';

@NgModule({
  declarations: [ImpsMasterComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsMasterRoutingModule
  ]
})
export class ImpsMasterModule { }
