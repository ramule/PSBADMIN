import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsReportsDetailsComponent } from './imps-reports-details.component';
import { ImpsReportsDetailsRoutingModule } from './imps-reports-details-routing.module';


@NgModule({
  declarations: [ImpsReportsDetailsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsReportsDetailsRoutingModule
  ]
})
export class ImpsReportsDetailsModule { }
