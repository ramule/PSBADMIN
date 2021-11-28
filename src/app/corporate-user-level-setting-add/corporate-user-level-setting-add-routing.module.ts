import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateUserLevelSettingAddComponent } from './corporate-user-level-setting-add.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateUserLevelSettingAddComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateUserLevelSettingAddRoutingModule { }
