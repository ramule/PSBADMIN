import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerNotificationCategoriesAddComponent } from './customer-notification-categories-add.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerNotificationCategoriesAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerNotificationCategoriesAddRoutingModule { }
