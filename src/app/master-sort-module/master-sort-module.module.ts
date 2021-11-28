import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { MasterSortModuleComponent } from './master-sort-module.component';
import { MasterSortModuleRoutingModule } from './master-sort-module-routing.module';


@NgModule({
  declarations: [MasterSortModuleComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MasterSortModuleRoutingModule
  ]
})
export class MasterSortModuleModule { }
