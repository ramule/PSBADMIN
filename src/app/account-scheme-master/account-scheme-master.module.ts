import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountSchemeMasterRoutingModule } from './account-scheme-master-routing.module';
import { AccountSchemeMasterComponent } from './account-scheme-master.component';

@NgModule({
  declarations: [AccountSchemeMasterComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AccountSchemeMasterRoutingModule
  ]
})
export class AccountSchemeMasterModule { }
