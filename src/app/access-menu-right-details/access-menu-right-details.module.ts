import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessMenuRightDetailsRoutingModule } from './access-menu-right-details-routing.module';
import { AccessMenuRightDetailsComponent } from './access-menu-right-details.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AccessMenuRightDetailsComponent],
  imports: [
    CommonModule,
    AccessMenuRightDetailsRoutingModule,
    SharedModuleModule,
    FormsModule
  ]
})
export class AccessMenuRightDetailsModule { }
