import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsTaskComponent } from './imps-task.component';
import { ImpsTaskRoutingModule } from './imps-task-routing.module';


@NgModule({
  declarations: [ImpsTaskComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsTaskRoutingModule
  ]
})
export class ImpsTaskModule { }
