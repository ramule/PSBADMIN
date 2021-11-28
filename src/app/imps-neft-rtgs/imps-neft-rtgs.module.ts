import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsNeftRtgsComponent } from './imps-neft-rtgs.component';
import { ImpsNeftRtgsRoutingModule } from './imps-neft-rtgs-routing.module';




@NgModule({
  declarations: [ImpsNeftRtgsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsNeftRtgsRoutingModule
  ]
})
export class ImpsNeftRtgsModule { }
