import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CorporateSetLimitViewRoutingModule } from './corporate-set-limit-view-routing.module';
import { CorporateSetLimitViewComponent } from './corporate-set-limit-view.component';

@NgModule({
  declarations: [CorporateSetLimitViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule,
    ReactiveFormsModule,
    CorporateSetLimitViewRoutingModule
  ]
})
export class CorporateSetLimitViewModule { }
