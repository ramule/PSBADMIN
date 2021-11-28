import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
