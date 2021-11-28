import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveDirectoryRoutingModule } from './active-directory-routing.module';
import { ActiveDirectoryComponent } from './active-directory.component';

@NgModule({
  declarations: [ActiveDirectoryComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ActiveDirectoryRoutingModule
  ]
})
export class ActiveDirectoryModule { }
