import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkNotificationSendComponent } from './bulk-notification-send.component';

const routes: Routes = [
  {
    path: '',
    component: BulkNotificationSendComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkNotificationSendRoutingModule { }
