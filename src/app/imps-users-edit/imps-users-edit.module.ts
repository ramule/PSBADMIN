import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ImpsUsersEditComponent } from './imps-users-edit.component';
import { ImpsUsersEditRoutingModule } from './imps-users-edit-routing.module';
@NgModule({
  declarations: [ImpsUsersEditComponent],
  imports: [
    CommonModule,
    ImpsUsersEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsUsersEditModule { }
