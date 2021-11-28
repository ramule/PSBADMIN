import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitySettingComponent } from './activity-setting.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitySettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitySettingRoutingModule { }
