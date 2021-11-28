import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateMenuAddRoutingModule } from './corporate-menu-add-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateMenuAddComponent } from './corporate-menu-add.component';

@NgModule({
  declarations: [CorporateMenuAddComponent],
  imports: [
    CommonModule,
    CorporateMenuAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorporateMenuAddModule { }
