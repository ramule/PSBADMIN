import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateUserLevelSettingEditComponent } from './corporate-user-level-setting-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CorporateUserLevelSettingEditComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateUserLevelSettingEditRoutingModule { }
