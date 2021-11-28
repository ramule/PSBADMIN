import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessCustomizeMenuAddRoutingModule } from './access-customize-menu-add-routing.module';
import { AccessCustomizeMenuAddComponent } from './access-customize-menu-add.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccessCustomizeMenuAddComponent],
  imports: [
    CommonModule,
    AccessCustomizeMenuAddRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class AccessCustomizeMenuAddModule { }
