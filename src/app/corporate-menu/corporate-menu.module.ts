import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateMenuRoutingModule } from './corporate-menu-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateMenuComponent } from './corporate-menu.component';

@NgModule({
  declarations: [CorporateMenuComponent],
  imports: [
    CommonModule,
    CorporateMenuRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateMenuModule { }
