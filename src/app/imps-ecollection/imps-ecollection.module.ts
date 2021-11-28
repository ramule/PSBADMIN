import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsEcollectionComponent } from './imps-ecollection.component';
import { ImpsEcollectionRoutingModule } from './imps-ecollection-routing.module';



@NgModule({
  declarations: [ImpsEcollectionComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsEcollectionRoutingModule
  ]
})
export class ImpsEcollectionModule { }
