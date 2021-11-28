import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateCheckerRequestsRoutingModule } from './corporate-checker-requests-routing.module';
import { CorporateCheckerRequestsComponent } from './corporate-checker-requests.component';

@NgModule({
  declarations: [CorporateCheckerRequestsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorporateCheckerRequestsRoutingModule
  ]
})
export class CorporateCheckerRequestsModule { }
