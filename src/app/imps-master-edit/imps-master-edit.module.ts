import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpsMasterEditComponent } from './imps-master-edit.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsMasterEditRoutingModule } from './imps-master-edit-routing.module';

@NgModule({
  declarations: [ImpsMasterEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsMasterEditRoutingModule
  ]
})
export class ImpsMasterEditModule { }
