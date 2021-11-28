import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageCodeMasterComponent } from './message-code-master.component';

const routes: Routes = [
  {
    path: '',
    component: MessageCodeMasterComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageCodeMasterRoutingModule { }
