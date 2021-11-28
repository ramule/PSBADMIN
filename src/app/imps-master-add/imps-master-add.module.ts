import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsMasterAddComponent } from './imps-master-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsMasterAddRoutingModule } from './imps-master-add-routing.module';

@NgModule({
  declarations: [ImpsMasterAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsMasterAddRoutingModule
  ]
})
export class ImpsMasterAddModule { }
