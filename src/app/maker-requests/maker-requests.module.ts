import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakerRequestsRoutingModule } from './maker-requests-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MakerRequestsComponent } from './maker-requests.component';



@NgModule({
  declarations: [MakerRequestsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MakerRequestsRoutingModule
  ]
})
export class MakerRequestsModule { }
