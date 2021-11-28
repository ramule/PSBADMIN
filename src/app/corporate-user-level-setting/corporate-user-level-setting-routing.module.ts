import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateUserLevelSettingComponent } from './corporate-user-level-setting.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateUserLevelSettingComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateUserLevelSettingRoutingModule { }
