import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpAccountUserTypeRoutingModule } from 'src/app/corp-account-user-type/corp-account-user-type-routing.module';
import { CorpAccountUserTypeComponent } from 'src/app/corp-account-user-type/corp-account-user-type.component';



@NgModule({
  declarations: [CorpAccountUserTypeComponent],
  imports: [
    CommonModule,
    CorpAccountUserTypeRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorpAccountUserTypeModule { }
