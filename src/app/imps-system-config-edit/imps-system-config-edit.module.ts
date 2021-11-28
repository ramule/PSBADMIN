import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsSystemConfigEditComponent } from './imps-system-config-edit.component';
import { ImpsSystemConfigEditRoutingModule } from './imps-system-config-edit-routing.module';

@NgModule({
  declarations: [ImpsSystemConfigEditComponent],
  imports: [
    CommonModule,
    ImpsSystemConfigEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsSystemConfigEditModule { }
