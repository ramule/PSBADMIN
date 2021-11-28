import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';;
import { AdminActivitySettingEditComponent } from './admin-activity-setting-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminActivitySettingEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminActivitySettingEditRoutingModule { }
