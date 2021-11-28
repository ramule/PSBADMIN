import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityNotificationSettingEditComponent } from './activity-notification-setting-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityNotificationSettingEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityNotificationSettingEditRoutingModule { }
