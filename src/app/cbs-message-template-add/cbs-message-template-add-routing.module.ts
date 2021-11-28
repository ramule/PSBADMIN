import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CbsMessageTemplateAddComponent } from './cbs-message-template-add.component';

const routes: Routes = [
  {
    path: '',
    component: CbsMessageTemplateAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CbsMessageTemplateAddRoutingModule { }
