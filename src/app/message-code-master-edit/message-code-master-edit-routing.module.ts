import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageCodeMasterEditComponent } from './message-code-master-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MessageCodeMasterEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageCodeMasterEditRoutingModule { }
