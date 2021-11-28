import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RmMasterEditComponent } from './rm-master-edit.component';
import { RmMasterEditRoutingModule } from './rm-master-edit-routing.module';



@NgModule({
  declarations: [RmMasterEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RmMasterEditRoutingModule
  ]
})
export class RmMasterEditModule { }
