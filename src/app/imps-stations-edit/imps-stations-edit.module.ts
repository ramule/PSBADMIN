import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsStationsEditComponent } from './imps-stations-edit.component';
import { ImpsStationsEditRoutingModule } from './imps-stations-edit-routing.module';

@NgModule({
  declarations: [ImpsStationsEditComponent],
  imports: [
    CommonModule,
    ImpsStationsEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsStationsEditModule { }
