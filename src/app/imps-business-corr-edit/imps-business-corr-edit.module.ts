import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsBusinessCorrEditComponent } from './imps-business-corr-edit.component';
import { ImpsBusinessCorrEditRoutingModule } from './imps-business-corr-edit-routing.module';


@NgModule({
  declarations: [ImpsBusinessCorrEditComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsBusinessCorrEditRoutingModule
  ],
  providers:[TitleCasePipe]
})
export class ImpsBusinessCorrEditModule { }
