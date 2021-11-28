import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAdminstrationRoutingModule } from './admin-adminstration-routing.module';
import { AdminAdminstrationComponent } from './admin-adminstration.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminAdminstrationComponent],
  imports: [
    CommonModule,
    AdminAdminstrationRoutingModule,
    SharedModuleModule,
    FormsModule
  ]
})
export class AdminAdminstrationModule { }
