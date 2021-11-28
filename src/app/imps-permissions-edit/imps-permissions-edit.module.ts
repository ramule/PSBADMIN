import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsPermissionsEditRoutingModule } from './imps-permissions-edit-routing.module';
import { ImpsPermissionsEditComponent } from './imps-permissions-edit.component';

@NgModule({
  declarations: [ImpsPermissionsEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsPermissionsEditRoutingModule
  ]
})
export class ImpsPermissionsEditModule { }
