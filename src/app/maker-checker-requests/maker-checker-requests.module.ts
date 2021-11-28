import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MakerCheckerRequestsComponent } from './maker-checker-requests.component';
import { MakerCheckerRequestsRoutingModule } from './maker-checker-requests-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MakerCheckerRequestsComponent],
  imports: [
    CommonModule,
    MakerCheckerRequestsRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
    FormsModule
  ]
})
export class MakerCheckerRequestsModule { }
