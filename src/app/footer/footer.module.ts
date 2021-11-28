import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterRoutingModule } from './footer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    FooterRoutingModule
  ]
})
export class FooterModule { }
