import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpsRoutingModule } from './imps-routing.module';
import { ImpsComponent } from './imps.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [ImpsComponent],
  imports: [
    CommonModule,
    ImpsRoutingModule,
    SharedModuleModule
  ]
})
export class ImpsModule { }
