import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpUserRequestsRoutingModule } from './corp-user-requests-routing.module';
import { CorpUserRequestsComponent } from './corp-user-requests.component';

@NgModule({
  declarations: [CorpUserRequestsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorpUserRequestsRoutingModule
  ]
})
export class CorpUserRequestsModule { }
