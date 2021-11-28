import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsReportsAddComponent } from './imps-reports-add.component';
import { ImpsReportsAddRoutingModule } from './imps-reports-add-routing.module';


@NgModule({
  declarations: [ImpsReportsAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsReportsAddRoutingModule
  ]
})
export class ImpsReportsAddModule { }
