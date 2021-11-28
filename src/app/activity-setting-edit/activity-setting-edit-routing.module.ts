import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitySettingEditComponent } from './activity-setting-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitySettingEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitySettingEditRoutingModule { }
