import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorporateActivitySettingsComponent } from './corporate-activity-settings.component';
import { CorprateActivitySettingsRoutingModule } from './corprate-activity-settings-routing.module';



@NgModule({
  declarations: [CorporateActivitySettingsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CorprateActivitySettingsRoutingModule
  ]
})
export class CorprateActivitySettingsModule { }
