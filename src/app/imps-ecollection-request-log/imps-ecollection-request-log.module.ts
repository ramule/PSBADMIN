import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsEcollectionRequestLogComponent } from './imps-ecollection-request-log.component';
import { ImpsEcollectionRequestLogRoutingModule } from './imps-ecollection-request-log-routing.module';


@NgModule({
  declarations: [ImpsEcollectionRequestLogComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsEcollectionRequestLogRoutingModule
  ]
})
export class ImpsEcollectionRequestLogModule { }
