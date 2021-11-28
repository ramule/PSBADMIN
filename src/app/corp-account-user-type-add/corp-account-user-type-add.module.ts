import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorpAccountUserTypeAddRoutingModule } from 'src/app/corp-account-user-type-add/corp-account-user-type-add-routing.module';
import { CorpAccountUserTypeAddComponent } from 'src/app/corp-account-user-type-add/corp-account-user-type-add.component';



@NgModule({
  declarations: [CorpAccountUserTypeAddComponent],
  imports: [
    CommonModule,
    CorpAccountUserTypeAddRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CorpAccountUserTypeAddModule { }
