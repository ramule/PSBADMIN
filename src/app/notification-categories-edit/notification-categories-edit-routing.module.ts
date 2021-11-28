import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationCategoriesEditComponent } from './notification-categories-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationCategoriesEditComponent

  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationCategoriesEditRoutingModule { }
