import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppConstants } from './app-constants';
import { HttpCommonServiceCallService } from './http-common-service-call.service';
import { CommonMethods } from './common-methods';
import { DatePipe } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { Daterangepicker } from 'ng2-daterangepicker';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxCaptchaModule } from 'ngx-captcha';




@NgModule({
  declarations: [
    AppComponent,
   
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule,
    Daterangepicker,
    SharedModuleModule,
    NgMultiSelectDropDownModule,
    CKEditorModule,
    NgxCaptchaModule,
    
  ],
  providers: [AppConstants,HttpCommonServiceCallService,CommonMethods,DatePipe, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
