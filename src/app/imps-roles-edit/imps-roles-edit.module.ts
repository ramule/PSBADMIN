import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsRolesEditComponent } from './imps-roles-edit.component';
import { ImpsRolesEditRoutingModule } from './imps-roles-edit-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [ImpsRolesEditComponent],
  imports: [
    CommonModule,
    ImpsRolesEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsRolesEditModule { }
