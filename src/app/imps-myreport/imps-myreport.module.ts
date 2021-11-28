import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsMyreportComponent } from './imps-myreport.component';
import { ImpsMyreportRoutingModule } from './imps-myreport-routing.module';


@NgModule({
  declarations: [ImpsMyreportComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsMyreportRoutingModule
  ]
})
export class ImpsMyreportModule { }
