import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CbsMessageTemplateComponent } from './cbs-message-template.component';

const routes: Routes = [
  {
    path: '',
    component: CbsMessageTemplateComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CbsMessageTemplateRoutingModule { }
