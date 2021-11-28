import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsTaskAddComponent } from './imps-task-add.component';
import { ImpsTaskAddRoutingModule } from './imps-task-add-routing.module';


@NgModule({
  declarations: [ImpsTaskAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsTaskAddRoutingModule
  ]
})
export class ImpsTaskAddModule { }
