import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImpsRevisionHistoryComponent } from './imps-revision-history.component';
import { ImpsRevisionHistoryRoutingModule } from './imps-revision-history-routing.module';


@NgModule({
  declarations: [ImpsRevisionHistoryComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    ImpsRevisionHistoryRoutingModule
  ]
})
export class ImpsRevisionHistoryModule { }
