import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsSystemStatusEditRoutingModule } from './imps-system-status-edit-routing.module';
import { ImpsSystemStatusEditComponent } from './imps-system-status-edit.component';

@NgModule({
  declarations: [ImpsSystemStatusEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsSystemStatusEditRoutingModule
  ]
})
export class ImpsSystemStatusEditModule { }
