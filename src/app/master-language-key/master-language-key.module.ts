import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { MasterLanguageKeyComponent } from './master-language-key.component';
import { MasterLanguageKeyRoutingModule } from './master-language-key-routing.module';

@NgModule({
  declarations: [MasterLanguageKeyComponent],
  imports: [
    CommonModule,
    MasterLanguageKeyRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class MasterLanguageKeyModule { }
