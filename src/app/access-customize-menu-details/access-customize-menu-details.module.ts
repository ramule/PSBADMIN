import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessCustomizeMenuDetailsRoutingModule } from './access-customize-menu-details-routing.module';
import { AccessCustomizeMenuDetailsComponent } from './access-customize-menu-details.component';

@NgModule({
  declarations: [AccessCustomizeMenuDetailsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AccessCustomizeMenuDetailsRoutingModule
  ]
})
export class AccessCustomizeMenuDetailsModule { }
