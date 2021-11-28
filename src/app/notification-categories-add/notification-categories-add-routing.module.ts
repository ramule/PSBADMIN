import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationCategoriesAddComponent } from './notification-categories-add.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationCategoriesAddComponent

  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationCategoriesAddRoutingModule { }
