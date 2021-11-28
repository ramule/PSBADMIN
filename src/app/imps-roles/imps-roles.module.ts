import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsRolesComponent } from './imps-roles.component';
import { ImpsRolesRoutingModule } from './imps-roles-routing.module';

@NgModule({
  declarations: [ImpsRolesComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsRolesRoutingModule
  ]
})
export class ImpsRolesModule { }
