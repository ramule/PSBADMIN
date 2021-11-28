import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerNotificationCategoriesEditComponent } from './customer-notification-categories-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerNotificationCategoriesEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerNotificationCategoriesEditRoutingModule { }
