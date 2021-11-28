import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateMenuEditRoutingModule } from './corporate-menu-edit-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateMenuEditComponent } from './corporate-menu-edit.component';

@NgModule({
  declarations: [CorporateMenuEditComponent],
  imports: [
    CommonModule,
    CorporateMenuEditRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateMenuEditModule { }
