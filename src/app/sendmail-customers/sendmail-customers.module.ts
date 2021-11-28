import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendmailCustomersRoutingModule } from './sendmail-customers-routing.module';
import { SendmailCustomersComponent } from './sendmail-customers.component';



@NgModule({
  declarations: [SendmailCustomersComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    SendmailCustomersRoutingModule
  ]
})
export class SendmailCustomersModule { }
