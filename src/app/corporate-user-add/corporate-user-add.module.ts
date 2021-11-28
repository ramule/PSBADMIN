import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateUserAddRoutingModule } from './corporate-user-add-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateUserAddComponent } from './corporate-user-add.component';

@NgModule({
  declarations: [CorporateUserAddComponent],
  imports: [
    CommonModule,
    CorporateUserAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateUserAddModule { }
