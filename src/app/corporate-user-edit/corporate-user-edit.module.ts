import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateUserEditRoutingModule } from './corporate-user-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateUserEditComponent } from './corporate-user-edit.component';

@NgModule({
  declarations: [CorporateUserEditComponent],
  imports: [
    CommonModule,
    CorporateUserEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateUserEditModule { }
