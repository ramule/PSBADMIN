import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountTypeRoutingModule } from './account-type-routing.module';
import { AccountTypeComponent } from './account-type.component';

@NgModule({
  declarations: [AccountTypeComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AccountTypeRoutingModule
  ]
})
export class AccountTypeModule { }
