import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessCustomizeMenuRoutingModule } from './access-customize-menu-routing.module';
import { AccessCustomizeMenuComponent } from './access-customize-menu.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccessCustomizeMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    AccessCustomizeMenuRoutingModule,
    SharedModuleModule
  ]
})
export class AccessCustomizeMenuModule { }
