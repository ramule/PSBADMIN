import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsReportsEditComponent } from './imps-reports-edit.component';
import { ImpsReportsEditRoutingModule } from './imps-reports-edit-routing.module';


@NgModule({
  declarations: [ImpsReportsEditComponent],
  imports: [
    CommonModule,
    ImpsReportsEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsReportsEditModule { }
