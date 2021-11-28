import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ActivityResponseTimeComponent } from './activity-response-time.component';
import { ActivityResponseTimeRoutingModule } from './activity-response-time-routing.module';



@NgModule({
  declarations: [ActivityResponseTimeComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule,
    ActivityResponseTimeRoutingModule,
    Daterangepicker,
  ]
})
export class ActivityResponseTimeModule { }
