import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateUserRoutingModule } from './corporate-user-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateUserComponent } from './corporate-user.component';

@NgModule({
  declarations: [CorporateUserComponent],
  imports: [
    CommonModule,
    CorporateUserRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateUserModule { }
