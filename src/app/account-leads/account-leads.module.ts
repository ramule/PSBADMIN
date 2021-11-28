import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountLeadsComponent } from './account-leads.component';
import { AccountLeadsRoutingModule } from './account-leads-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountLeadsComponent
  ],
  imports: [
    CommonModule,
    AccountLeadsRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AccountLeadsModule { }
