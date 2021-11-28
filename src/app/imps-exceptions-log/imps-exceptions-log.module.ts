import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsExceptionsLogComponent } from './imps-exceptions-log.component';
import { ImpsExceptionsLogRoutingModule } from './imps-exceptions-log-routing.module';



@NgModule({
  declarations: [ImpsExceptionsLogComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsExceptionsLogRoutingModule
  ]
})
export class ImpsExceptionsLogModule { }
