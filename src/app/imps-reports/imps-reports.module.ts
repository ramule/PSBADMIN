import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsReportsComponent } from './imps-reports.component';
import { ImpsReportsRoutingModule } from './imps-reports-routing.module';


@NgModule({
  declarations: [ImpsReportsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsReportsRoutingModule
  ]
})
export class ImpsReportsModule { }
