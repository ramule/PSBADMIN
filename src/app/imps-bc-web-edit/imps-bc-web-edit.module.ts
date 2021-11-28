import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsBcWebEditComponent } from './imps-bc-web-edit.component';
import { ImpsBcWebEditRoutingModule } from './imps-bc-web-edit-routing.module';


@NgModule({
  declarations: [ImpsBcWebEditComponent],
  imports: [
    CommonModule,
    ImpsBcWebEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsBcWebEditModule { }
