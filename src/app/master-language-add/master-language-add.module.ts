import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterLanguageAddRoutingModule } from './master-language-add-routing.module';
import { MasterLanguageAddComponent } from './master-language-add.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [MasterLanguageAddComponent],
  imports: [
    CommonModule,
    MasterLanguageAddRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
    NgxPaginationModule
  ]
})
export class MasterLanguageAddModule { }
