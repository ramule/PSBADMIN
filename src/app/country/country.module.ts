import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [CountryComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
