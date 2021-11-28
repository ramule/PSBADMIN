import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImpsTaskEditComponent } from './imps-task-edit.component';
import { ImpsTaskEditRoutingModule } from './imps-task-edit-routing.module';


@NgModule({
  declarations: [ImpsTaskEditComponent],
  imports: [
    CommonModule,
    ImpsTaskEditRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsTaskEditModule { }
