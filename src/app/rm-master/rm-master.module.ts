import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmMasterComponent } from 'src/app/rm-master/rm-master.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RmMasterRoutingModule } from 'src/app/rm-master/rm-master-routing.module';



@NgModule({
  declarations: [
    RmMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    RmMasterRoutingModule
  ]
})
export class RmMasterModule { }
