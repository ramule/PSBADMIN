import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessSubmenuRightsRoutingModule } from './access-submenu-rights-routing.module';
import { AccessSubmenuRightsComponent } from './access-submenu-rights.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AccessSubmenuRightsComponent],
  imports: [
    CommonModule,
    AccessSubmenuRightsRoutingModule,
    SharedModuleModule,
    FormsModule
  ]
})
export class AccessSubmenuRightsModule { }
