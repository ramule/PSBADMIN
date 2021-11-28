import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsRolesAddComponent } from './imps-roles-add.component';
import { ImpsRolesAddRoutingModule } from './imps-roles-add-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [ImpsRolesAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsRolesAddRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class ImpsRolesAddModule { }
