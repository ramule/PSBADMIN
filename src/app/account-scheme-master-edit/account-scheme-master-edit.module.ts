import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountSchemeMasterEditRoutingModule } from './account-scheme-master-edit-routing.module';
import { AccountSchemeMasterEditComponent } from './account-scheme-master-edit.component';

@NgModule({
  declarations: [AccountSchemeMasterEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AccountSchemeMasterEditRoutingModule
  ]
})
export class AccountSchemeMasterEditModule { }
