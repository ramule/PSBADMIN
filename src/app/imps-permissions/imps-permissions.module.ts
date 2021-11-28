import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsPermissionsComponent } from './imps-permissions.component';
import { ImpsPermissionsRoutingModule } from './imps-permissions-routing.module';

@NgModule({
  declarations: [ImpsPermissionsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsPermissionsRoutingModule
  ]
})
export class ImpsPermissionsModule { }
