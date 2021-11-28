import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateMakerRequestsRoutingModule } from './corporate-maker-requests-routing.module';
import { CorporateMakerRequestsComponent } from './corporate-maker-requests.component';

@NgModule({
  declarations: [CorporateMakerRequestsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateMakerRequestsRoutingModule
  ]
})
export class CorporateMakerRequestsModule { }
