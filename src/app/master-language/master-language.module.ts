import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterLanguageRoutingModule } from './master-language-routing.module';
import { MasterLanguageComponent } from './master-language.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [MasterLanguageComponent],
  imports: [
    CommonModule,
    MasterLanguageRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class MasterLanguageModule { }
