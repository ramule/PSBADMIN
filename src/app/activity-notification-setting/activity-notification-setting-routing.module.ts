import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityNotificationSettingComponent } from './activity-notification-setting.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityNotificationSettingComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityNotificationSettingRoutingModule { }
