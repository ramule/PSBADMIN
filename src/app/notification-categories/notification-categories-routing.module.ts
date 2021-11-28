import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationCategoriesComponent } from './notification-categories.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationCategoriesComponent

  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationCategoriesRoutingModule { }
