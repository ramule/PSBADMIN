import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsTransLogRoutingModule } from './imps-trans-log-routing.module';
import { ImpsTransLogComponent } from './imps-trans-log.component';

@NgModule({
  declarations: [ImpsTransLogComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsTransLogRoutingModule
  ]
})
export class ImpsTransLogModule { }
