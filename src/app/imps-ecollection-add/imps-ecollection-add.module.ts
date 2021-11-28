import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsEcollectionAddComponent } from './imps-ecollection-add.component';
import { ImpsEcollectionAddRoutingModule } from './imps-ecollection-add-routing.module';



@NgModule({
  declarations: [ImpsEcollectionAddComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsEcollectionAddRoutingModule
  ]
})
export class ImpsEcollectionAddModule { }
