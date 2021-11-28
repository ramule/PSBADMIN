import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CbsMessageTemplateEditComponent } from './cbs-message-template-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CbsMessageTemplateEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CbsMessageTemplateEditRoutingModule { }
