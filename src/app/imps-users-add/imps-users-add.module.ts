import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ImpsUsersAddComponent } from './imps-users-add.component';
import { ImpsUsersAddRoutingModule } from './imps-users-add-routing.module';

@NgModule({
  declarations: [ImpsUsersAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsUsersAddRoutingModule,
    NgMultiSelectDropDownModule
  ]
})
export class ImpsUsersAddModule { }
