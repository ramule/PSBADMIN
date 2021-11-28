import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpUserRequestsEditRoutingModule } from './corp-user-requests-edit-routing.module';
import { CorpUserRequestsEditComponent } from './corp-user-requests-edit.component';

@NgModule({
  declarations: [CorpUserRequestsEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorpUserRequestsEditRoutingModule
  ]
})
export class CorpUserRequestsEditModule { }
