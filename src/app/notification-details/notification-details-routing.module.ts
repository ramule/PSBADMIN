import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationDetailsComponent } from './notification-details.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationDetailsRoutingModule { }
