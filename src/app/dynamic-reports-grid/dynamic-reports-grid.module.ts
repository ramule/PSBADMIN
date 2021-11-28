import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicReportsGridComponent } from './dynamic-reports-grid.component';
import { DynamicReportsGridRoutingModule } from './dynamic-reports-grid-routing.module';



@NgModule({
  declarations: [DynamicReportsGridComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule,
    DynamicReportsGridRoutingModule
  ]
})
export class DynamicReportsGridModule { }
