import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsStationsComponent } from './imps-stations.component';
import { ImpsStationsRoutingModule } from './imps-stations-routing.module';

@NgModule({
  declarations: [ImpsStationsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsStationsRoutingModule
  ]
})
export class ImpsStationsModule { }
