import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from 'src/app/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class NotificationRoutingModule { }
