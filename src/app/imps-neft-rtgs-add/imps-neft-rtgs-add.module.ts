import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ImpsNeftRtgsAddComponent } from './imps-neft-rtgs-add.component';
import { ImpsNeftRtgsAddRoutingModule } from './imps-neft-rtgs-add-routing.module';



@NgModule({
  declarations: [ImpsNeftRtgsAddComponent],
  imports: [
    CommonModule,
    ImpsNeftRtgsAddRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ImpsNeftRtgsAddModule { }
