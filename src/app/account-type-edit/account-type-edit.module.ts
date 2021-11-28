import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountTypeEditRoutingModule } from './account-type-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AccountTypeEditComponent } from './account-type-edit.component';

@NgModule({
  declarations: [AccountTypeEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AccountTypeEditRoutingModule
  ]
})
export class AccountTypeEditModule { }
