import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDonationsEditRoutingModule } from './master-donations-edit-routing.module';
import { MasterDonationsEditComponent } from './master-donations-edit.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [MasterDonationsEditComponent],
  imports: [
    CommonModule,
    MasterDonationsEditRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule
  ]
})
export class MasterDonationsEditModule { }
