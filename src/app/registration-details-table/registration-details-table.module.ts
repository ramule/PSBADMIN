import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationDetailsTableRoutingModule} from './registration-details-table-routing.module';
import { RegistrationDetailsTableComponent } from './registration-details-table.component';



@NgModule({
  declarations: [RegistrationDetailsTableComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationDetailsTableRoutingModule
  
  ]
})
export class RegistrationDetailsTableModule { }
