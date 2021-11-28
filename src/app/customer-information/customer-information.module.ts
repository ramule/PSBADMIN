import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerInformationRoutingModule } from 'src/app/customer-information/customer-information-routing.module';
import { CustomerInformationComponent } from 'src/app/customer-information/customer-information.component';



@NgModule({
  declarations: [CustomerInformationComponent],
  imports: [
    CommonModule,
    CustomerInformationRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CustomerInformationModule { }
