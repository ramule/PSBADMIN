import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsStationsAddComponent } from './imps-stations-add.component';
import { ImpsStationsAddRoutingModule } from './imps-stations-add-routing.module';

@NgModule({
  declarations: [ImpsStationsAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsStationsAddRoutingModule
  ]
})
export class ImpsStationsAddModule { }
