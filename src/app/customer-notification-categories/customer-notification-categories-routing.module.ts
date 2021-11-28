import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerNotificationCategoriesComponent } from './customer-notification-categories.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerNotificationCategoriesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerNotificationCategoriesRoutingModule { }
