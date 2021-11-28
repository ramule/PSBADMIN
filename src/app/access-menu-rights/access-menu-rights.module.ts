import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessMenuRightsRoutingModule } from './access-menu-rights-routing.module';
import { AccessMenuRightsComponent } from './access-menu-rights.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AccessMenuRightsComponent],
  imports: [
    CommonModule,
    AccessMenuRightsRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccessMenuRightsModule { }
