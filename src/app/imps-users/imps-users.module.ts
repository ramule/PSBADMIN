import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsUsersComponent } from './imps-users.component';
import { ImpsUsersRoutingModule } from './imps-users-routing.module';

@NgModule({
  declarations: [ImpsUsersComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsUsersRoutingModule
  ]
})
export class ImpsUsersModule { }
