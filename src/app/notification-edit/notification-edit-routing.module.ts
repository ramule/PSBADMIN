import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationEditComponent } from './notification-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationEditRoutingModule { }
