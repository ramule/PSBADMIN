import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageCodeMasterAddComponent } from './message-code-master-add.component';

const routes: Routes = [
  {
    path: '',
    component: MessageCodeMasterAddComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageCodeMasterAddRoutingModule { }
