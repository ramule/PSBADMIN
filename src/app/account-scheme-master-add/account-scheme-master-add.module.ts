import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSchemeMasterAddComponent } from './account-scheme-master-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountSchemeMasterAddRoutingModule } from './account-scheme-master-add-routing.module';

@NgModule({
  declarations: [AccountSchemeMasterAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AccountSchemeMasterAddRoutingModule
  ]
})
export class AccountSchemeMasterAddModule { }
