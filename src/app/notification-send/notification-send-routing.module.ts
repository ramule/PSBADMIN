import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationSendComponent } from './notification-send.component';


const routes: Routes = [
  {
    path: '',
    component: NotificationSendComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationSendRoutingModule { }
